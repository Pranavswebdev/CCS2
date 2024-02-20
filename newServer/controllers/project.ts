const Project = require("../models/project");
const bcrypt = require("bcryptjs");
const Task = require("../models/tasks.ts");
import { Request, Response, RequestHandler } from "express";
import { IUser } from "../types";

// interface AuthenticatedRequest extends Request {
//   user?: {
//     name: string;
//     email: string;
//     _id: string;
//   };
// }

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}

export const createProject: RequestHandler = async (req, res) => {
  const { title, description, tasks } = req.body;

  try {
    if (req.user) {
      const admin = req.user._id;
      const ProjectSchema = new Project({ title, description, admin, tasks });
      const newProject = await ProjectSchema.save(ProjectSchema);
      res
        .status(200)
        .json({ message: "Project created", newProject: newProject });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getProjects: RequestHandler = async (req, res) => {
  console.log(req.user, "user inside get projects");

  const projectId = req.query.projectId;
  let projects = [];
  try {
    if (projectId) {
      projects = await Project.findById(projectId);
    } else {
      projects = await Project.find({ admin: req.user!._id });
    }
    res.status(200).json({ message: "Success", projects: projects });
  } catch (error) {
    console.log(error);
  }
};

export const createTask: RequestHandler = async (req, res) => {
  const { title, description, projectId } = req.body;

  try {
    const TaskSchema = new Task({ name: title, description, projectId });
    const newTask = await TaskSchema.save(TaskSchema);
    console.log({ newTask });

    await Project.findOneAndUpdate(
      { _id: projectId },
      { $push: { tasks: newTask._id } }
    );
    res.status(200).json({ message: " Task created ", newTask });
  } catch (error) {
    console.log(error);
  }
};

export const getTasks: RequestHandler = async (req, res) => {
  const projectId = req.query.projectId;
  console.log(req.query);
  try {
    const tasks = await Task.find({ projectId: projectId });
    console.log(tasks);
    res.status(200).json({ tasks: tasks });
  } catch (error) {
    console.log(error);
  }
};

export const updateTask: RequestHandler = async (req, res) => {
  const { taskId, status } = req.body;
  console.log({ taskId, status });
  let updatedTask;
  try {
    if (status === "completed") {
      updatedTask = await Task.findByIdAndUpdate(taskId, {
        status: status,
        end_date: new Date(),
      });
    } else {
      updatedTask = await Task.findByIdAndUpdate(taskId, { status: status });
    }

    res.status(200).json({ updatedTask: updatedTask });
  } catch (error) {
    console.log(error);
  }
};
