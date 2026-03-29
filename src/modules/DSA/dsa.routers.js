const express = require("express");
const DSA = require("./dsa.model");
const { authMiddleware } = require("../auth/auth.middleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      title,
      question,
      explanation,
      topic,
      status,
      isPremium,
      difficulty,
      source,
      sourceLink,
      videoLink,
      orderNumber,
    } = req.body;
    if (!title || !question || !topic) {
      return res.status(400).json({
        success: false,
        message: "title, question and topic fields are required",
      });
    }
    const createdDSA = await DSA.create({
      title,
      question,
      explanation,
      topic,
      status,
      isPremium,
      difficulty,
      source,
      sourceLink,
      videoLink,
      orderNumber,
    });
    return res.status(201).json({
      success: true,
      message: "DSA created successfully",
      dsa: createdDSA,
    });
  } catch (err) {
    console.log("error", err);
    return res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

// public route
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
    const dsas = await DSA.find(filter);
    return res.status(200).json({
      success: true,
      message: "DSAs fetched successfully",
      dsas,
    });
  } catch (err) {
    console.log("error", err);
    return res.status(200).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

// dsa topic wise
router.get("/:topic", async (req, res) => {
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
    const dsas = await DSA.find(filter);
    return res.status(200).json({
      success: true,
      message: "DSAs fetched successfully",
      dsas,
    });
  } catch (err) {
    console.log("error", err);
    return res.status(200).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

//update dsa
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      question,
      explanation,
      topic,
      status,
      isPremium,
      difficulty,
      source,
      sourceLink,
      videoLink,
      orderNumber,
    } = req.body;
    if (!title || !question || !topic) {
      return res.status(400).json({
        success: false,
        message: "title, question and topic fields are required",
      });
    }
    const updatedDSA = await DSA.findByIdAndUpdate(
      id,
      {
        title,
        question,
        explanation,
        topic,
        status,
        isPremium,
        difficulty,
        source,
        sourceLink,
        videoLink,
        orderNumber,
      },
      { new: true },
    );
    return res.status(200).json({
      success: true,
      message: "DSA updated successfully",
      dsa: updatedDSA,
    });
  } catch (err) {
    console.log("error", err);
    return res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

module.exports = router;
