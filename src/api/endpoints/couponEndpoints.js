const couponEndpoints = {
    getCoupons: "/coupons", // Retrieve all coupons
    getCouponById: (id) => `/coupons/${id}`, // Retrieve a specific coupon by ID
    createCoupon: "/coupons", // Create a new coupon
    updateCoupon: (id) => `/coupons/${id}`, // Update an existing coupon by ID
    deleteCoupon: (id) => `/coupons/${id}`, // Delete a specific coupon by ID
  };
  
  export default couponEndpoints;
  