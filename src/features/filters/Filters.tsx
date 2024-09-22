import {
  List,
  styled as styledMui,
  TextField,
  Typography as MuiTypography,
  ListItem as MuiListItem,
  ListItemButton,
} from "@mui/material";
import { DateField as MuiDateField } from "@mui/x-date-pickers/DateField";
import SearchIcon from "@mui/icons-material/Search";
import { Dayjs } from "dayjs";
import { useState } from "react";
import theme from "../../styles/theme";
import SelectPriority from "../../shared/select/SelectPriority";

const FilterList = styledMui(List)(() => ({
  display: "flex",
  border: "1px solid #FFFFFF",
  paddingInline: 20,
  paddingBlock: 16,
  marginTop: 24,
  marginInline: 24,
  columnGap: 40,
}));

const DateField = styledMui(MuiDateField)(({ theme }) => ({
  ".MuiInputBase-input": {
    color: theme.palette.secondary.main,
  },
  "&:hover": {
    backgroundColor: "transparent",
    borderBottom: `1px solid #fff`,
  },
  ".MuiOutlinedInput-notchedOutline": {
    border: "none",
    borderBottom: `2px solid ${theme.palette.secondary.main}`, // Изменение цвета рамки
    borderRadius: 0,
  },
  "& input::placeholder": {
    opacity: 1,
    fontSize: theme.typography.h6.fontSize,
  },
}));

const CustomSearchIcon = styledMui(SearchIcon)(() => ({
  position: "absolute",
  right: 0,
}));

const Typography = styledMui(MuiTypography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: theme.typography.subtitle1.fontSize,
}));

const CustomTextField = styledMui(TextField)(({ theme }) => ({
  position: "relative",
  ".MuiInputBase-input": {
    color: theme.palette.secondary.main,
  },
  ".MuiOutlinedInput-notchedOutline": {
    border: "none",
    borderBottom: `2px solid ${theme.palette.secondary.main}`, // Изменение цвета рамки
    borderRadius: 0,
  },
  "& input::placeholder": {
    opacity: 1,
    fontSize: theme.typography.h6.fontSize,
  },
  "&:hover": {
    borderBottom: `1px solid #fff`,
  },
}));

const ListItem = styledMui(MuiListItem)(() => ({
  padding: 0,
  display: "block",
}));

const Filters = () => {
  const [deadline, setDeadline] = useState<Dayjs>();
  const [priority, setPriority] = useState<string>("");

  return (
    <FilterList>
      <ListItem>
        <Typography>Task name</Typography>
        <CustomTextField type="search" placeholder="Choose">
          <CustomSearchIcon />
        </CustomTextField>
      </ListItem>
      <ListItem>
        <Typography>Deadline (until)</Typography>
        <DateField
          value={deadline}
          onChange={(newValue) => setDeadline(newValue || undefined)}
        />
      </ListItem>
      <ListItem>
        <Typography>Priority</Typography>
        <SelectPriority
          sxProps={{ marginLeft: 2, marginTop: 2 }}
          priority={priority}
          setPriority={setPriority}
        />
      </ListItem>
      <ListItem sx={{ marginBlock: "auto" }}>
        <ListItemButton
          sx={{
            justifyContent: "center",
            background: theme.palette.purple,
            "&:hover": {
              background: theme.palette.purple,
              border: `1px solid ${theme.palette.purple}`,
            },
          }}
        >
          Accept
        </ListItemButton>
      </ListItem>
    </FilterList>
  );
};

export default Filters;
