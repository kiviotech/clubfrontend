import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      subtotal: 0,

      // Add item to cart
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

      // Update quantity of an item
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

      // Remove item from cart
      removeItem: (id) =>
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== id);
          const newSubtotal = newItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          );
          return { items: newItems, subtotal: newSubtotal };
        }),

      // Clear all items in the cart
      clearCart: () => set({ items: [], subtotal: 0 }),
    }),
    {
      name: "cart-storage", // Key for AsyncStorage
      storage: createJSONStorage(() => AsyncStorage), // Use AsyncStorage for persistence
    }
  )
);

export default useCartStore;
