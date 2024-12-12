import apiClient from "../apiClient";
import couponEndpoints from "../endpoints/couponEndpoints";

export const getCoupons = () => 
    apiClient.get(couponEndpoints.getCoupons);

export const getCouponById = (id) =>
  apiClient.get(couponEndpoints.getCouponById(id));

export const createCoupon = (data) =>
  apiClient.post(couponEndpoints.createCoupon, data);

export const updateCoupon = (id, data) =>
  apiClient.put(couponEndpoints.updateCoupon(id), data);

export const deleteCoupon = (id) =>
  apiClient.delete(couponEndpoints.deleteCoupon(id));
