import {create} from 'zustand';
import { TaskDto, Task } from '../models/tasks';


interface TasksState {
  selectedPage: string;
  setSelectedPage: (page: string) => void;
  tasks: TaskDto,
  setTasks: (tasks: TaskDto) => void;
  
  setIsOpenEditModal: (open: boolean) => void;
  isEditModalOpen: boolean;

  setIsEditingTask: (task: Task) => void;
  isEditingTask: Task | null;

}

const useTasksStore = create<TasksState>((set) => ({
  selectedPage: 'inbox',
  setSelectedPage: (page) => set({ selectedPage: page }),

  tasks: {inbox: [{id: 1, text: 'inboxTask', status: 'incomplete'}], today: [{id: 2, text: 'todayTask', status: 'incomplete'}]},
  setTasks: (tasksData) => set({ tasks: tasksData }),

  isEditModalOpen: false,
  setIsOpenEditModal: (open) => set({ isEditModalOpen: open }),

  isEditingTask: null,
  setIsEditingTask: (task) => set({ isEditingTask: task }),

}));

export default useTasksStore;