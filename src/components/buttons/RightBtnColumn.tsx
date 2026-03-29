import { FC } from "react";
import "./styles/buttonStyles.css";

type TaskKardProps = {
  onClick: () => void;
};

export const RightBtnColumn: FC<TaskKardProps> = ({ onClick }) => {
  return (
    <button className="right-column-button" type="button" onClick={onClick}>
      ➡
    </button>
  );
};
