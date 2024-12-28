// utils/tokenExpiryCheck.js (Frontend Utility)
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { getToken, deleteToken } from "../utils/storage"; // Utility functions to get and delete tokens
import { logout } from "../utils/auth"; // Your existing logout function

const useTokenExpiryCheck = () => {
  const router = useRouter();

  useEffect(() => {
    const checkTokenExpiry = async () => {
      const token = await getToken(); // Get the token from storage

      if (!token) {
        logout(); // Log out if no token is present
        router.push("/home"); // Redirect to the home page as a guest
      } else {
        // You can decode JWT here to check expiration if you are using JWT tokens
        // const decodedToken = jwtDecode(token);
        // const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
        // if (Date.now() > expirationTime) {
        //   logout(); // Log out if the token has expired
        //   router.push("/home"); // Redirect to the home page
        // }
      }
    };

    checkTokenExpiry();
  }, []); // Run only once on component mount
};

export default useTokenExpiryCheck;
