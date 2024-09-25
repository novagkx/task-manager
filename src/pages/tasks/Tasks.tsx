import { useState } from "react";
import Filters from "../../features/filters/Filters";
import TaskBox from "../../features/tasks-inbox/TaskBox";
import EditTaskModal from "../../shared/modal/EditTaskModal";
import useTasksStore from "../../store/store";
import Undo from "../../shared/snackbar/Undo";

const Tasks = () => {
  const [isNoticed, setIsNoticed] = useState(false);
  const tasks = useTasksStore((state) => state.tasks);
  const completeTask = useTasksStore((state) => state.setTasks);

  // HERE -> функция получения тасок с сервера, оттуда берём refetch и прокидываем на кнопку undo, чтобы вернуть новые таски
  const refetch = () => {};
  const handleCompleteTask = (idCompletedTask: number) => {
    setIsNoticed(true);
    const filteredTasks = tasks.filter((task) => task.id !== idCompletedTask);
    completeTask(filteredTasks);
  };

  return (
    <>
      <Filters />
      <TaskBox handleCompleteTask={handleCompleteTask} />
      <EditTaskModal />
      <Undo refetch={refetch} isOpen={isNoticed} setIsNoticed={setIsNoticed} />
    </>
  );
};

export default Tasks;
