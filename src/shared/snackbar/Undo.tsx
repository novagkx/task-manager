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

const Undo = ({ isOpen, setIsNoticed, refetch }: SimpleSnackbarProps) => {
  const handleClick = () => {
    console.log("Вернули задачу");
    setIsNoticed(false);
    refetch();
    // refetch запрос к серверу, чтоб получить заново все задачи -> по сути перезапрос для возврата данной задачи
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
