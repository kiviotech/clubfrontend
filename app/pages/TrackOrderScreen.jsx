import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
// Import AsyncStorage
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { updateOrderDetailById, fetchOrderDetailById } from "../../src/api/services/orderDetailService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useOrderStorelevel from "../../src/store/useOrderStorelevel"

const TrackOrderScreen = () => {
  const trackingProgress = useRef(new Animated.Value(0)).current;
  const { imageUrl, productName, productPrice, id, documentId,total,quantity,formattedDate } = useLocalSearchParams();
  const { setOrderLevel } = useOrderStore();

  const [steps, setSteps] = useState([
    { status: "Order placed", description: "Your order has been placed", icon: "check-circle" },
    { status: "Order confirmed", description: "Your order has been confirmed", icon: "check-circle" },
    { status: "Order processed", description: "Your order has been processed and ready for shipping", icon: "check-circle" },
    { status: "Shipped", description: "Your order has been shipped", icon: "local-shipping" },
    { status: "Out for delivery", description: "Your order is out for delivery", icon: "directions-bike" },
    { status: "Delivered", description: "Your order has been successfully delivered", icon: "home" },
  ]);
  const [currentStep, setCurrentStep] = useState(1);
  const [isCanceled, setIsCanceled] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const levelMapping = {
    pending: 1,
    processing: 2,
    shipped: 3,
    delivered: 4,
    cancelled: -1,
  };

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        // Get cached status from AsyncStorage
        const cachedStatus = await AsyncStorage.getItem(`order_${documentId}_status`);
        if (cachedStatus) {
          setCurrentStep(levelMapping[cachedStatus]);
          setIsCanceled(cachedStatus === "cancelled");
        }

        // Fetch order details from backend
        const orderDetail = await fetchOrderDetailById(documentId);
        const backendLevel = orderDetail?.data?.level || "pending";

        // Save status to AsyncStorage
        await AsyncStorage.setItem(`order_${documentId}_status`, backendLevel);

        const stepIndex = levelMapping[backendLevel];
        if (backendLevel === "cancelled") {
          setSteps([
            steps[0],
            { status: "Order Cancelled", description: "Your order has been canceled.", icon: "cancel" },
          ]);
          setIsCanceled(true);
        } else {
          setCurrentStep(stepIndex);
        }
        setOrderLevel(backendLevel);
      } catch (error) {
        // console.error("Error fetching order status:", error);
      }
    };

    fetchOrderStatus();
  }, []);

  useEffect(() => {
    Animated.timing(trackingProgress, {
      toValue: currentStep,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [currentStep]);

  const handleCancelOrder = async () => {
    try {
      const updatedStatus = { level: "cancelled" };
      await updateOrderDetailById(documentId, updatedStatus);

      setSteps([
        steps[0],
        { status: "Order Cancelled", description: "Your order has been canceled.", icon: "cancel" },
      ]);
      setIsCanceled(true);
      setShowCancelModal(false);

      // Update AsyncStorage
      await AsyncStorage.setItem(`order_${documentId}_status`, "cancelled");

      Alert.alert("Order Canceled", "Your order has been successfully canceled.");
      setOrderLevel("cancelled");
    } catch (error) {
      // console.error("Error cancelling the order:", error);
      Alert.alert("Error", "Failed to cancel the order. Please try again.");
    }
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Track Your Order</Text>
      <Text style={styles.orderId}>Order {documentId}</Text>

      {/* Product Information */}
      <View style={styles.productContainer}>
        <Image
          source={{ uri: imageUrl || "https://example.com/fallback.png" }}
          style={styles.productImage}
        />
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{productName}</Text>
          <Text style={styles.productPrice}>${total}</Text>
          <Text style={styles.deliveryDate}>Order date : {formattedDate}</Text>
          <Text style={styles.deliveryDate}>Quantity : {quantity}</Text>
          <View style={styles.ratingContainer}>
            {Array.from({ length: 5 }).map((_, index) => (
              <FontAwesome key={index} name="star" size={16} color="#FFD700" />
            ))}
          </View>
        </View>
      </View>

      {/* Vertical Step Indicator */}
      <View style={styles.trackingContainer}>
        {steps.map((step, index) => (
          <View key={index} style={styles.trackingStepContainer}>
            <View style={styles.iconContainer}>
              <MaterialIcons
                name={step.icon}
                size={24}
                color={index <= currentStep ? "#3CE13D" : "#555"}
              />
              {index < steps.length - 1 && (
                <Animated.View
                  style={[
                    styles.verticalLine,
                    {
                      backgroundColor: "#3CE13D",
                      opacity: trackingProgress.interpolate({
                        inputRange: [index, index + 1],
                        outputRange: [1, 0.3],
                        extrapolate: "clamp",
                      }),
                      height: trackingProgress.interpolate({
                        inputRange: [index, index + 1],
                        outputRange: [40, 0],
                        extrapolate: "clamp",
                      }),
                    },
                  ]}
                />
              )}
            </View>
            <View style={styles.trackingTextContainer}>
              <Text
                style={[
                  styles.trackingStatus,
                  {
                    color:
                      step.status === "Order Cancelled"
                        ? "#EF4444"
                        : index <= currentStep
                        ? "#3CE13D"
                        : "#777",
                  },
                ]}
              >
                {step.status}
              </Text>
              <Text style={styles.trackingDescription}>
                {step.description}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Order Canceled Message */}
      {isCanceled && (
        <Text style={styles.canceledMessage}>Your order has been canceled.</Text>
      )}

      {/* Action Buttons */}
      <View style={[styles.buttonContainer, styles.buttonSpacing]}>
        {/* <TouchableOpacity style={styles.trackButton}>
          <Text style={styles.buttonText}>Track Order</Text>
        </TouchableOpacity> */}
        {!isCanceled && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setShowCancelModal(true)}
          >
            <Text style={[styles.buttonText, styles.cancelButtonText]}>
              Cancel Order
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Confirmation Modal */}
      <Modal
        transparent={true}
        visible={showCancelModal}
        animationType="slide"
        onRequestClose={() => setShowCancelModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cancel Order</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to cancel this order?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButtonCancel}
                onPress={() => setShowCancelModal(false)}
              >
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtonConfirm}
                onPress={handleCancelOrder}
              >
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
    // marginBottom:40

  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 10,
  },
  orderId: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 15,
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 20,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "500",
    color: "#3CE13D",
    marginTop: 5,
  },
  deliveryDate: {
    fontSize: 14,
    color: "#bbb",
    marginTop: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  trackingContainer: {
    marginBottom: 20,
  },
  trackingStepContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  iconContainer: {
    alignItems: "center",
    marginRight: 10,
  },
  verticalLine: {
    width: 2,
    marginTop: 2,
  },
  trackingTextContainer: {
    flex: 1,
  },
  trackingStatus: {
    fontSize: 16,
    fontWeight: "bold",
  },
  trackingDescription: {
    color: "#ccc",
    fontSize: 14,
  },
  canceledMessage: {
    color: "#EF4444",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  buttonContainer: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    // marginTop: 20,
    marginBottom:40
  },
  buttonSpacing: {
    justifyContent: "space-evenly",
  },
  trackButton: {
    backgroundColor: "#3CE13D",
    padding: 15,
    borderRadius: 10,
    flex: 0.45,
    alignItems: "center",
    elevation: 5,
  },
  cancelButton: {
    backgroundColor: "#EF4444",
    padding: 15,
    borderRadius: 10,
    flex: 0.45,
    alignItems: "center",
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "normal",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#000",
    borderRadius: 10,
    alignItems: "center",
    borderWidth:2,
    borderColor:"#8FFA09"
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color:"#8FFA09"
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color:"#8FFA09"
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButtonCancel: {
    flex: 0.45,
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  modalButtonConfirm: {
    flex: 0.45,
    backgroundColor: "#8FFA09",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",

  },
});

export default TrackOrderScreen;
