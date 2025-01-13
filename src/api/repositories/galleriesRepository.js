import apiClient from "../apiClient";
import galleriesEndpoints from "../endpoints/galleriesEndpoints";

export const getGalleries = () => 
    apiClient.get(galleriesEndpoints.getGalleries);

export const getGalleryById = (id) => 
    apiClient.get(galleriesEndpoints.getGalleryById(id));

export const createGallery = (data) => 
    apiClient.post(galleriesEndpoints.createGallery, data);

export const updateGallery = (id, data) => 
    apiClient.put(galleriesEndpoints.updateGallery(id), data);

export const deleteGallery = (id) => 
    apiClient.delete(galleriesEndpoints.deleteGallery(id));
