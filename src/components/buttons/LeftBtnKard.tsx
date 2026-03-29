import { FC } from "react";
import "./styles/buttonStyles.css";

type TaskKardProps = {
  onClick: () => void;
};

export const LeftBtnKard: FC<TaskKardProps> = ({ onClick }) => {
  return (
    <button className="left-card-button" type="button" onClick={onClick}>
      ⬅
    </button>
  );
};
