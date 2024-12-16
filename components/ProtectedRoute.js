import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          router.replace("/(auth)/sign-in");
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        router.replace("/(auth)/sign-in");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#8FFA09" />
      </View>
    );
  }

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
