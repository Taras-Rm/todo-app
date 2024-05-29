export type TaskStatus = "done" | "undone";

export type TaskPriority = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

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
