import {
  CreateTask,
  Task,
  TaskStatus,
  UpdateTask,
  FilterTasks,
} from "../types/task";
import api from "./api";

const tasksApi = {
  getAll: async ({ status }: FilterTasks) => {
    return api.get("/tasks", { params: { status } });
  },

  getTask: async (id: string) => {
    return api.get<Task>(`/tasks/${id}`);
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
