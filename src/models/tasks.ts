 type Task = {
    id: number;
    priority?: string; // p1 - p4
    description?: string;
    deadline?: string; 
    status: string; // complete / incomplete
    title: string;
    today: boolean;
  }

type TasksDto =  Task[];

export type {Task, TasksDto as TaskDto};