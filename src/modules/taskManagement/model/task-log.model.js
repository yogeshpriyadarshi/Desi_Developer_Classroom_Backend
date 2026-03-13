const mongoose = require("mongoose");

const taskLogSchema = new mongoose.Schema(
  {
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Productivity score (1–10)
    productivity: {
      type: Number,
      min: 1,
      max: 10,
      default: 5,
    },

    // Urgency score (1–10)
    urgency: {
      type: Number,
      min: 1,
      max: 10,
      default: 5,
    },

    // Time spent on task (minutes)
    timeSpent: {
      type: Number,
      min: 0,
      default: 0,
    },

    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("TaskLog", taskLogSchema);
