// routes/payment.routes.js
import { Router } from "express";
import * as payment from "../controllers/payment.controller.js";
import auth from "../middlewares/auth.middleware.js";
import { validate, validateWebhook } from "../middlewares/validate.middleware.js";
import {
  createPaymentSchema,
  verifyPaymentSchema,
  webhookSchema,
} from "../validators/payment.validator.js";

const router = Router();

router.post("/pay", auth, validate(createPaymentSchema), payment.createPayment);

router.post("/verify", auth, validate(verifyPaymentSchema), payment.verifyPayment);

router.post("/webhook", validateWebhook(webhookSchema), payment.handleWebhook);

export default router;
