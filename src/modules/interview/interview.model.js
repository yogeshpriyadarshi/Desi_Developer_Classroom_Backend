const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    explanation: { type: String },
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    isPremium: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Interview", interviewSchema);
