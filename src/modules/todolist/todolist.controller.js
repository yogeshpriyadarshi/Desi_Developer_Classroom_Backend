const TodoList = require("../todolist/todolist.model");

const createTodoList = async (req, res) => {
  try {
    const user = req.user;
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }
    const todoList = new TodoList({ title, description, userId: user.id });

    const savedTodoList = await todoList.save();
    res.status(201).json({
      success: true,
      message: "Todo list created successfully",
      todoList: savedTodoList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllTodoLists = async (req, res) => {
  try {
    const user = req.user;
    const todoLists = await TodoList.find({ userId: user.id });
    res.status(200).json({
      success: true,
      message: "Todo lists fetched successfully",
      todoLists,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get todoList for particular day
const getTodoListForDay = async (req, res) => {
  try {
    const user = req.user;
    const { date } = req.params;
    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date is required",
      });
    }
    const start = new Date(date);
    const end = new Date(date);
    end.setDate(end.getDate() + 1);
    const todoLists = await TodoList.find({
      userId: user.id,
      date: { $gte: start, $lt: end },
    });
    res.status(200).json({
      success: true,
      message: "Todo lists fetched successfully",
      todoLists,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateTodoList = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }
    const todoList = await TodoList.findByIdAndUpdate(
      id,
      { title, description },
      { new: true },
    );
    res.status(200).json({
      success: true,
      message: "Todo list updated successfully",
      todoList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteTodoList = async (req, res) => {
  try {
    const { id } = req.params;
    const todoList = await TodoList.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Todo list deleted successfully",
      todoList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const changeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const todoList = await TodoList.findById(id);
    if (!todoList) {
      return res.status(404).json({
        success: false,
        message: "Todo list not found",
      });
    }
    const status = todoList.status === "done" ? "undone" : "done";
    const updatedTodoList = await TodoList.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );
    res.status(200).json({
      success: true,
      message: "Status changed successfully",
      todoList: updatedTodoList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createTodoList,
  getAllTodoLists,
  getTodoListForDay,
  updateTodoList,
  deleteTodoList,
  changeStatus,
};
