import { userLocation } from "@/utils/helperfn";
import { create } from "zustand";

const useGpsStore = create((set) => ({
  location: null,
  error: null,
  handleGetLocation: async function () {
    try {
      const location = await userLocation();
      set({ location: location, error: null }); 
    } catch (error) {
      set({ error: error.message, location: null });
    }
  },
}));

export default useGpsStore;
