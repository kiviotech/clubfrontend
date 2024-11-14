const productEndpoints = {
    getProducts: () => "/products?populate=*",
    getProductById: (id) => `/products/${id}`,
    createProduct: "/products",
    updateProduct: (id) => `/products/${id}`,
    deleteProduct: (id) => `/products/${id}`,
  };
  
  export default productEndpoints;
  