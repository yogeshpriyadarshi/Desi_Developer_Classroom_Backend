const express = require("express");
const ConceptSchema = require("./concept.model");

const route = express.Router();

route.post("/create", async (req, res) => {
  try {
    const { name, topic, description, content } = req.body;
    if (!name || !topic) {
      return res.status(400).json({
        success: false,
        message: "ConceptName and topicId are required",
      });
    }

    const concept = await ConceptSchema.findOne({ name });
    if (concept) {
      return res.status(400).json({
        success: false,
        message: "Concept already exists",
      });
    }

    const createdConcept = await ConceptSchema.create({
      name,
      topic,
      description,
      content,
    });
    res.status(201).json({
      success: true,
      message: "Concept created successfully",
      createdConcept,
    });
  } catch (err) {
    console.log("error", err);
    return res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

route.get("/fetch-all", async (req, res) => {
  try {
    const concepts = await ConceptSchema.find({ status: "active" });
    res.status(200).json({
      success: true,
      message: "Concepts fetched successfully",
      concepts,
    });
  } catch (err) {
    console.log("error", err);
    return res.status(200).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

// fetch by topic Id
route.get("/fetch-by-topic/:topicId", async (req, res) => {
  try {
    const { topicId } = req.params;
    const concepts = await ConceptSchema.find({ topicId, status: "active" });
    res.status(200).json({
      success: true,
      message: "Concepts fetched successfully",
      concepts,
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
    const concept = await ConceptSchema.findById(id);
    if (!concept) {
      return res.status(200).json({
        success: false,
        message: "Concept not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Concept fetched successfully",
      concept,
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
    const concept = await ConceptSchema.findById(id);
    if (!concept) {
      return res.status(200).json({
        success: false,
        message: "Concept not found",
      });
    }
    concept.status = concept.status === "active" ? "inactive" : "active";
    await concept.save();
    res.status(200).json({
      success: true,
      message: "Concept updated successfully",
      updatedConcept,
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
