const designRequestEndpoints = {
    getDesignRequests: () => "/design-requests?populate=*",
    getDesignRequestById: (id) => `/design-requests/${id}`,
    createDesignRequest: "/design-requests",
    updateDesignRequest: (id) => `/design-requests/${id}`,
    deleteDesignRequest: (id) => `/design-requests/${id}`,
  };
  
  export default designRequestEndpoints;
  