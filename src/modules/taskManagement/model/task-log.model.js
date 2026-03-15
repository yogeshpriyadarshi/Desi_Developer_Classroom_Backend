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

    description: String,

    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },

    productivity: {
      type: Number,
      min: 1,
      max: 10,
    },

    urgency: {
      type: Number,
      min: 1,
      max: 10,
    },

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

/*
Ensure one log per task per user per day
*/
taskLogSchema.index({ task: 1, user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("TaskLog", taskLogSchema);
