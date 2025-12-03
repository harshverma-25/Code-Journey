import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  markSolved,
  unmarkSolved,
  bookmarkQuestion,
  removeBookmark,
  getPlaylistProgress,
  getOverallProgress,
} from "../controllers/progress.controller.js";

const router = Router();

// Solved / Unsolved
router.post("/solve", authMiddleware, markSolved);
router.post("/unsolve", authMiddleware, unmarkSolved);

// Bookmark / Unbookmark
router.post("/bookmark", authMiddleware, bookmarkQuestion);
router.post("/unbookmark", authMiddleware, removeBookmark);

// Get progress for playlist
router.get("/:playlistSlug", authMiddleware, getPlaylistProgress);

// Get overall progress
router.get("/", authMiddleware, getOverallProgress);

export default router;