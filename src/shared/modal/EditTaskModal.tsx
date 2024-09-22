import {
  Button as MuiButton,
  Dialog as MuiDialog,
  styled as styledMui,
  Box as MuiBox,
  Typography,
} from "@mui/material";
import { TextareaAutosize } from "@mui/base";
import useTasksStore from "../../store/store";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import SelectPriority from "../select/SelectPriority";
import { DateField } from "@mui/x-date-pickers";

const Dialog = styledMui(MuiDialog)(({ theme }) => ({
  ".MuiDialog-paper": {
    background: theme.palette.common.white,
  },
}));

const Button = styledMui(MuiButton)(() => ({}));
const BoxWrapper = styledMui(MuiBox)(() => ({
  display: "flex",
  padding: 20,
  columnGap: 40,
}));

const TextArea = styledMui(TextareaAutosize)(({ theme }) => ({
  "&:focus": {
    outline: `1px solid ${theme.palette.lightGrey}`,
    border: "none",
    boxShadow: "none",
  },
  resize: "none",
  borderRadius: "none",
}));

type FilterDto = {
  description: string;
  priority: string;
  deadline: Dayjs | null;
};


const EditTaskModal = () => {
  const isOpen = useTasksStore((state) => state.isModalOpen);
  const setIsOpen = useTasksStore((state) => state.setIsOpenModal);
  const isEditingTask = useTasksStore((state) => state.isEditingTask);
  const setIsEditingTask = useTasksStore((state) => state.setIsEditingTask);
  const [value, setValue] = useState<string>("");

  const [filterData, setFilterData] = useState<FilterDto>({
    description: "",
    priority: "",
    deadline: null,
  });

  useEffect(() => {
    if (isEditingTask) {
      setFilterData({
        description: isEditingTask.description || "",
        priority: isEditingTask.priority || "",
        deadline: isEditingTask.deadline ? dayjs(isEditingTask.deadline) : null,
      });
      setValue(isEditingTask.taskName || "");
    }
    // иначе значит менюшка Add task, нужно отправить POST на добавление, перед этим проверку на dayjsdeadline.isValid()?
  }, [isEditingTask]);

  const handleClose = () => {
    setIsOpen(false);
    setIsEditingTask(null);
    setValue("");
    setFilterData({
      description: "",
      priority: "",
      deadline: null,
    });
  };

  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <Typography variant="h3" sx={{ paddingLeft: 2, paddingTop: 2 }}>
        {isEditingTask ? "Edit task" : "Add task"}
      </Typography>
      <BoxWrapper>
        <MuiBox
          sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}
        >
          <TextArea
            sx={{ marginBottom: 2, padding: 1 }}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Task name"
            value={value}
          />
          <TextArea
            onChange={(e) =>
              setFilterData({ ...filterData, description: e.target.value })
            }
            placeholder="Description"
            value={filterData.description}
          />
        </MuiBox>
        <MuiBox sx={{ display: "flex", flexDirection: "column" }}>
          <MuiBox sx={{ marginBottom: 3, display: "flex", columnGap: 2 }}>
            <MuiBox>
              <Typography variant="h6">Priority</Typography>
              <SelectPriority
                sxProps={{ margin: 0 }}
                priority={filterData.priority}
                setPriority={(value) =>
                  setFilterData({ ...filterData, priority: value })
                }
              />
            </MuiBox>
            <MuiBox>
              <Typography variant="h6">Deadline (until)</Typography>
              <DateField
                sx={{
                  ".MuiInputBase-input": { "&:focus": { outline: "solid" } },
                  ".MuiInputBase-root": { paddingRight: 0 },
                }}
                value={filterData.deadline}
                onChange={(newValue) =>
                  setFilterData({ ...filterData, deadline: newValue })
                }
              />
            </MuiBox>
          </MuiBox>
          <MuiBox
            sx={{ display: "flex", justifyContent: "flex-end", columnGap: 2 }}
          >
            <Button onClick={() => {}}>Accept</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </MuiBox>
        </MuiBox>
      </BoxWrapper>
    </Dialog>
  );
};

export default EditTaskModal;
