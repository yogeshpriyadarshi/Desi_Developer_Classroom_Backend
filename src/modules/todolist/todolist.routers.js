const express = require("express");
const {
  createTodoList,
  getAllTodoLists,
  updateTodoList,
  deleteTodoList,
  changeStatus,
  getTodoListForDay,
} = require("./todolist.controller");
const { authMiddleware } = require("../auth/auth.middleware");

const route = express.Router();

route.post("/", authMiddleware, createTodoList);

route.get("/", authMiddleware, getAllTodoLists);

// Get todoList for particular day
route.get("/day/:date", authMiddleware, getTodoListForDay);

route.patch("/:id/status", authMiddleware, changeStatus);

route.put("/:id", authMiddleware, updateTodoList);

route.delete("/:id", authMiddleware, deleteTodoList);

module.exports = route;
