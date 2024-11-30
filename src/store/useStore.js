import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useStore = create(
  persist(
    (set) => ({
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
      // Clear shipping information
      clearShippingInfo: () =>
        set(() => ({
          shippingInfo: {
            id: "",
            fullName: "",
            address: "",
            state: "",
            pincode: "",
            phoneNo: "",
          },
        })),
    }),
    {
      name: "user-storage", // Key for AsyncStorage
      storage: {
        getItem: async (key) => {
          const item = await AsyncStorage.getItem(key);
          return item ? JSON.parse(item) : null;
        },
        setItem: async (key, value) => {
          await AsyncStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: async (key) => {
          await AsyncStorage.removeItem(key);
        },
      },
    }
  )
);

export default useStore;
