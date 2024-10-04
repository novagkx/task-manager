import {
  Box as MuiBox,
  Button,
  styled as styledMui,
  Typography as MuiTypography,
  Typography,
} from "@mui/material";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import theme from "../../styles/theme";
import useTasksStore from "../../store/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../../constants/tasks";
import { Task } from "../../models/tasks";

interface SimpleSnackbarProps {
  isOpen: boolean;
  setIsNoticed: (value: boolean) => void;
  refetch: () => void;
}

const HeaderTypography = styledMui(MuiTypography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  marginLeft: 16,
  marginTop: 8,
  fontSize: theme.typography.h6.fontSize,
  fontWeight: 700,
  marginBottom: 8,
}));

const NoticeBox = styledMui(MuiBox)(({ theme }) => ({
  borderRadius: "10px",
  display: "flex",
  justifyContent: "space-between",
  background: theme.palette.background.default,
}));

const CustomSnackbar = styledMui(Snackbar)(({ theme }) => ({
  "& .MuiPaper-root": {
    padding: 0,
    position: 'fixed',
    bottom: 30,
    left: 20
  },
  "& .MuiSnackbarContent-message": {
    border: '1px solid #FFFFFF',
    backgroundColor: theme.palette.background.default,
    padding: 5,
    width: "100%",
  },
}));

const Undo = ({ isOpen, setIsNoticed }: SimpleSnackbarProps) => {
  const deletedTask = useTasksStore((state) => state.deletedTask);
  const setDeletedTask = useTasksStore((state) => state.setDeletedTask);
  const queryClient = useQueryClient();
  const addTask = useMutation({
    mutationKey: ["tasks"],
    mutationFn: (task: Task) => {
      return axios.post(`${BASE_URL}/tasks`, task)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    }
  });

  const handleClick = () => {
    setIsNoticed(false);
    addTask.mutate(deletedTask as Task);
    setDeletedTask(null);
  };

  const handleClose = (reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsNoticed(false);
  };

  const action = (
    <NoticeBox sx={{ background: theme.palette.background.default }}>
      <HeaderTypography>Task completed</HeaderTypography>
      <Button
        sx={{ color: theme.palette.purple, textTransform: 'none', background: 'transparent'}}
        size="small"
        onClick={handleClick}
      >
        <Typography>Undo</Typography>
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => handleClose()}
      >
        <CloseIcon
          sx={{ color: theme.palette.secondary.main }}
          fontSize="small"
        />
      </IconButton>
    </NoticeBox>
  );

  return (
    <CustomSnackbar
      open={isOpen}
      autoHideDuration={5000}
      onClose={() => handleClose()}
      message={action}
    />
  );
};

export default Undo;
