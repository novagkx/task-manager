import theme from "../styles/theme";
import { CssBaseline, Box as MuiBox, styled as styledMui } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import AppHeader from "./portal/AppHeader";

const WorkSpace = styledMui(MuiBox)(() => ({
    marginLeft: 300,
    width: 'calc(100% - 300px)',
}));

const Harness = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <WorkSpace>
        <AppHeader />
        <Outlet />
      </WorkSpace>
    </ThemeProvider>
  );
};

export default Harness;
