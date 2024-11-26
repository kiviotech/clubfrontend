import apiClient from "../apiClient";
import designRequestEndpoints from "../endpoints/designRequestEndpoints";

export const getDesignRequests = () =>
  apiClient.get(designRequestEndpoints.getDesignRequests());

export const getDesignRequestById = (id) =>
  apiClient.get(designRequestEndpoints.getDesignRequestById(id));

export const createDesignRequest = (data) =>
  apiClient.post(designRequestEndpoints.createDesignRequest, data);

export const updateDesignRequest = (id, data) =>
  apiClient.put(designRequestEndpoints.updateDesignRequest(id), data);

export const deleteDesignRequest = (id) =>
  apiClient.delete(designRequestEndpoints.deleteDesignRequest(id));
