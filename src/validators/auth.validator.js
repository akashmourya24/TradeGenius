// validators/auth.validator.js
import Joi from "joi";

export const signupSchema = Joi.object({
  fullName: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.base": "Full name must be a string",
      "string.empty": "Full name cannot be empty",
      "string.min": "Full name must be at least 2 characters long",
      "string.max": "Full name must not exceed 100 characters",
      "any.required": "Full name is required",
    }),
  email: Joi.string()
    .email()
    .pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)
    .required()
    .messages({
      "string.base": "Email must be a string",
      "string.email": "Email must be a valid email address",
      "string.pattern.base": "Email must be a valid Gmail address",
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
  password: Joi.string()
    .min(6)
    .max(100)
    .required()
    .messages({
      "string.base": "Password must be a string",
      "string.empty": "Password cannot be empty",
      "string.min": "Password must be at least 6 characters long",
      "string.max": "Password must not exceed 100 characters",
      "any.required": "Password is required",
    }),
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.base": "Email must be a string",
      "string.email": "Email must be a valid email address",
      "string.empty": "Email cannot be empty",
      "any.required": "Email is required",
    }),
  password: Joi.string()
    .required()
    .messages({
      "string.base": "Password must be a string",
      "string.empty": "Password cannot be empty",
      "any.required": "Password is required",
    }),
});

