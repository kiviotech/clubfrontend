import { create } from "zustand";

export const useBrandStore = create((set) => ({
  selectedBrand: null,
  setSelectedBrand: (brand) => set({ selectedBrand: brand }),
  brands: [],
  setBrands: (brands) => set({ brands }),
}));

