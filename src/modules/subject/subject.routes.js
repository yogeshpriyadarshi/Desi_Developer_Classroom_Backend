const express = require("express");
const SubjectSchema = require("./subject.model");

const route = express.Router();

route.post("/create", async (req, res) => {
  try {
    const { subjectName, description } = req.body;
    if (!subjectName) {
      return res.status(200).json({
        success: false,
        message: "Subject name is required",
      });
    }

    const subject = await SubjectSchema.findOne({ subjectName });
    if (subject) {
      return res.status(200).json({
        success: false,
        message: "Subject already exists",
      });
    }

    const createdSubject = await SubjectSchema.create({
      subjectName,
      description,
    });
    res.status(201).json({
      success: true,
      message: "Subject created successfully",
      subject: createdSubject,
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
    const subjects = await SubjectSchema.find({ status: "active" });
    res.status(200).json({
      success: true,
      message: "Subjects fetched successfully",
      subjects,
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
    const { id } = req.params();
    const subject = await SubjectSchema.findById(id);

    if (!subject) {
      return res.status(200).json({
        success: false,
        message: "Subject not found",
      });
    }

    subject.status = subject.status === "active" ? "inActive" : "active";
    await subject.save();

    res.status(200).json({
      success: true,
      message: "Subject updated successfully",
      subject,
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
