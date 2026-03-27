import React, { useState } from "react";
import AddButton from "./components/AddButton";
import { TaskKard } from "./components/TaskKard";
import "./styles/styles.css";
import Column from "./components/Column";

function App() {
  return (
    <div className="App">
      <h1 className="title">Kanban Board</h1>
      <div className="board">
        <Column data="1" column_name="Заплановано" />
        <Column data="2" column_name="В процесі" />
      </div>
    </div>
  );
}

export default App;
