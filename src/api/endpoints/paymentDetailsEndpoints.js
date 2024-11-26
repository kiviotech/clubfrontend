// src/endpoints/paymentDetailsEndpoints.js

const paymentDetailsEndpoints = {
    getPaymentDetails: "/payment-details?populate=*",
    getPaymentDetailById: (id) => `/payment-details/${id}`,
    createPaymentDetail: "/payment-details",
    updatePaymentDetail: (id) => `/payment-details/${id}`,
    deletePaymentDetail: (id) => `/payment-details/${id}`,
  };
  
  export default paymentDetailsEndpoints;
  