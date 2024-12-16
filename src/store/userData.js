import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useUserDataStore = create(
  persist(
    (set) => ({
      users: [], // Store users as an array

      // Add user data
      addUser: (userData) =>
        set((state) => ({
          users: [...state.users, userData],
        })),

      // Update user data
      updateUser: (userId, userData) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.id === userId ? { ...user, ...userData } : user
          ),
        })),

      // Remove user
      removeUser: (userId) =>
        set((state) => ({
          users: state.users.filter((user) => user.id !== userId),
        })),

      // Clear users
      clearUsers: () => set({ users: [] }),
    }),
    {
      name: "user-data-storage", // Key for AsyncStorage
      storage: {
        getItem: async (key) => {
          const item = await AsyncStorage.getItem(key);
          return item ? JSON.parse(item) : null;
        },
        setItem: async (key, value) => {
          await AsyncStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: async (key) => {
          await AsyncStorage.removeItem(key);
        },
      },
    }
  )
);

export default useUserDataStore;
