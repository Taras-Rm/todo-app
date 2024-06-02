import { taskStatusOptions } from "@/lib/constants/taskDetails";
import { TaskStatus } from "@/lib/types/task";
import React from "react";

interface TasksFilterProps {
  searchTaskDescription: string;
  tasksFilter: { status?: TaskStatus };
  setTasksFilter: (filter: { status?: TaskStatus }) => void;
  setSearchTaskDescription: (value: string) => void;
}

function TasksFilter({
  searchTaskDescription,
  setSearchTaskDescription,
  tasksFilter,
  setTasksFilter,
}: TasksFilterProps) {
  return (
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
  );
}

export default TasksFilter;
