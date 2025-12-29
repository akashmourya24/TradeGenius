// services/payment.service.js
import razorpay from "../config/razorpay.js";
import prisma from "../config/db.js";

export const createPayment = async (amount, userId) => {
  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency: "INR",
  });

  await prisma.payment.create({
    data: {
      amount,
      status: false,
      razorpayId: order.id,
      userId,
    },
  });

  return order;
};
