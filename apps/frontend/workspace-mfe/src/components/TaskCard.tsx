import { FC, useState } from "react";
import { Button } from "./ui/Button";

type TaskCardProps = {
  taskText: string;
  onRemove: () => void;
  onEdit: (newText: string) => void;
  moveLeft?: () => void;
  moveRight?: () => void;
};

export const TaskCard: FC<TaskCardProps> = ({
  taskText,
  onRemove,
  onEdit,
  moveLeft,
  moveRight,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(taskText);

  const handleSave = () => {
    if (editValue.trim()) onEdit(editValue.trim());
    setIsEditing(false);
  };

  return (
    <div className="task-card">
      {isEditing ? (
        <input
          className="input"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
            if (e.key === "Escape") setIsEditing(false);
          }}
          autoFocus
        />
      ) : (
        taskText
      )}
      {!isEditing && (
        <Button
          className="edit-btn"
          onClick={() => {
            setEditValue(taskText);
            setIsEditing(true);
          }}
        >
          edit
        </Button>
      )}
      {moveLeft && (
        <Button children="⬅" className="left-card-button" onClick={moveLeft} />
      )}
      {moveRight && (
        <Button
          children="➡"
          className="right-card-button"
          onClick={moveRight}
        />
      )}
      <Button children="X" className="rm-btn" onClick={onRemove} />
    </div>
  );
};

export default TaskCard;
