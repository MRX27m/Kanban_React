import React, { FC } from "react";

type ColumnInputProps = {
  value: string;
  setValue: (v: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export const ColumnInput: FC<ColumnInputProps> = ({
  value,
  setValue,
  onKeyDown,
}) => {
  return (
    <input
      className="input-column"
      type="text"
      placeholder="Введіть назву колонки"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={onKeyDown}
    />
  );
};
