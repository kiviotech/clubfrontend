const shippingInfoEndpoints = {
    getAllShippingInfos: () =>"/shipping-infos?populate=*",
    getShippingInfoByUserId: (userId) => `/shipping-infos?filters[user]=${userId}&populate=*`,
    createShippingInfo: "/shipping-infos",
    updateShippingInfo: (id) => `/shipping-infos/${id}`,
    deleteShippingInfo: (id) => `/shipping-infos/${id}`,
  };
  
  export default shippingInfoEndpoints;
  