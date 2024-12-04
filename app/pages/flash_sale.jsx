
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import ProductList from '../../components/productList';
import Icon from 'react-native-vector-icons/FontAwesome';
import FilteredProductList from './filteredProductList';
import { useNavigation } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";
import Svgs from '../../constants/svgs';
import { useRouter } from 'expo-router';
import useCartStore from '../../src/store/useCartStore';

const FlashSaleSelector = () => {
  const [selectedDiscount, setSelectedDiscount] = useState('All'); // Default selected discount
  const navigation = useNavigation();
  const discounts = ['All', '10%', '20%', '30%', '40%', '50%'];
  const totalCartItems = useCartStore((state) => state.getTotalItems());

  const router = useRouter();

  const handleRequest = () => {
    router.push("/pages/cart"); 
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" color="white" size={30} />
        </TouchableOpacity>
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
      <Text style={styles.title}>Flash Sale</Text>
      <Text style={styles.subtitle}>Choose your discount</Text>
      <View style={styles.selectorContainer}>
        {discounts.map((discount) => (
          <TouchableOpacity
            key={discount}
            style={[
              styles.discountButton,
              selectedDiscount === discount && styles.selectedButton,
            ]}
            onPress={() => setSelectedDiscount(discount)}
          >
            <Text
              style={[
                styles.discountText,
                selectedDiscount === discount && styles.selectedText,
              ]}
            >
              {typeof discount === 'string' ? discount : `${discount}%`}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>{selectedDiscount} Discount</Text>
        <TouchableOpacity style={styles.iconButton}>
          {/* <Icon name="sliders" size={18} color="#0F0" /> */}
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <FilteredProductList selectedDiscount={selectedDiscount} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#121212',
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    gap: 280,
    padding: 10,
  },
  leftIcons: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#BBBBBB',
    marginBottom: 15,
  },
  selectorContainer: {
    width:"99%",
    flexDirection: 'row',
    backgroundColor: '#333333',
    borderRadius: 30, // Border radius for rounded corners
    paddingVertical: 5, // Vertical padding
    paddingHorizontal: 15, // Horizontal padding inside the container (for left and right space)
    // marginHorizontal: 15, // Margin on left and right of container
    // justifyContent: 'flex-start', // Align buttons to the left side, keeping space in between
    // alignItems: 'center', // Center the items vertically
  },
  discountButton: {
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 5,
    backgroundColor: '#555555',
    marginHorizontal: 2, // Space between buttons
  },
  selectedButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#00FF00',
    borderWidth: 2,
  },
  discountText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  selectedText: {
    color: '#00FF00',
    fontWeight: 'bold',
  },
  scrollView: {
    flexGrow: 1,
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    gap: 150,
    marginBottom:10
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginRight: 60,
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
});

export default FlashSaleSelector;

