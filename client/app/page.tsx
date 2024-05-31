"use client";
import CreateTaskModal from "@/components/CreateTaskModal";
import TasksTable from "@/components/TasksTable";
import tasksApi from "@/lib/api/tasks";
import { taskStatusOptions } from "@/lib/constants/taskDetails";
import useModal from "@/lib/hooks/useModal";
import {
  CreateTask,
  TasksFilter,
  Task,
  TaskStatus,
  UpdateTask,
  TasksSort,
} from "@/lib/types/task";
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTaskDescription, setSearchTaskDescription] = useState("");

  // tasks (filter, sort)
  const [tasksFilter, setTasksFilter] = useState<TasksFilter>({});
  const [tasksSort, setTasksSort] = useState<TasksSort>({});

  const createTaskModalProps = useModal();

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

  return (
    <main className="mx-auto max-w-4xl pt-5 h-screen">
      <div className="flex justify-center flex-col text-center gap-y-3">
        <h3 className="text-3xl">Todo list</h3>
        <button
          className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
          onClick={createTaskModalProps.open}
        >
          Add task +
        </button>
      </div>
      <div className="flex justify-between my-3">
        <input
          placeholder="Description..."
          className="border-2 rounded-md p-2 outline-none"
          value={searchTaskDescription}
          onChange={(e) => setSearchTaskDescription(e.target.value)}
        />
        <select
          defaultValue={tasksFilter.status}
          className="border-2 rounded-md p-2 outline-none"
          onChange={(e) =>
            setTasksFilter({
              ...tasksFilter,
              status: e.target.value as TaskStatus,
            })
          }
        >
          {taskStatusOptions.map((opt) => (
            <option value={opt.value} key={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <TasksTable
        tasks={tasks}
        updateTaskStatus={updateTaskStatus}
        deleteTask={deleteTask}
        updateTask={updateTask}
        onSortPriorityClick={onSortPriorityClick}
        prioritySort={tasksSort.priority}
      />
      <CreateTaskModal {...createTaskModalProps} createTask={createTask} />
    </main>
  );
}
