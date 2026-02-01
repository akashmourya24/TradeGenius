// validators/payment.validator.js
import Joi from "joi";

export const createPaymentSchema = Joi.object({
  amount: Joi.number()
    .positive()
    .min(1)
    .max(1000000)
    .required()
    .messages({
      "number.base": "Amount must be a number",
      "number.positive": "Amount must be positive",
      "number.min": "Amount must be at least 1",
      "number.max": "Amount must not exceed 1000000",
      "any.required": "Amount is required",
    }),
});

export const verifyPaymentSchema = Joi.object({
  razorpay_order_id: Joi.string()
    .required()
    .messages({
      "string.base": "Razorpay order ID must be a string",
      "string.empty": "Razorpay order ID cannot be empty",
      "any.required": "Razorpay order ID is required",
    }),
  razorpay_payment_id: Joi.string()
    .required()
    .messages({
      "string.base": "Razorpay payment ID must be a string",
      "string.empty": "Razorpay payment ID cannot be empty",
      "any.required": "Razorpay payment ID is required",
    }),
  razorpay_signature: Joi.string()
    .required()
    .messages({
      "string.base": "Razorpay signature must be a string",
      "string.empty": "Razorpay signature cannot be empty",
      "any.required": "Razorpay signature is required",
    }),
});

export const webhookSchema = Joi.object({
  event: Joi.string()
    .required()
    .messages({
      "string.base": "Event must be a string",
      "any.required": "Event is required",
    }),
  payload: Joi.object({
    payment: Joi.object({
      entity: Joi.object({
        id: Joi.string(),
        order_id: Joi.string(),
        status: Joi.string(),
      }).unknown(true),
    }).unknown(true),
  }).unknown(true),
}).unknown(true);

