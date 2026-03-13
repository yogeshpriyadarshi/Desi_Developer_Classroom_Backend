const TaskCategory = require("../model/task-category.model");
const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const project = req.params.projectId;
    if (!name || !project) {
      return res.status(200).json({
        success: false,
        message: "project id is required, task category is not created",
      });
    }
    const category = TaskCategory.create({
      name,
      description,
      project,
      user: req.user.id,
    });
    return res.status(201).json({
      success: true,
      message: "task category is created",
      category,
    });
  } catch (er) {
    return res.status(200).json({
      success: false,
      message: "task category is not created",
    });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const categories = await TaskCategory.find({
      project: req.params.projectId,
      user: req.user.id,
      isDeleted: false,
    });
    return res.status(200).json({
      success: true,
      message: "task category is fetched",
      categories,
    });
  } catch (er) {
    return res.status(200).json({
      success: false,
      message: "task category is not fetched",
    });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await TaskCategory.findById(req.params.id).populate(
      "project",
    );
    return res.status(200).json({
      success: true,
      message: "task category is fetched",
      category,
    });
  } catch (er) {
    return res.status(200).json({
      success: false,
      message: "task category is not fetched",
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(200).json({
        success: false,
        message: "task category is not updated",
      });
    }
    const category = await TaskCategory.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true },
    );
    return res.status(200).json({
      success: true,
      message: "task category is updated",
      data: category,
    });
  } catch (er) {
    return res.status(200).json({
      success: false,
      message: "task category is not updated",
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await TaskCategory.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true },
    );
    return res.status(200).json({
      success: true,
      message: "task category is deleted",
      data: category,
    });
  } catch (er) {
    return res.status(200).json({
      success: false,
      message: "task category is not deleted",
    });
  }
};

module.exports = {
  addCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
