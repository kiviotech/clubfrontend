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
        
        deadline: '',
        budget: '',
        contactNumber: '',
      },
      measurements: {
        size: '',
        chest: '',
        waist: '',
        specialInstructions: '',
        color: '',
      },
      uploads: {
        imageId: null,
        imageURI: null,
      },
      selectedProduct: { // New state to store the selected product details
        id: null,
        documentId: null,
      },

      // Method to update design details
      setDesignDetails: (details) => set((state) => {
        
        return {
          designDetails: { ...state.designDetails, ...details },
        };
      }),
      // Method to update measurements
      setMeasurements: (measurements) => set((state) => {
        // console.log('Before Update: ', state.measurements);  // Logs the state before the update
        const updatedMeasurements = { ...state.measurements, ...measurements };
        // console.log('Updates being applied: ', measurements);  // Logs the incoming updates
        // console.log('After Update: ', updatedMeasurements);  // Logs the state after the update
      
        return {
          measurements: updatedMeasurements,
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

      setSelectedProduct: (id, documentId) => {
        // console.log('Setting selected product:', { id, documentId }); // Log the data to check
        set(() => ({
          selectedProduct: { id, documentId },
        }));
      },
      // Method to reset form data
      resetFormData: () => set({
        designDetails: {
          title: '',
          description: '',
          
          deadline: '',
          budget: '',
          contactNumber: '',
        },
        measurements: {
          size: '',
          chest: '',
          waist: '',
          specialInstructions: '',
          color: '',
        },
        uploads: {
          imageId: null,
          imageURI: null,
        },
        selectedProduct: { // Reset selected product details
          id: null,
          documentId: null,
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
