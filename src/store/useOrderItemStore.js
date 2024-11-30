import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useOrderStore = create(
  persist(
    (set) => ({
      orderItems: [], // Initialize an empty array for order items

      // Add order items to the store
      addOrderItem: (orderItem) =>
        set((state) => ({
          orderItems: [...state.orderItems, orderItem], // Store the full order item object
        })),

      // Remove an order item from the store by ID
      removeOrderItem: (id) =>
        set((state) => ({
          orderItems: state.orderItems.filter((item) => item.id !== id), // Remove the item with the given ID
        })),

      // Clear all order items from the store
      clearOrderItems: () => set({ orderItems: [] }),
    }),
    {
      name: "order-items-storage", // Key for AsyncStorage
      storage: createJSONStorage(() => AsyncStorage), // Use AsyncStorage for persistence
    }
  )
);

export default useOrderStore;
