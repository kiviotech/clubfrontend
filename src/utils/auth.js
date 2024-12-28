import apiClient from "../api/apiClient";
import { deleteToken, saveToken, saveUserId } from "./storage";
import useUserDataStore from "../store/userData";
import {useStore} from "zustand";

// Login function
export const login = async (email, password) => {
  try {
    // Make login API call
    const response = await apiClient.post("/auth/local", {
      identifier: email,
      password,
    });

    // Destructure JWT and user object from the response
    const { jwt, user } = response.data;

    // Create user data object with all available user data
    const userData = {
      id: user.id,
      documentId: user.documentId || "",
      username: user.username,
      email: user.email,
      provider: user.provider,
      confirmed: user.confirmed,
      blocked: user.blocked,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      role: user.role,
      // Add any other available user fields here
    };

    // Save JWT token and user ID
    saveToken(jwt);
    saveUserId(user.id);

    // Get store function
    const addUser = useUserDataStore.getState().addUser;

    // Check if store function is available
    if (!addUser) {
      // console.error("Store function not found");
      throw new Error("Failed to access store function");
    }

    try {
      // Update user data store with complete user data
      addUser(userData);
    } catch (storeError) {
      // console.error("Error updating store:", storeError);
      throw new Error("Failed to update user store");
    }

    return response.data;
  } catch (error) {
    // console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

// Signup function
export const signup = async (username, email, password) => {
  try {
    const response = await apiClient.post("/auth/local/register", {
      username,
      email,
      password,
    });

    // Destructure JWT and user from response
    const { jwt, user } = response.data;

    // Save JWT token and user ID
    saveToken(jwt);
    saveUserId(user.id);

    // // Access Zustand stores
    // const addUser = useUserDataStore.getState().addUser;
    // const setUser = useStore.getState().setUser;

    // // Check if store functions are available
    // if (!addUser || !setUser) {
    //   console.error("Store functions not found");
    //   throw new Error("Failed to access store functions");
    // }

    // // Update user data store
    // addUser({
    //   id: user.id,
    //   documentId: user.documentId || "",
    //   username: user.username,
    //   email: user.email,
    // });

    // // Update main user store
    // setUser({
    //   id: user.id,
    //   documentId: user.documentId || "",
    //   username: user.username,
    //   email: user.email,
    // });

    return response.data;
  } catch (error) {
    // console.error("Signup error:", error.response?.data || error.message);
    throw error;
  }
};

export const changePassword = async (currentPassword, password, passwordConfirmation) => {
  try {
    const response = await apiClient.post("/auth/change-password", {
      currentPassword,
      password,
      passwordConfirmation,
    });

    // Log and return the response to notify the user
    // console.log("Change password response:", response.data);
    return response.data;
  } catch (error) {
    // console.error("Change password error:", error.response?.data || error.message);
    throw error;
  }
};


export const forgotPassword = async (email) => {
  try {
    const response = await apiClient.post("/auth/forgot-password", {
      email,
    });

    // Handle the response and notify the user
    // console.log("Forgot password response:", response.data);
    return response.data;
  } catch (error) {
    // console.error("Forgot password error:", error);
    throw error;
  }
};

export const resetPassword = async (data) => {
  try {
    const response = await apiClient.post("/auth/reset-password", 
      {
        "password": data.password,
        "passwordConfirmation": data.passwordConfirm,
        "code": data.code
      }
    );

    // Handle the response and notify the user
    // console.log("Forgot password response:", response.data);
    return response.data;
  } catch (error) {
    // console.error("Forgot password error:", error);
    throw error;
  }
};

// Logout function
export const logout = () => {
  try {
    // Clear JWT token from storage
    deleteToken();

    // Clear user data from Zustand store
    const clearUserData = useUserDataStore.getState().clearUserData; // Ensure you have this action defined
    if (clearUserData) {
      clearUserData(); // Reset user data
    }
  } catch (error) {
    // console.error("Logout error:", error);
    throw error;
  }
};