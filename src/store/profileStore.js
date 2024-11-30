import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
      name: "profile-storage", // Key for AsyncStorage
      storage: createJSONStorage(() => AsyncStorage), // Use AsyncStorage for persistence
    }
  )
);

export default useProfileStore;
