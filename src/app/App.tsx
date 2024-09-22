import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Tasks from "../pages/tasks/Tasks";
import "../styles/App.css";
import Harness from "../harness/Harness";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Harness />}>
            <Route path="tasks" element={<Tasks />} />
            <Route path="*" element={<Navigate to={"/tasks"} key="*" />} />
            <Route path="/" element={<Navigate to={"/tasks"} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
};

export default App;
