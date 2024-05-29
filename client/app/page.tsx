"use client";

import CreateTaskModal from "@/components/CreateTaskModal";
import TasksTable from "@/components/TasksTable";
import tasksApi from "@/lib/api/tasks";
import useModal from "@/lib/hooks/useModal";
import {
  CreateTask,
  FilterTasks,
  Task,
  TaskStatus,
  UpdateTask,
} from "@/lib/types/task";
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filterTasks, setFilterTasks] = useState<FilterTasks>({});

  const createTaskModalProps = useModal();

  const handleGetAllTasks = async () => {
    try {
      const response = await tasksApi.getAll(filterTasks);
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAllTasks();
  }, [filterTasks]);

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
    <main className="mx-auto max-w-4xl pt-5 h-screen space-y-3">
      <div className="flex justify-center flex-col text-center gap-y-3">
        <h3 className="text-2xl">Todo list</h3>
        <button
          className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
          onClick={createTaskModalProps.open}
        >
          Add task +
        </button>
      </div>
      <div className="flex justify-between">
        <input
          placeholder="Description..."
          className="border-2 rounded-md p-2 outline-none"
        />
        <select
          defaultValue={filterTasks.status}
          className="border-2 rounded-md p-2 outline-none"
          onChange={(e) =>
            setFilterTasks({
              ...filterTasks,
              status: e.target.value as TaskStatus,
            })
          }
        >
          <option value={""}>All</option>
          <option value={"done"}>Done</option>
          <option value={"undone"}>Undone</option>
        </select>
      </div>
      <TasksTable
        tasks={tasks}
        updateTaskStatus={updateTaskStatus}
        deleteTask={deleteTask}
        updateTask={updateTask}
      />
      <CreateTaskModal {...createTaskModalProps} createTask={createTask} />
    </main>
  );
}
