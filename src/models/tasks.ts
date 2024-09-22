 type Task = {
    id: number;
    text: string;
    priority?: string; // p1 - p4
    description?: string;
    deadline?: string; 
    status: string; // complete / incomplete
  }

type TaskDto = {
  inbox: Task[],
  today: Task[]
}
export type {Task, TaskDto};