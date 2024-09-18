import {
  MenuItem,
  Button as MuiButton,
  Dialog as MuiDialog,
  List as MuiList,
  ListItem as MuiListItem,
  TextField as MuiTextField,
  styled as styledMui,
  Select as MuiSelect
} from "@mui/material";
import useTasksStore from "../../store/store";
import { useState } from "react";

const Dialog = styledMui(MuiDialog)(({ theme }) => ({}));
const TextField = styledMui(MuiTextField)(({ theme }) => ({}));
const List = styledMui(MuiList)(({ theme }) => ({}));
const ListItem = styledMui(MuiListItem)(({ theme }) => ({}));
const Button = styledMui(MuiButton)(({ theme }) => ({}));

const Select = styledMui(MuiSelect)(({ theme }) => ({
  padding: 0,
  marginLeft: 14,
  marginTop: 10,
  ".MuiSelect-select": {
    color: theme.palette.common.black,
    background: theme.palette.purple,
  },
  ".MuiSelect-outlined": {
    border: "none",
  },
}));

const AddTaskModal = () => {
  const isOpen = useTasksStore((state) => state.isEditModalOpen);
  const setIsOpen = useTasksStore((state) => state.setIsOpenEditModal);
  const isEditingTask = useTasksStore((state) => state.isEditingTask);
  const [priority, setPriority] = useState<string>("");
  // const [deadline, setDeadline] = useState<Dayjs>();
  
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <TextField
        label="Название задачи"
        value={isEditingTask?.text || ""}
        variant="standard"
      />
      <Select
        value={priority}
        label="priority"
        onChange={(event) => setPriority(String(event.target.value))}
      >
        <MenuItem value={""}>Clear</MenuItem>
        <MenuItem value={"P1"}>P1</MenuItem>
        <MenuItem value={"P2"}>P2</MenuItem>
        <MenuItem value={"P3"}>P3</MenuItem>
        <MenuItem value={"P4"}>P4</MenuItem>
      </Select>
      <List>
        <ListItem>Deadline {isEditingTask?.deadline || ""}</ListItem>
        <ListItem>Priority {isEditingTask?.priority || ""}</ListItem>
      </List>
      <Button>Добавить</Button>
      <Button onClick={handleClose}>Отмена</Button>
    </Dialog>
  );
};

export default AddTaskModal;
