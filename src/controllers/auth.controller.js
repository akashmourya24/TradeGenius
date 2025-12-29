// controllers/auth.controller.js
import { signup, login } from "../services/auth.service.js";

export const signupController = async (req, res) => {
  try {
    const user = await signup(req.body);
    res.status(201).json({ message: "User created successfully", data: user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);
    res.status(200).json({ message: "Login successful", data: result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
