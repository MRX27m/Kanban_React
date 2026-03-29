import { FC } from "react";
import "./styles/buttonStyles.css";

type ButtonProps = {
  onClick: () => void;
};

export const AddButton: FC<ButtonProps> = ({ onClick }) => {
  return (
    <button className="add-card" type="button" onClick={onClick}>
      Add card +
    </button>
  );
};
