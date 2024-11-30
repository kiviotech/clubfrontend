import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      subtotal: 0,

      addItem: (item) =>
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (cartItem) => cartItem.id === item.id
          );

          let newItems;
          if (existingItemIndex !== -1) {
            newItems = state.items.map((cartItem, index) =>
              index === existingItemIndex
                ? {
                    ...cartItem,
                    quantity: item.quantity || cartItem.quantity,
                  }
                : cartItem
            );
          } else {
            newItems = [...state.items, { ...item, quantity: item.quantity || 1 }];
          }

          const newSubtotal = newItems.reduce(
            (total, cartItem) => total + cartItem.price * cartItem.quantity,
            0
          );

          return { items: newItems, subtotal: newSubtotal };
        }),

      updateQuantity: (id, quantity) =>
        set((state) => {
          const newItems = state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          );
          const newSubtotal = newItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          );
          return { items: newItems, subtotal: newSubtotal };
        }),

      removeItem: (id) =>
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== id);
          const newSubtotal = newItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          );
          return { items: newItems, subtotal: newSubtotal };
        }),

      clearCart: () => set({ items: [], subtotal: 0 }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCartStore;
