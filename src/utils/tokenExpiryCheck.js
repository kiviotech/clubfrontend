// // utils/tokenExpiryCheck.js (Frontend Utility)
// import { useEffect } from "react";
// import { useRouter } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import useUserDataStore from "../store/userData";
// import { Alert } from "react-native";

// const useTokenExpiryCheck = () => {
//   const router = useRouter();
//   const clearUsers = useUserDataStore((state) => state.clearUsers);

//   useEffect(() => {
//     const checkTokenExpiry = async () => {
//       try {
//         const token = await AsyncStorage.getItem("token");
//         if (token) {
//           setTimeout(() => {
//             Alert.alert(
//               "Session Expiring",
//               "Your session will expire in 5 seconds",
//               [{ text: "OK" }]
//             );
//           }, 150000);

//           setTimeout(async () => {
//             try {
//               clearUsers();

//               await AsyncStorage.clear();

//               Alert.alert(
//                 "Session Expired",
//                 "Your session has expired. Please login again.",
//                 [{ text: "OK" }]
//               );
//               router.replace("/(auth)/sign-in");
//             } catch (error) {
//               console.error("Error clearing storage:", error);
//             }
//           }, 200000);
//         }
//       } catch (error) {
//         console.error("Token check error:", error);
//       }
//     };

//     checkTokenExpiry();
//   }, []);
// };

// export default useTokenExpiryCheck;


// utils/tokenExpiryCheck.js (Frontend Utility)
import { useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import jwtDecode from 'jwt-decode';

/**
 * Custom hook to check if the JWT token has expired and handle logout
 * @param {Object} options - Configuration options
 * @param {boolean} options.showAlert - Whether to show an alert when token expires (default: true)
 * @param {boolean} options.redirectToLogin - Whether to redirect to login page when token expires (default: true)
 * @param {number} options.checkInterval - Interval in milliseconds to check token expiry (default: 60000 - 1 minute)
 * @returns {Object} - Object containing isTokenExpired state and logout function
 */
const useTokenExpiryCheck = (options = {}) => {
  const {
    showAlert = true,
    redirectToLogin = true,
    checkInterval = 60000, // Check every minute by default
  } = options;
  
  const router = useRouter();
  const intervalRef = useRef(null);
  const isMounted = useRef(true);

  // Function to check if token is expired
  const checkTokenExpiry = async () => {
    try {
      const token = await AsyncStorage.getItem('jwt');
      
      if (!token) {
        // No token found, consider as expired
        return true;
      }
      
      // Decode the token to get expiration time
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error('Error checking token expiry:', error);
      // If there's an error decoding the token, consider it expired
      return true;
    }
  };

  // Function to handle logout
  const handleLogout = async () => {
    try {
      // Clear all authentication data
      await AsyncStorage.multiRemove(['jwt', 'userId', 'userEmail']);
      
      // Clear interval to prevent memory leaks
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      
      // Show alert if enabled
      if (showAlert && isMounted.current) {
        Alert.alert(
          'Session Expired',
          'Your session has expired. Please log in again.',
          [
            {
              text: 'OK',
              onPress: () => {
                // Redirect to login page if enabled
                if (redirectToLogin && isMounted.current) {
                  router.replace('/sign-in');
                }
              },
            },
          ]
        );
      } else if (redirectToLogin && isMounted.current) {
        // Redirect without alert
        router.replace('/sign-in');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Set up token expiry check on component mount
  useEffect(() => {
    isMounted.current = true;
    
    // Initial check
    const initialCheck = async () => {
      const isExpired = await checkTokenExpiry();
      if (isExpired && isMounted.current) {
        handleLogout();
      }
    };
    
    initialCheck();
    
    // Set up interval for periodic checks
    intervalRef.current = setInterval(async () => {
      const isExpired = await checkTokenExpiry();
      if (isExpired && isMounted.current) {
        handleLogout();
      }
    }, checkInterval);
    
    // Clean up on unmount
    return () => {
      isMounted.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [router, showAlert, redirectToLogin, checkInterval]);

  return {
    checkTokenExpiry,
    handleLogout,
  };
};

export default useTokenExpiryCheck;

