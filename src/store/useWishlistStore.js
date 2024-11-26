// import { create } from "zustand";

// const useWishlistStore = create((set) => ({
//   wishlist: [],
//   addToWishlist: (item) =>
//     set((state) => ({
//       wishlist: [...state.wishlist, item],
//     })),
//   removeFromWishlist: (id) =>
//     set((state) => ({
//       wishlist: state.wishlist.filter((item) => item.id !== id),
//     })),
// }));

// export default useWishlistStore;


import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useWishlistStore;
