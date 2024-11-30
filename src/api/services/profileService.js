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
    ("Error fetching profiles:", error);
    throw error;
  }
};

// Fetch a specific profile by ID
export const fetchProfileById = async (id) => {
  try {
    const response = await getProfileById(id);
    return response.data; // Return the specific profile
  } catch (error) {
    (`Error fetching profile with ID ${id}:`, error);
    throw error;
  }
};

// Create a new profile
export const createProfileService = async (data) => {
  const jsonData = {
    data
  }
  try {
    const response = await createProfile(jsonData);
    return response.data; // Return the newly created profile
  } catch (error) {
    ("Error creating profile:", error);
    throw error;
  }
};

// Update an existing profile by ID
export const updateProfileById = async (id, data) => {
  const jsonData = {
    data
  }
  try {
    const response = await updateProfile(id, jsonData);
    return response.data; // Return the updated profile
  } catch (error) {
    (`Error updating profile with ID ${id}:`, error);
    throw error;
  }
};

// Delete a profile by ID
export const deleteProfileById = async (id) => {
  try {
    const response = await deleteProfile(id);
    return response.data; // Return success confirmation
  } catch (error) {
    (`Error deleting profile with ID ${id}:`, error);
    throw error;
  }
};
