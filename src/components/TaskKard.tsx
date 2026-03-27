import React, { useState } from "react";

type TaskKardProps = {
  taskText: string;
};

export const TaskKard = ({ taskText }: TaskKardProps) => {
  return (
    <div className="task-card" contentEditable="true" draggable="true">
      {taskText}
    </div>
  );
};
