import { create } from "zustand";
import { useQuery } from "@tanstack/react-query";
import { ColumnType } from "../types/TypesInWorkpres";
import { LeftRightEnum } from "../enum/enums";
import { api } from "../api/api";

export const useColumnsQuery = (boardId: string) => {
  return useQuery({
    queryKey: ["columns", boardId],
    queryFn: async () => {
      const res = await api.get(`/boards/${boardId}/columns`);
      return res.data as ColumnType[];
    },
    enabled: !!boardId,
  });
};
type ColumnStore = {
  columns: ColumnType[];
  boardId: string | null;
  fetchColumns: (boardId: string) => Promise<void>;
  addColumn: (name: string) => Promise<void>;
  removeColumn: (column: ColumnType) => Promise<void>;
  moveColumn: (colIndex: number, dir: LeftRightEnum) => Promise<void>;
  addTask: (colIndex: number, text: string) => Promise<void>;
  removeTask: (colIndex: number, taskId: string) => Promise<void>;
  editTask: (
    colIndex: number,
    taskId: string,
    newText: string,
  ) => Promise<void>;
  moveTask: (
    taskId: string,
    colIndex: number,
    dir: LeftRightEnum,
  ) => Promise<void>;
};

export const useColumnStore = create<ColumnStore>((set, get) => ({
  columns: [],
  boardId: null,

  fetchColumns: async (boardId: string) => {
    const response = await api.get(`/boards/${boardId}/columns`);
    set({ columns: response.data, boardId });
  },

  addColumn: async (name: string) => {
    if (!name.trim()) return;
    const { boardId } = get();
    const response = await api.post(`/boards/${boardId}/columns`, { name });
    set((state) => ({
      columns: [...state.columns, response.data],
    }));
  },

  removeColumn: async (column: ColumnType) => {
    const { boardId } = get();
    await api.delete(`/boards/${boardId}/columns/${column.id}`);
    set((state) => ({
      columns: state.columns.filter((col) => col.id !== column.id),
    }));
  },

  moveColumn: async (colIndex: number, dir: LeftRightEnum) => {
    const { boardId, columns } = get();
    const column = columns[colIndex];
    const response = await api.patch(
      `/boards/${boardId}/columns/${column.id}/move`,
      { direction: dir },
    );
    set({ columns: response.data });
  },

  addTask: async (colIndex: number, text: string) => {
    if (!text.trim()) return;
    const { boardId, columns } = get();
    const column = columns[colIndex];
    const response = await api.post(
      `/boards/${boardId}/columns/${column.id}/tasks`,
      { text },
    );
    set((state) => ({
      columns: state.columns.map((col, i) =>
        i === colIndex ? { ...col, tasks: [...col.tasks, response.data] } : col,
      ),
    }));
  },

  removeTask: async (colIndex: number, taskId: string) => {
    const { boardId, columns } = get();
    const column = columns[colIndex];
    await api.delete(`/boards/${boardId}/columns/${column.id}/tasks/${taskId}`);
    set((state) => ({
      columns: state.columns.map((col, i) =>
        i === colIndex
          ? { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) }
          : col,
      ),
    }));
  },

  editTask: async (colIndex: number, taskId: string, newText: string) => {
    const { boardId, columns } = get();
    const column = columns[colIndex];
    await api.patch(`/boards/${boardId}/columns/${column.id}/tasks/${taskId}`, {
      text: newText,
    });
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

  moveTask: async (taskId: string, colIndex: number, dir: LeftRightEnum) => {
    const { boardId, columns } = get();
    const column = columns[colIndex];
    const targetIndex =
      dir === LeftRightEnum.left ? colIndex - 1 : colIndex + 1;
    if (targetIndex < 0 || targetIndex >= columns.length) return;
    const targetColumn = columns[targetIndex];

    await api.patch(
      `/boards/${boardId}/columns/${column.id}/tasks/${taskId}/move`,
      { direction: dir, targetColumnId: targetColumn.id },
    );

    const task = columns[colIndex].tasks.find((t) => t.id === taskId);
    if (!task) return;

    set((state) => ({
      columns: state.columns.map((col, i) => {
        if (i === colIndex)
          return { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) };
        if (i === targetIndex)
          return {
            ...col,
            tasks: [...col.tasks, { ...task, columnId: targetColumn.id }],
          };
        return col;
      }),
    }));
  },
}));
