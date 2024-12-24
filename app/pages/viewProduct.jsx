import React,{useState} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import ProductList from '../../components/productList';
import Svgs from "../../constants/svgs";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import SearchBar from '../../components/SearchBar';
import ProductSearch from './ProductSearch';
import useCartStore from '../../src/store/useCartStore';

const ViewProduct = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const totalCartItems = useCartStore((state) => state.getTotalItems());
  const handleRequest = () => {
    router.push("/pages/cart"); 
  };


 

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.backSection}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" color="white" size={20} />
          </TouchableOpacity>
          <Text style={styles.headerText}>All Products</Text>
        </View>
        <View style={styles.leftIcons}>
                  <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={handleRequest} style={styles.iconButton}>
                      <Svgs.cartIcon width={18} height={18} />
                    </TouchableOpacity>
                    {totalCartItems > 0 && (
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>{totalCartItems}</Text>
                      </View>
                    )}
                  </View>
                  <TouchableOpacity onPress={() => router.push("/pages/wishlist")}>
                    <Svgs.wishlistIcon width={18} height={18} />
                  </TouchableOpacity>
                </View>
      </View>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <View>
      <ProductSearch searchTerm={searchTerm} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
  },
  leftIcons: {
    display: "flex",
    flexDirection: "row",
    gap: 20,

  },
  iconContainer: {
    position: "relative", // To position badge on top of the icon
  },
  badge: {
    position: "absolute",
    top: -3,
    right: -9,
    backgroundColor: "#FF0000", // Badge color
    borderRadius: 10,
    width: 14,
    height: 14,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1, // Ensure badge is on top of the cart icon
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingTop:20,
  },
  backSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 10, // Space between the arrow and the text
  },
  headerText: {
    fontSize: 16, // Adjust size as needed
    fontWeight: 'bold', // Make the text bold
    color: '#8FFA09', // Set text color to white
  },
  rightIcons: {
    flexDirection: "row",
    gap: 20, // Space between the cart and wishlist icons
  },
});

export default ViewProduct;
