import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    playlistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Playlist",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    practiceLink: {
      type: String,
      required: true,  // must have a URL to practice
    },

    bookLink: {
      type: String,
      default: "",     // optional
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy",
    },

    order: {
      type: Number,
      default: 0,       // used for sorting inside sheet
    },
  },
  { timestamps: true }
);

export const Question = mongoose.model("Question", questionSchema);
