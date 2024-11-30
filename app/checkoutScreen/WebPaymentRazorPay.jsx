import React, { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";
import { deleteOrderDetail } from "../../src/api/repositories/orderDetailRepository";
import { deleteOrderItem } from "../../src/api/repositories/orderItemRepository";
import { createPaymentDetailService } from "../../src/api/services/paymentDetailsService";


const WebPaymentRazorPay = () => {
  const [key_id] = useState("rzp_test_X9YfY2bGPwua8A");
  const { totalAmount, razorpayOrderId, documentIds, orderDetailsDocumentId, orderdetailId } = useLocalSearchParams();

  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    const initializePayment = async () => {
      const razorpayScriptLoaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      if (!razorpayScriptLoaded) {
        alert("Failed to load Razorpay SDK. Please check your internet connection.");
        return;
      }

      const options = {
        key: key_id,
        amount: totalAmount * 100, // Razorpay requires amount in paise (cents), so we multiply by 100
        currency: "INR",
        name: "ClubUnplugged",
        description: "ClubUnplugged",
        image: "https://imgur.com/z9kFZ4m.jpg",
        order_id: razorpayOrderId,
        notes: { address: "Sample Address" },
        theme: { color: "#8FFA09" },
        handler: async function (response) {
          // Prepare payment data in the format expected by the backend
          const paymentData = {
            data: { // Wrap the data inside the "data" object as expected by Strapi
              order_detail: orderDetailsDocumentId, // Backend expects this as an ID
              amount: parseInt(totalAmount, 10), // Make sure totalAmount is in correct format (integer)
              level: "completed",
              paymentDate: new Date().toISOString(), // Use current timestamp for payment date
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              locale: "en", // You can customize this if needed
            }
          };

          try {
            // Send the payment details to your backend service
            const paymentDetailResponse = await createPaymentDetailService(paymentData);
            // console.log("API response:", paymentDetailResponse);
            router.push({ pathname: "/home" });
          } catch (error) {
            // Handle API errors gracefully
            if (error.response) {
              // console.error("Error response data:", error.response.data);
              // console.error("Error response status:", error.response.status);
              // console.error("Error response headers:", error.response.headers);
            } else {
              // console.error("Error message:", error.message);
            }
            Alert.alert("Error", `Failed to save payment details: ${error.response?.data?.message || error.message}`);
          }
        },
        modal: {
          ondismiss: async function () {
            // console.log("Razorpay modal dismissed");

            if (orderDetailsDocumentId) {
              try {
                await deleteOrderDetail(orderDetailsDocumentId); // Cleanup after payment
                // console.log(`Order detail ID ${orderDetailsDocumentId} deleted.`);
              } catch (error) {
                // console.error("Error deleting order detail:", error);
              }
            }

            const orderItemIds = documentIds ? JSON.parse(documentIds) : [];
            if (orderItemIds.length) {
              try {
                await Promise.all(orderItemIds.map((id) => deleteOrderItem(id))); // Cleanup order items
                // console.log("Order items deleted.");
              } catch (error) {
                // console.error("Error deleting order items:", error);
              }
            }

            // Redirect to the home page or any other page after payment
            router.push({ pathname: "/home" });
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    };

    initializePayment();
  }, [key_id, razorpayOrderId, totalAmount]);

  return (
    <View>
      <Text>Initializing RazorPay payment...</Text>
    </View>
  );
};

export default WebPaymentRazorPay;
