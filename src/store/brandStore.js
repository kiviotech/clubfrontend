import { create } from "zustand";

export const useBrandStore = create((set) => ({
  selectedBrand: null,
  setSelectedBrand: (brand) => set({ selectedBrand: brand }),
  brands: [],
  setBrands: (brands) => set({ brands }),
}));


// import { create } from "zustand";

// export const useBrandStore = create((set) => ({
//   selectedBrand: null,
//   setSelectedBrand: (brand) => set({ selectedBrand: brand }),

//   brands: [],
//   setBrands: (brands) => set({ brands }),

//   brandInfo: null, 
//   setBrandInfo: (info) => set({ brandInfo: info }),
// }));
