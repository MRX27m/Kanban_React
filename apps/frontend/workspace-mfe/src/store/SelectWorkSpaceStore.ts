import { create } from "zustand";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/api";

type Board = { id: string; name: string };

export const useBoards = () =>
  useQuery({
    queryKey: ["boards"],
    queryFn: async () => {
      const res = await api.get("/boards");
      return res.data as Board[];
    },
  });

export const useAddBoard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (name: string) => {
      const res = await api.post("/boards", { name });
      return res.data as Board;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["boards"] }),
  });
};

export const useRemoveBoard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/boards/${id}`);
      return id;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["boards"] }),
  });
};

type BoardStore = {
  selectedBoardId: string | null;
  setSelectedBoardId: (id: string) => void;
};

export const useBoardStore = create<BoardStore>((set) => ({
  selectedBoardId: null,
  setSelectedBoardId: (id) => set({ selectedBoardId: id }),
}));
