import { FC } from "react";
import "./styles/buttonStyles.css";

type ButtonProps = {
  onClick: () => void;
};

export const RmColumnButton: FC<ButtonProps> = ({ onClick }) => {
  return (
    <button className="rm-column-btn" type="button" onClick={onClick}>
      X
    </button>
  );
};
