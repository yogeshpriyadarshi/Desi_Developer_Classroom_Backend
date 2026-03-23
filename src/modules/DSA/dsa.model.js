const mongoose = require("mongoose");

const dsaSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
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
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
    },
    source: { type: String },
    sourceLink: { type: String },
    videoLink: { type: String },
    orderNumber: { type: Number },
    isPremium: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Dsa", dsaSchema);
