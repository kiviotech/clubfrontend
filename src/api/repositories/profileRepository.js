import apiClient from "../apiClient";
import profileEndpoints from "../endpoints/profileEndpoints";

// Fetch all profiles
export const getProfiles = () =>
  apiClient.get(profileEndpoints.getProfiles());

// Fetch a single profile by ID
export const getProfileById = (id) =>
  apiClient.get(profileEndpoints.getProfileById(id));

// Create a new profile
export const createProfile = (data) =>
  apiClient.post(profileEndpoints.createProfile, data);

// Update an existing profile by ID
export const updateProfile = (id, data) =>
  apiClient.put(profileEndpoints.updateProfile(id),data);

// Delete a profile by ID
export const deleteProfile = (id) =>
  apiClient.delete(profileEndpoints.deleteProfile(id));

