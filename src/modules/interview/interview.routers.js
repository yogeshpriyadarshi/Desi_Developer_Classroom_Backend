const express = require("express");
const Interview = require("./interview.model");
const authMiddleware = require("../auth/auth.middleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { question, explanation, topic, status, isPremium } = req.body;
    if (!question || !topic) {
      return res.status(400).json({
        success: false,
        message: "question and topic fields are required",
      });
    }
    const createdInterview = await Interview.create({
      question,
      explanation,
      topic,
      status,
      isPremium,
    });
    return res.status(201).json({
      success: true,
      message: "interview created successfully",
      interview: createdInterview,
    });
  } catch (err) {
    console.log("error", err);
    return res.status(200).json({
      success: false,
      message: "Something went wrong",
    });
  }
});
// public route
router.get("/", async (req, res) => {
  try {
    const interviews = await Interview.find();
    return res.status(200).json({
      success: true,
      message: "interviews fetched successfully",
      interviews,
    });
  } catch (err) {
    console.log("error", err);
    return res.status(200).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

// interview topic wise
router.get("/:topic", async (req, res) => {
  try {
    const { topic } = req.params;
    if (!topic) {
      return res.status(400).json({
        success: false,
        message: "topic field is required",
      });
    }
    const interviews = await Interview.find({ topic });
    return res.status(200).json({
      success: true,
      message: "interviews fetched successfully",
      interviews,
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
