import {create} from "zustand";

const useOrderItemStore = create((set) => ({
  orderItemCreated: 0,  // Initial state is an empty array
  setOrderItemCreated: (newOrderItemId) => set((state) => ({
    orderItemCreated: [...state.orderItemCreated, newOrderItemId],  // Add new orderItemId to the array
  })),
}));

export default useOrderItemStore;
