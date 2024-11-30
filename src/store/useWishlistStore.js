import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useWishlistStore = create(
  persist(
    (set) => ({
      wishlist: [],
      addToWishlist: (item) =>
        set((state) => ({
          wishlist: [...state.wishlist, item],
        })),
      removeFromWishlist: (id) =>
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.id !== id),
        })),
    }),
    {
      name: "wishlist-storage", // Unique name for the storage
      storage: AsyncStorage, // Use AsyncStorage instead of localStorage
    }
  )
);

export default useWishlistStore;
