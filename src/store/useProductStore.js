// import { create } from "zustand";

// const useProductStore = create((set) => ({
//   productDetails: null,
//   setProductDetails: (details) => set({ productDetails: details }),
// }));

// export default useProductStore;


// store.js
import { create } from "zustand";

const useProductStore = create((set) => ({
  productDetails: [],
  setProductDetails: (details) => set({ productDetails: details }),
}));

export default useProductStore;
