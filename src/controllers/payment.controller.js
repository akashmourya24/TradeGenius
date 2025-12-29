// controllers/payment.controller.js
import * as paymentService from "../services/payment.service.js";

export const createPayment = async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.user?.userId; // from auth middleware

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const order = await paymentService.createPayment(amount, userId);
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
