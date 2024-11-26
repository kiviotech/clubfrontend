import {
    getProfiles,
    getProfileById,
    createProfile,
    updateProfile,
    deleteProfile,
  } from "../repositories/profileRepository";
  
  // Fetch all profiles
  export const fetchProfiles = async () => {
    try {
      const response = await getProfiles();
      return response.data; // Return the profiles
    } catch (error) {
      console.error("Error fetching profiles:", error);
      throw error;
    }
  };
  
  // Fetch a specific profile by ID
  export const fetchProfileById = async (id) => {
    try {
      const response = await getProfileById(id);
      return response.data; // Return the specific profile
    } catch (error) {
      console.error(`Error fetching profile with ID ${id}:`, error);
      throw error;
    }
  };
  
  // Create a new profile
  export const createProfileService = async (data) => {
    try {
      const response = await createProfile(data);
      return response.data; // Return the newly created profile
    } catch (error) {
      console.error("Error creating profile:", error);
      throw error;
    }
  };
  
  // Update an existing profile by ID
  export const updateProfileById = async (id, data) => {
    try {
      const response = await updateProfile(id, data);
      return response.data; // Return the updated profile
    } catch (error) {
      console.error(`Error updating profile with ID ${id}:`, error);
      throw error;
    }
  };
  
  // Delete a profile by ID
  export const deleteProfileById = async (id) => {
    try {
      const response = await deleteProfile(id);
      return response.data; // Return success confirmation
    } catch (error) {
      console.error(`Error deleting profile with ID ${id}:`, error);
      throw error;
    }
  };
  