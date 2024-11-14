import apiClient from "../api/apiClient";
import { deleteToken, saveToken, saveUserId } from "./storage";

// Login function
export const login = async (email, password) => {
  try {
    const response = await apiClient.post("/auth/local", {
      identifier: email,
      password: password,
    });

    // Extract JWT and user data from the response
    const { jwt, user } = response.data;

    // console.log("auth.js", jwt, response.data);

    // Save the JWT and user ID to secure storage
    saveToken(jwt);
    saveUserId(user.id);

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
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

    // Return the response data
    return response.data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

// Logout function
export const logout = () => {
  deleteToken(); // Remove the JWT token from storage
};



// import apiClient from "../api/apiClient";
// import { deleteToken, saveToken, saveUserId } from "./storage";

// // Login function
// export const loginUser = async (credentials) => {
//   try {
//     const response = await apiClient.post("/auth/local", credentials);
//     const { jwt, user } = response.data;

//     // Save the JWT and user ID to secure storage
//     saveToken(jwt);
//     saveUserId(user.id);

//     return response.data;
//   } catch (error) {
//     console.error("Login error:", error);
//     throw error;
//   }
// };

// // Signup function
// export const createUser = async (username, email, password) => {
//   try {
//     const response = await apiClient.post("/auth/local/register", {
//       username,
//       email,
//       password,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Signup error:", error);
//     throw error;
//   }
// };

// // Logout function
// export const logout = () => {
//   deleteToken(); // Remove the JWT token from storage
// };
