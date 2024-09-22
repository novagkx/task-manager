 type Task = {
    id: number;
    priority?: string; // p1 - p4
    description?: string;
    deadline?: string; 
    status: string; // complete / incomplete
    taskName: string;
  }

type TaskDto = {
  inbox: Task[],
  today: Task[]
}
export type {Task, TaskDto};