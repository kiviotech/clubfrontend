
const profileEndpoints = {
    getProfiles: () => "/profiles?populate=*",
    getProfileByUserId: (userId) => `/profiles?filters[user]=${userId}&populate=*`, // Fetch profile by user ID
    createProfile: "/profiles",
    updateProfile: (userId) => `/profiles/${userId}`, // Update profile by user ID
    deleteProfile: (userId) => `/profiles/${userId}`, // Delete profile by user ID
  };
  
  export default profileEndpoints;
  
  