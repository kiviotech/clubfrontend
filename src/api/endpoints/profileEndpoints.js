const profileEndpoints = {
    getProfiles: () => "/profiles?populate=*", // Fetch all profiles with populated relations
    getProfileById: (id) => `/profiles/${id}?populate=*`, // Fetch a profile by ID with populated relations
    createProfile: "/profiles", // Endpoint to create a new profile
    updateProfile: (id) => `/profiles/${id}`, // Endpoint to update a profile by ID
    deleteProfile: (id) => `/profiles/${id}`, // Endpoint to delete a profile by ID
  };
  
  export default profileEndpoints;
  