import React, { FC, useState } from "react";
import { TaskCard } from "./TaskCard";
import { Input } from "./input/Input";
import { ColumnType } from "../types/TypesInWorkpres";
import { Modal } from "./modal/Modal";
import { LeftRightEnum } from "../enum/enums";
import { Button } from "./buttons/Button";
import { useColumnStore } from "../store/WorkspaceStore";

type ColumnProps = {
  column: ColumnType;
  colIndex: number;
  totalColumns: number;
};

export const Column: FC<ColumnProps> = ({ column, colIndex, totalColumns }) => {
  const { addTask, removeTask, editTask, moveTask, moveColumn, removeColumn } =
    useColumnStore();

  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const isFirst = colIndex === 0;
  const isLast = colIndex === totalColumns - 1;

  const handleAddTask = () => {
    addTask(colIndex, value);
    setValue("");
    setIsOpen(false);
  };

  return (
    <div className="column">
      <div className="column-header">
        {column.name}
        <div className="column-buttons">
          {!isFirst && (
            <Button
              className="left-column-button"
              children="⬅"
              onClick={() => moveColumn(colIndex, LeftRightEnum.left)}
            />
          )}
          {!isLast && (
            <Button
              children="➡"
              className="right-column-button"
              onClick={() => moveColumn(colIndex, LeftRightEnum.right)}
            />
          )}
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Input
          placeholder="Введіть нову задачу"
          value={value}
          setValue={setValue}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") handleAddTask();
          }}
        />
      </Modal>
      <Button
        children="Add card +"
        className="add-card"
        onClick={() => setIsOpen(true)}
      ></Button>

      <Button
        children="X"
        className="rm-column-btn"
        onClick={() => removeColumn(column)}
      />

      <div className="tasks">
        {column.tasks.map((task) => (
          <TaskCard
            key={task.id}
            onEdit={(newText) => editTask(colIndex, task.id, newText)}
            taskText={task.text}
            onRemove={() => removeTask(colIndex, task.id)}
            moveLeft={
              !isFirst
                ? () => moveTask(task.id, colIndex, LeftRightEnum.left)
                : undefined
            }
            moveRight={
              !isLast
                ? () => moveTask(task.id, colIndex, LeftRightEnum.right)
                : undefined
            }
          />
        ))}
      </div>
    </div>
  );
};
