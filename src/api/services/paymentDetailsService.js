// src/services/paymentDetailsService.js

import {
    getPaymentDetails,
    getPaymentDetailById,
    createPaymentDetail,
    updatePaymentDetail,
    deletePaymentDetail,
  } from "../repositories/paymentDetailsRepository";
  
  // Fetch all payment details
  export const fetchPaymentDetails = async () => {
    try {
      const response = await getPaymentDetails();
      return response.data;
    } catch (error) {
      // console.error("Error fetching payment details:", error);
      throw error;
    }
  };
  
  // Fetch a specific payment detail by ID
  export const fetchPaymentDetailById = async (id) => {
    try {
      const response = await getPaymentDetailById(id);
      return response.data;
    } catch (error) {
      // console.error(`Error fetching payment detail with ID ${id}:`, error);
      throw error;
    }
  };
  
  // Create a new payment detail
  export const createPaymentDetailService = async (data) => {
    try {
      const response = await createPaymentDetail(data);
      return response.data;
    } catch (error) {
      // console.error("Error creating payment detail: ", error);
      throw error;
    }
  };
  
  // Update an existing payment detail by ID
  export const updatePaymentDetailById = async (id, data) => {
    try {
      const response = await updatePaymentDetail(id, data);
      return response.data;
    } catch (error) {
      // console.error(`Error updating payment detail with ID ${id}:`, error);
      throw error;
    }
  };
  
  // Delete a payment detail by ID
  export const deletePaymentDetailById = async (id) => {
    try {
      const response = await deletePaymentDetail(id);
      return response.data;
    } catch (error) {
      (`Error deleting payment detail with ID ${id}:`, error);
      throw error;
    }
  };
  