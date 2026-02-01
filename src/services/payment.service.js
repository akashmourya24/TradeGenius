// services/payment.service.js
import razorpay from "../config/razorpay.js";
import prisma from "../config/db.js";
import crypto from "crypto";

export const createPayment = async (amount, userId) => {
  try {
    if (!amount || amount <= 0) {
      throw new Error("Invalid amount");
    }

    if (!userId) {
      throw new Error("User ID is required");
    }

    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}_${userId}`,
      notes: {
        userId: userId.toString(),
      },
    });

    await prisma.payment.create({
      data: {
        amount,
        status: false,
        razorpayId: order.id,
        userId,
      },
    });

    return {
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      key: process.env.RAZORPAY_KEY_ID,
    };
  } catch (error) {
    throw new Error(`Payment creation failed: ${error.message}`);
  }
};

export const verifyPayment = async (razorpay_order_id, razorpay_payment_id, razorpay_signature) => {
  try {
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      throw new Error("Payment verification failed: Invalid signature");
    }

    
    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    if (payment.status !== "captured") {
      throw new Error("Payment not captured");
    }

    // Update payment status in database
    const updatedPayment = await prisma.payment.updateMany({
      where: {
        razorpayId: razorpay_order_id,
        status: false,
      },
      data: {
        status: true,
      },
    });

    if (updatedPayment.count === 0) {
      throw new Error("Payment record not found");
    }

    // Get payment record to find userId
    const paymentRecord = await prisma.payment.findFirst({
      where: {
        razorpayId: razorpay_order_id,
        status: true,
      },
    });

    if (paymentRecord) {
      // Update user's isPaid status
      await prisma.user.update({
        where: {
          id: paymentRecord.userId,
        },
        data: {
          isPaid: true,
        },
      });
    }

    return {
      success: true,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    };
  } catch (error) {
    throw new Error(`Payment verification failed: ${error.message}`);
  }
};

export const handleWebhook = async (webhookBody, webhookSignature, rawBody) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
      throw new Error("Webhook secret not configured");
    }

    // Verify webhook signature using raw body
    // Razorpay signs the raw request body, not the parsed JSON
    const bodyString = rawBody || JSON.stringify(webhookBody);
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(bodyString)
      .digest("hex");

    if (expectedSignature !== webhookSignature) {
      throw new Error("Invalid webhook signature");
    }

    const event = webhookBody.event;
    const payment = webhookBody.payload.payment?.entity;

    if (event === "payment.captured" && payment) {
      const orderId = payment.order_id;

      // Update payment status
      await prisma.payment.updateMany({
        where: {
          razorpayId: orderId,
          status: false,
        },
        data: {
          status: true,
        },
      });

      // Get payment record to update user
      const paymentRecord = await prisma.payment.findFirst({
        where: {
          razorpayId: orderId,
          status: true,
        },
      });

      if (paymentRecord) {
        await prisma.user.update({
          where: {
            id: paymentRecord.userId,
          },
          data: {
            isPaid: true,
          },
        });
      }
    }

    return { success: true };
  } catch (error) {
    throw new Error(`Webhook handling failed: ${error.message}`);
  }
};
