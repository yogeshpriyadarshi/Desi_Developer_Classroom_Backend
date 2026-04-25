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

// get total time spent on a task on a specific date month year
const getTotalTimeSpentOnTaskByDate = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    const taskLogs = await taskLogSchema.find({
      user: req.user.id,
      task: taskId,
      date: { $gte: startOfDay, $lte: endOfDay },
    });
    const totalTimeSpent = taskLogs.reduce((total, log) => {
      return total + log.timeSpent;
    }, 0);
    return res.status(200).json({
      success: true,
      message: "Total time spent fetched successfully",
      totalTimeSpent,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Total time spent on task fetching failed",
    });
  }
};

const getTotalTimeSpentOnTaskByMonth = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const month = parseInt(req.query.month);
    const year = parseInt(req.query.year);
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);
    const taskLogs = await taskLogSchema.find({
      user: req.user.id,
      task: taskId,
      date: { $gte: startOfMonth, $lte: endOfMonth },
    });
    const totalTimeSpent = taskLogs.reduce((total, log) => {
      return total + log.timeSpent;
    }, 0);
    return res.status(200).json({
      success: true,
      message: "Total time spent fetched successfully",
      totalTimeSpent,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Total time spent on task fetching failed",
    });
  }
};

const getTotalTimeSpentOnTaskByYear = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const year = parseInt(req.query.year);
    const startOfYear = new Date(year, 0, 1);
    const endOfYear = new Date(year, 11, 31, 23, 59, 59, 999);
    const taskLogs = await taskLogSchema.find({
      user: req.user.id,
      task: taskId,
      date: { $gte: startOfYear, $lte: endOfYear },
    });
    const totalTimeSpent = taskLogs.reduce((total, log) => {
      return total + log.timeSpent;
    }, 0);
    return res.status(200).json({
      success: true,
      message: "Total time spent fetched successfully",
      totalTimeSpent,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Total time spent on task fetching failed",
    });
  }
};

const getTotalTimeSpentOnTaskBySpecificDate = async (req, res) => {
  try { 
    const date = req.query.date;
    const taskLogs = await taskLogSchema.find({
      user: req.user.id,
      date: new Date(date)
    });
    const totalTimeSpent = taskLogs.reduce((total, log) => {
      return total + log.timeSpent;
    }, 0);
    return res.status(200).json({
      success: true,
      message: "Total time spentfetched successfully",
      totalTimeSpent,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Total time spent on task fetching failed",
    });
  }
}

module.exports = {
  addTaskLog,
  getTaskLog,
  getTaskLogByDate,
  updateTaskLogByTaskId,
  getTotalTimeSpentOnTaskByDate,
  getTotalTimeSpentOnTaskByMonth,
  getTotalTimeSpentOnTaskByYear,
  getTotalTimeSpentOnTaskBySpecificDate,
};
