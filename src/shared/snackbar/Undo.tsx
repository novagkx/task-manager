import Button from "@mui/material/Button";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface SimpleSnackbarProps {
  isOpen: boolean;
  setIsNoticed: (value: boolean) => void;
  refetch: () => void;
}
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
    <>
      <Button color="secondary" size="small" onClick={handleClick}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => handleClose()}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <>
      {isOpen && (
        <Snackbar
          open={isOpen}
          autoHideDuration={5000}
          onClose={() => handleClose()}
          message="Task completed"
          action={action}
        />
      )}
    </>
  );
};

export default Undo;
