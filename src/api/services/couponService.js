import {
    getCoupons,
    getCouponById,
    createCoupon,
    updateCoupon,
    deleteCoupon,
  } from "../../api/repositories/couponRepository";
  
  export const fetchCoupons = async () => {
    try {
      const response = await getCoupons();
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const fetchCouponById = async (id) => {
    try {
      const response = await getCouponById(id);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const createNewCoupon = async (data) => {
    try {
      const response = await createCoupon(data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const updateExistingCoupon = async (id, data) => {
    try {
      const response = await updateCoupon(id, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const removeCoupon = async (id) => {
    try {
      const response = await deleteCoupon(id);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  