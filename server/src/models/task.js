import mongoose from "mongoose";
import { priorityOptions, taskStatus } from "../utils/task.js";

const taskSchema = new mongoose.Schema({
  description: String,
  status: {
    type: String,
    enum: Object.values(taskStatus),
    default: taskStatus.undone,
  },
  priority: {
    type: Number,
    enum: priorityOptions,
    default: priorityOptions[0],
  },
  createdAt: { type: Date, default: Date.now },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
