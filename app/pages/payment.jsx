import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  Alert,
  Platform,
  TextInput,
  Image
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import CheckoutStep from "./checkoutstep";
import Totalamount from "./totalamount";
import Svgs from "../../constants/svgs";
import useCartStore from "../../src/store/useCartStore";
import { createOrderDetailService } from "../../src/api/services/orderDetailService";
import useUserDataStore from "../../src/store/userData";
import Subtract from "../../assets/icons/Subtract.png"
import { getCoupons } from "../../src/api/repositories/couponRepository";

export default function Payment() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState("CreditCard");
  const router = useRouter();
  const searchParams = useLocalSearchParams();
  const [orderItem, setOrderItem] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const cartItems = useCartStore((state) => state.items);
  const [error, setError] = useState(null);
  const { documentIds } = useLocalSearchParams();
  const userId = useUserDataStore((state) => state.users[0]?.id);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isApplied, setIsApplied] = useState(false);
  const [coupons, setCoupons] = useState([]);

  // logic for calculating discount
  // const couponCodes = {
  //   DISCOUNT10: 10,
  //   DISCOUNT20: 20,
  //   DISCOUNT30: 30, // Add more dynamic codes as needed
  // };

  useEffect(() => {
    const fetchCouponsData = async () => {
      try {
        const couponsData = await getCoupons(); // Fetch the coupons using the service
        setCoupons(couponsData.data.data); // Store coupons in the state
        console.log(couponsData.data.data[0].code)
        console.log(couponsData.data.data[0].discount_percentage)
      } catch (error) {
        console.error("Error fetching coupons:", error);
        setError("Failed to load coupons");
      }
    };

    fetchCouponsData();
  }, []);


  const handleCouponChange = (code) => {
    console.log("Coupon input changed:", code);
    setCouponCode(code);

    try {
      const appliedCoupon = coupons.find((coupon) => coupon.code === code);

      if (appliedCoupon) {
        setDiscount(appliedCoupon.discount_percentage);
        setIsApplied(true);
      } else {
        setDiscount(0);
        setIsApplied(false);
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
    }
  };


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
      // console.error("Error parsing data:", err);
      setError("Error parsing data. Please try again.");
    }
  }, [searchParams]); // Only depend on searchParams

  const handlePayment = async () => {
    if (!cartItems || cartItems.length === 0) {
      Alert.alert("Error", "Your cart is empty");
      return;
    }

    try {
      // Calculate the final total amount based on the coupon
      const finalAmount = isApplied
        ? totalAmount - (totalAmount * discount) / 100
        : totalAmount; // If coupon applied, subtract discount, else keep original totalAmount

      // Create order detail first
      const orderDetailData = {
        data: {
          orderItems: orderItem, // Assuming orderItem is the ID
          total: finalAmount, // Use the final amount here after applying coupon
          level: "pending",
          shipping_info: selectedAddress?.id, // Assuming selectedAddress has an id
          user: userId, //  now change dynamic user id
          locale: "en",
          razorpayOrderId: "string",
          razorpayPaymentId: "string",
          razorpaySignature: "string",
        },
      };

      const response = await createOrderDetailService(orderDetailData);
      const razorpayOrderId = response?.data?.razorpayOrderId;
      const orderDetailsDocumentId = response?.data?.documentId;
      const orderdetailId = response?.data?.id;

      // console.log("Order Detail Response:", response.data.id);

      if (Platform.OS === 'web') {
        // Navigate to CheckoutScreen on web
        router.push({
          pathname: '/checkoutScreen/WebPaymentRazorPay',
          params: {
            totalAmount: finalAmount,
            razorpayOrderId: razorpayOrderId,
            orderItem: orderItem,
            documentIds: documentIds,
            orderDetailsDocumentId: orderdetailId, // Add the new documentId here
            orderdetailId: orderdetailId,
          },
        });

      } else if (Platform.OS === 'android') {
        router.push({
          pathname: '/checkoutScreen/MobilePaymentRazorPay',
          params: {
            totalAmount: finalAmount,
            razorpayOrderId: razorpayOrderId,
            orderItem: orderItem,
            documentIds: documentIds,
            orderDetailsDocumentId: orderDetailsDocumentId,
            orderdetailId: orderdetailId,

          },
        });
      }
    } catch (err) {
      // console.error("Payment error:", err);
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


          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter coupon code"
              placeholderTextColor="#FFFFFF"
              value={couponCode}
              onChangeText={handleCouponChange}
              keyboardType="default" // Ensure the right keyboard is used
              onFocus={() => console.log("Input Focused")} // Debug focus events
            />

            <Text style={styles.applyText}>{isApplied ? "Applied" : "Apply Code"}</Text>
            {isApplied && <Image source={Subtract} style={styles.checkmarkImage} />}
          </View>

          {isApplied && <Text style={styles.discountText}>{couponCode.toUpperCase()} has been applied.</Text>}

          {/* <View style={styles.discountBox}>
            {coupons.length > 0 ? (
              coupons.map((coupon) => (
                <Text key={coupon.id} style={styles.discountText}>
                  <Text style={[styles.coupon, { color: 'white' }]}>Apply </Text>
                  <Text style={styles.coupon}>{coupon.code}</Text>
                  <Text style={styles.discountPercentage}> for {coupon.discount_percentage}% discount</Text>
                </Text>
              ))
            ) : (
              <Text style={styles.discountText}>No coupons available</Text>
            )}
          </View> */}





          <View style={styles.info}>

            <Text style={styles.linktag} onPress={handlePress}>
              Edit
            </Text>
          </View>

          <View style={styles.addressContainer}>
            <View style={styles.addressDetails}>
              <Text style={styles.text}>Shipping Information</Text>
              <Text style={styles.addressText}>
                {selectedAddress?.Fullname}
              </Text>
              <Text style={styles.addressText}>
                {selectedAddress?.Address}
              </Text>
              <Text style={styles.addressText}>
                {selectedAddress?.state}
              </Text>
              <Text style={styles.addressText}>
                {selectedAddress?.pincode}
              </Text>
              <Text style={styles.addressText}>
                {selectedAddress?.phone_no}
              </Text>
            </View>
          </View>

          <View style={styles.box}>
            <Totalamount
              subtotal={200}
              delivery={50}
              onTotalChange={setTotalAmount}
            />
          </View>
          {discount > 0 && (
            <>
              <View style={styles.discount}>
                <Text style={styles.totalDiscountText}>{couponCode.toUpperCase()}</Text>
                <Text style={styles.totalDiscountText}>- ₹ {((totalAmount * discount) / 100).toFixed(2)}</Text>
              </View>

              <View style={styles.Totalinfo}>
                <Text style={styles.totalText}>Total</Text>
                <Text style={styles.totalText}>
                  ₹ {(totalAmount - (totalAmount * discount) / 100).toFixed(2)}
                </Text>
              </View>
            </>
          )}


          <TouchableOpacity style={styles.button} onPress={handlePayment}>
            <Text style={styles.buttonText}>Pay</Text>
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
    marginTop: 60,
    backgroundColor: "#000",
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
    justifyContent: "flex-end",
    marginVertical: 14,
    gap: 10
  },
  linktag: {
    fontSize: 18,
    marginTop: 15,
    fontWeight: "700",
    color: "#8FFA09",
  },
  addressContainer: {
    backgroundColor: "#000",
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
    width: '100%',
    marginHorizontal: "auto",
    marginVertical: 10,
    backgroundColor: "#8FFA09",
    // marginTop:45
  },
  buttonText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  text: {
    marginTop: -10,
    color: "#8FFA09",
    fontSize: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    borderWidth: 1,
    borderColor: '#919eab',
    borderRadius: 5,
    height: 40,
  },
  input: {
    // width:'100%',
    flex: 1,
    height: 40,


    paddingLeft: 10,
    borderRadius: 5,
    color: '#fff',

  },
  applyText: {
    color: '#8FFA09',
    marginRight: 10,
    fontSize: 14,
    fontWeight: 'bold'

  },
  discountText: {
    // marginTop: 10,
    color: '#8FFA09',
    fontSize: 14,
  },
  checkmarkImage: {
    width: 15,
    height: 15,
    marginRight: 5
  },
  discount: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 20,
    gap: '55%',
    fontSize: 14,
    alignItems: 'center',
    marginTop: -37
  },
  Totalinfo: {
    width: '98%',
    marginTop: 20,
    display: 'flex',
    justifyContent: 'flex-start',
    marginLeft: 20,
    gap: '55%',
    flexDirection: 'row'

  },
  totalDiscountText: {
    color: '#8FFA09'
  },
  discountBox: {
    backgroundColor: 'black',  // Set background color to black
    borderWidth: 2,            // Set border width to make it visible
    borderColor: '#8FFA09',      // Set border color to green
    padding: 10,
    borderRadius: 8,
    width: '90%',
    margin: 20,
  },
  discountText: {
    color: 'white',  // Default color for the text (white)
    fontSize: 16,
    marginBottom: 5,
  },
  coupon: {
    color: '#8FFA09',  // Color for the coupon code (green)
    fontWeight: 'bold',
  },
  discountPercentage: {
    color: 'white', // Color for the discount percentage (white)
  },
});
