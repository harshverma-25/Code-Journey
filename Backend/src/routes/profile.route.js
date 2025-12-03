import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { updateProfile } from "../controllers/profile.controller.js";
import { changePassword } from "../controllers/profile.controller.js";

const router = Router();

// Update logged-in user's profile
router.put("/", authMiddleware, updateProfile);
router.put("/change-password", authMiddleware, changePassword);

export default router;
