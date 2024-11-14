import apiClient from "../apiClient";
import brandEndpoints from "../endpoints/brandEndpoints";

export const getBrands = () => 
    apiClient.get(brandEndpoints.getBrands);

export const getBrandById = (id) =>
  apiClient.get(brandEndpoints.getBrandById(id));

export const createBrand = (data) =>
  apiClient.post(brandEndpoints.createBrand, data);

export const updateBrand = (id, data) =>
  apiClient.put(brandEndpoints.updateBrand(id), data);

export const deleteBrand = (id) =>
  apiClient.delete(brandEndpoints.deleteBrand(id));
