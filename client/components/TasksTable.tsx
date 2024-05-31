import useModal from "@/lib/hooks/useModal";
import { SortOptions, Task, TaskStatus, UpdateTask } from "@/lib/types/task";
import React, { useState } from "react";
import { RiDeleteBin5Fill, RiEdit2Line } from "react-icons/ri";
import EditTaskModal from "./EditTaskModal";
import SortButton from "./common/SortButton";

interface TasksTableProps {
  tasks: Task[];
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, status: UpdateTask) => void;
  onSortPriorityClick: () => void;
  prioritySort?: SortOptions;
}

function TasksTable({
  tasks,
  updateTaskStatus,
  deleteTask,
  updateTask,
  onSortPriorityClick,
  prioritySort,
}: TasksTableProps) {
  const editTaskModalProps = useModal();
  const [editTaskId, setEditTaskId] = useState<string | null>(null);

  const onEditTaskClick = (id: string) => {
    editTaskModalProps.open();
    setEditTaskId(id);
  };

  return (
    <table className="w-full">
      <thead>
        <tr className="bg-gray-300 uppercase text-sm">
          <th key={"tasks"} className="p-3 text-left w-3/5">
            Tasks
          </th>
          <th key={"priority"} className="p-3">
            <div className="flex items-center justify-center">
              Priority
              <SortButton
                onSortPriorityClick={onSortPriorityClick}
                value={prioritySort}
              />
            </div>
          </th>
          <th key={"actions"} className="p-3">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, rowId) => (
          <Row
            task={task}
            rowId={rowId}
            updateTaskStatus={updateTaskStatus}
            deleteTask={deleteTask}
            onEditTaskClick={onEditTaskClick}
          />
        ))}
      </tbody>
      {editTaskId && (
        <EditTaskModal
          {...editTaskModalProps}
          taskId={editTaskId}
          updateTask={updateTask}
        />
      )}
    </table>
  );
}

interface RowProps {
  task: Task;
  rowId: number;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  deleteTask: (id: string) => void;
  onEditTaskClick: (id: string) => void;
}

function Row({
  task,
  rowId,
  updateTaskStatus,
  deleteTask,
  onEditTaskClick,
}: RowProps) {
  return (
    <tr className="border-y-2 border-y-gray-300">
      <td key={rowId}>
        <div className="flex items-center p-3">
          <input
            type="checkbox"
            className="mr-3 accent-green-500 rounded-full"
            onClick={() =>
              updateTaskStatus(
                task._id,
                task.status === "done" ? "undone" : "done"
              )
            }
            checked={task.status === "done"}
          />
          <div className={`${task.status === "done" ? "line-through" : ""}`}>
            {task.description}
          </div>
        </div>
      </td>
      <td>
        <div className="flex justify-center font-bold">{task.priority}</div>
      </td>
      <td>
        <div className="flex items-center justify-evenly">
          <button
            onClick={() => {
              onEditTaskClick(task._id);
            }}
          >
            <RiEdit2Line
              size={25}
              className="text-blue-500 hover:text-blue-600"
            />
          </button>
          <button
            onClick={() => {
              deleteTask(task._id);
            }}
          >
            <RiDeleteBin5Fill
              size={25}
              className="text-red-500 hover:text-red-600"
            />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default TasksTable;
