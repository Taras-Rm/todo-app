import Task from "../models/task.js";
import ApiError from "../utils/apiError.js";
import httpStatus from "../utils/httpStatus.js";

const createTask = async (req, res, next) => {
  try {
    const { description, priority } = req.body;

    const createTask = await Task.create({ description, priority });

    res.status(httpStatus.CREATED).json(createTask);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Task.deleteOne({ _id: id });

    res.status(httpStatus.NO_CONTENT).json({ message: "task deleted" });
  } catch (error) {
    next(error);
  }
};

const getAllTasks = async (req, res, next) => {
  try {
    const { status, description, sortBy, order } = req.query;

    const query = {};
    if (status) {
      query.status = status;
    }
    if (description) {
      query.description = { $regex: new RegExp(description, "i") };
    }

    const execQuery = Task.find(query);
    if (sortBy && order) {
      execQuery.sort({ [sortBy]: order });
    }

    const tasks = await execQuery.exec();

    res.status(httpStatus.OK).json(tasks);
  } catch (error) {
    next(error);
  }
};

const getTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    res.status(httpStatus.OK).json(task);
  } catch (error) {
    next(error);
  }
};

const setTaskStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      throw new ApiError(httpStatus.NO_FOUND, `task with id: ${id} not found`);
    }

    await task.updateOne({ status });

    res.status(httpStatus.OK).json({ message: "status changed" });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { description, priority } = req.body;
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      throw new ApiError(httpStatus.NO_FOUND, `task with id: ${id} not found`);
    }

    await task.updateOne({ description, priority });

    res.status(httpStatus.OK).json(task);
  } catch (error) {
    next(error);
  }
};

export {
  createTask,
  deleteTask,
  getAllTasks,
  setTaskStatus,
  getTask,
  updateTask,
};
