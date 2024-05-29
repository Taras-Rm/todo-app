import { Router } from "express";
import {
  createTask,
  getAllTasks,
  setTaskStatus,
  deleteTask,
  getTask,
  updateTask,
} from "../controllers/tasks.js";
import {
  createTaskValidator,
  deleteTaskValidator,
  getTaskValidator,
  setTaskStatusValidator,
  updateTaskValidator,
} from "../validators/tasks.js";

const router = Router();

router.post("/", createTaskValidator, createTask);
router.get("/", getAllTasks);
router.get("/:id", getTaskValidator, getTask);
router.patch("/:id/status", setTaskStatusValidator, setTaskStatus);
router.delete("/:id", deleteTaskValidator, deleteTask);
router.put("/:id", updateTaskValidator, updateTask);

export default router;
