import {
  ListItemButton as MuiListItemButton,
  AppBar as MuiAppBar,
  styled as styledMui,
  List as MuiList,
  Typography,
  Box,
  ListItem as MuiListItem,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import InboxIcon from "@mui/icons-material/Inbox";
import theme from "../../styles/theme";
import useTasksStore from "../../store/store";

const AppBar = styledMui(MuiAppBar)(({ theme }) => ({
  width: 300,
  backgroundColor: theme.palette.common.black,
  height: "100vh",
  left: 0,
}));

const ListItem = styledMui(MuiListItem)(() => ({
  padding: 0,
}));

const ListItemButton = styledMui(MuiListItemButton)(({ theme }) => ({
  color: theme.palette.common.white,
  columnGap: 10,
  width: "100%",
  justifyContent: "flex-start",
  borderRadius: 0,
  " :hover": {
    backgroundColor: theme.palette.lightGrey,
  },
}));

const List = styledMui(MuiList)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  " &.MuiList-root": {
    padding: 0,
  },
}));

const Logo = () => {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M56 0H8C3.6 0 0 3.6 0 8V18.288C0 18.288 10.2773 24.2613 10.928 24.6347C11.7547 25.1147 12.7787 25.1067 13.6053 24.6347C14.2987 24.2427 34.992 12.3467 35.3013 12.168C36.0453 11.7387 36.848 11.8827 37.296 12.1413C37.7333 12.4 38.912 13.0693 39.536 13.4213C40.1547 13.7787 40.1253 14.76 39.5707 15.08L13.672 29.9867C12.7493 30.52 11.832 30.5307 10.8773 29.992C9.27467 29.0853 2.66133 25.2347 0 23.6853V29.072L10.928 35.4187C11.7547 35.8987 12.7787 35.8907 13.6053 35.4187C14.2987 35.0267 34.992 23.128 35.3013 22.9493C36.0453 22.5227 36.848 22.6667 37.296 22.928C37.7333 23.184 38.912 23.8533 39.536 24.208C40.1547 24.5627 40.1253 25.5413 39.5707 25.8613C39.016 26.184 14.8027 40.1173 13.672 40.768C12.7493 41.3013 11.832 41.3147 10.8773 40.7733C9.27467 39.8693 2.66133 36.016 0 34.4693V39.856L10.928 46.2027C11.7547 46.6827 12.7787 46.6747 13.6053 46.2027C14.2987 45.8107 34.992 33.912 35.3013 33.7333C36.0453 33.3067 36.848 33.4507 37.296 33.7093C37.7333 33.968 38.912 34.6373 39.536 34.9893C40.1547 35.344 40.1253 36.328 39.5707 36.648L13.672 51.5547C12.7493 52.0853 11.832 52.0987 10.8773 51.5573C9.27467 50.6507 2.66133 46.8 0 45.2533V56C0 60.4 3.6 64 8 64H56C60.4 64 64 60.4 64 56V8C64 3.6 60.4 0 56 0Z"
        fill="#AE7AFF"
        stroke="black"
      />
    </svg>
  );
};

const HeaderInner = styledMui(Box)(() => ({
  display: "flex",
  alignItems: "center",
  columnGap: 14,
  marginBottom: 40,
}));

const HeaderWrapper = styledMui(Box)(() => ({
  paddingInline: 28,
  paddingTop: 30,
}));

const CountIcon = styledMui(Typography)(({ theme }) => ({
  width: 26,
  height: 18,
  fontSize: theme.typography.subtitle1.fontSize,
  marginLeft: "auto",
  color: theme.palette.common.black,
  textAlign: "center",
}));

const AppHeader = () => {
  const setSelectedPage = useTasksStore((state) => state.setSelectedPage);
  const selectedPage = useTasksStore((state) => state.selectedPage);
  const todayTasksCount = useTasksStore((state) => state.tasks.today).length;
  const inboxTasksCount = useTasksStore((state) => state.tasks.inbox).length;
  const setIsOpen = useTasksStore((state) => state.setIsOpenModal); 

  // useEffect(() => {
  //   // setTodayTasksCount(data.todayTasksCount)
  //   // setInboxTasksCount(data.inboxTasksCount)
  //   // получение данных от сервера
  // }, []);

  const handleToolClick = (tool: string) => {
    setSelectedPage(tool);
  };

  return (
    <AppBar>
      <HeaderWrapper>
        <HeaderInner>
          <Logo />
          <Typography color={theme.palette.common.white} variant="h1">
            @novagkx
          </Typography>
        </HeaderInner>

        <ListItemButton onClick={() => {setIsOpen(true)}}>
          <AddCircleOutlineIcon />
          <Typography variant="h6">Add task</Typography>
        </ListItemButton>

        <List>
          <ListItem>
            <ListItemButton
              sx={{
                backgroundColor:
                  selectedPage === "today"
                    ? theme.palette.background.default
                    : "transparent",
                color:
                  selectedPage === "today"
                    ? theme.palette.green
                    : theme.palette.common.white,
              }}
              onClick={() => handleToolClick("today")}
            >
              <CalendarTodayIcon />
              <Typography variant="h6">Today</Typography>
              <CountIcon sx={{ backgroundColor: theme.palette.green }}>
                {todayTasksCount}
              </CountIcon>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              sx={{
                backgroundColor:
                  selectedPage === "inbox"
                    ? theme.palette.background.default
                    : "transparent",
                color:
                  selectedPage === "inbox"
                    ? theme.palette.purple
                    : theme.palette.common.white,
              }}
              onClick={() => handleToolClick("inbox")}
            >
              <InboxIcon />
              <Typography variant="h6">Inbox</Typography>

              <CountIcon sx={{ backgroundColor: theme.palette.purple }}>
                {inboxTasksCount}
              </CountIcon>
            </ListItemButton>
          </ListItem>
        </List>
      </HeaderWrapper>
    </AppBar>
  );
};

export default AppHeader;
