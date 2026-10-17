import { create } from "zustand";
import { Capacitor, registerPlugin } from "@capacitor/core";
const BackgroundGeolocation = registerPlugin("BackgroundGeolocation");

const useGpsStore = create((set, get) => ({
  location: null,
  error: null,
  watchId: null,

  startTracking: async () => {
    if (get().watchId) return;

    // 1. If running inside the Android APK -> Use Native Background Service
    if (Capacitor.isNativePlatform()) {
      const id = await BackgroundGeolocation.addWatcher(
        {
          backgroundMessage: "Tracking active for work attendance.",
          backgroundTitle: "SMs GPS Active",
          requestPermissions: true,
          stale: false,
          distanceFilter: 10, // Update every 10 meters moved
        },
        (location, error) => {
          if (error) return set({ error: error.message });
          set({
            location: {
              latitude: location.latitude,
              longitude: location.longitude,
            },
          });
        }
      );
      set({ watchId: id });
      return;
    }

    // 2. Fallback if opened in a normal Desktop/Mobile Web Browser
    const id = navigator.geolocation.watchPosition(
      (pos) =>
        set({
          location: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          },
        }),
      (err) => set({ error: err.message }),
      { enableHighAccuracy: true }
    );
    set({ watchId: id });
  },

  stopTracking: () => {
    const { watchId } = get();
    if (!watchId) return;
    if (Capacitor.isNativePlatform()) {
      BackgroundGeolocation.removeWatcher({ id: watchId });
    } else {
      navigator.geolocation.clearWatch(watchId);
    }
    set({ watchId: null });
  },
}));

export default useGpsStore;