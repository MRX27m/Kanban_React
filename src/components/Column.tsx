import React, { FC, useState } from "react";
import AddButton from "./AddButton";
import { TaskKard } from "./TaskKard";

export type ColumnProps = {
  data: string;
  column_name: string;
};

export type StoreColumn = {
  name: string;
};

const Column: FC<ColumnProps> = ({ data, column_name }) => {
  const [columns, setColumns] = useState<StoreColumn[]>([{ name: "1" }]);

  const addToColumn = () => {
    setColumns((prev) => [...prev, { name: "default name" }]);
  };

  return (
    <div className="column" data-column={data}>
      <div className="column-header">{column_name}</div>

      <AddButton onClick={addToColumn} />

      {columns.map(({ name }, index) => (
        <TaskKard taskText={name} key={index} />
      ))}
    </div>
  );
};

export default Column;
