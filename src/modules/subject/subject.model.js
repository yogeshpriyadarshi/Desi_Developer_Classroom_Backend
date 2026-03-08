const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    isPremium: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Subject", subjectSchema);
