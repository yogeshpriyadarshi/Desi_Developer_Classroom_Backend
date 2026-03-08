const express = require("express");
const QuestionSchema = require("../schema/Question.Schema");

const router = express.Router();

const upload = require("../../media/upload");
const { bulkUploadQuestions } = require("../controller/question.controller");

router.post("/bulk-upload", upload.single("file"), bulkUploadQuestions);

router.post("/create", async (req, res) => {
  try {
    const {
      conceptId,
      question,
      options,
      correctAnswer,
      difficulty,
      explanation,
    } = req.body;
    if (
      !conceptId ||
      !question ||
      !options ||
      !correctAnswer ||
      !difficulty ||
      !explanation
    ) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }
    const createdQuestion = await QuestionSchema.create({
      conceptId,
      question,
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

router.get("/fetch-all", async (req, res) => {
  try {
    const questions = await QuestionSchema.find({ status: "active" });
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

// fetch inActive user
router.get("/fetch-inActive", async (req, res) => {
  try {
    const questions = await QuestionSchema.find({ status: "inActive" });
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

// fetch question by conceptId
router.get("/fetch-by-concept/:conceptId", async (req, res) => {
  try {
    // conceptId is array of conceptId
    const { conceptId } = req.params;
    const questions = await QuestionSchema.find({
      conceptId: { $in: conceptId },
    }).populate("conceptId");
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
    const question = await QuestionSchema.findById(id).populate("conceptId");
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

router.put("/:id/update", async (req, res) => {
  try {
    const { id } = req.params;
    const newQuestion = req.body;
    console.log(newQuestion);
    const question = await QuestionSchema.findByIdAndUpdate(
      id,
      newQuestion,
    ).populate("conceptId");
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
