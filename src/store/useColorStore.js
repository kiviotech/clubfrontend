import { create } from 'zustand';

const useColorStore = create((set) => ({
  selectedColor: null, // Default color
  selectedColorName: null, // Default selected color name (none)
  setSelectedColor: (color, colorName) => set({ selectedColor: color, selectedColorName: colorName }), // Set both color and name
}));

export default useColorStore;
