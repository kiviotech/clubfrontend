const brandEndpoints = {
  getBrands: "/brands?populate=*",
  
  getBrandById: (id) => `/brands/${id}`,
  createBrand: "/brands",
  updateBrand: (id) => `/brands/${id}`,
  deleteBrand: (id) => `/brands/${id}`,
};

export default brandEndpoints;