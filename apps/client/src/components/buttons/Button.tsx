import { FC } from "react";
import "./styles/buttonStyles.css";

type ButtonProps = {
  onClick: () => void;
  children: string;
  className: string;
};

export const Button: FC<ButtonProps> = ({ onClick, children, className }) => {
  return (
    <button
      className={className}
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </button>
  );
};
