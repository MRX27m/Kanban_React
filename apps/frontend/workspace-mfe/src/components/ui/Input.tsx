import React, { FC } from "react";

type InputProps = {
  value: string;
  setValue: (v: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder: string;
};

export const Input: FC<InputProps> = ({
  value,
  setValue,
  onKeyDown,
  placeholder,
}) => (
  <input
    className="input"
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={(e) => setValue(e.target.value)}
    onKeyDown={onKeyDown}
  />
);
