import { FC } from "react";
import { TaskKard } from "./TaskKard";

type ButtonProps = {
  onClick: () => void;
};

const AddButton: FC<ButtonProps> = ({ onClick }) => {
  return (
    <button className="add-card" type="button" onClick={onClick}>
      Add card +
    </button>
  );
};

export default AddButton;
