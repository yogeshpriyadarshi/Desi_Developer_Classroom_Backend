const taskLogSchema = require("../model/task-log.model");

const addTaskLog = async (req, res) => {
  try {
    const { task, status, productivity, urgency, timeSpent, date } = req.body;
    if (!task || !status || !productivity || !urgency || !timeSpent || !date) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const taskLog = await taskLogSchema.create({
      task,
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

module.exports = { addTaskLog, getTaskLog, getTaskLogByDate };
