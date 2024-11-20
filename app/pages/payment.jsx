import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import CheckoutStep from "./checkoutstep";
import Totalamount from "./totalamount";
import Svgs from "../../constants/svgs";
import useStore from "../../src/store/useStore";
import useCartStore from "../../src/store/useCartStore";
import { createOrderDetailService } from "../../src/api/services/orderDetailService";

export default function Payment() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState("CreditCard");
  const router = useRouter();
  const searchParams = useLocalSearchParams();
  const [orderItem, setOrderItem] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const cartItems = useCartStore((state) => state.items);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchParams) return;

    try {
      const orderItemParam = searchParams.orderItemCreated;
      const addressParam = searchParams.selectedAddress;

      if (orderItemParam && !orderItem) {
        const parsedOrderItem = JSON.parse(decodeURIComponent(orderItemParam));
        setOrderItem(parsedOrderItem);
      }

      if (addressParam && !selectedAddress) {
        const parsedAddress = JSON.parse(decodeURIComponent(addressParam));
        setSelectedAddress(parsedAddress);
      }
    } catch (err) {
      console.error("Error parsing data:", err);
      setError("Error parsing data. Please try again.");
    }
  }, [searchParams]); // Only depend on searchParams

  const handlePayment = async () => {
    if (!cartItems || cartItems.length === 0) {
      Alert.alert("Error", "Your cart is empty");
      return;
    }

    try {
      // Create order detail first
      const orderDetailData = {
        data: {
          orderItems: [orderItem], // Assuming orderItem is the ID
          total: totalAmount,
          level: "pending",
          shipping_info: selectedAddress?.id, // Assuming selectedAddress has an id
          user: "23", // Hardcoded user ID for now
          locale: "en",
        },
      };

      await createOrderDetailService(orderDetailData);

      router.push({
        pathname: "/checkoutScreen/MobilePaymentRazorPay",
        params: { orderId: orderItem },
      });
    } catch (err) {
      console.error("Payment error:", err);
      setError("Error processing payment");
      Alert.alert("Error", "Failed to process payment");
    }
  };

  const handleSelect = (method) => {
    setSelectedMethod(method);
  };

  const handlePress = () => {
    router.back();
  };

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.button} onPress={() => router.back()}>
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePress} style={styles.backButton}>
          <Ionicons name="arrow-back" color="white" size={30} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Payment</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.innerContainer}>
          <CheckoutStep currentPosition={1} />

          <View style={styles.box}>
            <Totalamount
              subtotal={200}
              delivery={50}
              onTotalChange={setTotalAmount}
            />
          </View>

          <Text style={styles.choosePaymentText}>Choose Payment Method</Text>

          <View style={styles.box}>
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleSelect("CreditCard")}
            >
              <View style={styles.iconLabel}>
                <View style={styles.icon}>
                  <Svgs.credit style={styles.svg} />
                </View>
                <Text style={styles.text}>Credit Card</Text>
              </View>
              {selectedMethod === "CreditCard" && (
                <MaterialIcons name="check-circle" size={24} color="green" />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleSelect("Paypal")}
            >
              <View style={styles.iconLabel}>
                <View style={styles.icon}>
                  <Svgs.paypal style={styles.svg} />
                </View>
                <Text style={styles.text}>Paypal</Text>
              </View>
              {selectedMethod === "Paypal" && (
                <MaterialIcons name="check-circle" size={24} color="green" />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleSelect("ApplePay")}
            >
              <View style={styles.iconLabel}>
                <View style={styles.icon}>
                  <Svgs.applepay style={styles.svg} />
                </View>
                <Text style={styles.text}>Apple Pay</Text>
              </View>
              {selectedMethod === "ApplePay" && (
                <MaterialIcons name="check-circle" size={24} color="green" />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleSelect("OtherMethods")}
            >
              <View style={styles.iconLabel}>
                <View style={styles.icon}>
                  <Svgs.more style={styles.svg} />
                </View>
                <Text style={styles.text}>All Other Methods</Text>
              </View>
              {selectedMethod === "OtherMethods" && (
                <MaterialIcons name="check-circle" size={24} color="green" />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.info}>
            <Text style={styles.text}>Shipping Information</Text>
            <Text style={styles.linktag} onPress={handlePress}>
              Edit
            </Text>
          </View>

          <View style={styles.addressContainer}>
            <View style={styles.addressDetails}>
              <Text style={styles.addressText}>
                Full Name: {selectedAddress?.Fullname}
              </Text>
              <Text style={styles.addressText}>
                Address: {selectedAddress?.Address}
              </Text>
              <Text style={styles.addressText}>
                State: {selectedAddress?.state}
              </Text>
              <Text style={styles.addressText}>
                Pincode: {selectedAddress?.pincode}
              </Text>
              <Text style={styles.addressText}>
                Phone No: {selectedAddress?.phone_no}
              </Text>
            </View>
          </View>

          <View style={styles.info}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalText}>₹{totalAmount}</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={handlePayment}>
            <Text style={styles.buttonText}>Pay ₹{totalAmount}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: "black",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
  },
  backButton: {
    marginTop: 2,
  },
  headerText: {
    color: "#fff",
    fontSize: 25,
    marginLeft: 16,
  },
  scrollView: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  box: {
    backgroundColor: "#919eab29",
    borderRadius: 10,
    padding: 20,
    marginVertical: 14,
  },
  choosePaymentText: {
    color: "#fff",
    fontSize: 25,
    marginLeft: 7,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: "#333",
  },
  iconLabel: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 10,
    backgroundColor: "white",
  },
  svg: {
    margin: "auto",
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 14,
  },
  linktag: {
    fontSize: 25,
    fontWeight: "700",
    color: "#8FFA09",
  },
  addressContainer: {
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#8FFA09",
  },
  addressDetails: {
    marginBottom: 10,
  },
  addressText: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 5,
  },
  totalText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    borderRadius: 10,
    padding: 15,
    width: 250,
    marginHorizontal: "auto",
    marginVertical: 10,
    backgroundColor: "#8FFA09",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  text: {
    color: "#8FFA09",
    fontSize: 25,
  },
});
