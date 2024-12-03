import apiClient from "../apiClient";
import sizeEndpoints from "../endpoints/sizeEndpoints";

export const getSizes = () => 
  apiClient.get(sizeEndpoints.getSizes());

export const getSizeById = (id) =>
  apiClient.get(sizeEndpoints.getSizeById(id));

export const createSize = (data) =>
  apiClient.post(sizeEndpoints.createSize,data);

export const updateSize = (id, data) =>
  apiClient.put(sizeEndpoints.updateSize(id),data);

export const deleteSize = (id) =>
  apiClient.delete(sizeEndpoints.deleteSize(id));
