// orderEndpoints.js
const orderEndpoints = {
  // Fetch all orders with all related data
  getOrders: "/orders?populate=*",

  // Fetch a single order by its ID
  getOrderById: (id) => `/orders/${id}`,

  // Create a new order
  createOrder: "/orders",

  // Update an existing order by its ID
  updateOrder: (id) => `/orders/${id}`,

  // Delete an order by its ID
  deleteOrder: (id) => `/orders/${id}`,
};

export default orderEndpoints;
