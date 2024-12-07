// src/store/useOrderStorelevel.js
import { create } from 'zustand';

const useOrderStorelevel = create((set) => ({
  orders: {}, // Stores order states by order ID
  setOrderLevel: (orderId, level) => set((state) => ({
    orders: {
      ...state.orders,
      [orderId]: level, // Update the state for the specific order ID
    },
  })),
}))

export default useOrderStorelevel;
