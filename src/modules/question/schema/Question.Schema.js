const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
    questionText: {
      type: String,
      required: true,
      trim: true,
    },

    options: {
      type: [String],
      validate: {
        validator: function (val) {
          return val.length === 5; // exactly 5 options
        },
        message: "Question must have exactly 5 options",
      },
      default: ["", "", "", "", ""],
    },

    correctAnswer: {
      type: Number, // index (0,1,2,3,4)
      min: 0,
      max: 4,
      default: 0,
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
    },

    explanation: {
      type: String,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    isPremium: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Question", questionSchema);
