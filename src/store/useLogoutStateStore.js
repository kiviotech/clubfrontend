import {create} from 'zustand';

const useLogoutStateStore = create((set) => ({
  isLoggedOut: false,
  setLoggedOut: (state) => set({ isLoggedOut: state }),
}));

export default useLogoutStateStore;
