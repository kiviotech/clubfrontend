import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  InteractionManager,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import ProductList from "../../components/productList";
import useProductStore from "../../src/store/useProductStore";
import { MEDIA_BASE_URL } from "../../src/api/apiClient";
import useCartStore from "../../src/store/useCartStore";
import useWishlistStore from "../../src/store/useWishlistStore";
import Svgs from "../../constants/svgs";
import { updateProduct } from "../../src/api/repositories/productRepository";
import * as ImageUtils from "../utils/imageUtils";
const { width } = Dimensions.get("window");
import { Modal } from "react-native";

const ProductDetails = () => {
  const productDetails = useProductStore((state) => state.productDetails);
  const setProductDetails = useProductStore((state) => state.setProductDetails);
  const addItemToCart = useCartStore((state) => state.addItem);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const params = useLocalSearchParams();
  const { images, name, price, products, in_stock, size } = params;
  const allProducts = products ? JSON.parse(products) : [];
  const isMounted = useRef(true);
  const [isLoading, setIsLoading] = useState(true);

  // Memoize images array to prevent unnecessary re-renders
  const imagesArray = useMemo(() => {
    return Array.isArray(productDetails.images)
      ? productDetails.images
      : []; // Default to empty array if images is not an array
  }, [productDetails.images]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("XS");
  const navigation = useNavigation();
  const router = useRouter();
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const isInWishlist = useWishlistStore((state) => state.wishlist.some((item) => item.id === productDetails.id));
  const [modalVisible, setModalVisible] = useState(false);
  const [cartPopupVisible, setCartPopupVisible] = useState(false);
  const [stockPopupMessage, setStockPopupMessage] = useState("");
  const isInCart = useCartStore((state) =>
    state.items.some(
      (item) => item.id === productDetails.id
    )
  );
  const totalCartItems = useCartStore((state) => state.getTotalItems());

  // Ensure component is mounted before updating state
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    // Use InteractionManager to defer non-critical operations
    InteractionManager.runAfterInteractions(() => {
      if (isMounted.current) {
        setIsLoading(false);
      }
    });
  }, []);

  const increment = useCallback(() => {
    // Find the stock for the selected size
    const selectedSizeObj = productDetails.sizes.find(
      (sizeObj) => sizeObj.size === selectedSize
    );

    if (selectedSizeObj && quantity < selectedSizeObj.number_of_items) {
      setQuantity(quantity + 1);
      setStockPopupMessage("");
    } else {
      const stockMessage = `Maximum available stock is ${selectedSizeObj?.number_of_items || 0}`;
      setStockPopupMessage(stockMessage);

      // Clear the popup message after 3 seconds
      setTimeout(() => {
        if (isMounted.current) {
          setStockPopupMessage("");
        }
      }, 3000);
    }
  }, [quantity, selectedSize, productDetails.sizes]);

  const decrement = useCallback(() => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }, [quantity]);

  const handleSizeSelection = useCallback((size) => {
    setSelectedSize(size);
    const selectedSizeObj = productDetails.sizes.find(
      (sizeObj) => sizeObj.size === size
    );
    if (selectedSizeObj) {
      // Reset quantity to 1 when size changes
      setQuantity(1);
    }
  }, [productDetails.sizes]);

  const handleAddToCart = useCallback(() => {
    try {
      // Check if the same product with the same size is already in the cart
      const existingItem = useCartStore.getState().items.find(
        (cartItem) => cartItem.id === productDetails.id && cartItem.size === selectedSize
      );
  
      if (existingItem) {
        setCartPopupVisible(true); // Show the cart popup if the same product with the same size exists
      } else {
        // Get the stock for the selected size
        const selectedSizeObj = productDetails.sizes.find(
          (sizeObj) => sizeObj.size === selectedSize
        );
  
        if (selectedSizeObj) {
          // Add the product with the selected size to the cart
          const item = {
            id: productDetails.id,
            name: productDetails.name,
            price: productDetails.price,
            quantity: quantity,
            size: selectedSize,
            stockAvailable: selectedSizeObj.number_of_items, // Include stock info for the selected size
            image: imagesArray[0],
          };
  
          addItemToCart(item); // Add the new item to the cart
          setIsAddedToCart(true);
          router.push("/pages/cart");
        } else {
          Alert.alert("Error", "Selected size details are unavailable.");
        }
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      Alert.alert("Error", "Failed to add item to cart. Please try again.");
    }
  }, [productDetails, selectedSize, quantity, imagesArray, addItemToCart, router]);

  const handleCartPopupConfirmation = useCallback((confirm) => {
    setCartPopupVisible(false);
    if (confirm) {
      router.push("/pages/cart");
    }
  }, [router]);

  const handleAddToWishlist = useCallback(() => {
    try {
      if (isInWishlist) {
        setModalVisible(true); // Show confirmation modal
      } else {
        const item = {
          id: productDetails.id,
          name: productDetails.name,
          price: productDetails.price,
          image: imagesArray[0],
          in_stock: productDetails.in_stock,
        };
        addToWishlist(item);
        router.push("/pages/wishlist");
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      Alert.alert("Error", "Failed to add item to wishlist. Please try again.");
    }
  }, [isInWishlist, productDetails, imagesArray, addToWishlist, router]);

  const handleConfirmWishlistNavigation = useCallback(() => {
    setModalVisible(false);
    router.push("/pages/wishlist");
  }, [router]);

  const handleImageScroll = useCallback((event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.floor(contentOffsetX / (width * 0.8));
    setActiveIndex(newIndex);
  }, []);

  const handleRequest = useCallback(() => {
    router.push("/pages/cart");
  }, [router]);

  const handleHome = useCallback(() => {
    router.push("/home");
  }, [router]);

  const handleGoBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack(); // Go to the previous screen if available
    } else {
      handleHome(); // Navigate to the home route
    }
  }, [navigation, handleHome]);

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.safeArea, styles.loadingContainer]}>
        <Text style={styles.loadingText}>Loading product details...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" color="white" size={20} />
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
      <ScrollView 
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
      >
        <View style={styles.imageSection}>
          {/* Custom Carousel */}
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleImageScroll}
            scrollEventThrottle={16}
            decelerationRate="fast"
            snapToInterval={width * 0.8}
            contentContainerStyle={{ paddingHorizontal: (width * 0.1) / 2 }}
            removeClippedSubviews={true}
          >
            {imagesArray.length > 0 ? (
              imagesArray.map((item, index) => (
                <View
                  key={index}
                  style={[
                    styles.imageContainer,
                    {
                      marginLeft: index === 0 ? 0 : 10,
                      marginRight: index === imagesArray.length - 1 ? 0 : 10,
                    },
                  ]}
                >
                  <Image
                    source={{ uri: item }}
                    style={styles.image}
                    resizeMode="cover"
                    progressiveRenderingEnabled={true}
                    fadeDuration={300}
                    onError={(e) => console.error('Image loading error:', e.nativeEvent.error)}
                  />
                </View>
              ))
            ) : (
              <Text style={{ color: "white", textAlign: "center" }}>
                No images available
              </Text>
            )}
          </ScrollView>

          {/* Pagination Dots */}
          <View style={styles.paginationContainer}>
            {imagesArray.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  { backgroundColor: index === activeIndex ? "#8FFA09" : "#555" },
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.detailsSection}>
          <Text style={styles.productName}>{productDetails.name}</Text>
          <Text style={styles.productPrice}>₹{productDetails.price}</Text>

          {/* Stock Status */}
          <View style={styles.stockContainer}>
            <View
              style={[
                styles.stockIndicator,
                {
                  backgroundColor: productDetails.in_stock ? "#8FFA09" : "#ff4d4d",
                },
              ]}
            />
            <Text style={styles.stockText}>
              {productDetails.in_stock ? "In Stock" : "Out of Stock"}
            </Text>
          </View>

          {/* Size Selection */}
          <Text style={styles.sectionTitle}>Select Size</Text>
          <View style={styles.sizeContainer}>
            {productDetails.sizes &&
              productDetails.sizes.map((sizeObj, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.sizeButton,
                    {
                      backgroundColor:
                        selectedSize === sizeObj.size ? "#8FFA09" : "#333",
                      opacity: sizeObj.number_of_items > 0 ? 1 : 0.5,
                    },
                  ]}
                  onPress={() => handleSizeSelection(sizeObj.size)}
                  disabled={sizeObj.number_of_items <= 0}
                >
                  <Text
                    style={[
                      styles.sizeText,
                      {
                        color: selectedSize === sizeObj.size ? "#000" : "#fff",
                      },
                    ]}
                  >
                    {sizeObj.size}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>

          {/* Quantity Selection */}
          <Text style={styles.sectionTitle}>Quantity</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={decrement}
              disabled={quantity <= 1}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity style={styles.quantityButton} onPress={increment}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          {/* Stock Warning Message */}
          {stockPopupMessage ? (
            <Text style={styles.stockWarning}>{stockPopupMessage}</Text>
          ) : null}

          {/* Description */}
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>
            {productDetails.description || "No description available."}
          </Text>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                styles.wishlistButton,
                isInWishlist && styles.activeWishlistButton,
              ]}
              onPress={handleAddToWishlist}
            >
              <Ionicons
                name={isInWishlist ? "heart" : "heart-outline"}
                size={24}
                color={isInWishlist ? "#fff" : "#8FFA09"}
              />
              <Text
                style={[
                  styles.actionButtonText,
                  isInWishlist && styles.activeButtonText,
                ]}
              >
                {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.actionButton,
                styles.cartButton,
                isInCart && styles.activeCartButton,
              ]}
              onPress={handleAddToCart}
              disabled={!productDetails.in_stock}
            >
              <Ionicons
                name={isInCart ? "cart" : "cart-outline"}
                size={24}
                color={isInCart ? "#fff" : "#000"}
              />
              <Text
                style={[
                  styles.actionButtonText,
                  styles.cartButtonText,
                  isInCart && styles.activeCartButtonText,
                ]}
              >
                {isInCart ? "In Cart" : "Add to Cart"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Similar Products */}
        <View style={styles.similarProductsSection}>
          <Text style={styles.similarProductsTitle}>You May Also Like</Text>
          <ProductList limit={4} />
        </View>
      </ScrollView>

      {/* Wishlist Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Item Already in Wishlist</Text>
            <Text style={styles.modalText}>
              This item is already in your wishlist. Would you like to view your
              wishlist?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleConfirmWishlistNavigation}
              >
                <Text style={styles.modalButtonText}>View Wishlist</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Cart Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={cartPopupVisible}
        onRequestClose={() => setCartPopupVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Item Already in Cart</Text>
            <Text style={styles.modalText}>
              This item is already in your cart. Would you like to view your
              cart?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => handleCartPopupConfirmation(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={() => handleCartPopupConfirmation(true)}
              >
                <Text style={styles.modalButtonText}>View Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  leftIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginRight: 16,
    position: "relative",
  },
  iconButton: {
    padding: 8,
  },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#8FFA09",
    borderRadius: 10,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#000",
    fontSize: 10,
    fontWeight: "bold",
  },
  imageSection: {
    marginBottom: 20,
  },
  imageContainer: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  detailsSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#8FFA09",
    marginBottom: 16,
  },
  stockContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  stockIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  stockText: {
    fontSize: 14,
    color: "#ccc",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
  },
  sizeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  sizeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 12,
    marginBottom: 12,
  },
  sizeText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  quantityButton: {
    backgroundColor: "#333",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginHorizontal: 16,
  },
  stockWarning: {
    color: "#ff4d4d",
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 14,
    color: "#ccc",
    lineHeight: 22,
    marginBottom: 24,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    flex: 0.48,
  },
  wishlistButton: {
    backgroundColor: "#222",
    borderWidth: 1,
    borderColor: "#8FFA09",
  },
  activeWishlistButton: {
    backgroundColor: "#8FFA09",
    borderColor: "#8FFA09",
  },
  cartButton: {
    backgroundColor: "#8FFA09",
  },
  activeCartButton: {
    backgroundColor: "#8FFA09",
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 8,
  },
  cartButtonText: {
    color: "#000",
  },
  activeButtonText: {
    color: "#000",
  },
  activeCartButtonText: {
    color: "#fff",
  },
  similarProductsSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  similarProductsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    backgroundColor: "#222",
    borderRadius: 12,
    padding: 24,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
    textAlign: "center",
  },
  modalText: {
    fontSize: 14,
    color: "#ccc",
    marginBottom: 24,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    paddingVertical: 12,
    borderRadius: 8,
    flex: 0.48,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#333",
  },
  confirmButton: {
    backgroundColor: "#8FFA09",
  },
  modalButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default ProductDetails;
