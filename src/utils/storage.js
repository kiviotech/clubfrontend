// // Save JWT token to localStorage or secure storage
// export const saveToken = (token) => {
//   localStorage.setItem("authToken", token);
// };

// // Retrieve JWT token from localStorage
// export const getToken = () => {
//   return localStorage.getItem("authToken");
// };

// // Save user ID to localStorage or secure storage
// export const saveUserId = (userId) => {
//   localStorage.setItem("userId", userId);
// };

// export function getUserId(){
//   return localStorage.getItem("id")
// }

// // Remove JWT token from localStorage
// export const deleteToken = () => {
//   localStorage.removeItem("authToken");
//   localStorage.removeItem("userId");
// };

import AsyncStorage from '@react-native-async-storage/async-storage';

// Save JWT token to AsyncStorage
export const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem("authToken", token);
  } catch (error) {
    // console.error("Error saving token:", error);
  }
};

// Retrieve JWT token from AsyncStorage
export const getToken = async () => {
  try {
    return await AsyncStorage.getItem("authToken");
  } catch (error) {
    // console.error("Error retrieving token:", error);
    return null;
  }
};

// Save user ID to AsyncStorage
export const saveUserId = async (userId) => {
  try {
    await AsyncStorage.setItem("userId", userId);
  } catch (error) {
    // console.error("Error saving user ID:", error);
  }
};

// Remove JWT token and user ID from AsyncStorage
export const deleteToken = async () => {
  try {
    await AsyncStorage.removeItem("authToken");
    await AsyncStorage.removeItem("userId");
  } catch (error) {
    // console.error("Error deleting token or user ID:", error);
  }
};
