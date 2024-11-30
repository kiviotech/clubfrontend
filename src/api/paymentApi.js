import apiClient from "./apiClient";


export const createOrder = async (orderData) => {
    try {
      const response = await apiClient.post("/orders", orderData);
      return response.data.data;

    } catch (error) {
      // console.error("Error creating order:", error);
      throw error;
    }
  };
  
  export const initiatePayment = async (orderId, paymentDetails) => {
    try {
      const response = await apiClient.post(`/payment-initiate/${orderId}`, paymentDetails);
      return response.data;
    } catch (error) {
      // console.error("Error initiating payment:", error);
      throw error;
    }
  };
  
  export const updatePaymentStatus = async (orderId, paymentStatus) => {
    try {
      const response = await apiClient.put(`/orders/${orderId}/payment-status`, paymentStatus);
      return response.data;
    } catch (error) {
      // console.error("Error updating payment status:", error);
      throw error;
    }
  };