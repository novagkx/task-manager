import { useEffect, useState } from "react";
import Filters from "../../features/filters/Filters";
import TaskBox from "../../features/tasks-inbox/TaskBox";
import EditTaskModal from "../../shared/modal/EditTaskModal";
import useTasksStore from "../../store/store";
import Undo from "../../shared/snackbar/Undo";
import { BASE_URL } from "../../constants/tasks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Task, TaskDto } from "../../models/tasks";

const Tasks = () => {
  const queryClient = useQueryClient();
  const {
    isPending,
    error,
    data: taskData,
    refetch,
  } = useQuery<TaskDto>({
    queryKey: ["tasks"],
    queryFn: () => fetch(`${BASE_URL}/tasks`).then((res) => res.json()),
    refetchOnWindowFocus: false,
  });

  const setTasksData = useTasksStore((state) => state.setTasks);
  const [isNoticed, setIsNoticed] = useState(false);
  const setDeletedTask = useTasksStore((state) => state.setDeletedTask);
  useEffect(() => {
    if (!error && !isPending && taskData) {
      setTasksData(taskData);
    }
  }, [error, setTasksData, isPending, taskData]);

  const deleteTask = useMutation({
    mutationKey: ["tasks"],
    mutationFn: (id: number) => {
      return axios.delete(`${BASE_URL}/tasks/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const handleCompleteTask = (taskData: Task) => {
    setDeletedTask(taskData);
    deleteTask.mutate(taskData.id);
    setIsNoticed(true);
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
