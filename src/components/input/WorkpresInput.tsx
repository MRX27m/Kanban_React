import React, { FC } from "react";

type WorkpresInputProps = {
  value: string;
  setValue: (v: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export const WorkpresInput: FC<WorkpresInputProps> = ({
  value,
  setValue,
  onKeyDown,
}) => {
  return (
    <input
      className="input-workpres"
      type="text"
      placeholder="Введіть назву дошки"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={onKeyDown}
    />
  );
};
