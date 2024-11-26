

import apiClient from "../apiClient"; // Assuming apiClient is already set up
import paymentDetailsEndpoints from "../endpoints/paymentDetailsEndpoints";

// Method to get all payment details
export const getPaymentDetails = () => {
  return apiClient.get(paymentDetailsEndpoints.getPaymentDetails);
};

// Method to get a single payment detail by ID
export const getPaymentDetailById = (id) => {
  return apiClient.get(paymentDetailsEndpoints.getPaymentDetailById(id));
};

// Method to create a new payment detail
export const createPaymentDetail = (data) => {
  return apiClient.post(paymentDetailsEndpoints.createPaymentDetail, data);
};

// Method to update a payment detail by ID
export const updatePaymentDetail = (id, data) => {
  return apiClient.put(paymentDetailsEndpoints.updatePaymentDetail(id), data);
};

// Method to delete a payment detail by ID
export const deletePaymentDetail = (id) => {
  return apiClient.delete(paymentDetailsEndpoints.deletePaymentDetail(id));
};
