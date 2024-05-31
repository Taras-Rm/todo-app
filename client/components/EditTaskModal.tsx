import React, {
  FormEventHandler,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import Modal from "./common/Modal";
import { ModalProps } from "@/lib/hooks/useModal";
import { CreateTask, TaskPriority, UpdateTask } from "@/lib/types/task";
import { taskPriorityOptions } from "@/lib/constants/taskDetails";
import tasksApi from "@/lib/api/tasks";

interface EditTaskModalProps extends PropsWithChildren<ModalProps> {
  taskId: string;
  updateTask: (id: string, task: UpdateTask) => void;
}

function EditTaskModal({
  taskId,
  updateTask,
  ...modalProps
}: EditTaskModalProps) {
  const [formData, setFormData] = useState<CreateTask>({
    description: "",
    priority: 1,
  });

  const handleGetTask = async () => {
    try {
      const response = await tasksApi.getTask(taskId);
      setFormData({
        description: response.data.description,
        priority: response.data.priority,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetTask();
  }, [modalProps.visible]);

  const handleUpdateTask: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    updateTask(taskId, formData);
    setFormData({ description: "", priority: 1 });
    modalProps.close();
  };

  return (
    <Modal {...modalProps}>
      <div>
        <div className="text-black font-bold mb-4 text-xl">Edit task</div>
        <form className="flex flex-col" onSubmit={handleUpdateTask}>
          <div className="flex flex-row justify-between mb-3">
            <div className="flex flex-col w-full">
              <label htmlFor="description">Description</label>
              <input
                className="border-2 rounded-md p-1.5 outline-none w-full mt-2"
                placeholder="Description..."
                name="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col w-1/5 ml-3">
              <label htmlFor="priority">Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    priority: Number(e.target.value) as TaskPriority,
                  })
                }
                className="outline-none border-2 rounded-md p-1.5 h-full mt-2"
              >
                {taskPriorityOptions.map((num) => (
                  <option value={num}>{num}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="bg-orange-700 text-white rounded-md p-1.5 w-1/3 hover:bg-orange-800"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default EditTaskModal;
