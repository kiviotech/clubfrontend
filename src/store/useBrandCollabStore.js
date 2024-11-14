// useBrandCollabStore.js
import { create } from "zustand";

const useBrandCollabStore = create((set) => ({
  brandCollabs: [],
  setBrandCollabs: (data) => set({ brandCollabs: data }),
}));

export default useBrandCollabStore;
