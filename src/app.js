// src/app.js
import dotenv from "dotenv";
dotenv.config(); // MUST be first

import express from "express";
import cors from "cors";
import "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import supportRoutes from "./routes/support.routes.js";

const app = express();
app.use(cors());

// Webhook route needs raw body for signature verification
app.use("/api/payment/webhook", express.raw({ type: "application/json" }));

// All other routes use JSON parsing
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/support", supportRoutes);

app.get("/", (req, res) => {
  res.json({ message: "TradeGenius API running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;
