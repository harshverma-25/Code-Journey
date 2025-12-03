import { Question } from "../models/question.model.js";
import { Playlist } from "../models/playlist.model.js";

// ADMIN: Create single question
export const createQuestion = async (req, res) => {
  try {
    const { playlistId, title, practiceLink, bookLink, difficulty, order } = req.body;

    if (!playlistId || !title || !practiceLink) {
      return res.status(400).json({
        success: false,
        message: "playlistId, title, and practiceLink are required",
      });
    }

    const question = await Question.create({
      playlistId,
      title,
      practiceLink,
      bookLink,
      difficulty,
      order,
    });

    return res.status(201).json({
      success: true,
      message: "Question added",
      question,
    });
  } catch (error) {
    console.error("CREATE QUESTION ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ADMIN: Bulk insert questions
export const bulkInsertQuestions = async (req, res) => {
  try {
    const { playlistId, questions } = req.body;

    if (!playlistId || !questions || !Array.isArray(questions)) {
      return res.status(400).json({
        success: false,
        message: "playlistId and questions[] required",
      });
    }

    // attach playlistId to each question
    const formattedQuestions = questions.map((q, index) => ({
      playlistId,
      title: q.title,
      practiceLink: q.practiceLink,
      bookLink: q.bookLink || "",
      difficulty: q.difficulty || "Easy",
      order: q.order ?? index + 1,
    }));

    const inserted = await Question.insertMany(formattedQuestions);

    return res.status(201).json({
      success: true,
      message: "Bulk questions added",
      count: inserted.length,
    });
  } catch (error) {
    console.error("BULK INSERT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// PUBLIC: Get questions by playlist
export const getQuestionsByPlaylist = async (req, res) => {
  try {
    const { playlist } = req.query;

    if (!playlist) {
      return res.status(400).json({
        success: false,
        message: "Playlist slug is required: ?playlist=striver-sheet",
      });
    }

    const playlistData = await Playlist.findOne({ slug: playlist });

    if (!playlistData) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found",
      });
    }

    const questions = await Question.find({ playlistId: playlistData._id }).sort({ order: 1 });

    return res.status(200).json({
      success: true,
      playlist: playlistData.name,
      questions,
    });
  } catch (error) {
    console.error("GET QUESTIONS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// PUBLIC: Get single question
export const getSingleQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    return res.status(200).json({
      success: true,
      question,
    });
  } catch (error) {
    console.error("GET SINGLE QUESTION ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ADMIN: Update question
export const updateQuestion = async (req, res) => {
  try {
    const updated = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });

    return res.status(200).json({
      success: true,
      message: "Question updated",
      updated,
    });
  } catch (error) {
    console.error("UPDATE QUESTION ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ADMIN: Delete question
export const deleteQuestion = async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Question deleted",
    });
  } catch (error) {
    console.error("DELETE QUESTION ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
