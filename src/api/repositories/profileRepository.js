import apiClient from "../apiClient";
import profileEndpoints from "../endpoints/profileEndpoints";

export const getProfiles = () =>
  apiClient.get(profileEndpoints.getProfiles());

export const getProfileByUserId = (userId) =>
  apiClient.get(profileEndpoints.getProfileByUserId(userId));

export const createProfile = (data) =>
  apiClient.post(profileEndpoints.createProfile, data);

export const updateProfile = (id, data) =>
  apiClient.put(profileEndpoints.updateProfile(id), data);

export const deleteProfile = (id) =>
  apiClient.delete(profileEndpoints.deleteProfile(id));
