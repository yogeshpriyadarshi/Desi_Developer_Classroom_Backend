const express = require("express");
const DSA = require("./dsa.model");
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
    const createdDSA = await DSA.create({
      question,
      explanation,
      topic,
      status,
      isPremium,
    });
    return res.status(201).json({
      success: true,
      message: "DSA created successfully",
      dsa: createdDSA,
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
    const dsas = await DSA.find();
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
    if (!topic) {
      return res.status(400).json({
        success: false,
        message: "topic field is required",
      });
    }
    const dsas = await DSA.find({ topic });
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

module.exports = router;
