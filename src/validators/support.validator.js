// validators/support.validator.js
import Joi from "joi";

export const createSupportSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.base": "Name must be a string",
      "string.empty": "Name cannot be empty",
      "string.min": "Name must be at least 2 characters long",
      "string.max": "Name must not exceed 100 characters",
      "any.required": "Name is required",
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.base": "Email must be a string",
      "string.email": "Email must be a valid email address",
      "string.empty": "Email cannot be empty",
      "any.required": "Email is required",
    }),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.base": "Phone must be a string",
      "string.pattern.base": "Phone must be exactly 10 digits",
      "string.empty": "Phone cannot be empty",
      "any.required": "Phone is required",
    }),
  message: Joi.string()
    .trim()
    .min(10)
    .max(1000)
    .required()
    .messages({
      "string.base": "Message must be a string",
      "string.empty": "Message cannot be empty",
      "string.min": "Message must be at least 10 characters long",
      "string.max": "Message must not exceed 1000 characters",
      "any.required": "Message is required",
    }),
});

