const express = require("express");
const TopicSchema = require("./topic.model");

const route = express.Router();

route.post("/create", async (req, res) => {
  try {
    const { topicName, description, subjectId } = req.body;
    if (!topicName || !subjectId) {
      return res.status(200).json({
        success: false,
        message: "Topic name and subject ID are required",
      });
    }

    const topic = await TopicSchema.findOne({ topicName });
    if (topic) {
      return res.status(200).json({
        success: false,
        message: "Topic already exists",
      });
    }

    const createdTopic = await TopicSchema.create({
      topicName,
      description,
      subjectId,
    });
    res.status(201).json({
      success: true,
      message: "Topic created successfully",
      createdTopic,
    });
  } catch (err) {
    console.log("error", err);
    return res.status(200).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

route.get("/fetch-all", async (req, res) => {
  try {
    const topics = await TopicSchema.find({ status: "active" });
    res.status(200).json({
      success: true,
      message: "Topics fetched successfully",
      topics,
    });
  } catch (err) {
    console.log("error", err);
    return res.status(200).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

// find topic by subject id
route.get("/fetch-by-subject/:subjectId", async (req, res) => {
  try {
    const { subjectId } = req.params;
    const topics = await TopicSchema.find({ subjectId, status: "active" });
    res.status(200).json({
      success: true,
      message: "Topics fetched successfully",
      topics,
    });
  } catch (err) {
    console.log("error", err);
    return res.status(200).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

// find topic by name  (regex)
route.get("/search", async (req, res) => {
  try {
    const { topicName } = req.query;
    const topic = await TopicSchema.find({
      topicName: { $regex: topicName, $options: "i" },
      status: "active",
    }).populate("subjectId");
    res.status(200).json({
      success: true,
      message: "Topic fetched successfully",
      topic,
    });
  } catch (err) {
    console.log("error", err);
    return res.status(200).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

route.get("/fetch/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const topic = await TopicSchema.findById(id).populate("subjectId");
    if (!topic) {
      return res.status(200).json({
        success: false,
        message: "Topic not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Topic fetched successfully",
      topic,
    });
  } catch (err) {
    console.log("error", err);
    return res.status(200).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

route.patch("/:id/toggle-status", async (req, res) => {
  try {
    const { id } = req.params;
    const topic = await TopicSchema.findById(id);
    if (!topic) {
      return res.status(200).json({
        success: false,
        message: "Topic not found",
      });
    }
    topic.status = topic.status === "active" ? "inactive" : "active";
    await topic.save();
    res.status(200).json({
      success: true,
      message: "Topic updated successfully",
      updatedTopic,
    });
  } catch (err) {
    console.log("error", err);
    return res.status(200).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

module.exports = route;
