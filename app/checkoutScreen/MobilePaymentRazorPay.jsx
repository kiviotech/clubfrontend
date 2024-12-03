import React from 'react';
import { WebView } from 'react-native-webview';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { deleteOrderDetail } from "../../src/api/repositories/orderDetailRepository";
import { deleteOrderItem } from "../../src/api/repositories/orderItemRepository";
import { useRouter } from "expo-router";
import { createPaymentDetailService } from '../../src/api/services/paymentDetailsService';

const MobilePaymentRazorPay = () => {
  const { totalAmount, razorpayOrderId, documentIds, orderDetailsDocumentId,orderdetailId } = useLocalSearchParams();
    const router = useRouter();
  
    // Function to delete the order detail
    const handleDeleteOrderDetail = async () => {
      if (!orderDetailsDocumentId) {
        // console.warn("No order detail ID provided.");
        return;
      }
  
      try {
        // console.log(`Deleting order detail ID: ${orderDetailsDocumentId}`);
        const response = await deleteOrderDetail(orderDetailsDocumentId);
        // console.log(`Delete response for order detail ID ${orderDetailsDocumentId}:`, response);
  
        if (response?.status !== 204) {
        //   console.error("Failed to delete order detail document.");
          Alert.alert("Error", "Failed to delete order detail document.");
        }
      } catch (error) {
        // console.error(`Error deleting order detail ID ${orderDetailsDocumentId}:`, error);
      }
    };
  
    // Function to delete the order items
    const handleDeleteOrderItems = async () => {
      const orderItemIds = documentIds ? JSON.parse(documentIds) : [];
    //   console.log("Order item IDs to delete:", orderItemIds);
  
      if (orderItemIds.length === 0) {
        // console.warn("No order items to delete.");
        return;
      }
  
      try {
        // Attempt to delete all order items
        const deletePromises = orderItemIds.map(async (orderItemId) => {
          try {
            // console.log(`Deleting order item ID: ${orderItemId}`);
            const response = await deleteOrderItem(orderItemId);
            // console.log(`Delete response for ID ${orderItemId}:`, response);
            return response;
          } catch (error) {
            // console.error(`Error deleting order item ID ${orderItemId}:`, error);
            return null;
          }
        });
  
        const orderItemsResponse = await Promise.all(deletePromises);
  
        if (orderItemsResponse.every((res) => res?.status === 204)) {
        //   console.log("All order items deleted successfully.");
        } else {
        //   console.error("Some order items could not be deleted.");
          Alert.alert("Error", "Failed to delete some order items.");
        }
      } catch (error) {
        // console.error("Error deleting order items:", error);
        Alert.alert("Error", "An error occurred while deleting order items.");
      }
    };
  
    const navigateToHome = () => {
      router.push("/home"); // Navigate to home
    };
    const navigateTrack = () => {
        router.push("/pages/orderPage"); // Navigate to home
      };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <WebView
                originWhitelist={['*']}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                source={{
                    html: `
                <html>
                    <body>
                        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
                        <script>
                            (function() {
                                try {
                                    var options = {
                                        "key": "rzp_test_X9YfY2bGPwua8A", // Use test key if in development
                                        "amount": "${totalAmount * 100}", // Amount in paise
                                        "currency": "INR",
                                        "name": "Dhairyawan",
                                        "order_id": "${razorpayOrderId}",
                                        "handler": function (response) {
                                            window.ReactNativeWebView.postMessage(JSON.stringify({
                                                status: 'success',
                                                payment_id: response.razorpay_payment_id,
                                                order_id: response.razorpay_order_id,
                                                totalAmount: ${totalAmount}
                                            }));
                                        },
                                        "modal": {
                                            "ondismiss": function () {
                                                window.ReactNativeWebView.postMessage(JSON.stringify({ status: 'cancelled' }));
                                            }
                                        },
                                        "prefill": {
                                            "name": "vipul",
                                            "email": "vipul@gmail.com",
                                            "contact": "6264452164"
                                        },
                                        "theme": {
                                            "color": "#8FFA09"
                                        },
                                        "image": "https://imgur.com/z9kFZ4m.jpg"
                                    };
                                    var rzp1 = new Razorpay(options);
                                    rzp1.open();
                                } catch (error) {
                                    window.ReactNativeWebView.postMessage(JSON.stringify({
                                        status: 'error',
                                        message: error.message
                                    }));
                                }
                            })();
                        </script>
                    </body>
                </html>
                `,
                }}
                onMessage={async (event) => {
                    try {
                        const paymentData = JSON.parse(event.nativeEvent.data);
                        // console.log("Received Payment Data:", paymentData);

                        if (paymentData?.status === "success") {
                            try {
                                // Get the signature from the correct property
                                const signature = paymentData.razorpay_signature || paymentData.signature;
                                // console.log("Payment signature:", signature);

                                const requestBody = {
                                    data: {
                                        order_detail: orderdetailId,
                                        amount: Number(totalAmount),
                                        level: "completed",
                                        paymentDate: new Date().toISOString(),
                                        razorpay_order_id: razorpayOrderId,
                                        razorpay_payment_id: paymentData.payment_id,
                                        razorpay_signature: signature, // Use the extracted signature
                                        locale: "en"
                                    }
                                };

                                // console.log("Attempting to save payment with data:", JSON.stringify(requestBody, null, 2));

                                const response = await createPaymentDetailService(requestBody);
                                // console.log("Backend Response:", response);

                                if (response?.status === 201 || response?.status === 200) {
                                    // console.log("Payment saved successfully:", response.data);
                                    Alert.alert(
                                        "Success",
                                        "Payment processed and saved successfully!",
                                        [{ text: "OK", onPress: () => navigateTrack() }]
                                    );
                                } else {
                                    throw new Error(`Unexpected response status: ${response?.status}`);
                                }
                            } catch (serviceError) {
                                // console.error("Error creating payment detail: ", serviceError);
                                // console.error("Payment Service Error:", {
                                //     message: serviceError.message,
                                //     response: serviceError.response?.data,
                                //     status: serviceError.response?.status
                                // });

                                Alert.alert(
                                    "Payment Recorded",
                                    `Payment was successful.\n\n` +
                                    `Please save these details for reference:\n` +
                                    `Payment ID: ${paymentData.payment_id}\n` +
                                    `Order ID: ${razorpayOrderId}\n` +
                                    `Amount: ₹${totalAmount}`,
                                    [{ text: "OK", onPress: () => navigateToHome() }]
                                );
                            }
                        } else if (paymentData?.status === "cancelled" || paymentData?.status === "error") {
                            // console.log("Payment cancelled or failed:", paymentData);
                            Alert.alert(
                                "Payment Not Completed",
                                "The payment was not completed. Your order will be cancelled.",
                                [
                                    {
                                        text: "OK",
                                        onPress: async () => {
                                            await handleDeleteOrderDetail();
                                            await handleDeleteOrderItems();
                                            navigateToHome();
                                        }
                                    }
                                ]
                            );
                        }
                    } catch (error) {
                        // console.error("Payment Processing Error:", error);
                        Alert.alert(
                            "Error",
                            "There was an error processing your payment. Please try again.",
                            [{ text: "OK", onPress: () => navigateToHome() }]
                        );
                    }
                }}
                onError={(syntheticEvent) => {
                    const { nativeEvent } = syntheticEvent;
                    // console.error("WebView Error:", nativeEvent);
                    Alert.alert("WebView Error", nativeEvent.description);
                    navigateToHome();
                }}
            />
        </SafeAreaView>
    );
};

export default MobilePaymentRazorPay;

