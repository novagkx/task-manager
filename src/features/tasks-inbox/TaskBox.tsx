import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  Box,
  Button as MuiButton,
  styled as styledMui,
  Typography as MuiTypography,
} from "@mui/material";
import { useState } from "react";
import Task from "./Task";
import useTasksStore from "../../store/store";
import theme from "../../styles/theme";

const CustomArrowDown = styledMui(KeyboardArrowDownIcon)(({ theme }) => ({
  color: theme.palette.purple,
}));

const CustomArrowRight = styledMui(KeyboardArrowRightIcon)(({ theme }) => ({
  color: theme.palette.purple,
}));

const Typography = styledMui(MuiTypography)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 400,
  fontSize: theme.typography.h6.fontSize,
  color: theme.palette.secondary.main,
}));

const Button = styledMui(MuiButton)(() => ({
  padding: 0,
}));

const InboxWrapper = styledMui(Box)(() => ({
  marginLeft: 16,
  marginTop: 28,
  marginBottom: 16,
}));

interface TaskBoxProps {
  handleCompleteTask: (idCompletedTask: number) => void
}
const TaskBox = ({handleCompleteTask}: TaskBoxProps) => {
  const [isOpenBox, setIsOpenBox] = useState(true);
  const selectedPage = useTasksStore((state) => state.selectedPage);
  const inboxTasks = useTasksStore((state) => state.tasks.inbox);
  const todayTasks = useTasksStore((state) => state.tasks.today);

  return (
    <>
      { selectedPage === 'inbox' && (
        <>
          <InboxWrapper>
            <Button sx={{background: 'transparent'}} onClick={() => setIsOpenBox((prev) => !prev)}>
              {isOpenBox ? <CustomArrowDown /> : <CustomArrowRight />}
              <Typography>Inbox</Typography>
            </Button>
          </InboxWrapper>
          {isOpenBox && inboxTasks.map((task) =><Task handleCompleteTask={handleCompleteTask} key={task.id} taskData={task}/> )}
        </>
      )}

      { selectedPage === 'today' && (
        <>
          <InboxWrapper>
            <Button sx={{background: 'transparent'}} onClick={() => setIsOpenBox((prev) => !prev)}>
              {isOpenBox ? <CustomArrowDown sx={{color: theme.palette.green }}/> : <CustomArrowRight sx={{color: theme.palette.green }}/>}
              <Typography>Today</Typography>
            </Button>
          </InboxWrapper>
          {isOpenBox && todayTasks.map((task) =><Task handleCompleteTask={handleCompleteTask} key={task.id} taskData={task}/> )}
        </>
      )}
    </>
  );
};

export default TaskBox;
