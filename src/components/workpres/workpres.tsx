import React, { FC, useState } from "react";
import { Column } from "../Column";
import { AddColumn } from "../buttons/AddColumn";
import { ColumnInput } from "../input/ColumnInput";
import { useLocation, useParams } from "react-router-dom";
import { ColumnType, Task } from "../exportedTypes/TypesInWorkpres";

export const Workpres: FC = () => {
  const { id } = useParams();
  const location = useLocation();

  const boardName = location.state?.name || "Моя дошка";

  const [columns, setColumns] = useState<ColumnType[]>([
    { id: crypto.randomUUID(), name: "Зробити", tasks: [] },
  ]);
  const [value, setValue] = useState("");

  const addColumn = () => {
    if (!value.trim()) return;
    setColumns((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: value.trim(), tasks: [] },
    ]);
    setValue("");
  };

  const moveColumn = (colIndex: number, dir: "left" | "right") => {
    const targetIndex = dir === "left" ? colIndex - 1 : colIndex + 1;
    if (targetIndex < 0 || targetIndex >= columns.length) return;

    setColumns((prev) => {
      const newColumns = [...prev];
      [newColumns[colIndex], newColumns[targetIndex]] = [
        newColumns[targetIndex],
        newColumns[colIndex],
      ];
      return newColumns;
    });
  };

  const addTask = (colIndex: number, text: string) => {
    if (!text.trim()) return;
    setColumns((prev) =>
      prev.map((col, i) =>
        i === colIndex
          ? {
              ...col,
              tasks: [...col.tasks, { id: crypto.randomUUID(), text }],
            }
          : col,
      ),
    );
  };

  const removeTask = (colIndex: number, taskId: string) => {
    setColumns((prev) =>
      prev.map((col, i) =>
        i === colIndex
          ? { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) }
          : col,
      ),
    );
  };

  const moveTask = (
    taskId: string,
    colIndex: number,
    dir: "left" | "right",
  ) => {
    const targetIndex = dir === "left" ? colIndex - 1 : colIndex + 1;
    if (targetIndex < 0 || targetIndex >= columns.length) return;

    const task = columns[colIndex].tasks.find((t) => t.id === taskId);
    if (!task) return;

    setColumns((prev) =>
      prev.map((col, i) => {
        if (i === colIndex) {
          return { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) };
        }
        if (i === targetIndex) {
          return { ...col, tasks: [...col.tasks, task] };
        }
        return col;
      }),
    );
  };

  const removeColumn = (column: ColumnType) => {
    setColumns((prev) => prev.filter((col) => col.id !== column.id));
  };

  return (
    <div>
      <h1 className="title">{boardName}</h1>

      <ColumnInput
        value={value}
        setValue={setValue}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") addColumn();
        }}
      />
      <AddColumn onClick={addColumn} />

      <div className="board">
        {columns.map((col, index) => (
          <Column
            key={col.id}
            column={col}
            colIndex={index}
            totalColumns={columns.length}
            addTask={addTask}
            removeTask={removeTask}
            moveTask={moveTask}
            moveColumn={moveColumn}
            removeColumn={removeColumn}
          />
        ))}
      </div>
    </div>
  );
};
