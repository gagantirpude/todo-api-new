import express from "express";
import {
  newTask,
  readTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { isAuthentication } from "../middlewares/auth.js";

//*
const router = express.Router();

//* Create Task
router.post("/new", isAuthentication, newTask);

//* Read Task
router.get("/read", isAuthentication, readTask);

//* Read Task
router
  .route("/:id")
  .put(isAuthentication, updateTask)
  .delete(isAuthentication, deleteTask);

//* Export
export default router;
