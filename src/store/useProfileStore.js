import { create } from 'zustand';

const useProfileStore = create((set) => ({
  profile: {
    name: '',
    username: '',
    image: '',
  },
  setProfile: (profileData) => {
    // console.log('Updating profile store:', profileData); // Add logging here
    set({ profile: profileData });
  },
}));

export default useProfileStore;
