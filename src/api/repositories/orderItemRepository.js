import apiClient from "../apiClient";
import orderItemEndpoints from "../endpoints/orderItemEndpoints"

export const getOrderItems = () =>
  apiClient.get(orderItemEndpoints.getOrderItems());

export const getOrderItemById = (id) =>
  apiClient.get(orderItemEndpoints.getOrderItemById(id)); 

export const createOrderItem = (data) => 
  apiClient.post(orderItemEndpoints.createOrderItem, data)

export const updateOrderItem = (id, data) =>
  apiClient.put(orderItemEndpoints.updateOrderItem(id), data);

export const deleteOrderItem = (id) =>
  apiClient.delete(orderItemEndpoints.deleteOrderItem(id));
