const mongoose = require("mongoose");

const conceptSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
    description: String,
    content: String,
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    isPremium: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Concept", conceptSchema);
