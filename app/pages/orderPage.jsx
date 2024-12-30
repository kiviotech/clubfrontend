import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import OrderCart from "./orderCart";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { getUserWithOrderDetails } from "../../src/api/repositories/userRepository";
import { MEDIA_BASE_URL } from "../../src/api/apiClient";
import useUserDataStore from "../../src/store/userData";
import { useRouter } from "expo-router";

const OrderPage = () => {
  const navigation = useNavigation();
  const [orderDetails, setOrderDetails] = useState(null); // Store the fetched order details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const userId = useUserDataStore((state) => state.users[0]?.id);
  const router = useRouter();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const response = await getUserWithOrderDetails(userId); // Fetch data
        setOrderDetails(response?.data); // Save the fetched order details
        // console.log(response.data.order_details[0].orderItems[0].price)
        
        setLoading(false);
      } catch (err) {
        // console.error("Error fetching order details:", err);
        setError("Failed to fetch order details");
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [userId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }
  const handleHome = () => {
    router.push("/profile");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity
        onPress={() => {
          if (navigation.canGoBack()) {
            navigation.goBack(); // Go to the previous screen if available
          } else {
            handleHome() // Navigate to the correct route
          }
        }}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" color="white" size={30} />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Orders</Text>
        <View style={styles.container}>
          {orderDetails?.order_details?.map((order) =>
            order.orderItems.map((item) => {
              const product = item.product; // Access product data
              const imageUrl =
              product?.product_image && product.product_image.length > 0
                ? `${MEDIA_BASE_URL}${product.product_image[0]?.url}`
                : `${MEDIA_BASE_URL}/default-image.jpg`;
              const productName = product?.name || "No Name";
              const productPrice = product?.price || "0.00";
              const level = order.level;
              const id = order.id; // Extract order id
              const documentId = order.documentId;
              const updatedAt = order.updatedAt; // Get updatedAt from order
            const total = order.total; // Get total from order
            const quantity = item.quantity;
              

              return (
                <OrderCart
                  key={item.id} // Unique key for each OrderCart
                  imageUrl={imageUrl}
                  productName={productName}
                  productPrice={productPrice}
                  level={level}
                  id={id} // Pass id
                  documentId={documentId}
                  updatedAt={updatedAt} // Pass updatedAt
                  total={total} // Pass total
                  quantity={quantity} // Pass quantity
                />
              );
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000", // Black background
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 20,
    marginLeft: 17,
  },
  backButton: {
    marginTop: 15,
    marginLeft: 15,
  },
  loadingText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
  },
});

export default OrderPage;
