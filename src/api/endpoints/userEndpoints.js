const userEndpoints = {
  getUsers: "/users",
  getUserById: (id) => `/users/${id}`,
  getUserProfileById: (id) =`/users?populate=profile&filters[documentId][$eq]=${id}`,
  createUser: "/auth/local/register",
  updateUser: (id) => `/users/${id}`,
  deleteUser: (id) => `/users/${id}`,
};

export default userEndpoints;
