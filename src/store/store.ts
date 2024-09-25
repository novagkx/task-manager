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
}

const useTasksStore = create<TasksState>((set) => ({
  selectedPage: "inbox",
  setSelectedPage: (page) => set({ selectedPage: page }),

  tasks: [
    {
      id: 1,
      title: "Task name 1",
      priority: "P1",
      description: "Description 1",
      status: "incomplete",
      today: true,
    },
    {
      id: 2,
      title: "Task name 2",
      priority: "P4",
      description: "Description 2",
      status: "incomplete",
      today: false,
    },
    {
      id: 3,
      title: "Task name 3",
      status: "complete",
      today: true,
    },
    {
      id: 4,
      title: "Task name 4",
      priority: "P2",
      description: "Description 4",
      status: "complete",
      today: false,
    },
    {
      id: 5,
      title: "Task name 5",
      priority: "P1",
      description: "Description 5",
      status: "incomplete",
      today: true,
    },
  ],

  setTasks: (tasksData) => set({tasks: tasksData}),

  isModalOpen: false,
  setIsOpenModal: (open) => set({ isModalOpen: open }),

  isEditingTask: null,
  setIsEditingTask: (task) => set({ isEditingTask: task }),
}));

export default useTasksStore;
