import apiClient from "../apiClient";
import brandCollabEndpoints from "../endpoints/brandCollabEndpoints";

export const getBrandCollabs = () => 
    apiClient.get(brandCollabEndpoints.getBrandCollabs);

export const getBrandCollabById = (id) =>
  apiClient.get(brandCollabEndpoints.getBrandCollabById(id));

export const createBrandCollab = (data) =>
  apiClient.post(brandCollabEndpoints.createBrandCollab, data);

export const updateBrandCollab = (id, data) =>
  apiClient.put(brandCollabEndpoints.updateBrandCollab(id), data);

export const deleteBrandCollab = (id) =>
  apiClient.delete(brandCollabEndpoints.deleteBrandCollab(id));
