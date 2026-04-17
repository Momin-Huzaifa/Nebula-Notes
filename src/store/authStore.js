import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAuthenticated: !!localStorage.getItem("user"),
  isLoading: false,

  setUser: (user) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      set({ user, isAuthenticated: true });
    } else {
      localStorage.removeItem("user");
      set({ user: null, isAuthenticated: false });
    }
  },

  setLoading: (isLoading) => set({ isLoading }),

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null, isAuthenticated: false });
  }
}));