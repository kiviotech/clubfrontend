const sizeEndpoints = {
    getSizes: () => "/sizes?populate=*",
    getSizeById: (id) => `/sizes/${id}`,
    createSize: "/sizes",
    updateSize: (id) => `/sizes/${id}`,
    deleteSize: (id) => `/sizes/${id}`,
  };
  
  export default sizeEndpoints;
  