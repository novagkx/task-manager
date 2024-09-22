import {
  MenuItem,
  Select as MuiSelect,
  styled as styledMui,
  SxProps,
} from "@mui/material";

interface SelectPriorityProps {
  priority: string;
  setPriority: (priority: string) => void;
  sxProps?: SxProps;
}
const Select = styledMui(MuiSelect)(({ theme }) => ({
  ".MuiSelect-select": {
    color: theme.palette.common.black,
    background: theme.palette.purple,
    padding: 10,
  },
}));

const SelectPriority = ({
  priority,
  setPriority,
  sxProps,
}: SelectPriorityProps) => {
  return (
    <Select
    disableUnderline 
    variant="standard"
      sx={sxProps}
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
  );
};

export default SelectPriority;
