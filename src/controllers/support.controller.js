// controllers/auth.controller.js
import { signup, login } from "../services/support.service.js";

export const createSupportController = async (req, res) => {
  try {
    const support = await createSupport(req.body);
    res.status(201).json({ message: "Request Submitted Successfully", data: support });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
