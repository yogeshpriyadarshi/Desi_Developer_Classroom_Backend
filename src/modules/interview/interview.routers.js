const express = require("express");
const Interview = require("./interview.model");
const { authMiddleware } = require("../auth/auth.middleware");

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

// fetch by Id
router.get("/fetch/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const interview = await Interview.findById(id);
    if (!interview) {
      return res.status(400).json({
        success: false,
        message: "interview not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "interview fetched successfully",
      interview,
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
router.get("/fetch-by-topic/:topic", async (req, res) => {
  try {
    const { topic } = req.params;
    const { difficulty, status, isPremium } = req.query;
    if (!topic) {
      return res.status(400).json({
        success: false,
        message: "topic field is required",
      });
    }
    const filter = {
      topic,
    };
    if (difficulty) filter.difficulty = difficulty;
    if (status) filter.status = status;
    if (isPremium) filter.isPremium = isPremium;
    const interviews = await Interview.find(filter);
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

// update interview
router.put("/update/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { question, explanation, topic, status, isPremium } = req.body;
    if (!question || !topic) {
      return res.status(400).json({
        success: false,
        message: "question and topic fields are required",
      });
    }
    const interview = await Interview.findById(id);
    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "interview not found",
      });
    }
    interview.question = question;
    interview.explanation = explanation;
    interview.topic = topic;
    interview.status = status;
    interview.isPremium = isPremium;
    await interview.save();
    return res.status(200).json({
      success: true,
      message: "interview updated successfully",
      interview,
    });
  } catch (err) {
    console.log("error", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

module.exports = router;
