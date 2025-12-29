// routes/payment.routes.js
import { Router } from "express";
import * as payment from "../controllers/payment.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/pay", auth, payment.createPayment);

export default router;
