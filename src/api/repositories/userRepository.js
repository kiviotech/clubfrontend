import apiClient from "../apiClient";
import userEndpoints from "../endpoints/userEndpoints";

export const getUsers = () => apiClient.get(userEndpoints.getUsers);

export const getUserById = (id) => apiClient.get(userEndpoints.getUserById(id));

export const getUserProfile = (id) => apiClient.get(userEndpoints.getUserProfileById(id));

export const createUser = (data) =>
  apiClient.post(userEndpoints.createUser, data);

export const updateUser = (id, data) =>
  apiClient.put(userEndpoints.updateUser(id), data);

export const deleteUser = (id) =>
  apiClient.delete(userEndpoints.deleteUser(id));

export const changePassword = (data) =>
  apiClient.post(userEndpoints.changePassword, data, {
  });

  export const getUserWithOrderDetails = (id) =>
    apiClient.get(userEndpoints.getUserWithOrderDetails(id));