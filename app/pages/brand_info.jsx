import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import logo from "../../assets/logo.png";
import { useRouter,useNavigation } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import NewArrival from '../../components/productList/NewArrival';
import Slider from "../pages/slider"
import Category from './category';
import ProductList from '../../components/productList';
import Brand_page from './brand_page';
import { useBrandStore } from "../../src/store/brandStore";
import { getProducts } from '../../src/api/repositories/productRepository';
import { MEDIA_BASE_URL } from '../../src/api/apiClient';
import useProductStore from '../../src/store/useProductStore';
import useCartStore from '../../src/store/useCartStore';
import useWishlistStore from '../../src/store/useWishlistStore';
import Header from './header';
import { Ionicons } from "@expo/vector-icons";

const brand_info = ({ limit }) => {
  const { brandName, brandImage, brandDescription, brandPoster } = useLocalSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const setProductDetails = useProductStore((state) => state.setProductDetails);
  const addItemToCart = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);
  const selectedBrand = useBrandStore((state) => state.selectedBrand);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const { wishlist, removeFromWishlist } = useWishlistStore();
  const [popupMessage, setPopupMessage] = useState("");
  const [popupProductId, setPopupProductId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
 const navigation = useNavigation();


  // console.log("brand poster is", brandDescription)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data.data);
      } catch (error) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedBrand]);


  const filteredProducts = selectedBrand
    ? products
      .filter((product) => product.brand?.brand_name === selectedBrand) // Filter by selectedBrand
      .filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) // Case-insensitive search
      )
    : products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) // Case-insensitive search
    );

  // console.log('filtered', selectedBrand)

  const displayedProducts = limit ? filteredProducts.slice(0, limit) : filteredProducts;
  const getImageUrl = (images) => {
    if (Array.isArray(images) && images.length > 0) {
      return `${MEDIA_BASE_URL}${images[0].url}`; // Assuming each image has a `url` field
    }
    return null; // Fallback if no images
  };

  const handleProductDetails = (product) => {
    // const sizes = product.sizes?.map((size) => size.size).join(", ") || "";
    const images = product.product_image.map(img => `${MEDIA_BASE_URL}${img.url}`);
    // console.log(sizes)
    setProductDetails({
      id: product.id,
      images: images,
      name: product.name,
      price: product.price,
      in_stock: product.in_stock,
      sizes: product.sizes, // Include sizes in the details
      documentId: product.documentId,
      description: product.description
    });

    router.push("../../pages/productDetails");
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }


  const handleWishlistAdd = (product) => {
    const imageUrl = getImageUrl(product.product_image);
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: imageUrl,
    };

    if (wishlist.some((wishItem) => wishItem.id === product.id)) {
      removeFromWishlist(product.id);
      // setPopupMessage("Removed from wishlist! ❌");
      setPopupProductId(product.id); // Show popup for this product
      setPopupMessage("Removed from wishlist! ❌");
    } else {
      addToWishlist(item);
      // setPopupMessage("Added to wishlist!✔️");
      setPopupProductId(product.id); // Show popup for this product
      setPopupMessage("Added to wishlist!✔️");
    }

    setTimeout(() => {
      setPopupMessage("");
    }, 2000);
  };

  const handleCartAdd = (product) => {
    const imageUrl = getImageUrl(product.product_image);
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: imageUrl,
      size: "S",
    };

    // Check if the product is already in the cart
    const isProductInCart = useCartStore.getState().items.some(
      (cartItem) => cartItem.id === product.id
    );

    if (isProductInCart) {
      setPopupProductId(product.id); // Show popup for this product
      setPopupMessage("Product is already in the cart! 🛒");
    } else {
      addItemToCart(item);
      setPopupProductId(product.id); // Show popup for this product
      setPopupMessage("Added to cart! 🛒");
    }

    // Automatically clear the popup message after 2 seconds
    setTimeout(() => {
      setPopupProductId(null); // Hide popup
      setPopupMessage(""); // Clear the message
    }, 2000);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" color="white" size={20} />
          </TouchableOpacity>
          <Header />
        </View>

        <View style={styles.searchContainer}>
          <FontAwesome name="search" size={25} color="#424646" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Products"
            placeholderTextColor="#424646"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>

        {/* Main image with logo overlay */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: brandPoster }}
            style={styles.mainImage}
          />
          <View style={styles.logoContainer}>
            <Image
              source={{ uri: brandImage }}
              style={styles.logoImage}
            />
          </View>
        </View>

        {/* Brand info */}
        <View style={styles.brandInfoContainer}>
          <Text style={styles.brandName}>{brandName}</Text>
          <Text style={styles.brandDescription}>{brandDescription}</Text>
          <FontAwesome name="share" size={24} color="#8FFA09" style={styles.shareIcon} />
        </View>

        {/* Follow button */}
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>Follow</Text>
        </TouchableOpacity>

        <View>
          <SafeAreaView style={styles.area}>
            <Text style={styles.popularProductsTitle}>Brand Product</Text>
            <View style={styles.productcontainer}>
              {/* {popupMessage ? (
      <View style={styles.popup}>
        <Text style={styles.popupText}>{popupMessage}</Text>
      </View>
    ) : null} */}

              {displayedProducts.map((product, index) => {
                // const imageUrl = `${MEDIA_BASE_URL}${product.product_image.url}`;
                const imageUrl = getImageUrl(product.product_image);
                // console.log(imageUrl)
                const isOutOfStock = !product.in_stock;
                const isInWishlist = wishlist.some((wishItem) => wishItem.id === product.id);
                const isPopupVisible = popupProductId === product.id;
                return (
                  <View key={index} style={styles.productCard}>
                    {isPopupVisible && popupMessage !== "" && (
                      <View style={styles.popup}>
                        <Text style={styles.popupText}>{popupMessage}</Text>
                      </View>
                    )}
                    {imageUrl && (
                      <Image
                        source={{ uri: imageUrl }}
                        style={styles.productimage}
                        resizeMode="contain"
                      />
                    )}
                    <View style={styles.buttonContainer}>
                      {/* Wishlist Button */}
                      <TouchableOpacity style={styles.wishlistButton} onPress={() => handleWishlistAdd(product)}>
                        <Text style={styles.heartIcon}>{isInWishlist ? '❤️' : '🤍'}</Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => handleProductDetails(product)}>
                      <View style={styles.imageWrapper}>
                        <Text style={styles.productName}>{product.name}</Text>
                        {/* <Text style={styles.productdiscount}>{product.discount}% discount</Text> */}
                        <Text style={styles.productBrand}>
                          {product.brand?.brand_name}
                        </Text>
                        <Text style={styles.productDescription}>
                          {product.product_Details}
                        </Text>
                        <Text style={styles.productPrice}>₹{product.price}</Text>
                        {isOutOfStock && <Text style={styles.stockText}></Text>}
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.addToCartButton,
                        isOutOfStock && styles.disabledButton,
                      ]}
                      onPress={() => !isOutOfStock && handleCartAdd(product)}
                      disabled={isOutOfStock}
                    >
                      <Text style={styles.cartText}>
                        {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </SafeAreaView>
        </View>

        <Text style={styles.popularProductsTitle}>New Arrival</Text>
        <NewArrival />

        <View style={styles.slider}>
          <Slider />
        </View>

        {/* <Text style={styles.popularProductsTitle}>Shop by Category</Text>
        <Category /> */}

        <View>
          <Text style={styles.popularProductsTitle}>Most Selling</Text>
          <ProductList limit={4} />
        </View>

        <View>
          <Brand_page />
        </View>

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
    // borderRadius: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#161B1B',
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 26,
    marginTop: 15,
    height: 50,
  },
  headerContainer: {
    // flexDirection: 'row', // Align items horizontally
    // alignItems: 'center', // Vertically center align items
    // justifyContent: 'space-between', // Adjust spacing; use 'space-between' if needed
    paddingHorizontal: 10, // Add some padding on the sides
    marginTop: 10, // Add top margin if required
  },
  backButton: {
    marginRight: 10, // Space between the back button and the header text
    padding: 5, // Add touchable area around the button
  },
  searchInput: {
    marginLeft: 8,
    color: '#FFFFFF',
    fontSize: 16,
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  mainImage: {
    width: '100%',
    height: 198,
    borderRadius: 8,
  },
  logoContainer: {
    position: 'absolute',
    bottom: -25,
    left: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 35,
    padding: 2,

  },
  logoImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2, // Adjust the width as needed
    borderColor: '#8FFA09',

  },
  brandInfoContainer: {
    // backgroundColor: '#222222',
    padding: 16,
    borderRadius: 8,
    marginTop: 24, // Adjusted to give space for the overlaid logo
  },
  brandName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  brandDescription: {
    color: '#B3B3B3',
    fontSize: 14,
    marginTop: 4,
  },
  shareIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  followButton: {
    backgroundColor: '#8FFA09',
    width: 110,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginLeft: 15,
    marginBottom: 20,
  },
  followButtonText: {
    color: '#111111',
    fontSize: 16,
    fontWeight: 'bold',
  },
  popularProductsTitle: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginVertical: 8,
    paddingLeft: 10,
    marginBottom: 20,
    marginTop: 30
  },
  slider: {
    marginTop: 30
  },

  // area:{
  //     flex: 1,
  //     backgroundColor:"#000"
  //   },
  productcontainer: {
    // flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginVertical: 16,
    paddingHorizontal: 8, // Padding for spacing
    // backgroundColor:"#000"
  },
  productCard: {
    width: "48%", // Adjusted width for card size
    marginBottom: 16,
    backgroundColor: "#1D2221",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 5,
    borderColor: "#333",
    borderWidth: 1,
  },
  imageWrapper: {
    position: "relative",
    alignItems: "center", // Center image horizontally
  },
  productName: {
    color: "#ffffff",
    fontSize: 16, // Font size
    fontWeight: "bold",
    marginTop: 6, // Reduced margin for less height
    textAlign: 'center',
  },
  productdiscount: {
    color: "red",
    fontSize: 12,
  },
  productBrand: {
    color: "#8FFA09",
    fontSize: 12, // Font size
  },
  productDescription: {
    color: "#9CA3AF",
    fontSize: 12, // Font size
    marginTop: 2, // Reduced margin for less height
    textAlign: 'center',
  },
  productPrice: {
    color: "#ffffff",
    fontSize: 16, // Font size
    marginTop: 4, // Reduced margin for less height
    fontWeight: "bold",
  },
  productimage: {
    width: "100%", // Make image responsive
    height: 130, // Increase image height for a larger appearance
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
  },
  stockText: {
    color: "#FF6347",
    fontSize: 14, // Font size
    fontWeight: "bold",
    marginTop: 2, // Reduced margin for less height
  },
  buttonContainer: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 10,
  },
  wishlistButton: {
    backgroundColor: "transparent",
  },
  heartIcon: {
    fontSize: 20, // Font size
    color: "#FF6347",
  },
  addToCartButton: {
    backgroundColor: "#8FFA09",
    paddingVertical: 4, // Padding for button
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 4, // Reduced margin for less height
    marginBottom: 9,
  },
  cartText: {
    color: "#000",
    fontSize: 14, // Font size
    fontWeight: "bold",
  },
  popup: {
    position: 'absolute',
    top: '10%',
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: '#000',
    padding: 12, // Padding for popup
    borderRadius: 8,
    zIndex: 100,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  popupText: {
    color: '#fff',
    textAlign: 'center',
  },
  disabledButton: {
    backgroundColor: "#D3D3D3",
    opacity: 0.6,
  },
});


export default brand_info