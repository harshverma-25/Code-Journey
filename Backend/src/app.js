import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// CORS setup
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Body parsers
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes import
import authRoutes from "./routes/auth.route.js";
import playlistRoutes from "./routes/playlist.route.js";

// Routes declaration
app.use("/api/auth", authRoutes);
app.use("/api/playlists", playlistRoutes);

export { app };
