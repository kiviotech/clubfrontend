import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useOrderStore = create(
  persist(
    (set) => ({
      orderDetails: null, // Stores the order details

      // Action to add or update order details
      setOrderDetails: (details) => set({ orderDetails: details }),

      // Action to clear the stored order details
      clearOrderDetails: () => set({ orderDetails: null }),
    }),
    {
      name: "order-storage", // Key name in AsyncStorage
      storage: createJSONStorage(() => AsyncStorage), // Use AsyncStorage for persistence
    }
  )
);

export default useOrderStore;
