import mongoose from "mongoose";
import slugify from "slugify";

const playlistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    slug: {
      type: String,
      unique: true,
    },

    coverImage: {
      type: String,
      default: "",
    },

    totalQuestions: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Auto-generate slug
playlistSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
    });
  }
  next();
});

export const Playlist = mongoose.model("Playlist", playlistSchema);
