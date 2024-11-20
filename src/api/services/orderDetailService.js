import {
  getOrderDetails,
  getOrderDetailById,
  createOrderDetail,
  updateOrderDetail,
  deleteOrderDetail,
} from "../repositories/orderDetailRepository";

// Fetch all order details
export const fetchOrderDetails = async () => {
  try {
    const response = await getOrderDetails();
    return response.data;
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
};

// Fetch a specific order detail by ID
export const fetchOrderDetailById = async (id) => {
  try {
    const response = await getOrderDetailById(id);
    return response.data;
  } catch (error) {
    console.error(`Error fetching order detail with ID ${id}:`, error);
    throw error;
  }
};

// Create a new order detail
export const createOrderDetailService = async (data) => {
  try {
    const response = await createOrderDetail(data);
    return response.data;
  } catch (error) {
    console.error("Error creating order detail: ", error);
    throw error;
  }
};

// Update an existing order detail by ID
export const updateOrderDetailById = async (id, data) => {
  try {
    const response = await updateOrderDetail(id, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating order detail with ID ${id}:`, error);
    throw error;
  }
};

// Delete an order detail by ID
export const deleteOrderDetailById = async (id) => {
  try {
    const response = await deleteOrderDetail(id);
    return response.data;
  } catch (error) {
    console.error(`Error deleting order detail with ID ${id}:`, error);
    throw error;
  }
};
