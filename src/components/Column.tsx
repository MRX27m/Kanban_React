import React, { FC, useState } from "react";
import { TaskKard } from "./TaskKard";
import { AddButton } from "./buttons/AddButton";
import { CardInput } from "./input/CardInput";
import { LeftBtnColumn } from "./buttons/LeftBtnColumn";
import { RightBtnColumn } from "./buttons/RightBtnColumn";
import { RmColumnButton } from "./buttons/RmColumnButton";
import { ColumnType } from "./exportedTypes/TypesInWorkpres";

type ColumnProps = {
  column: ColumnType;
  colIndex: number;
  totalColumns: number;
  addTask: (colIndex: number, text: string) => void;
  removeTask: (colIndex: number, taskId: string) => void;
  moveTask: (taskId: string, colIndex: number, dir: "left" | "right") => void;
  moveColumn: (colIndex: number, dir: "left" | "right") => void;
  removeColumn: (column: ColumnType) => void;
};

export const Column: FC<ColumnProps> = ({
  column,
  colIndex,
  totalColumns,
  addTask,
  removeTask,
  moveTask,
  moveColumn,
  removeColumn,
}) => {
  const [value, setValue] = useState("");

  const isFirst = colIndex === 0;
  const isLast = colIndex === totalColumns - 1;

  const handleAddTask = () => {
    addTask(colIndex, value);
    setValue("");
  };

  return (
    <div className="column">
      <div className="column-header">
        {column.name}
        <div className="column-buttons">
          {!isFirst && (
            <LeftBtnColumn onClick={() => moveColumn(colIndex, "left")} />
          )}
          {!isLast && (
            <RightBtnColumn onClick={() => moveColumn(colIndex, "right")} />
          )}
        </div>
      </div>

      <CardInput
        value={value}
        setValue={setValue}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") handleAddTask();
        }}
      />

      <AddButton onClick={handleAddTask} />
      <RmColumnButton onClick={() => removeColumn(column)} />

      <div className="tasks">
        {column.tasks.map((task) => (
          <TaskKard
            key={task.id}
            taskText={task.text}
            onRemove={() => removeTask(colIndex, task.id)}
            moveLeft={
              !isFirst ? () => moveTask(task.id, colIndex, "left") : undefined
            }
            moveRight={
              !isLast ? () => moveTask(task.id, colIndex, "right") : undefined
            }
          />
        ))}
      </div>
    </div>
  );
};
