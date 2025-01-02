// import { useEffect } from "react";
// import { BackHandler } from "react-native"; // For Android hardware back button
// import { useRouter } from "expo-router"; // Router from expo-router
// import useLogoutStateStore from "../../src/store/useLogoutStateStore"; 

// export const usePreventBackAfterLogout = () => {
//   const isLoggedOut = useLogoutStateStore((state) => state.isLoggedOut);
//   const router = useRouter();

//   useEffect(() => {
//     // Function to handle Android back button press
//     const handleBackPress = () => {
//       if (isLoggedOut) {
//         // Redirect to logout screen and prevent going back
//         router.replace("/pages/logoutScreen");
//         return true; // Prevent going back
//       }
//       return false; // Let normal back button behavior occur if not logged out
//     };

//     // Attach the BackHandler for Android hardware back button
//     const backHandler = BackHandler.addEventListener(
//       "hardwareBackPress", // Handle Android back button press
//       handleBackPress
//     );

//     return () => {
//       // Cleanup the backHandler event on component unmount
//       backHandler.remove();
//     };
//   }, [isLoggedOut, router]); // Run this effect whenever the logout state or router changes
// };

// import { useEffect } from "react";
// import { BackHandler, Platform } from "react-native";
// import { useRouter } from "expo-router";
// import useLogoutStateStore from "../../src/store/useLogoutStateStore";

// export const usePreventBackAfterLogout = () => {
//   const isLoggedOut = useLogoutStateStore((state) => state.isLoggedOut);
//   const router = useRouter();

//   useEffect(() => {
//     const handleBackPress = () => {
//       if (isLoggedOut) {
//         // Prevent navigation and redirect to the logout screen
//         router.replace("/pages/logoutScreen");
//         return true; // Stop back navigation
//       }
//       return false; // Allow normal navigation if not logged out
//     };

//     const handleBrowserBack = (event) => {
//       if (isLoggedOut) {
//         event.preventDefault(); // Prevent default browser behavior
//         event.stopPropagation(); // Stop further propagation
//         router.replace("/pages/logoutScreen");
//         return false; // Block navigation
//       }
//     };

//     if (Platform.OS === "android") {
//       // Handle hardware back button for Android
//       const backHandler = BackHandler.addEventListener("hardwareBackPress", handleBackPress);
//       return () => backHandler.remove();
//     } else if (Platform.OS === "web") {
//       // Intercept browser navigation events for the web
//       window.addEventListener("popstate", handleBrowserBack);

//       return () => {
//         window.removeEventListener("popstate", handleBrowserBack);
//       };
//     }
//   }, [isLoggedOut, router]);
// };


import { useEffect } from "react";
import { BackHandler, Platform } from "react-native";
import { useRouter } from "expo-router";
import useLogoutStateStore from "../../src/store/useLogoutStateStore";

export const usePreventBackAfterLogout = () => {
  const isLoggedOut = useLogoutStateStore((state) => state.isLoggedOut);
  const router = useRouter();

  useEffect(() => {
    const handleBackPress = () => {
      if (isLoggedOut) {
        router.replace("/pages/logoutScreen");
        return true; // Prevent back navigation
      }
      return false; // Allow normal navigation if not logged out
    };

    const handleBrowserBack = () => {
      if (isLoggedOut) {
        // Push the logout screen onto the browser's history to prevent back navigation
        router.replace("/pages/logoutScreen");
        window.history.pushState(null, "", "/pages/logoutScreen");
      }
    };

    if (Platform.OS === "android") {
      // Handle Android hardware back button
      const backHandler = BackHandler.addEventListener("hardwareBackPress", handleBackPress);
      return () => backHandler.remove();
    } else if (Platform.OS === "web") {
      // Intercept browser back and forward navigation
      window.addEventListener("popstate", handleBrowserBack);

      // Push an initial state to trap navigation
      if (isLoggedOut) {
        window.history.pushState(null, "", "/pages/logoutScreen");
      }

      return () => {
        window.removeEventListener("popstate", handleBrowserBack);
      };
    }
  }, [isLoggedOut, router]);
};
