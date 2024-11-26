const orderItemEndpoints = {
    getOrderItems: "/order-items?populate=*",
    // getOrderItemById: (id) => `/order-items/${id}`,
    getOrderItemById: (id) => `/order-items/${id}?populate[product][populate]=*`,
    createOrderItem: "/order-items",
    updateOrderItem: (id) => `/order-items/${id}`,
    deleteOrderItem: (id) => `/order-items/${id}`,
  };
  
  export default orderItemEndpoints;
  