import { create } from "zustand";
import { ColumnType } from "../types/types";
import { LeftRightEnum } from "../enum/enums";
import { api } from "../api/api";

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

const fetchTasksForColumns = async (boardId: string, columns: any[]) => {
  return Promise.all(
    columns.map(async (col) => {
      try {
        const res = await api.get(`/boards/${boardId}/columns/${col.id}/tasks`);
        return { ...col, tasks: res.data || [] };
      } catch {
        return { ...col, tasks: [] };
      }
    }),
  );
};

export const useColumnStore = create<ColumnStore>((set, get) => ({
  columns: [],
  boardId: null,

  fetchColumns: async (boardId) => {
    const res = await api.get(`/boards/${boardId}/columns`);
    const columns = await fetchTasksForColumns(boardId, res.data || []);
    set({ columns, boardId });
  },

  addColumn: async (name) => {
    if (!name.trim()) return;
    const { boardId } = get();
    const res = await api.post(`/boards/${boardId}/columns`, { name });
    set((s) => ({ columns: [...s.columns, { ...res.data, tasks: [] }] }));
  },

  removeColumn: async (column) => {
    const { boardId } = get();
    await api.delete(`/boards/${boardId}/columns/${column.id}`);
    set((s) => ({ columns: s.columns.filter((c) => c.id !== column.id) }));
  },

  moveColumn: async (colIndex, dir) => {
    const { boardId, columns } = get();
    const res = await api.patch(
      `/boards/${boardId}/columns/${columns[colIndex].id}/move`,
      { direction: dir },
    );
    const newColumns = await fetchTasksForColumns(boardId!, res.data || []);
    set({ columns: newColumns });
  },

  addTask: async (colIndex, text) => {
    if (!text.trim()) return;
    const { boardId, columns } = get();
    const res = await api.post(
      `/boards/${boardId}/columns/${columns[colIndex].id}/tasks`,
      { text },
    );
    set((s) => ({
      columns: s.columns.map((col, i) =>
        i === colIndex
          ? { ...col, tasks: [...(col.tasks || []), res.data] }
          : col,
      ),
    }));
  },

  removeTask: async (colIndex, taskId) => {
    const { boardId, columns } = get();
    await api.delete(
      `/boards/${boardId}/columns/${columns[colIndex].id}/tasks/${taskId}`,
    );
    set((s) => ({
      columns: s.columns.map((col, i) =>
        i === colIndex
          ? { ...col, tasks: (col.tasks || []).filter((t) => t.id !== taskId) }
          : col,
      ),
    }));
  },

  editTask: async (colIndex, taskId, newText) => {
    const { boardId, columns } = get();
    await api.patch(
      `/boards/${boardId}/columns/${columns[colIndex].id}/tasks/${taskId}`,
      { text: newText },
    );
    set((s) => ({
      columns: s.columns.map((col, i) =>
        i === colIndex
          ? {
              ...col,
              tasks: (col.tasks || []).map((t) =>
                t.id === taskId ? { ...t, text: newText } : t,
              ),
            }
          : col,
      ),
    }));
  },

  moveTask: async (taskId, colIndex, dir) => {
    const { boardId, columns } = get();
    const targetIndex =
      dir === LeftRightEnum.left ? colIndex - 1 : colIndex + 1;
    if (targetIndex < 0 || targetIndex >= columns.length) return;
    const targetColumn = columns[targetIndex];
    await api.patch(
      `/boards/${boardId}/columns/${columns[colIndex].id}/tasks/${taskId}/move`,
      {
        targetColumnId: targetColumn.id,
      },
    );
    const task = (columns[colIndex].tasks || []).find((t) => t.id === taskId);
    if (!task) return;
    set((s) => ({
      columns: s.columns.map((col, i) => {
        if (i === colIndex)
          return {
            ...col,
            tasks: (col.tasks || []).filter((t) => t.id !== taskId),
          };
        if (i === targetIndex)
          return {
            ...col,
            tasks: [
              ...(col.tasks || []),
              { ...task, columnId: targetColumn.id },
            ],
          };
        return col;
      }),
    }));
  },
}));
