import apiClient from "../apiClient";
import productEndpoints from "../endpoints/productEndpoints";

export const getProducts = () => 
    apiClient.get(productEndpoints.getProducts());

export const getProductById = (id) =>
  apiClient.get(productEndpoints.getProductById(id));

export const createProduct = (data) =>
  apiClient.post(productEndpoints.createProduct, data);

export const updateProduct = (id, data) =>
  apiClient.put(productEndpoints.updateProduct(id), data);

export const deleteProduct = (id) =>
  apiClient.delete(productEndpoints.deleteProduct(id));
