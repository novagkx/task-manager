import dayjs from "dayjs";
import { FilterTaskDto } from "../../shared/modal/EditTaskModal";
import { Task } from "../../models/tasks";

const taskMapper = (task: FilterTaskDto): Task => {
    return {
        id: task.id,
        title: task.title,
        description: task.description,
        priority: task.priority,
        deadline: task.deadline ? dayjs(task.deadline).toISOString() : undefined,
        status: task.status,
        today: task.today,
    };
};

export default taskMapper;