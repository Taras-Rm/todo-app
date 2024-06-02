"use client";
import CreateTaskModal from "@/components/CreateTaskModal";
import TasksFilter from "@/components/TasksFilter";
import TasksHeader from "@/components/TasksHeader";
import TasksTable from "@/components/TasksTable";
import useModal from "@/lib/hooks/useModal";
import useTasks from "@/lib/hooks/useTasks";

export default function Home() {
  const {
    tasks,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    setTasksFilter,
    onSortPriorityClick,
    setSearchTaskDescription,
    tasksSort,
    tasksFilter,
    searchTaskDescription,
  } = useTasks();

  const createTaskModalProps = useModal();

  return (
    <main className="mx-auto max-w-4xl pt-5 h-screen">
      <TasksHeader openModal={createTaskModalProps.open} />
      <TasksFilter
        tasksFilter={tasksFilter}
        searchTaskDescription={searchTaskDescription}
        setTasksFilter={setTasksFilter}
        setSearchTaskDescription={setSearchTaskDescription}
      />
      <TasksTable
        tasks={tasks}
        deleteTask={deleteTask}
        updateTask={updateTask}
        updateTaskStatus={updateTaskStatus}
        onSortPriorityClick={onSortPriorityClick}
        sortPriorityValue={tasksSort.priority}
      />
      <CreateTaskModal {...createTaskModalProps} createTask={createTask} />
    </main>
  );
}
