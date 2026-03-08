const mongoose = require("mongoose");

const conceptSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
    description: String,
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Concept", conceptSchema);
