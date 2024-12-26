import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
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
      clearWishlist: () =>
        set({
          wishlist: [],
        }), // Clears the wishlist
    }),
    {
      name: "wishlist-storage", // Unique name for the storage
      storage: createJSONStorage(() => AsyncStorage), // Use AsyncStorage for persistent storage
    }
  )
);

export default useWishlistStore;
