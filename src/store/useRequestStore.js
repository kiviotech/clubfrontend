import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useRequestStore = create(
  persist(
    (set, get) => ({
      cart: {}, // { requestId: quantity }
      updateQuantity: (requestId, quantity) =>
        set((state) => ({
          cart: {
            ...state.cart,
            [requestId]: quantity,
          },
        })),
      getQuantity: (requestId) => get().cart[requestId] || 1,
    }),
    {
      name: 'request-storage', // Key to store in localStorage
    }
  )
);

export default useRequestStore;
