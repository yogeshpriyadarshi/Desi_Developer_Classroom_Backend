const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: String,

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    isCompleted: {
      type: Boolean,
      default: false,
    },

    recurrenceType: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
      default: "daily",
    },

    interval: {
      type: Number,
      default: 1,
    },

    daysOfWeek: [Number],

    dayOfMonth: Number,

    startDate: Date,

    endDate: Date,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Task", taskSchema);
