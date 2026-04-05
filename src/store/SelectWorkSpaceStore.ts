import { create } from "zustand";
import { boardSchema } from "../validation/validation";

type Board = {
  id: string;
  name: string;
};

type BoardStore = {
  boards: Board[];
  addBoard: (name: string) => string | null;
  removeBoard: (id: string) => void;
};

export const useBoardStore = create<BoardStore>((set) => ({
  boards: [{ id: crypto.randomUUID(), name: "Kanban board" }],

  addBoard: (name: string) => {
    const result = boardSchema.safeParse(name);

    if (!result.success) {
      return result.error.issues[0].message;
    }

    set((state) => ({
      boards: [...state.boards, { id: crypto.randomUUID(), name }],
    }));

    return null;
  },

  removeBoard: (id: string) => {
    set((state) => ({
      boards: state.boards.filter((b) => b.id !== id),
    }));
  },
}));
