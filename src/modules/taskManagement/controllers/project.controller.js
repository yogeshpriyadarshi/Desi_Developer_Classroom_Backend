const Project = require("../model/project.model");

const addProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(200).json({
        success: false,
        message: "project is not created",
      });
    }
    const project = Project.create({
      name,
      description,
      user: req.user.id,
    });
    return res.status(201).json({
      success: true,
      message: "project is created",
      project,
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: "project is not created",
    });
  }
};

const getProject = async (req, res) => {
  try {
    const projects = await Project.find({
      user: req.user.id,
      isDeleted: false,
    });
    return res.status(200).json({
      success: true,
      message: "project is fetched",
      projects,
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "project is not fetched",
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    return res.status(200).json({
      success: true,
      message: "project is fetched by id",
      project,
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: "project is not fetched",
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(200).json({
        success: false,
        message: "project is not updated",
      });
    }
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true },
    );
    return res.status(200).json({
      success: true,
      message: "project is updated",
      project,
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: "project is not updated",
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    // do soft delete
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true },
    );
    return res.status(200).json({
      success: true,
      message: "project is deleted",
      project,
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: "project is not deleted",
    });
  }
};

module.exports = {
  addProject,
  getProject,
  updateProject,
  deleteProject,
  getProjectById,
};
