import apiClient from "../apiClient";
import orderDetailEndpoints from "../endpoints/orderDetailEndpoints";

export const getOrderDetails = () =>
  apiClient.get(orderDetailEndpoints.getOrderDetails());

export const getOrderDetailById = (id) =>
  apiClient.get(orderDetailEndpoints.getOrderDetailById(id));

export const createOrderDetail = (data) =>
  apiClient.post(orderDetailEndpoints.createOrderDetail, data);

export const updateOrderDetail = (id, data) =>
  apiClient.put(orderDetailEndpoints.updateOrderDetail(id), data);

export const deleteOrderDetail = (id) =>
  apiClient.delete(orderDetailEndpoints.deleteOrderDetail(id));
