import {create} from 'zustand';
import { TaskDto, Task } from '../models/tasks';


interface TasksState {
  selectedPage: string;
  setSelectedPage: (page: string) => void;
  tasks: TaskDto,
  setTasks: (tasks: TaskDto) => void;
  
  setIsOpenModal: (open: boolean) => void;
  isModalOpen: boolean;

  setIsEditingTask: (task: Task | null) => void;
  isEditingTask: Task | null;

}

const useTasksStore = create<TasksState>((set) => ({
  selectedPage: 'inbox',
  setSelectedPage: (page) => set({ selectedPage: page }),

  tasks: {inbox: [{id: 1, taskName: 'inbox1Task', status: 'incomplete'}, {id: 2, taskName: 'inbox2Task', status: 'incomplete'}, {id: 3, taskName: 'inbox3Task', status: 'incomplete'}, {id: 4, taskName: 'inbox4Task', status: 'incomplete'}, {id: 5, taskName: 'inbox5Task', status: 'incomplete'}, {id: 6, taskName: 'inbox6Task', status: 'incomplete'}, {id: 7, taskName: 'inbox7Task', status: 'complete'}, {id: 8, taskName: 'inbox8Task', status: 'incomplete'}, {id: 9, taskName: 'inbox9Task', status: 'incomplete'}, {id: 10, taskName: 'inbox10Task', status: 'incomplete'}], today: [{id: 1, taskName: 'today1Task', status: 'incomplete'}, {id: 2, taskName: 'today2Task', status: 'complete'}]},
  setTasks: (tasksData) => set({ tasks: tasksData }),

  isModalOpen: false,
  setIsOpenModal: (open) => set({ isModalOpen: open }),

  isEditingTask: null,
  setIsEditingTask: (task) => set({ isEditingTask: task }),

}));

export default useTasksStore;