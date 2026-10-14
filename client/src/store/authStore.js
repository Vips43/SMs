import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("emp-user")) || null,
  setUser: (val) => set({ user: val }),
  clearUser: () => set({ user: null }),
}));

export default useAuthStore;
