import { create } from "zustand";
import { persist } from "zustand/middleware";

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
      name: "user-storage", // Persist the store in localStorage
    }
  )
);

export default useStore;
