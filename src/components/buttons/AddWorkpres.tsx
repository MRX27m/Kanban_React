import { FC } from "react";
import "./styles/buttonStyles.css";

type ButtonProps = {
  onClick: () => void;
};

export const AddWorkpres: FC<ButtonProps> = ({ onClick }) => {
  return (
    <button className="add-workpres-button" type="button" onClick={onClick}>
      Add Workpres +
    </button>
  );
};
