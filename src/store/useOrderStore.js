import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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
      name: "order-storage", // Key name in localStorage
      storage: createJSONStorage(() => localStorage), // Use localStorage
    }
  )
);

export default useOrderStore;
