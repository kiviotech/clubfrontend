import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import CartList from "../../components/CartList";
import logo from "../../assets/logo.png";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import useWishlistStore from "../../src/store/useWishlistStore";
import Wish_page from "../../app/pages/wish_page";

const screenWidth = Dimensions.get("window").width;
const itemWidth = (screenWidth - 48) / 2;

const Wishlist = () => {
  const params = useLocalSearchParams();
  const wishlist = useWishlistStore((state) => state.wishlist);
  // console.log(wishlist);

  const { images, name, price } = params;
  const router = useRouter();

  const handleBack = () => {
    router.back("/pages/productDetails");
  };

  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => handleBack()}>
          <Ionicons name="arrow-back" color="white" size={30} />
        </TouchableOpacity>
        <Image style={styles.logo} source={logo} />
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.page}>
          <Text style={styles.cartText}>Your Wishlist</Text>
          {wishlist.length > 0 ? (
            <View style={styles.grid}>
              {wishlist.map((item, index) => (
                <View
                  key={item.id || item.name || index}
                  style={[styles.gridItem, { width: itemWidth }]}
                >
                  <Wish_page
                  key={index}
                    id={item.id}
                    productname={item.name}
                    price={item.price}
                    image={item.image}
                    isWishlist={true}
                    onDelete={() => removeFromWishlist(item.id)} 
                  />
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.emptyMessage}>Your wishlist is empty.</Text>
          )}
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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    marginBottom: 16,
  },
  emptyMessage: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginVertical: 20,
  },
});

export default Wishlist;
