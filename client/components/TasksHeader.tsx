import React from "react";

interface TasksHeaderProps {
  openModal: () => void;
}

function TasksHeader({ openModal }: TasksHeaderProps) {
  return (
    <div className="flex justify-center flex-col text-center gap-y-3">
      <h3 className="text-3xl">Todo list</h3>
      <button
        className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
        onClick={openModal}
      >
        Add task +
      </button>
    </div>
  );
}

export default TasksHeader;
