import React, { FormEventHandler, PropsWithChildren, useState } from "react";
import Modal from "./common/Modal";
import { ModalProps } from "@/lib/hooks/useModal";
import { CreateTask, TaskPriority } from "@/lib/types/task";
import { taskPriorityOptions } from "@/lib/constants/taskDetails";

interface CreateTaskModalProps extends PropsWithChildren<ModalProps> {
  createTask: (task: CreateTask) => void;
}

function CreateTaskModal({ createTask, ...modalProps }: CreateTaskModalProps) {
  const [formData, setFormData] = useState<CreateTask>({
    description: "",
    priority: 1,
  });

  const handleCreateTask: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    createTask(formData);
    setFormData({ description: "", priority: 1 });
    modalProps.close();
  };

  return (
    <Modal {...modalProps}>
      <div>
        <div className="text-black font-bold mb-4">Create task</div>
        <form
          className="flex justify-between space-x-3"
          onSubmit={handleCreateTask}
        >
          <input
            className="border-2 rounded-md p-1.5 outline-none w-2/3"
            placeholder="Description..."
            name="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <select
            name="priority"
            value={formData.priority}
            onChange={(e) =>
              setFormData({
                ...formData,
                priority: Number(e.target.value) as TaskPriority,
              })
            }
            className="outline-none border-2 rounded-md p-1.5"
          >
            {taskPriorityOptions.map((num) => (
              <option value={num}>{num}</option>
            ))}
          </select>
          <button
            className="bg-orange-700 text-white rounded-md p-1.5 w-1/3 hover:bg-orange-800"
            type="submit"
          >
            Create
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default CreateTaskModal;
