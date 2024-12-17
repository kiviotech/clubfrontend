import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Image, SafeAreaView,ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import ProductList from '../../components/productList/ProductList';
import { useBrandStore } from "../../src/store/brandStore";
import { useRouter,useNavigation } from 'expo-router'; 
import { getProducts } from '../../src/api/repositories/productRepository';
import { MEDIA_BASE_URL } from '../../src/api/apiClient';
import useProductStore from '../../src/store/useProductStore';
import useWishlistStore from '../../src/store/useWishlistStore';
import Svgs from '../../constants/svgs';
import { Ionicons } from "@expo/vector-icons";
import useCartStore from '../../src/store/useCartStore';

const Brand = ({ limit }) => {
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
  const navigation = useNavigation();
  
  
  const imagesArray =
    typeof products.images === "string"
      ? [`${MEDIA_BASE_URL}${products.images}`]
      : (products.images || []).map((img) => `${MEDIA_BASE_URL}${img}`);

      const getImageUrl = (images) => {
        if (Array.isArray(images) && images.length > 0) {
          return `${MEDIA_BASE_URL}${images[0].url}`; // Assuming each image has a `url` field
        }
        return null; // Fallback if no images
      };

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleRequest = () => {
    router.push("/pages/cart"); 
  };

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
    ? products.filter((product) => product.brand?.brand_name === selectedBrand)
    : products;
  const displayedProducts = limit ? filteredProducts.slice(0, limit) : filteredProducts;

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
      documentId:product.documentId,
      description:product.description
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
    const imageUrl =getImageUrl(product.product_image);
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
    <SafeAreaView style={styles.area}>
      <View style={styles.header}>
        <View style={styles.backSection}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" color="white" size={20} />
          </TouchableOpacity>
          <Text style={styles.brandTitle}>
          {selectedBrand ? `${selectedBrand} Products` : "All Products"}
        </Text>
        </View>
        <View style={styles.rightIcons}>
          <TouchableOpacity onPress={handleRequest}>
            <Svgs.cartIcon width={18} height={18} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/pages/wishlist")}>
            <Svgs.wishlistIcon width={18} height={18} />
          </TouchableOpacity>
        </View>
      </View>
      {/* <View style={styles.titleContainer}>
        <Text style={styles.brandTitle}>
          {selectedBrand ? `${selectedBrand} Products` : "All Products"}
        </Text>
      </View> */}
    <View style={styles.container}>
    {/* {popupMessage ? (
      <View style={styles.popup}>
        <Text style={styles.popupText}>{popupMessage}</Text>
      </View>
    ) : null} */}
    {displayedProducts.map((product, index) => {
      // const imageUrl = `${MEDIA_BASE_URL}${product.product_image.url}`;
      const imageUrl = getImageUrl(product.product_image);
      const isOutOfStock = !product.in_stock;
      const isInWishlist = wishlist.some((wishItem) => wishItem.id === product.id);
      const isPopupVisible = popupProductId === product.id;
      return (
        <View key={index} style={styles.productCard}>
          {isPopupVisible && popupMessage !== ""  && (
            <View style={styles.popup}>
              <Text style={styles.popupText}>{popupMessage}</Text>
            </View>
          )}
          <Image
            source={{ uri: imageUrl }}
            style={styles.productimage}
            resizeMode="contain"
          />
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
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  area:{
    flex: 1,
    backgroundColor:"#000"
  },
  titleContainer: {
    padding: 16,
    alignItems: "center",
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#8FFA09",
  },
  container: {
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
    color: "#ffffff",
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

export default Brand;
