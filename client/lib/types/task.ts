import { taskPriorityOptions } from "./../constants/taskDetails";

export type TaskStatus = "done" | "undone";

export type SortOptions = "asc" | "desc";

export type TaskPriority = (typeof taskPriorityOptions)[number];

export type Task = {
  _id: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
};

export type CreateTask = {
  description: string;
  priority: TaskPriority;
};

export type UpdateTask = {
  description: string;
  priority: TaskPriority;
};

export type TasksFilter = {
  status?: TaskStatus;
};

export type TasksSort = {
  priority?: SortOptions;
};
