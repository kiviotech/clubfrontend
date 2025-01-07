import { create } from 'zustand';

const useColorStore = create((set) => ({
  selectedColor: '#000000', // Default color
  setSelectedColor: (color) => set({ selectedColor: color }), // Function to update selected color
}));

export default useColorStore;
