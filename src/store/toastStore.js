import { create } from "zustand";

export const useToastStore = create((set) => ({
  message: "",
  type: "success",
  isVisible: false,
  showToast: (message, type = "success") => set({ message, type, isVisible: true }),
  hideToast: () => set({ isVisible: false }),
}));
