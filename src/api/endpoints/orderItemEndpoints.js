const orderItemEndpoints = {
    getOrderItems: "/order-items?populate=*",
    getOrderItemById: (id) => `/order-items/${id}`,
    createOrderItem: "/order-items",
    updateOrderItem: (id) => `/order-items/${id}`,
    deleteOrderItem: (id) => `/order-items/${id}`,
  };
  
  export default orderItemEndpoints;
  