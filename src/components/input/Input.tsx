import React, { FC } from "react";

type CardInputProps = {
  value: string;
  setValue: (v: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder: string;
};

export const Input: FC<CardInputProps> = ({
  value,
  setValue,
  onKeyDown,
  placeholder,
}) => {
  return (
    <input
      className="input"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={onKeyDown}
    />
  );
};
