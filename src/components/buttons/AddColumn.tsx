import { FC } from "react";
import "./styles/buttonStyles.css";

type ButtonProps = {
  onClick: () => void;
};

export const AddColumn: FC<ButtonProps> = ({ onClick }) => {
  return (
    <div>
      <button className="add-column" type="button" onClick={onClick}>
        Add column +
      </button>
    </div>
  );
};
