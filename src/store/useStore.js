import { create } from "zustand";
import { persist } from "zustand/middleware";

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
      // Add this new function
      clearShippingInfo: () => set(() => ({
        shippingInfo: {
          id: "",
          fullName: "",
          address: "",
          state: "",
          pincode: "",
          phoneNo: "",
        }
      })),
    }),
    {
      name: "user-storage", // Persist the store in localStorage
    }
  )
);

export default useStore;
