// src/store/useCheckoutStore.js
import {create} from 'zustand';

const useCheckoutStore = create((set) => ({
  productIds: [],
  setProductIds: (ids) => set({ productIds: ids }),
}));

export default useCheckoutStore;
