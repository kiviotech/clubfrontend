// import axios from "axios";
// import { getToken } from "../utils/storage";

// export const BASE_URL = "http://192.168.1.5:1337/api";
// export const MEDIA_BASE_URL = "http://192.168.1.5:1337";

// const apiClient = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// apiClient.interceptors.request.use(
//   (config) => {
//     const token = getToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default apiClient;

// // import axios from "axios";
// // import { getToken } from "../utils/storage";
// // import { Platform } from "react-native";  // Import Platform

// // const BASE_URL = Platform.select({
// //   web: "http://localhost:1337/api",
// //   android: "http://192.168.0.253:1337/api",
// //   ios: "http://localhost:1337/api", // For iOS simulator (if needed)
// // });

// // const MEDIA_BASE_URL = Platform.select({
// //   web: "http://localhost:1337",
// //   android: "http://192.168.0.253:1337",
// //   ios: "http://localhost:1337",
// // });

// // const apiClient = axios.create({
// //   baseURL: BASE_URL,
// //   headers: {
// //     "Content-Type": "application/json",
// //   },
// // });

// // apiClient.interceptors.request.use(
// //   (config) => {
// //     const token = getToken();
// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`;  // Fixed syntax here
// //     }
// //     return config;
// //   },
// //   (error) => Promise.reject(error)
// // );

// // export default apiClient;

// // export const BASE_URL = "http://localhost:1337/api";
// // export const MEDIA_BASE_URL = "http://localhost:1337";

// // export const BASE_URL = "http://192.168.54.203:1337/api";
// // export const MEDIA_BASE_URL = "http://192.168.54.203:1337";

// // export const BASE_URL = "http://localhost:1337/api";
// // export const MEDIA_BASE_URL = "http://localhost:1337";

import axios from "axios";
import { getToken } from "../utils/storage";

export const BASE_URL = "http://localhost:1337/api";
export const MEDIA_BASE_URL = "http://localhost:1337";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await getToken(); // Ensure the function call is correct
      // console.log('Fetched token:', token); // Debugging log

      if (token) {
        config.headers.Authorization =` Bearer ${token}`;
        //console.log("Token set in headers"); // Debugging log
      } else {
        //console.warn("No token available"); // Warn if no token is found
      }
    } catch (error) {
      console.error("Error fetching token:", error); // Log any error in fetching the token
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
