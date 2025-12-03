import { User } from "../models/user.model.js";
import { Playlist } from "../models/playlist.model.js";
import { Question } from "../models/question.model.js";

// --------------------- SOLVE ----------------------
export const markSolved = async (req, res) => {
  try {
    const userId = req.user._id;
    const { questionId } = req.body;

    if (!questionId)
      return res.status(400).json({ success: false, message: "questionId required" });

    const user = await User.findById(userId);

    if (!user.solvedQuestions.includes(questionId)) {
      user.solvedQuestions.push(questionId);
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Marked as solved",
    });

  } catch (error) {
    console.error("SOLVE ERROR:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// --------------------- UNSOLVE ----------------------
export const unmarkSolved = async (req, res) => {
  try {
    const userId = req.user._id;
    const { questionId } = req.body;

    const user = await User.findById(userId);

    user.solvedQuestions = user.solvedQuestions.filter(id => id !== questionId);

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Unsolved",
    });

  } catch (error) {
    console.error("UNSOLVE ERROR:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// --------------------- BOOKMARK ----------------------
export const bookmarkQuestion = async (req, res) => {
  try {
    const userId = req.user._id;
    const { questionId } = req.body;

    const user = await User.findById(userId);

    if (!user.bookmarkedQuestions.includes(questionId)) {
      user.bookmarkedQuestions.push(questionId);
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Bookmarked",
    });

  } catch (error) {
    console.error("BOOKMARK ERROR:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// --------------------- UNBOOKMARK ----------------------
export const removeBookmark = async (req, res) => {
  try {
    const userId = req.user._id;
    const { questionId } = req.body;

    const user = await User.findById(userId);

    user.bookmarkedQuestions = user.bookmarkedQuestions.filter(id => id !== questionId);

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Bookmark removed",
    });

  } catch (error) {
    console.error("UNBOOKMARK ERROR:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// --------------------- PLAYLIST PROGRESS ----------------------
export const getPlaylistProgress = async (req, res) => {
  try {
    const userId = req.user._id;
    const { playlistSlug } = req.params;

    const playlist = await Playlist.findOne({ slug: playlistSlug });

    if (!playlist)
      return res.status(404).json({ success: false, message: "Playlist not found" });

    const questions = await Question.find({ playlistId: playlist._id });

    const user = await User.findById(userId);

    const solvedSet = new Set(user.solvedQuestions);

    const solvedCount = questions.filter(q => solvedSet.has(q._id.toString())).length;

    return res.status(200).json({
      success: true,
      playlist: playlist.name,
      totalQuestions: questions.length,
      solved: solvedCount,
      progress: (solvedCount / questions.length) * 100,
    });

  } catch (error) {
    console.error("PLAYLIST PROGRESS ERROR:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// --------------------- OVERALL PROGRESS ----------------------
export const getOverallProgress = async (req, res) => {
  try {
    const userId = req.user._id;

    const total = await Question.countDocuments();
    const user = await User.findById(userId);

    const solved = user.solvedQuestions.length;

    return res.status(200).json({
      success: true,
      totalQuestions: total,
      solved,
      progress: (solved / total) * 100,
    });

  } catch (error) {
    console.error("OVERALL PROGRESS ERROR:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
