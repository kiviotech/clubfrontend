import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import CartList from "../../components/CartList";
import logo from "../../assets/logo.png";
import { Ionicons } from "@expo/vector-icons";
import useCartStore from "../../src/store/useCartStore";
import Totalamount from "./totalamount";

const Cart = () => {
  const router = useRouter();
  const cartItems = useCartStore((state) => state.items);
  // console.log("data",cartItems)
  const subtotal = useCartStore((state) => state.subtotal);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  

  useEffect(() => {
    if (subtotal === 0) {
      setDeliveryCharge(0);
    } else if (subtotal < 100) {
      setDeliveryCharge(10);
    } else if (subtotal < 200) {
      setDeliveryCharge(5);
    } else {
      setDeliveryCharge(0);
    }
  }, [subtotal]);

  const handleBack = () => {
    router.back("/pages/productDetails");
};

  
  const handleCheckout = () => {
    const productIds = cartItems.map((item) => item.id);
    // console.log("id",productIds)
    router.push({
      pathname: "/pages/checkout",
      params: {
        id: productIds
      }
    });
    // console.log(productIds)
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" color="white" size={30} />
        </TouchableOpacity>
        <Image style={styles.logo} source={logo} />
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.page}>
          <Text style={styles.cartText}>Your Cart</Text>

          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <CartList
                key={index}
                id={item.id}
                productname={item.name}
                price={item.price}
                image={item.image}
                quantity={item.quantity}
                size={item.size}
              />
            ))
          ) : (
            <Text style={{ color: "white", textAlign: "center" }}>
              No items in the cart
            </Text>
          )}

          <View style={styles.checkoutContainer}>
            <Totalamount subtotal={subtotal} delivery={deliveryCharge} />
            <TouchableOpacity
              onPress={handleCheckout}
              style={styles.checkoutButton}
            >
              <Text style={styles.checkoutText}>Check-out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: "black",
  },
  header: {
    flexDirection: "row",
    height: 48,
    width: "100%",
    padding: 8,
    alignItems: "center",
  },
  logo: {
    marginLeft: 8,
  },
  page: {
    backgroundColor: "black",
    marginVertical: 20,
  },
  cartText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    margin: 20,
    marginTop: 0,
  },
  checkoutContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
  },
  checkoutButton: {
    backgroundColor: "#8FFA09",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  checkoutText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Cart;
