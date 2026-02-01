// routes/support.routes.js
import { Router } from "express";
import * as support from "../controllers/support.controller.js";
import auth from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createSupportSchema } from "../validators/support.validator.js";

const router = Router();

router.post("/support/:id", auth, validate(createSupportSchema), support.createSupportController);

export default router;
