const Task = require("../model/task.model");

// create task

const addTask = async (req, res) => {
  try {
    const category = req.params.categoryId;

    const {
      title,
      description,
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

const getTask = async (req, res) => {
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

module.exports = { addTask, getTask, getTaskById };
