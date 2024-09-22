import "../styles/App.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Router from "../harness/navigation/Router";

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router />
    </LocalizationProvider>
  );
};

export default App;
