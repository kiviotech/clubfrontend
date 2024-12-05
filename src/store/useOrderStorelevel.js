// src/store/useOrderStore.js
import {create} from 'zustand';

const useOrderStore = create((set) => ({
  orderLevel: null,
  setOrderLevel: (level) => set({ orderLevel: level }),
}));

export default useOrderStore;
