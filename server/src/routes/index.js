import { Router } from "express";
import tasksRouter from "./tasks.js";

const router = Router();

router.use("/tasks", tasksRouter);

export default router;
