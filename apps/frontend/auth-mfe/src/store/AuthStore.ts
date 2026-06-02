import { create } from "zustand";
import { api } from "../api/api";

type User = { id: string; email: string };

type AuthStore = {
  user: User | null;
  isLoading: boolean;
  register: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  init: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,

  init: () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const email = localStorage.getItem("email");
    if (token && userId && email) set({ user: { id: userId, email } });
  },

  register: async (email, password, name) => {
    set({ isLoading: true });
    try {
      const res = await api.post("/auth/register", { email, password, name });
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("email", res.data.email);
      const user = { id: res.data.userId, email: res.data.email };
      set({ user, isLoading: false });
      window.dispatchEvent(new CustomEvent("auth:login", { detail: { user } }));
    } catch (e) {
      set({ isLoading: false });
      throw e;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("email", res.data.email);
      const user = { id: res.data.userId, email: res.data.email };
      set({ user, isLoading: false });
      window.dispatchEvent(new CustomEvent("auth:login", { detail: { user } }));
    } catch (e) {
      set({ isLoading: false });
      throw e;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    set({ user: null });
    window.dispatchEvent(new CustomEvent("auth:logout"));
  },
}));
