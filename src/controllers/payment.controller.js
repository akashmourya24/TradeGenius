// controllers/payment.controller.js
import * as paymentService from "../services/payment.service.js";

export const createPayment = async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.user?.userId || req.user?.id; 

    if (!userId) {
      return res.status(401).json({ 
        success: false,
        error: "User authentication required" 
      });
    }

    const order = await paymentService.createPayment(amount, userId);
    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const result = await paymentService.verifyPayment(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

export const handleWebhook = async (req, res) => {
  try {
    const webhookSignature = req.headers["x-razorpay-signature"];
    
    if (!webhookSignature) {
      return res.status(400).json({
        success: false,
        error: "Webhook signature missing",
      });
    }

    // Use parsed body from validation middleware if available, otherwise parse it
    const webhookBody = req.parsedBody || (
      typeof req.body === "string" 
        ? JSON.parse(req.body) 
        : typeof req.body === "object" 
          ? req.body 
          : JSON.parse(req.body.toString())
    );

    // Get raw body for signature verification
    const rawBody = typeof req.body === "string" 
      ? req.body 
      : Buffer.isBuffer(req.body)
        ? req.body.toString()
        : JSON.stringify(webhookBody);

    await paymentService.handleWebhook(webhookBody, webhookSignature, rawBody);

    res.status(200).json({
      success: true,
      message: "Webhook processed successfully",
    });
  } catch (err) {
    console.error("Webhook error:", err);
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
