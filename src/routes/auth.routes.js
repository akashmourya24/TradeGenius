import { Router } from "express";
import { signupController, loginController } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { signupSchema, loginSchema } from "../validators/auth.validator.js";

const router = Router();

router.post("/signup", validate(signupSchema), signupController);
router.post("/login", validate(loginSchema), loginController);

export default router;
