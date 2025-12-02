import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/authMiddleware.js";
import {
  createPlaylist,
  getAllPlaylists,
  getPlaylistBySlug,
} from "../controllers/playlist.controller.js";

const router = Router();

// Admin: Create playlist
router.post("/", authMiddleware, isAdmin, createPlaylist);

// Public: Get all playlists
router.get("/", getAllPlaylists);

// Public: Get playlist by slug
router.get("/:slug", getPlaylistBySlug);

export default router;
