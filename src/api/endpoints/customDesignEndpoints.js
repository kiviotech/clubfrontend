const customDesignEndpoints = {
    getCustomDesigns: "/custom-designs?populate=*",
    getCustomDesignById: (id) => `/custom-designs/${id}`,
    createCustomDesign: "/custom-designs",
    updateCustomDesign: (id) => `/custom-designs/${id}`,
    deleteCustomDesign: (id) => `/custom-designs/${id}`,
  };
  
  export default customDesignEndpoints;
  