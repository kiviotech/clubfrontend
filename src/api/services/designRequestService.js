import {
    getDesignRequests,
    getDesignRequestById,
    createDesignRequest,
    updateDesignRequest,
    deleteDesignRequest,
  } from "../../api/repositories/designRequestRepository";
  
  export const fetchDesignRequests = async () => {
    try {
      const response = await getDesignRequests();
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const fetchDesignRequestById = async (id) => {
    try {
      const response = await getDesignRequestById(id);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const createNewDesignRequest = async (data) => {
    try {
      const response = await createDesignRequest(data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const updateExistingDesignRequest = async (id, data) => {
    try {
      const response = await updateDesignRequest(id, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const removeDesignRequest = async (id) => {
    try {
      const response = await deleteDesignRequest(id);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  