const Task = require("../model/task.model");

// create task

const addTask = async (req, res) => {
  try {
    const category = req.params.categoryId;

    const {
      title,
      description,
      priority,
      recurrenceType,
      interval,
      daysOfWeek,
      dayOfMonth,
      startDate,
      endDate,
    } = req.body;

    // validation
    if (!title || !category) {
      return res.status(400).json({
        success: false,
        message: "Title and category are required",
      });
    }
    // create task
    const task = await Task.create({
      title,
      description,
      category,
      user: req.user.id,
      priority,
      recurrenceType,
      daysOfWeek,
      dayOfMonth,
      startDate,
      endDate,
    });

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Task creation failed",
    });
  }
};

// get all active task
const getAllTask = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id,
    });
    return res.status(200).json({
      success: true,
      message: "task is fetched",
      tasks,
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: "task is not fetched",
    });
  }
};

// get all active task
const getAllActiveTask = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id,
      isActive: true,
    });
    return res.status(200).json({
      success: true,
      message: "task is fetched",
      tasks,
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: "task is not fetched",
    });
  }
};

const getTaskByCategory = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id,
      category: req.params.categoryId,
    });
    return res.status(200).json({
      success: true,
      message: "task is fetched",
      tasks,
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: "task is not fetched",
    });
  }
};

const getActiveTaskByCategory = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id,
      category: req.params.categoryId,
      isActive: true,
    });
    return res.status(200).json({
      success: true,
      message: "task is fetched",
      tasks,
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: "task is not fetched",
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    return res.status(200).json({
      success: true,
      message: "task is fetched by id",
      task,
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: "task is not fetched",
    });
  }
};

// toogle the task

const toogleTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    task.isActive = !task.isActive;
    await task.save();
    return res.status(200).json({
      success: true,
      message: "task is toggled",
      task,
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: "task is not toggled",
    });
  }
};

module.exports = {
  addTask,
  getAllTask,
  getAllActiveTask,
  getActiveTaskByCategory,
  getTaskById,
  getTaskByCategory,
  toogleTask,
};
