import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

import {
  registerUser,
  loginUser,
  logoutUser,
  getProfile
} from "../controllers/auth.controller.js";

const router = Router();

// Register
router.post("/register", validate(registerSchema), registerUser);

// Login
router.post("/login", validate(loginSchema), loginUser);

// Logout
router.post("/logout", authMiddleware, logoutUser);

// Get profile (PRIVATE)
router.get("/profile", authMiddleware, getProfile);

export default router;
