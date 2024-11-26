import apiClient from "../apiClient";
import {
  getOrderItems,
  getOrderItemById,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem
} from "../repositories/orderItemRepository"

// Fetch all order items
export const fetchOrderItems = async () => {
  try {
    const response = await apiClient.get(orderItemEndpoints.getOrderItems());
    return response.data;
  } catch (error) {
    console.error("Error fetching order items:", error);
    throw error;
  }
};

// Fetch a specific order item by ID
export const fetchOrderItemById = async (id) => {
  try {
    const orderItem = await getOrderItemById(id);  // Calling repository method
    return orderItem;
  } catch (error) {
    console.error(`Error fetching order item with ID ${id}:`, error);
    throw error;  // Propagate the error
  }
};

export const createOrder = async (data) => {
  try {
    const response = await createOrderItem(data);
    return response.data
  } catch (error) {
    console.error("Error creating order item: ", error);
    throw error;
  }
}

// Update an existing order item by ID
export const updateOrderItemById = async (id, data) => {
  try {
    const response = await apiClient.put(orderItemEndpoints.updateOrderItem(id), data);
    return response.data;
  } catch (error) {
    console.error(`Error updating order item with ID ${id}:`, error);
    throw error;
  }
};

// Delete an order item by ID
export const deleteOrderItemById = async (id) => {
  try {
    const response = await apiClient.delete(orderItemEndpoints.deleteOrderItem(id));
    return response.data;
  } catch (error) {
    console.error(`Error deleting order item with ID ${id}:`, error);
    throw error;
  }
};
