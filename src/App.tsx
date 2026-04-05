import "./styles/styles.css";
import { SelectWorkSpace } from "./components/forms/SelectWorkSpace";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { WorkSpace } from "./components/workspace/WorkSpace";
import { NavigationEnum } from "./enum/enums";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/SelectWorkpres" replace />} />
        <Route
          path={NavigationEnum.selectWorkSpace}
          element={<SelectWorkSpace />}
        />
        <Route path="/workpres/:id" element={<WorkSpace />} />
      </Routes>
    </BrowserRouter>
  );
}
