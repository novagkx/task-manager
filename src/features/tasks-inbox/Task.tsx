import {
  alpha,
  Box,
  IconButton,
  Typography as MuiTypography,
  styled as styledMui,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Task as TaskType } from "../../models/tasks";
import useTasksStore from "../../store/store";
import theme from "../../styles/theme";

const CircleIcon = styledMui(IconButton)(({ theme }) => ({
  borderRadius: "50%",
  border: "2px solid #FFFFFF",
  backgroundColor: "transparent",
  width: 18,
  height: 18,
  " :hover": {
    backgroundColor: alpha(theme.palette.green!, 0.8),
  },
}));

const CustomEditIcon = styledMui(EditIcon)(({ theme }) => ({
  color: theme.palette.common.black,
}));

const TaskWrapper = styledMui(Box)(() => ({
  display: "flex",
  alignItems: "center",
  columnGap: 13,
  marginLeft: 40,
  marginRight: 24,
  border: "1px solid #FFFFFF",
  padding: 10,
  marginBottom: 15,
}));

const CustomIconButton = styledMui(IconButton)(({ theme }) => ({
  marginLeft: "auto",
  " :hover": {
    backgroundColor: alpha(theme.palette.purple!, 0.8),
  },
  padding: 10,
  borderRadius: 0,
  backgroundColor: theme.palette.purple,
}));
const Typography = styledMui(MuiTypography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: theme.typography.subtitle1.fontSize,
}));

interface TaskProps {
  taskData: TaskType;
  handleCompleteTask: (idCompletedTask: number) => void;
}
const Task = ({ taskData, handleCompleteTask }: TaskProps) => {
  const selectedPage = useTasksStore((state) => state.selectedPage);
  const setIsEditingTask = useTasksStore((state) => state.setIsEditingTask);
  const setIsOpen = useTasksStore((state) => state.setIsOpenModal);

  const openModal = () => {
    setIsOpen(true);
    setIsEditingTask(taskData);
  }
  return (
    <TaskWrapper>
      <CircleIcon onClick={() => handleCompleteTask(taskData.id)} />
      <Typography>{taskData.title}</Typography>
      <CustomIconButton
        onClick={openModal}
        sx={{
          " :hover":
            selectedPage === "today"
              ? {
                  backgroundColor: alpha(theme.palette.green!, 0.8),
                }
              : {},
          backgroundColor: selectedPage === "today" ? theme.palette.green : {},
        }}
      >
        <CustomEditIcon />
      </CustomIconButton>
    </TaskWrapper>
  );
};

export default Task;
