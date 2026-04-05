import { create } from "zustand";
import { ColumnType } from "../types/TypesInWorkpres";
import { LeftRightEnum } from "../enum/enums";

type ColumnStore = {
  columns: ColumnType[];
  addColumn: (name: string) => void;
  removeColumn: (column: ColumnType) => void;
  moveColumn: (colIndex: number, dir: LeftRightEnum) => void;
  addTask: (colIndex: number, text: string) => void;
  removeTask: (colIndex: number, taskId: string) => void;
  editTask: (colIndex: number, taskId: string, newText: string) => void;
  moveTask: (taskId: string, colIndex: number, dir: LeftRightEnum) => void;
};

export const useColumnStore = create<ColumnStore>((set, get) => ({
  columns: [{ id: crypto.randomUUID(), name: "Зробити", tasks: [] }],

  addColumn: (name) => {
    if (!name.trim()) return;
    set((state) => ({
      columns: [
        ...state.columns,
        { id: crypto.randomUUID(), name: name.trim(), tasks: [] },
      ],
    }));
  },

  removeColumn: (column) => {
    set((state) => ({
      columns: state.columns.filter((col) => col.id !== column.id),
    }));
  },

  moveColumn: (colIndex, dir) => {
    const targetIndex =
      dir === LeftRightEnum.left ? colIndex - 1 : colIndex + 1;
    const { columns } = get();
    if (targetIndex < 0 || targetIndex >= columns.length) return;

    set((state) => {
      const newColumns = [...state.columns];
      [newColumns[colIndex], newColumns[targetIndex]] = [
        newColumns[targetIndex],
        newColumns[colIndex],
      ];
      return { columns: newColumns };
    });
  },

  addTask: (colIndex, text) => {
    if (!text.trim()) return;
    set((state) => ({
      columns: state.columns.map((col, i) =>
        i === colIndex
          ? { ...col, tasks: [...col.tasks, { id: crypto.randomUUID(), text }] }
          : col,
      ),
    }));
  },

  removeTask: (colIndex, taskId) => {
    set((state) => ({
      columns: state.columns.map((col, i) =>
        i === colIndex
          ? { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) }
          : col,
      ),
    }));
  },

  editTask: (colIndex, taskId, newText) => {
    set((state) => ({
      columns: state.columns.map((col, i) =>
        i === colIndex
          ? {
              ...col,
              tasks: col.tasks.map((t) =>
                t.id === taskId ? { ...t, text: newText } : t,
              ),
            }
          : col,
      ),
    }));
  },

  moveTask: (taskId, colIndex, dir) => {
    const targetIndex =
      dir === LeftRightEnum.left ? colIndex - 1 : colIndex + 1;
    const { columns } = get();
    if (targetIndex < 0 || targetIndex >= columns.length) return;

    const task = columns[colIndex].tasks.find((t) => t.id === taskId);
    if (!task) return;

    set((state) => ({
      columns: state.columns.map((col, i) => {
        if (i === colIndex)
          return { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) };
        if (i === targetIndex) return { ...col, tasks: [...col.tasks, task] };
        return col;
      }),
    }));
  },
}));
