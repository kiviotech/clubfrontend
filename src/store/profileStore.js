import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useProfileStore = create(
  persist(
    (set) => ({
      profile: null, // Initial profile state

      // Function to update the profile
      setProfile: (newProfile) => set({ profile: newProfile }),

      // Function to clear the profile
      clearProfile: () => set({ profile: null }),
    }),
    {
      name: "profile-storage", // Key for local storage
      storage: createJSONStorage(() => localStorage), // Use localStorage for persistence
    }
  )
);

export default useProfileStore;
