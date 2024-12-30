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
import { useEffect } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useUserDataStore from "../store/userData";
import { Alert } from "react-native";
import dayjs from "dayjs"; // Install with `npm install dayjs`

const useTokenExpiryCheck = () => {
  const router = useRouter();
  const clearUsers = useUserDataStore((state) => state.clearUsers);

  useEffect(() => {
    const checkTokenExpiry = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const expiryTime = await AsyncStorage.getItem("expiryTime");

        if (token && expiryTime) {
          const currentTime = dayjs();
          const tokenExpiry = dayjs(expiryTime);

          if (tokenExpiry.isBefore(currentTime)) {
            // Token has already expired
            await clearSession();
          } else {
            // Time left until expiration
            const timeLeft = tokenExpiry.diff(currentTime);

            setTimeout(() => {
              Alert.alert(
                "Session Expiring Soon",
                "Your session will expire in 1 day.",
                [{ text: "OK" }]
              );
            }, timeLeft - 24 * 60 * 60 * 1000); // Show alert 1 day before expiration

            setTimeout(async () => {
              await clearSession();
            }, timeLeft);
          }
        }
      } catch (error) {
        console.error("Token check error:", error);
      }
    };

    const clearSession = async () => {
      try {
        clearUsers();
        await AsyncStorage.clear();
        Alert.alert(
          "Session Expired",
          "Your session has expired. Please log in again.",
          [{ text: "OK" }]
        );
        router.replace("/(auth)/sign-in");
      } catch (error) {
        console.error("Error clearing storage:", error);
      }
    };

    checkTokenExpiry();
  }, []);
};

export const setTokenWithExpiry = async (token) => {
  try {
    const expiryTime = dayjs().add(30, "day").toISOString();
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("expiryTime", expiryTime);
  } catch (error) {
    console.error("Error setting token:", error);
  }
};

export default useTokenExpiryCheck;

