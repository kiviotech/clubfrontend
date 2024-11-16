// const profileEndpoints = {
//     getProfiles: () => "/profiles?populate=*",
//     getProfileById: (id) => `/profiles/${id}`,
//     createProfile: "/profiles",
//     updateProfile: (id) => `/profiles/${id}`,
//     deleteProfile: (id) => `/profiles/${id}`,
//   };
  
//   export default profileEndpoints;

const profileEndpoints = {
    getProfiles: () => "/profiles?populate=*",
    getProfileByUserId: (userId) => `/profiles?filters[user]=${userId}&populate=*`, // Fetch profile by user ID
    createProfile: "/profiles",
    updateProfile: (userId) => `/profiles/${userId}`, // Update profile by user ID
    deleteProfile: (userId) => `/profiles/${userId}`, // Delete profile by user ID
  };
  
  export default profileEndpoints;
  
  