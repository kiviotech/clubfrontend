const brandCollabEndpoints = {
    getBrandCollabs: "/brand-collabs?populate=*",
    
    getBrandCollabById: (id) => `/brand-collabs/${id}`,
    createBrandCollab: "/brand-collabs",
    updateBrandCollab: (id) => `/brand-collabs/${id}`,
    deleteBrandCollab: (id) => `/brand-collabs/${id}`,
  };
  
  export default brandCollabEndpoints;
  