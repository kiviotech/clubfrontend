
import { create } from 'zustand';

const useStore = create((set) => ({
  user: {
    username: "",
    token: "",
    userId: "",
  },
  shippingInfo: {
    id: "",
    fullName: "",
    address: "",
    state: "",
    pincode: "",
    phoneNo: "",
  },
  setShippingInfo: (shippingInfo) => set(() => ({
    shippingInfo,
  })),
  setShippingId: (id) => set((state) => ({
    shippingInfo: {
      ...state.shippingInfo,
      id: id,
    }
  })),
  setUser: (username, token, userId) => set((state) => ({
    user: {
      ...state.user,
      username,
      token,
      userId,
    }
  })),
}));

export default useStore;


