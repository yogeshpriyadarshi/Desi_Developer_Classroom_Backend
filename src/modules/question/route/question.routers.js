const express = require("express");
const QuestionSchema = require("../schema/Question.Schema");

const router = express.Router();

const upload = require("../../media/upload");
const { bulkUploadQuestions } = require("../controller/question.controller");

router.post("/bulk-upload", upload.single("file"), bulkUploadQuestions);

router.post("/create", async (req, res) => {
  try {
    const { topic, question, options, correctAnswer, difficulty, explanation } =
      req.body;
    if (!topic || !question) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }
    const createdQuestion = await QuestionSchema.create({
      topic,
      questionText: question,
      options,
      correctAnswer,
      difficulty,
      explanation,
    });
    res.status(201).json({
      success: true,
      message: "Question created successfully",
      createdQuestion,
    });
  } catch (err) {
    console.log("error", err);
    return res.status(200).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

// fetch all question by status
router.get("/fetch-all/:status", async (req, res) => {
  try {
    const { status } = req.params;
    const questions = await QuestionSchema.find({ status: status });
    res.status(200).json({
      success: true,
      message: "Question fetched successfully",
      questions,
    });
  } catch (err) {
    console.log("error", err);
    return res.status(200).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

// fetch question by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const question = await QuestionSchema.findById(id).populate("topic");
    res.status(200).json({
      success: true,
      message: "Question fetched successfully",
      question,
    });
  } catch (err) {
    console.log("error", err);
    return res.status(200).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

// fetch question by topicId (status optional)
router.get("/fetch-by-topic/:topicId", async (req, res) => {
  try {
    const { topicId } = req.params;
    const { status, difficulty, isPremium } = req.query;

    let filter = { topic: topicId };

    if (status) {
      filter.status = status;
    }
    if (difficulty) {
      filter.difficulty = difficulty;
    }
    if (isPremium) {
      filter.isPremium = isPremium;
    }

    const questions = await QuestionSchema.find(filter).populate("topic");

    res.status(200).json({
      success: true,
      message: "Question fetched successfully",
      questions,
    });
  } catch (err) {
    console.log("error", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

router.patch("/:id/toggle-status", async (req, res) => {
  try {
    const { id } = req.params;
    const question = await QuestionSchema.findById(id);
    if (!question) {
      return res.status(200).json({
        success: false,
        message: "Question not found",
      });
    }
    question.status = question.status === "active" ? "inActive" : "active";
    const updatedQuestion = await question.save();
    res.status(200).json({
      success: true,
      message: "Question updated successfully",
      question: updatedQuestion,
    });
  } catch (err) {
    console.log("error", err);
    return res.status(200).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const newQuestion = req.body;
    console.log(newQuestion);
    const question = await QuestionSchema.findByIdAndUpdate(
      id,
      newQuestion,
    ).populate("topic");
    if (!question) {
      return res.status(200).json({
        success: false,
        message: "Question not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Question updated successfully",
      question,
    });
  } catch (err) {
    console.log("error", err);
    return res.status(200).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

module.exports = router;
