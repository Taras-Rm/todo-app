import { useEffect, useState } from "react";
import {
  CreateTask,
  Task,
  TaskStatus,
  TasksFilter,
  TasksSort,
  UpdateTask,
} from "../types/task";
import tasksApi from "../api/tasks";

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [tasksFilter, setTasksFilter] = useState<TasksFilter>({});
  const [tasksSort, setTasksSort] = useState<TasksSort>({});
  const [searchTaskDescription, setSearchTaskDescription] = useState("");

  const handleGetAllTasks = async () => {
    try {
      const { data } = await tasksApi.getAllTasks(
        tasksFilter,
        tasksSort,
        searchTaskDescription
      );
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAllTasks();
  }, [tasksFilter, tasksSort, searchTaskDescription]);

  const onSortPriorityClick = () => {
    // asc -> desc -> "" -> asc
    setTasksSort((sort) => ({
      ...sort,
      priority:
        sort.priority === "asc" ? "desc" : !sort.priority ? "asc" : undefined,
    }));
  };

  const updateTaskStatus = async (id: string, status: TaskStatus) => {
    try {
      await tasksApi.setTaskStatus(id, status);
      await handleGetAllTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (task: CreateTask) => {
    try {
      await tasksApi.createTask(task);
      await handleGetAllTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await tasksApi.deleteTask(id);
      await handleGetAllTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (id: string, task: UpdateTask) => {
    try {
      await tasksApi.updateTask(id, task);
      await handleGetAllTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    tasks,
    deleteTask,
    createTask,
    updateTaskStatus,
    updateTask,
    onSortPriorityClick,
    setTasksFilter,
    setSearchTaskDescription,
    tasksFilter,
    tasksSort,
    searchTaskDescription,
  };
};

export default useTasks;
