import { FC } from "react";
import "./styles/buttonStyles.css";

type ButtonProps = {
  onClick: () => void;
};

export const RmTaskButton: FC<ButtonProps> = ({ onClick }) => {
  return (
    <button className="rm-btn" type="button" onClick={onClick}>
      X
    </button>
  );
};
