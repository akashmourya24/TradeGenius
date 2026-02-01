// middlewares/validate.middleware.js
export const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      }));

      return res.status(400).json({
        success: false,
        error: "Validation failed",
        errors,
      });
    }

    req.body = value;
    next();
  };
};

// Special validation for webhooks that handles raw body
export const validateWebhook = (schema) => {
  return (req, res, next) => {
    try {
      // Parse raw body if it's a Buffer or string
      let bodyToValidate;
      if (Buffer.isBuffer(req.body)) {
        bodyToValidate = JSON.parse(req.body.toString());
      } else if (typeof req.body === "string") {
        bodyToValidate = JSON.parse(req.body);
      } else {
        bodyToValidate = req.body;
      }

      const { error, value } = schema.validate(bodyToValidate, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        const errors = error.details.map((detail) => ({
          field: detail.path.join("."),
          message: detail.message,
        }));

        return res.status(400).json({
          success: false,
          error: "Webhook validation failed",
          errors,
        });
      }

      // Store parsed body for controller
      req.parsedBody = value;
      next();
    } catch (parseError) {
      return res.status(400).json({
        success: false,
        error: "Invalid webhook payload format",
        details: parseError.message,
      });
    }
  };
};

