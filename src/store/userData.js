import { create } from "zustand";
import { persist } from "zustand/middleware";

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
    }),
    {
      name: "user-data-storage", // Persist the store in localStorage
    }
  )
);

export default useUserDataStore;
