// const userEndpoints = {
//   getUsers: "/users",
//   getUserById: (id) => `/users/${id}`,
//   getUserProfileById: (id) =`/users?populate=profile&filters[documentId][$eq]=${id}`,
//   createUser: "/auth/local/register",
//   updateUser: (id) => `/users/${id}`,
//   deleteUser: (id) => `/users/${id}`,
//   changePassword: "/auth/change-password",
// };

// export default userEndpoints;

const userEndpoints = {
  getUsers: "/users",
  getUserById: (id) => `/users/${id}`,
  getUserProfileById: (id) => `/users?populate=profile&filters[documentId][$eq]=${id}`, // Corrected `= to =>`
  createUser: "/auth/local/register",
  updateUser: (id) => `/users/${id}`,
  deleteUser: (id) => `/users/${id}`,
  changePassword: "/auth/change-password",
};

export default userEndpoints
