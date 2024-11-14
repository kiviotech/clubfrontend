import apiClient from "../apiClient";
import shippingInfoEndpoints from "../endpoints/shippingInfoEndpoints";

export const getAllShippingInfos = () => 
    apiClient.get(shippingInfoEndpoints.getAllShippingInfos);

export const getShippingInfoById = (id) =>
  apiClient.get(shippingInfoEndpoints.getShippingInfoById(id));

export const createShippingInfo = (data) =>
  apiClient.post(shippingInfoEndpoints.createShippingInfo, data);

export const updateShippingInfo = (id, data) =>
  apiClient.put(shippingInfoEndpoints.updateShippingInfo(id), data);

export const deleteShippingInfo = (id) =>
  apiClient.delete(shippingInfoEndpoints.deleteShippingInfo(id));
