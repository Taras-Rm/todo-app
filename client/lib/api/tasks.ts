import {
  CreateTask,
  TaskStatus,
  UpdateTask,
  TasksFilter,
  TasksSort,
  TasksSearchParams,
} from "../types/task";
import api from "./api";

const tasksApi = {
  getAllTasks: async (
    { status }: TasksFilter,
    { priority }: TasksSort,
    serchDescription: string
  ) => {
    const params: TasksSearchParams = {};

    if (serchDescription) {
      params.description = serchDescription;
    }
    if (status) {
      params.status = status;
    }
    if (priority) {
      params.sortByPriority = priority;
    }
    
    return api.get("/tasks", {
      params,
    });
  },

  getTask: async (id: string) => {
    return api.get(`/tasks/${id}`);
  },

  setTaskStatus: async (id: string, status: TaskStatus) => {
    return api.patch(`/tasks/${id}/status`, { status });
  },

  createTask: async (task: CreateTask) => {
    return api.post(`/tasks`, { ...task });
  },

  deleteTask: async (id: string) => {
    return api.delete(`/tasks/${id}`);
  },

  updateTask: async (id: string, task: UpdateTask) => {
    return api.put(`/tasks/${id}`, { ...task });
  },
};

export default tasksApi;
