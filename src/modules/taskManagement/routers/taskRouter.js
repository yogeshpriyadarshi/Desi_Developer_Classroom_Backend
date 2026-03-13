const express = require("express");
const authMiddleware = require("../../auth/auth.middleware");
const {
  addCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/task-categories.controller");
const {
  addTask,
  getTask,
  getTaskById,
} = require("../controllers/task.controller");
const {
  addProject,
  getProject,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/project.controller");
const {
  addTaskLog,
  getTaskLog,
  getTaskLogByDate,
} = require("../controllers/task-log.controller");

const router = express.Router();

// create Project
router.post("/projects", authMiddleware, addProject);

// get all Project of user
router.get("/projects", authMiddleware, getProject);

// get Project by id
router.get("/projects/:id", authMiddleware, getProjectById);

// update Project
router.put("/projects/:id", authMiddleware, updateProject);

// delete Project
router.delete("/projects/:id", authMiddleware, deleteProject);

// create task-category
router.post("/categories/project/:projectId", authMiddleware, addCategory);

// get all task-category of user
router.get("/categories/project/:projectId", authMiddleware, getAllCategory);

// get category by id
router.get("/categories/:id", authMiddleware, getCategoryById);

// update task-category
router.put("/categories/:id", authMiddleware, updateCategory);

// delete task-category
router.delete("/categories/:id", authMiddleware, deleteCategory);

// create task
router.post("/tasks/category/:categoryId", authMiddleware, addTask);

// get all task of user
router.get("/tasks/category/:categoryId", authMiddleware, getTask);

// get single task
router.get("/tasks/:id", authMiddleware, getTaskById);

// add task log
router.post("/task-log", authMiddleware, addTaskLog);
// get task log by date
router.get("/task-log/date/:date", authMiddleware, getTaskLogByDate);

// get task log
router.get("/task-log/:taskId", authMiddleware, getTaskLog);

module.exports = router;
