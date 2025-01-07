import apiClient from "../apiClient";
import customDesignEndpoints from "../endpoints/customDesignEndpoints";
// Get all custom designs
export const getCustomDesigns = () =>
  apiClient.get(customDesignEndpoints.getCustomDesigns);

// Get a specific custom design by ID
export const getCustomDesignById = (id) =>
  apiClient.get(customDesignEndpoints.getCustomDesignById(id));

// Create a new custom design
export const createCustomDesign = (data) =>
  apiClient.post(customDesignEndpoints.createCustomDesign, data);

// Update a custom design by ID
export const updateCustomDesign = (id, data) =>
  apiClient.put(customDesignEndpoints.updateCustomDesign(id), data);

// Delete a custom design by ID
export const deleteCustomDesign = (id) =>
  apiClient.delete(customDesignEndpoints.deleteCustomDesign(id));
