import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../../api/repositories/orderRepository";

export const fetchOrders = async () => {
  try {
    const response = await getOrders();
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchOrderById = async (id) => {
  try {
    const response = await getOrderById(id);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createNewOrder = async (data) => {
  try {
    const response = await createOrder(data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateExistingOrder = async (id, data) => {
  try {
    const response = await updateOrder(id, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeOrder = async (id) => {
  try {
    const response = await deleteOrder(id);
    return response.data;
  } catch (error) {
    throw error;
  }
};
