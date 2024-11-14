
import React from 'react';
import { WebView } from 'react-native-webview';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';

const MobilePaymentRazorPay = () => {
    const { orderId } = useLocalSearchParams();
    console.log(orderId);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <WebView
                source={{
                    html: `
                <html>
                    <body>
                        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
                        <script>
                            var options = {
                                "key": "rzp_test_X9YfY2bGPwua8A",
                                "amount": "${3 * 100}", // Amount is in paise
                                "currency": "INR",
                                "name": "Clubunplugged",
                                "order_id": "${448}",
                                "handler": function (response) {
                                    window.ReactNativeWebView.postMessage(JSON.stringify({
                                        status: 'success',
                                        payment_id: response.razorpay_payment_id,
                                        order_id: response.razorpay_order_id,
                                        totalAmount: 300
                                    }));
                                },
                                "modal": {
                                    "ondismiss": function () {
                                        window.ReactNativeWebView.postMessage(JSON.stringify({ status: 'cancelled' }));
                                    }
                                },
                                "prefill": {
                                    "name": "vipul",
                                    "email": "vipul@GMAIL.COM",
                                    "contact": "6264452164"
                                },
                                "theme": {
                                    "color": "#3399cc"
                                }
                            };
                            var rzp1 = new Razorpay(options);
                            rzp1.open();
                        </script>
                    </body>
                </html>`,
                }}
                onMessage={async (event) => {
                    const paymentData = JSON.parse(event.nativeEvent.data);
                    console.log("Received payment data:", paymentData);

                    if (paymentData?.status === 'success') {
                        Alert.alert(
                            'Payment Success',
                            `Order ID: ${paymentData.order_id}\nPayment ID: ${paymentData.payment_id}`
                        );
                    } else if (paymentData.status === 'cancelled') {
                        Alert.alert('Payment Cancelled');
                    } else {
                        Alert.alert('Payment Failed or Not Completed');
                    }
                }}
            />
        </SafeAreaView>
    );
};

export default MobilePaymentRazorPay;