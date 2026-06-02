import React, { FC, useState } from "react";
import { TaskCard } from "./TaskCard";
import { Input } from "./ui/Input";
import { Modal } from "./ui/Modal";
import { Button } from "./ui/Button";
import { ColumnType } from "../types/types";
import { LeftRightEnum } from "../enum/enums";
import { useColumnStore } from "../store/WorkspaceStore";
import { useShallow } from "zustand/react/shallow";

type ColumnProps = {
  column: ColumnType;
  colIndex: number;
  totalColumns: number;
};

export const Column: FC<ColumnProps> = ({ column, colIndex, totalColumns }) => {
  const { addTask, removeTask, editTask, moveTask, moveColumn, removeColumn } =
    useColumnStore(
      useShallow((s) => ({
        addTask: s.addTask,
        removeTask: s.removeTask,
        editTask: s.editTask,
        moveTask: s.moveTask,
        moveColumn: s.moveColumn,
        removeColumn: s.removeColumn,
      })),
    );

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
      />
      <Button
        children="X"
        className="rm-column-btn"
        onClick={() => removeColumn(column)}
      />
      <div className="tasks">
        {(column.tasks || []).map((task) => (
          <TaskCard
            key={task.id}
            taskText={task.text}
            onEdit={(newText) => editTask(colIndex, task.id, newText)}
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

export default Column;
