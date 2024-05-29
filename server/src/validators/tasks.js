import { body, param } from "express-validator";
import validate from "../middlewares/validate.js";
import { priorityOptions, taskStatus } from "../utils/task.js";

const createTaskValidator = validate([
  body("description")
    .trim()
    .notEmpty()
    .withMessage("description is required")
    .isLength({ min: 3, max: 1000 })
    .withMessage("description must be min 3 max 1000 characters"),
  body("priority")
    .trim()
    .notEmpty()
    .withMessage("priority is required")
    .isInt({
      min: 1,
      max: 10,
    })
    .withMessage("priority must be min 1 max 10"),
]);

const deleteTaskValidator = validate([
  param("id").isMongoId().withMessage("invalid id param format"),
]);

const setTaskStatusValidator = validate([
  body("status")
    .trim()
    .notEmpty()
    .withMessage("status is required")
    .isIn(Object.values(taskStatus))
    .withMessage("invalid task status"),
  param("id").isMongoId().withMessage("invalid id param format"),
]);

const getTaskValidator = validate([
  param("id").isMongoId().withMessage("invalid id param format"),
]);

const updateTaskValidator = validate([
  body("description")
    .trim()
    .notEmpty()
    .withMessage("description is required")
    .isLength({ min: 3, max: 1000 })
    .withMessage("description must be min 3 max 1000 characters"),
  body("priority")
    .trim()
    .notEmpty()
    .withMessage("priority is required")
    .isInt({
      min: 1,
      max: 10,
    })
    .withMessage("priority must be min 1 max 10"),
  param("id").isMongoId().withMessage("invalid id param format"),
]);

export {
  createTaskValidator,
  deleteTaskValidator,
  setTaskStatusValidator,
  getTaskValidator,
  updateTaskValidator,
};
