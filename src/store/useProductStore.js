import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useProductStore = create(
  persist(
    (set) => ({
      productDetails: {},
      setProductDetails: (details) => set({ productDetails: details }),
    }),
    {
      name: "product-storage",
      getStorage: () => AsyncStorage, // Use AsyncStorage in React Native
    }
  )
);

export default useProductStore;
