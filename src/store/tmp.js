import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useStore = create(
  persist(
    (set) => ({
      user: {
        id: "",
        documentId: "",
        username: "",
        email: "",
        // Add any other user-related fields here
      },
      shippingInfo: {
        id: "",
        fullName: "",
        address: "",
        state: "",
        pincode: "",
        phoneNo: "",
      },
      // Setter for shipping information
      setShippingInfo: (shippingInfo) =>
        set(() => ({
          shippingInfo,
        })),
      // Setter for shipping ID
      setShippingId: (id) =>
        set((state) => ({
          shippingInfo: {
            ...state.shippingInfo,
            id,
          },
        })),
      // Setter for user data
      setUser: (userData) =>
        set(() => ({
          user: userData,
        })),
    }),
    {
      name: "user-storage", // Key for AsyncStorage
      storage: createJSONStorage(() => AsyncStorage), // Use AsyncStorage for persistence
    }
  )
);

export default useStore;
