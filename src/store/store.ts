import { create } from "zustand";
import { TaskDto, Task } from "../models/tasks";

interface TasksState {
  selectedPage: string;
  setSelectedPage: (page: string) => void;
  tasks: TaskDto;
  setTasks: (tasks: TaskDto) => void;

  setIsOpenModal: (open: boolean) => void;
  isModalOpen: boolean;

  setIsEditingTask: (task: Task | null) => void;
  isEditingTask: Task | null;

  deletedTask: Task | null;
  setDeletedTask: (task: Task | null) => void;
}

const useTasksStore = create<TasksState>((set) => ({
  selectedPage: "inbox",
  setSelectedPage: (page) => set({ selectedPage: page }),

  tasks: [],
  setTasks: (tasksData) => set({ tasks: tasksData }),

  isModalOpen: false,
  setIsOpenModal: (open) => set({ isModalOpen: open }),

  isEditingTask: null,
  setIsEditingTask: (task) => set({ isEditingTask: task }),

  deletedTask: null,
  setDeletedTask: (task) =>
    set({
      deletedTask: task,
    }),
}));

export default useTasksStore;
