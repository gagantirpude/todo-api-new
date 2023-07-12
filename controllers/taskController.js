import ErrorHandler from "../middlewares/error.js";
import Task from "../models/taskModel.js";
import { response } from "../utils/response.js";

//* Create Task
export const newTask = async (req, res, next) => {
  try {
    //Data from body
    const { title, description } = req.body;

    //Create Task
    const task = await Task.create({
      title,
      description,
      user: req.user,
    });

    //Response
    response(req, res, 201, true, "Task Has Been Create", task);
  } catch (error) {
    next(error);
  }
};

//* Read Task
export const readTask = async (req, res, next) => {
  try {
    // Data form Body
    const userid = req.user._id;
    //Find Task
    const task = await Task.find({ user: userid });

    //Response
    response(req, res, 200, true, "Task Read", task);
  } catch (error) {
    next(error);
  }
};

//* Update Task
export const updateTask = async (req, res, next) => {
  try {
    // Data from Params
    const { id } = req.params;

    //find
    const task = await Task.findById(id);
    if (!task) {
      return next(new ErrorHandler("Invalid Task", 400));
    }

    // Condition
    task.isCompleted = !task.isCompleted;

    //Update
    await task.save();

    //response
    response(req, res, 200, true, "Task Has Been Update", task);
  } catch (error) {
    next(error);
  }
};

//* Delete Task
export const deleteTask = async (req, res, next) => {
  try {
    // Data from Params
    const { id } = req.params;

    //find
    const task = await Task.findById(id);
    if (!task) {
      return next(new ErrorHandler("Invalid Task", 400));
    }

    //deleted
    await task.deleteOne();

    //response
    response(req, res, 200, true, "Task Has Been Delete", task);
  } catch (error) {
    next(error);
  }
};
