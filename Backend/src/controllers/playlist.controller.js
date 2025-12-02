import { Playlist } from "../models/Playlist.js";

// Create playlist (ADMIN only)
export const createPlaylist = async (req, res) => {
  try {
    const { name, description, coverImage, totalQuestions } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Playlist name is required",
      });
    }

    // Create playlist
    const playlist = await Playlist.create({
      name,
      description,
      coverImage,
      totalQuestions,
    });

    return res.status(201).json({
      success: true,
      message: "Playlist created successfully",
      playlist,
    });

  } catch (error) {
    console.error("CREATE PLAYLIST ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while creating playlist",
    });
  }
};

// Get all playlists (Public)
export const getAllPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      playlists,
    });

  } catch (error) {
    console.error("GET ALL PLAYLISTS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching playlists",
    });
  }
};

// Get single playlist by slug (Public)
export const getPlaylistBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const playlist = await Playlist.findOne({ slug });

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found",
      });
    }

    return res.status(200).json({
      success: true,
      playlist,
    });

  } catch (error) {
    console.error("GET PLAYLIST BY SLUG ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching playlist",
    });
  }
};
