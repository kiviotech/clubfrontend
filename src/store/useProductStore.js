
import { create } from "zustand";

const useProductStore = create((set) => ({
  productDetails: {},
  setProductDetails: (details) => set({ productDetails: details }),
}));

export default useProductStore;
