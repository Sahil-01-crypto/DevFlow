const projectModel = require("../models/projects.models");

async function createProject(req, res) {
  try {
    const { title, description } = req.body;
    const owner = req.user.id; // Assuming you have user authentication and the user ID is available in req.user

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required",
      });
    }
    const newProjecct = await projectModel.create({
      title,
      description,
      owner,
    });
    res
      .status(201)
      .json({ message: "Project created successfully", project: newProjecct });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating project", error: error.message });
  }
}

async function getAllProjects(req, res) {
  const owner = req.user.id; // Assuming you have user authentication and the user ID is available in req.user
  try {
    const projects = await projectModel.find({ owner });
    res
      .status(200)
      .json({ message: "Projects fetched successfully", projects });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching projects", error: error.message });
  }
}

async function getProjectById(req, res) {
  const { id } = req.params;
  const owner = req.user.id;

  try {
    const project = await projectModel.findOne({
      _id: id,
      owner,
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json({
      message: "Project fetched successfully",
      project,
    });
  } catch (error) {
    console.error("Error fetching project:", error);

    return res.status(500).json({
      message: "Error fetching project",
      error: error.message,
    });
  }
}

module.exports = { createProject, getAllProjects, getProjectById };
