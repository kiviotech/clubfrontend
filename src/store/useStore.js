
// import {create} from 'zustand';


// const useStore = create((set) => ({
//   user: {
//     username: "",
//     token: "",
//     userId: "",
//   },
//   shippingInfo: {
//     id: "",
//     fullName: "",
//     address: "",
//     state: "",
//     pincode: "",
//     phoneNo: "",
//   },
//   setUser: (username, token, userId) => set((state) => ({
//     user: { ...state.user, username, token, userId }
//   })),
//   shippingInfo: null, // Add shippingInfo state
//   setShippingInfo: (info) => set({ shippingInfo: info }), // Add setter function
//   deleteShippingInfo: () => set({ shippingInfo: null }),
// }));

// export default useStore;

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


