import { create } from "zustand";

type User = { id: string; email: string };

type AuthStore = {
  user: User | null;
  logout: () => void;
};

const getInitialUser = (): User | null => {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const email = localStorage.getItem("email");
    if (token && userId && email) return { id: userId, email };
  } catch {}
  return null;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: getInitialUser(),

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    set({ user: null });
    window.dispatchEvent(new CustomEvent("auth:logout"));
  },
}));

if (typeof window !== "undefined") {
  window.addEventListener("auth:login", (e: Event) => {
    const { user } = (e as CustomEvent).detail;
    useAuthStore.setState({ user });
  });
  window.addEventListener("auth:logout", () => {
    useAuthStore.setState({ user: null });
  });
}
