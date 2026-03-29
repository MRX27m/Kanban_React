import { FC } from "react";
import "./styles/buttonStyles.css";

type TaskKardProps = {
  onClick: () => void;
};

export const RightBtnKard: FC<TaskKardProps> = ({ onClick }) => {
  return (
    <button className="right-card-button" type="button" onClick={onClick}>
      ➡
    </button>
  );
};
