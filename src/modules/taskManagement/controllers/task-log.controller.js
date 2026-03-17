const taskLogSchema = require("../model/task-log.model");

const addTaskLog = async (req, res) => {
  try {
    const {
      task,
      description,
      status,
      productivity,
      urgency,
      timeSpent,
      date,
    } = req.body;
    if (!task || !status || !productivity || !urgency || !timeSpent || !date) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const taskLog = await taskLogSchema.create({
      task,
      description,
      user: req.user.id,
      status,
      productivity,
      urgency,
      timeSpent,
      date,
    });
    return res.status(201).json({
      success: true,
      message: "Task log added successfully",
      taskLog,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Task log addition failed",
    });
  }
};

// get task log

const getTaskLog = async (req, res) => {
  try {
    const taskLog = await taskLogSchema
      .find({
        user: req.user.id,
        task: req.params.taskId,
      })
      .populate("task");
    return res.status(200).json({
      success: true,
      message: "Task log fetched successfully",
      taskLog,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Task log fetching failed",
    });
  }
};

// get task log for specific date

const getTaskLogByDate = async (req, res) => {
  try {
    const taskLogs = await taskLogSchema
      .find({
        user: req.user.id,
        date: new Date(req.params.date),
      })
      .populate("task");
    return res.status(200).json({
      success: true,
      message: "Task log fetched successfully",
      taskLogs,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Task log fetching failed",
    });
  }
};

// Update Task Log for by taskId

const updateTaskLogByTaskId = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const taskLogs = await taskLogSchema
      .findByIdAndUpdate(
        taskId,
        {
          user: req.user.id,
          ...req.body,
        },
        { new: true },
      )
      .populate("task");
    if (!taskLogs) {
      return res.status(404).json({
        success: false,
        message: "Task log not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Task log updated successfully",
      taskLogs,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Task log update failed",
    });
  }
};

module.exports = {
  addTaskLog,
  getTaskLog,
  getTaskLogByDate,
  updateTaskLogByTaskId,
};
