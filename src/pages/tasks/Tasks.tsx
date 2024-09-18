import { useState } from "react";
import Filters from "../../features/filters/Filters";
import TaskBox from "../../features/tasks-inbox/TaskBox";
import AddTaskModal from "../../shared/modal/AddTaskModal";
import useTasksStore from "../../store/store";
import Undo from "../../shared/snackbar/Undo";


const Tasks = () => {
  const [isNoticed, setIsNoticed] = useState(false);
  const selectedPage = useTasksStore((state) => state.selectedPage);
  const tasks = useTasksStore((state) => state.tasks);
  const completeTask = useTasksStore((state) => state.setTasks);
  
  // HERE -> функция получения тасок с сервера, оттуда берём refetch и прокидываем на кнопку undo, чтобы вернуть новые таски
  const refetch = () => {
    
  }
  const handleCompleteTask = (idCompletedTask: number) => {
    setIsNoticed(true);
      if (selectedPage === 'today') {
        const filteredTasks = tasks.today.filter((task) => task.id !== idCompletedTask);
        completeTask({ ...tasks, today: filteredTasks });
        //тут POST на удаление из списка
      }
      else {
        const filteredTasks = tasks.inbox.filter((task) => task.id !== idCompletedTask);
        completeTask({ ...tasks, inbox: filteredTasks });
         //тут POST на удаление из списка
      }
  };
  
  return (
    <>
      <Filters />
      <TaskBox handleCompleteTask={handleCompleteTask}/>
      <AddTaskModal />
      <Undo refetch={refetch} isOpen={isNoticed} setIsNoticed={setIsNoticed}/>
    </>
  );
};

export default Tasks;
