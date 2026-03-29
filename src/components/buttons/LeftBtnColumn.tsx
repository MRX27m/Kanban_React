import { FC } from "react";
import "./styles/buttonStyles.css";

type TaskKardProps = {
  onClick: () => void;
};

export const LeftBtnColumn: FC<TaskKardProps> = ({ onClick }) => {
  return (
    <button className="left-column-button" type="button" onClick={onClick}>
      ⬅
    </button>
  );
};
