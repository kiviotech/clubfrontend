// import React, { useEffect } from 'react';
// import { Text, View, Alert } from 'react-native';
// import RazorpayCheckout from 'react-native-razorpay'; // Razorpay SDK
// import { useRouter } from "expo-router";
// import { useLocalSearchParams } from 'expo-router';

// const WebPaymentRazorPay = ({ route }) => {
//   const { orderId,totalAmount } = useLocalSearchParams();
//   // console.log(orderId)
//   // console.log("henhnj",totalAmount)


//   useEffect(() => {

//     if (typeof window !== "undefined" && orderId && totalAmount) {
//       const initiateRazorpayPayment = () => {
//         // Ensure the Razorpay script is loaded
//         if (!window.Razorpay) {
//           const script = document.createElement("script");
//           script.src = "https://checkout.razorpay.com/v1/checkout.js";
//           script.onload = () => startPayment();
//           document.body.appendChild(script);
//         } else {
//           startPayment();
//         }
//       };
//     // Initialize Razorpay Checkout once the component is mounted
//      const startPayment = () => {
//         const options = {
//           description: 'Order Payment',
//           image: 'https://your_logo_url', // Your company logo URL
//           currency: 'INR',
//           key: 'rzp_test_X9YfY2bGPwua8A', // Your Razorpay key
//           amount: totalAmount * 100, // Total amount in paisa (1 INR = 100 paisa)
//           name: 'Your Company',
//           order_id: orderId, // Order ID generated from the backend
//           prefill: {
//             email: 'customer_email@example.com', // Replace with actual customer email
//             contact: 'customer_contact_number', // Replace with actual customer contact number
//             name: 'Customer Name', // Replace with actual customer name
//           },
//           theme: {
//             color: '#F37254', // Theme color for the Razorpay modal
//           },
//         };

//         const razorpay = new window.Razorpay(options);
//         razorpay.open();
        
//         razorpay.on('payment.success', (data) => {
//           console.log('Payment Success:', data);
//           // Call your backend API to verify the payment
//         });

//         razorpay.on('payment.error', (error) => {
//           console.error('Payment Failed:', error);
//           Alert.alert('Payment Failed', 'Something went wrong. Please try again.');
//         });
//       };

//       initiateRazorpayPayment();
//     }
//   }, [orderId, totalAmount]);

//   return (
//     <View>
//       <Text>Processing Payment</Text>
//     </View>
//   );
// };

// export default WebPaymentRazorPay;

import React, { useEffect, useState } from 'react';
import { Text, View, Alert } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay'; // Razorpay SDK
import { useRouter } from "expo-router";
import { useLocalSearchParams } from 'expo-router';

const WebPaymentRazorPay = ({ route }) => {
  const { orderId, totalAmount } = useLocalSearchParams();
  const [razorpayOrderId, setRazorpayOrderId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const response = await fetch('https://your-strapi-api.com/orders/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            totalAmount: totalAmount, // Ensure this is a valid number
          }),
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          console.log('Error Data:', errorData);
          throw new Error('Failed to create order');
        }
    
        const data = await response.json();
        console.log('Order Created:', data);
        if (data.orderId) {
          setRazorpayOrderId(data.orderId);
          setLoading(false);
        } else {
          Alert.alert('Error', 'Failed to create order');
        }
      } catch (error) {
        console.error('API Request Failed:', error);
        Alert.alert('Error', 'Something went wrong');
      }
    };

    if (totalAmount) {
      createOrder();
    }
  }, [totalAmount]);

  useEffect(() => {
    if (razorpayOrderId && !loading) {
      const options = {
        description: 'Order Payment',
        image: 'https://your_logo_url', // Your company logo URL
        currency: 'INR',
        key: 'rzp_test_X9YfY2bGPwua8A', // Your Razorpay key
        amount: totalAmount * 100, // Total amount in paisa (1 INR = 100 paisa)
        name: 'Your Company',
        order_id: razorpayOrderId, // Razorpay order ID
        prefill: {
          email: 'customer_email@example.com', // Replace with actual customer email
          contact: 'customer_contact_number', // Replace with actual customer contact number
          name: 'Customer Name', // Replace with actual customer name
        },
        theme: {
          color: '#F37254', // Theme color for the Razorpay modal
        },
      };

      const razorpay = new RazorpayCheckout(options);
      razorpay.open();

      razorpay.on('payment.success', (data) => {
        console.log('Payment Success:', data);
        // Handle payment success, call your backend to verify the payment
      });

      razorpay.on('payment.error', (error) => {
        console.error('Payment Failed:', error);
        Alert.alert('Payment Failed', 'Something went wrong. Please try again.');
      });
    }
  }, [razorpayOrderId, totalAmount, loading]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text>Processing Payment</Text>
    </View>
  );
};

export default WebPaymentRazorPay;

