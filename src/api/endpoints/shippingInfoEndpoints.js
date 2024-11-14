const shippingInfoEndpoints = {
    getAllShippingInfos: "/shipping-infos?populate=*",
    
    getShippingInfoById: (id) => `/shipping-infos/${id}`,
    createShippingInfo: "/shipping-infos",
    updateShippingInfo: (id) => `/shipping-infos/${id}`,
    deleteShippingInfo: (id) => `/shipping-infos/${id}`,
  };
  
  export default shippingInfoEndpoints;
  