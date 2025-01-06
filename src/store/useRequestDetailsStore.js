import {create} from 'zustand';

const useRequestDetailsStore = create((set) => ({
  requestDetails: {},
  setRequestDetails: (details) => set({ requestDetails: details }),
}));

export default useRequestDetailsStore;
