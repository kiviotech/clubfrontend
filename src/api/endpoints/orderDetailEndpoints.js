const orderDetailEndpoints = {
  getOrderDetails: "/order-details?populate=*",
  getOrderDetailById: (id) => `/order-details/${id}`,
  createOrderDetail: "/order-details",
  updateOrderDetail: (id) => `/order-details/${id}`,
  deleteOrderDetail: (id) => `/order-details/${id}`,
};

export default orderDetailEndpoints;
