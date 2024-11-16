import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

const TrackOrderScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const trackingProgress = useRef(new Animated.Value(0)).current;

  const steps = [
    {
      status: "Order placed",
      description: "Your order has been placed",
      icon: "check-circle",
    },
    {
      status: "Order confirmed",
      description: "Your order has been confirmed",
      icon: "check-circle",
    },
    {
      status: "Order processed",
      description: "Your order has been processed and ready for shipping",
      icon: "check-circle",
    },
    {
      status: "Shipped",
      description: "Your order has been shipped",
      icon: "local-shipping",
    },
    {
      status: "Out for delivery",
      description: "Your order is out for delivery",
      icon: "directions-bike",
    },
  ];

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      Animated.timing(trackingProgress, {
        toValue: currentStep + 1,
        duration: 800,
        useNativeDriver: false,
      }).start(() => {
        setCurrentStep(currentStep + 1);
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Track Your Order</Text>
      <Text style={styles.orderId}>Order #123456</Text>

      {/* Product Information */}
      <View style={styles.productContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/100" }}
          style={styles.productImage}
        />
        <View style={styles.productDetails}>
          <Text style={styles.productName}>Product Name</Text>
          <Text style={styles.price}>$250</Text>
          <Text style={styles.deliveryDate}>Delivering on 28 Nov, 2024</Text>
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
                color={index <= currentStep ? "#3CE13D" : "#555"} // Active step is green
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
                  { color: index <= currentStep ? "#3CE13D" : "#777" },
                ]}
              >
                {step.status}
              </Text>
              <Text style={styles.trackingDescription}>{step.description}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.buttonContainer, styles.buttonSpacing]}>
        <TouchableOpacity style={styles.trackButton}>
          <Text style={styles.buttonText}>Track Order</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={[styles.buttonText, styles.cancelButtonText]}>
            Cancel Order
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.nextStepButton} onPress={goToNextStep}>
        <Text style={styles.buttonText}>
          {currentStep < steps.length - 1 ? "Next Step" : "Completed"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
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
  price: {
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
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
  nextStepButton: {
    backgroundColor: "#3CE13D",
    padding: 15,
    borderRadius: 10,
    width: "50%",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
    marginBottom:30,
  },
  
});

export default TrackOrderScreen;
