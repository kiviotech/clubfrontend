// stores/useFormStore.js

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useFormStore = create(
  persist(
    (set) => ({
      designDetails: {
        title: '',
        description: '',
        fabric: '',
        color: '',
        deadline: '',
        budget: '',
        contactNumber: '',
      },
      measurements: {
        size: '',
        chest: '',
        waist: '',
        specialInstructions: '',
      },
      uploads: {
        imageId: null,
        imageURI: null,
      },

      // Method to update design details
      setDesignDetails: (details) => set((state) => {
        
        return {
          designDetails: { ...state.designDetails, ...details },
        };
      }),
      // Method to update measurements
      setMeasurements: (measurements) => set((state) => {
        return {
          measurements: { ...state.measurements, ...measurements },
        };
      }),
      // Method to update uploads
      setUploads: (imageId, imageURI) => set((state) => {
        // console.log('Setting uploads state:', imageId, imageURI); // Logs the IDs and URIs that are being saved
        const updatedState = {
          uploads: { imageId, imageURI },
        };
        // console.log('Updated uploads state:', updatedState); // Logs the updated uploads state before setting it
        return updatedState;
      }),
      // Method to reset form data
      resetFormData: () => set({
        designDetails: {
          title: '',
          description: '',
          fabric: '',
          color: '',
          deadline: '',
          budget: '',
          contactNumber: '',
        },
        measurements: {
          size: '',
          chest: '',
          waist: '',
          specialInstructions: '',
        },
        uploads: {
          imageId: null,
          imageURI: null,
        },
      }),
    }),
    {
      name: 'form-storage', // Unique key for AsyncStorage
      storage: AsyncStorage, // Use AsyncStorage for data storage
    }
  )
);

export default useFormStore;
