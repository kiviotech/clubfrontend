import apiClient from "../apiClient";
import orderEndpoints from "../endpoints/orderEndpoints";

// Fetch all orders
export const getOrders = () => apiClient.get(orderEndpoints.getOrders);

// Fetch a single order by its ID
export const getOrderById = (id) =>
  apiClient.get(orderEndpoints.getOrderById(id));

// Create a new order
export const createOrder = (data) =>
  apiClient.post(orderEndpoints.createOrder, data);

// Update an existing order by its ID
export const updateOrder = (id, data) =>
  apiClient.put(orderEndpoints.updateOrder(id), data);

// Delete an order by its ID
export const deleteOrder = (id) =>
  apiClient.delete(orderEndpoints.deleteOrder(id));
