import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/authMiddleware.js";

import {
  createQuestion,
  bulkInsertQuestions,
  getQuestionsByPlaylist,
  getSingleQuestion,
  updateQuestion,
  deleteQuestion,
} from "../controllers/question.controller.js";

const router = Router();

// ADMIN: Add single question
router.post("/", authMiddleware, isAdmin, createQuestion);

// ADMIN: Bulk insert questions
router.post("/bulk", authMiddleware, isAdmin, bulkInsertQuestions);

// PUBLIC: Get all questions for a playlist
router.get("/", getQuestionsByPlaylist);

// PUBLIC: Get single question
router.get("/:id", getSingleQuestion);

// ADMIN: Update question
router.put("/:id", authMiddleware, isAdmin, updateQuestion);

// ADMIN: Delete question
router.delete("/:id", authMiddleware, isAdmin, deleteQuestion);

export default router;
