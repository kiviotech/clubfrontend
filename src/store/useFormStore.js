// stores/useFormStore.js

import {create} from 'zustand';

const useFormStore = create((set) => ({
  designDetails: {
    title: '',
    description: '',
    fabric: '',
    color: '',
    deadline: '',
    budget: 0,
  },
  measurements: {
    bust: '',
    waist: '',
    hip: '',
    height: '',
    weight: 0,
    specialInstructions: '',
  },
  uploads: {
    imageId: null,
  },
  // Method to update design details
  setDesignDetails: (details) => set((state) => {
    // console.log("Updating designDetails:", { ...state.designDetails, ...details });
    return {
      designDetails: { ...state.designDetails, ...details },
    };
  }),
  // Method to update measurements
  setMeasurements: (measurements) => set((state) => {
    console.log("Updated measurements:", { ...state.measurements, ...measurements });
    return {
      measurements: { ...state.measurements, ...measurements },
    };
  }),
  // Method to update uploads
  setUploads: (imageId) => set((state) => ({
    uploads: { ...state.uploads, imageId },
  })),
  // Method to reset form data
  resetFormData: () => set({
    designDetails: {
      title: '',
      description: '',
      fabric: '',
      color: '',
      deadline: '',
      budget: 0,
    },
    measurements: {
      bust: '',
      waist: '',
      hip: '',
      height: '',
      weight: 0,
      specialInstructions: '',
    },
    uploads: {
      images: null,
    //   files: [],
    },
  }),
}));

export default useFormStore;
