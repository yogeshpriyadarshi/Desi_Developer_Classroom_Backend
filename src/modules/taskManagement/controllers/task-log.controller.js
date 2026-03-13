const taskLogSchema = require("../model/task-log.model");
const addTaskLog = async (req, res) => {
  try {
    const { task, status, priority, date } = req.body;
    if (!task || !status || !priority || !date) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const taskLog = await taskLogSchema.create({
      task,
      user: req.user.id,
      status,
      priority,
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

module.exports = { addTaskLog };
