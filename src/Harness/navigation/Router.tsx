import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Harness from "../Harness";
import Tasks from "../../pages/tasks/Tasks";

const Router = () => {
    return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Harness />}>
            <Route path="tasks" element={<Tasks />} />
            <Route path="*" element={<Navigate to={"/tasks"} key="*" />} />
            <Route path="/" element={<Navigate to={"/tasks"} />} />
          </Route>
        </Routes>
        </BrowserRouter>
    )
}
export default Router;