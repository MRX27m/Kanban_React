import "./styles/styles.css";
import { Workpres } from "./components/workpres/Workpres";
import { SelectWorkpres } from "./components/forms/SelectWorkpres";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SelectWorkpres id="2" name="с" />} />
        <Route path="/workpres/:id" element={<Workpres />} />
      </Routes>
    </BrowserRouter>
  );
}
