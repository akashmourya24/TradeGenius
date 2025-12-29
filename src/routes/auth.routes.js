import { Router } from "express";
import { signupController, loginController } from "../controllers/auth.controller.js";

const router = Router();

router.post("/signup", signupController); // must be a function
router.post("/login", loginController);   // must be a function

export default router;
