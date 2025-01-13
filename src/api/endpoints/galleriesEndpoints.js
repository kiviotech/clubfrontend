const galleriesEndpoints = {
    getGalleries: "/galleries?populate=*",
  
    getGalleryById: (id) => `/galleries/${id}`,
    createGallery: "/galleries",
    updateGallery: (id) => `/galleries/${id}`,
    deleteGallery: (id) => `/galleries/${id}`,
  };
  
  export default galleriesEndpoints;
  