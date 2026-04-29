export type Task = {
  id: string;
  text: string;
};

export type ColumnType = {
  id: string;
  name: string;
  tasks: Task[];
};
