// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const useCartStore = create(
//   persist(
//     (set) => ({
//       items: [],
//       subtotal: 0,

//       // Add item to cart
//       addItem: (item) =>
//         set((state) => {
//           // Check if the same product with the same size exists
//           const existingItemIndex = state.items.findIndex(
//             (cartItem) => cartItem.id === item.id && cartItem.size === item.size
//           );

//           let newItems;
//           if (existingItemIndex !== -1) {
//             // Update the quantity of the existing item
//             newItems = state.items.map((cartItem, index) =>
//               index === existingItemIndex
//                 ? {
//                     ...cartItem,
//                     quantity: cartItem.quantity + (item.quantity || 1), // Increment quantity
//                   }
//                 : cartItem
//             );
//           } else {
//             // Add a new item
//             newItems = [...state.items, { ...item, quantity: item.quantity || 1 }];
//           }

//           // Recalculate the subtotal
//           const newSubtotal = newItems.reduce(
//             (total, cartItem) => total + cartItem.price * cartItem.quantity,
//             0
//           );

//           return { items: newItems, subtotal: newSubtotal };
//         }),

//       // Update quantity of an item
//       updateQuantity: (id, size, quantity) =>
//         set((state) => {
//           const newItems = state.items.map((item) =>
//             item.id === id && item.size === size
//               ? { ...item, quantity }
//               : item
//           );
//           const newSubtotal = newItems.reduce(
//             (total, item) => total + item.price * item.quantity,
//             0
//           );
//           return { items: newItems, subtotal: newSubtotal };
//         }),

//       // Remove item from cart
//       removeItem: (id, size) =>
//         set((state) => {
//           const newItems = state.items.filter(
//             (item) => !(item.id === id && item.size === size)
//           );
//           const newSubtotal = newItems.reduce(
//             (total, item) => total + item.price * item.quantity,
//             0
//           );
//           return { items: newItems, subtotal: newSubtotal };
//         }),

//       // Clear all items in the cart
//       clearCart: () => set({ items: [], subtotal: 0 }),
//     }),
//     {
//       name: "cart-storage", // Key for AsyncStorage
//       storage: createJSONStorage(() => AsyncStorage), // Use AsyncStorage for persistence
//     }
//   )
// );

// export default useCartStore;


import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [], // Array of cart items
      subtotal: 0, // Total price of items in the cart

      // Add item to the cart
      addItem: (item) =>
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (cartItem) => cartItem.id === item.id && cartItem.size === item.size
          );

          let newItems;
          if (existingItemIndex !== -1) {
            // Update quantity for an existing item
            newItems = state.items.map((cartItem, index) =>
              index === existingItemIndex
                ? {
                    ...cartItem,
                    quantity: cartItem.quantity + (item.quantity || 1),
                  }
                : cartItem
            );
          } else {
            // Add a new item to the cart
            newItems = [...state.items, { ...item, quantity: item.quantity || 1 }];
          }

          return {
            items: newItems,
            subtotal: get().calculateSubtotal(newItems), // Recalculate subtotal
          };
        }),

      // Update quantity for a specific item
      updateQuantity: (id, size, quantity) =>
        set((state) => {
          const newItems = state.items.map((item) =>
            item.id === id && item.size === size ? { ...item, quantity } : item
          );

          return {
            items: newItems,
            subtotal: get().calculateSubtotal(newItems), // Recalculate subtotal
          };
        }),

      // Remove an item from the cart
      removeItem: (id, size) =>
        set((state) => {
          const newItems = state.items.filter(
            (item) => !(item.id === id && item.size === size)
          );

          return {
            items: newItems,
            subtotal: get().calculateSubtotal(newItems), // Recalculate subtotal
          };
        }),

      // Clear all items from the cart
      clearCart: () =>
        set({
          items: [],
          subtotal: 0,
        }),

      // Calculate subtotal (helper function)
      calculateSubtotal: (items) =>
        items.reduce((total, item) => total + item.price * item.quantity, 0),

      // Get total number of items in the cart
      getTotalItems: () => {
        const items = get().items;
        return items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: "cart-storage", // AsyncStorage key
      storage: createJSONStorage(() => AsyncStorage), // Persistent storage
    }
  )
);

export default useCartStore;

