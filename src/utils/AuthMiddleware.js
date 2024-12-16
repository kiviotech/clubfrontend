// frontend/src/utils/AuthMiddleware.js
import { useEffect } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAuthMiddleware = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          router.replace("/(auth)/sign-in");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        router.replace("/(auth)/sign-in");
      }
    };

    checkAuth();
  }, []);
};
