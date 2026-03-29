import { FC } from "react";
import { RmTaskButton } from "./buttons/RmTaskButton";
import { LeftBtnKard } from "./buttons/LeftBtnKard";
import { RightBtnKard } from "./buttons/RightBtnKard";

type TaskCardProps = {
  taskText: string;
  onRemove: () => void;
  moveLeft?: () => void;
  moveRight?: () => void;
};

export const TaskKard: FC<TaskCardProps> = ({
  taskText,
  onRemove,
  moveLeft,
  moveRight,
}) => {
  return (
    <div className="task-card">
      {taskText}
      {moveLeft && <LeftBtnKard onClick={moveLeft} />}
      {moveRight && <RightBtnKard onClick={moveRight} />}
      <RmTaskButton onClick={onRemove} />
    </div>
  );
};
