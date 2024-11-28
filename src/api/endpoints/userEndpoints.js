// const userEndpoints = {
//   getUsers: "/users",
//   getUserById: (id) => `/users/${id}`,
//   getUserProfileById: (id) =`/users?populate=profile&filters[documentId][$eq]=${id}`,
//   createUser: "/auth/local/register",
//   updateUser: (id) => `/users/${id}`,
//   deleteUser: (id) => `/users/${id}`,
// };

// export default userEndpoints;


const userEndpoints = {
  getUsers: "/users",
  getUserById: (id) => `/users/${id}`,
  // getUserProfileById: (id) => `/users?populate=profile&filters[documentId][$eq]=${id}`, // Corrected `= to =>`
  createUser: "/auth/local/register",
  updateUser: (id) => `/users/${id}`,
  deleteUser: (id) => `/users/${id}`,
  changePassword: "/auth/change-password",
  getUserWithOrderDetails: (id) => `/users/${id}?populate[order_details][populate][orderItems][populate][product][populate]=*`,
  getUserWithDesignRequests: (id) =>
    `/users/${id}?populate[design_requests][populate]=*`, // Added endpoint for design requests
  getUserProfile:(id) => `/users/${id}?populate[profile][populate]=*`,
};

export default userEndpoints
