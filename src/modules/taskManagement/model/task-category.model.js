const mongoose = require("mongoose");

const taskCategorySchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },

  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("TaskCategory", taskCategorySchema);
