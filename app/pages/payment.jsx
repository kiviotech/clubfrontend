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
import CheckoutStep from "./checkoutstep";
import Totalamount from "./totalamount";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Svgs from "../../constants/svgs";
import useStore from "../../src/store/useStore";
import RazorpayCheckout from 'react-native-razorpay';
import MobilePaymentRazorPay from "../checkoutScreen/MobilePaymentRazorPay";
import WebPaymentRazorPay from "../checkoutScreen/WebPaymentRazorPay.jsx";
import createNewOrder from "../../src/api/services/orderServices.js";
import { Route } from "expo-router/build/Route";
import { useLocalSearchParams } from "expo-router";
import useOrderItemStore from "../../src/store/useOrderItemStore.js";
import axios from "axios";
import { createOrder } from "../../src/api/paymentApi.js";

export default function Payment() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState("CreditCard");
  const router = useRouter();
  const { shippingInfo, deleteShippingInfo } = useStore();
  const [productId, setProductId] = useState(""); // Example initial value
  const [totalItemQuintity, setTotalItemQuintity] = useState(0); // Define the total quantity
  const searchParams = useLocalSearchParams();
  const [orderItem, setOrderItem] = useState(null);

  useEffect(() => {
    if (searchParams.orderItemCreated) {
      console.log("Payment page id:", searchParams.orderItemCreated);

      try {
        const parsedOrderItem = JSON.parse(
          decodeURIComponent(searchParams.orderItemCreated)
        );
        setOrderItem(parsedOrderItem);
        console.log("Parsed Order Item:", parsedOrderItem);
      } catch (error) {
        console.error("Failed to parse order item:", error);
      }
    }
  }, [searchParams]);

  console.log("Order Item:", orderItem);

  const goToPaymentPage = async () => {
    try {

      const orderData = {
        data: {
          level: "approved",
          total: totalAmount,
          razorpayOrderId: "string", // Replace with actual Razorpay order ID
          razorpayPaymentId: "string", // Replace with actual Razorpay payment ID
          razorpaySignature: "string", // Replace with actual Razorpay signature
          order_items: [orderItem],

          user: 23, // Replace with actual user ID
          shipping_info: shippingInfo.id,
          locale: "en",
        },
      };

      const createdOrder = await createOrder(orderData); // Call createOrder service method
      console.log("Created Order:", totalAmount);
      router.push({
        pathname: "/checkoutScreen/WebPaymentRazorPay",
        params: { orderId: createdOrder.id, totalAmount: totalAmount }, 
      });
      // console.log("hello",orderId)
    } catch (error) {
      console.error("Error in order creation or payment process:", error);
      Alert.alert(`Error: ${ "Something went wrong"}`);
    }
  };

  const handleDeleteAddress = () => {
    deleteShippingInfo();
  };

  const handleSelect = (method) => {
    setSelectedMethod(method);
  };

  const handlePress = () => {
    router.back();
  };

  console.log("Address ID:", shippingInfo.id);

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
          <View>
            <View style={styles.addressContainer}>
              <Text style={styles.address}>
                {shippingInfo
                  ? `${shippingInfo.Fullname}\n${shippingInfo.Address}, ${shippingInfo.state}, ${shippingInfo.pincode}`
                  : "no address"}
              </Text>
              <TouchableOpacity onPress={handleDeleteAddress}>
                <Ionicons
                  name="trash-outline"
                  size={24}
                  color="white"
                  style={styles.trash}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.text}>
              {shippingInfo ? shippingInfo.phone_no : "no address"}
            </Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalText}>₹{totalAmount}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={goToPaymentPage}>
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
    backgroundColor: "#333", // Set background color for options
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
  address: {
    color: "#bbb",
    fontSize: 20,
    lineHeight: 35,
    marginVertical: 14,
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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


// console.log("Order Data Payload:", orderData);

      // Alert.alert(orderData?.data?.orderData)

      // const response = await axios.post(
      //   // "http://localhost:1337/api/orders",
      //   "http://192.168.0.23:1337/api/orders",
      //   orderData,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );

      // if (Platform.OS === 'web') {
        // router.push({
        //   pathname: "/checkoutScreen/WebPaymentRazorPay",
        //   params: { orderId: response.data.data.id },
        // });
      // } else if (Platform.OS === 'android') {
        // router.push({
        //   pathname: "/checkoutScreen/MobilePaymentRazorPay",
        //   params: { orderId: response.data.data.id },
        // });
      // }

  // const handlepayment = () => {
  //   // const options = {
  //   //   description: "sample payment",
  //   //   image: "https://urturms.com/cdn/shop/files/02_4395d9f8-c97b-461f-b029-c648fcb4e4b4.jpg?v=1722596311&width=2000",
  //   //   currency: "INR",
  //   //   key: "rzp_test_X9YfY2bGPwua8A",
  //   //   amount: "10000",
  //   //   name: "clubUnPlugged",
  //   //   prefill: {
  //   //     email: "lizum@kivio.in",
  //   //     contact: "1234567890",
  //   //     name: "lizum",
  //   //   },
  //   //   theme: { color: "#F37254" },
  //   // };
  //   // RazorpayCheckout?.open(options)
  //   //   .then((data) => {
  //   //     Alert.alert(`Success: ${data.razorpay_payment_id}`);
  //   //   })
  //   //   .catch((error) => {
  //   //     Alert.alert(`Error: ${error?.description || 'Unknown error'}`);
  //   //   });

  //   router.push({
  //     pathname: "/checkoutScreen/MobilePaymentRazorPay",
  //     params: { orderId: 448 },
  //   });
  // }