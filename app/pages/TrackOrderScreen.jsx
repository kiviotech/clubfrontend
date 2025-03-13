import React, { useState, useEffect, useRef, useCallback } from "react";
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
  Platform,
  InteractionManager
} from "react-native";
// Import AsyncStorage
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { updateOrderDetailById, fetchOrderDetailById } from "../../src/api/services/orderDetailService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useOrderStorelevel from "../../src/store/useOrderStorelevel"
import { getImageSource } from '../utils/imageUtils';
import { getAnimationConfig } from '../../src/utils/animationConfig';

const TrackOrderScreen = () => {
  const trackingProgress = useRef(new Animated.Value(0)).current;
  const { imageUrl, productName, productPrice, id, documentId,total,quantity,formattedDate } = useLocalSearchParams();
  const { setOrderLevel } = useOrderStorelevel();
  const router = useRouter();
  const isMounted = useRef(true);

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
  const [isLoading, setIsLoading] = useState(true);

  const levelMapping = {
    pending: 1,
    processing: 2,
    shipped: 3,
    delivered: 4,
    cancelled: -1,
  };

  // Ensure component is mounted before updating state
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        setIsLoading(true);
        
        // Get cached status from AsyncStorage first for immediate display
        const cachedStatus = await AsyncStorage.getItem(`order_${documentId}_status`);
        if (cachedStatus && isMounted.current) {
          setCurrentStep(levelMapping[cachedStatus] || 1);
          setIsCanceled(cachedStatus === "cancelled");
        }

        // Then fetch the latest data from backend
        InteractionManager.runAfterInteractions(async () => {
          try {
            const orderDetail = await fetchOrderDetailById(documentId);
            const backendLevel = orderDetail?.data?.level || "pending";
            
            // Only update state if component is still mounted
            if (isMounted.current) {
              // Save status to AsyncStorage
              await AsyncStorage.setItem(`order_${documentId}_status`, backendLevel);
              
              const stepIndex = levelMapping[backendLevel] || 1;
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
              setIsLoading(false);
            }
          } catch (error) {
            console.error("Error fetching order status:", error);
            if (isMounted.current) {
              setIsLoading(false);
            }
          }
        });
      } catch (error) {
        console.error("Error in fetchOrderStatus:", error);
        if (isMounted.current) {
          setIsLoading(false);
        }
      }
    };

    if (documentId) {
      fetchOrderStatus();
    } else {
      setIsLoading(false);
    }
  }, [documentId, steps]);

  useEffect(() => {
    if (!isLoading) {
      Animated.timing(trackingProgress, {
        toValue: currentStep,
        duration: 800,
        useNativeDriver: Platform.OS !== 'web',
        ...getAnimationConfig(),
      }).start();
    }
  }, [currentStep, isLoading, trackingProgress]);

  const handleCancelOrder = useCallback(async () => {
    try {
      setShowCancelModal(false);
      
      // Update backend first
      const updatedStatus = { level: "cancelled" };
      await updateOrderDetailById(documentId, updatedStatus);

      // Then update local state
      if (isMounted.current) {
        setSteps([
          steps[0],
          { status: "Order Cancelled", description: "Your order has been canceled.", icon: "cancel" },
        ]);
        setIsCanceled(true);
      }

      // Update AsyncStorage
      await AsyncStorage.setItem(`order_${documentId}_status`, "cancelled");

      Alert.alert("Order Canceled", "Your order has been successfully canceled.");
      setOrderLevel("cancelled");
    } catch (error) {
      console.error("Error cancelling the order:", error);
      Alert.alert("Error", "Failed to cancel the order. Please try again.");
    }
  }, [documentId, setOrderLevel, steps]);

  const handleGoBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track Your Order</Text>
      </View>
      
      <Text style={styles.orderId}>Order {documentId}</Text>

      {/* Product Information */}
      <View style={styles.productContainer}>
        {(() => {
          try {
            return (
              <Image
                source={{ uri: imageUrl || '/assets/Picture2.png' }}
                style={styles.productImage}
                onError={(e) => console.error('Image loading error:', e.nativeEvent.error)}
                // Add performance improvements
                progressiveRenderingEnabled={true}
                fadeDuration={300}
                defaultSource={require("../../assets/placeholder.png")}
              />
            );
          } catch (error) {
            console.error('Error rendering image:', error);
            return (
              <View style={[styles.productImage, {backgroundColor: '#333'}]}>
                <Text style={{color: '#fff', textAlign: 'center'}}>Image Error</Text>
              </View>
            );
          }
        })()}
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{productName}</Text>
         
           <View style={styles.priceDetails}>
                    
                    <Text style={styles.priceValue}>Price : ₹{productPrice}</Text>
                    <Text style={styles.priceValue}>Total Order : ₹{total}</Text>
                  </View>
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
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalCancelButton]}
                onPress={() => setShowCancelModal(false)}
              >
                <Text style={styles.modalButtonText}>No, Keep Order</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalConfirmButton]}
                onPress={handleCancelOrder}
              >
                <Text style={styles.modalButtonText}>Yes, Cancel Order</Text>
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
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  orderId: {
    fontSize: 16,
    color: "#999",
    marginBottom: 16,
  },
  productContainer: {
    flexDirection: "row",
    backgroundColor: "#111",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  priceDetails: {
    marginBottom: 8,
  },
  priceValue: {
    fontSize: 14,
    color: "#3CE13D",
    marginBottom: 4,
  },
  deliveryDate: {
    fontSize: 14,
    color: "#999",
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  trackingContainer: {
    backgroundColor: "#111",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  trackingStepContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  iconContainer: {
    alignItems: "center",
    marginRight: 16,
  },
  verticalLine: {
    width: 2,
    marginTop: 8,
  },
  trackingTextContainer: {
    flex: 1,
  },
  trackingStatus: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  trackingDescription: {
    fontSize: 14,
    color: "#999",
  },
  canceledMessage: {
    fontSize: 16,
    color: "#EF4444",
    textAlign: "center",
    marginBottom: 16,
  },
  buttonContainer: {
    marginBottom: 24,
  },
  buttonSpacing: {
    marginTop: 16,
  },
  cancelButton: {
    backgroundColor: "#111",
    borderWidth: 1,
    borderColor: "#EF4444",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButtonText: {
    color: "#EF4444",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#111",
    borderRadius: 12,
    padding: 24,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
    textAlign: "center",
  },
  modalMessage: {
    fontSize: 16,
    color: "#999",
    marginBottom: 24,
    textAlign: "center",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  modalCancelButton: {
    backgroundColor: "#333",
    marginRight: 8,
  },
  modalConfirmButton: {
    backgroundColor: "#EF4444",
    marginLeft: 8,
  },
  modalButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default TrackOrderScreen;
