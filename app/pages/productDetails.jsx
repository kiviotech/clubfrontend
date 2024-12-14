import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,

} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import ProductList from "../../components/productList";
import useProductStore from "../../src/store/useProductStore";
import { MEDIA_BASE_URL } from "../../src/api/apiClient";
import useCartStore from "../../src/store/useCartStore";
import useWishlistStore from "../../src/store/useWishlistStore";
// import { Modal } from "react-native-web";
import Svgs from "../../constants/svgs";
import { updateProduct } from "../../src/api/repositories/productRepository";
const { width } = Dimensions.get("window");
import { Modal } from "react-native";

const ProductDetails = () => {

  const productDetails = useProductStore((state) => state.productDetails);
  const addItemToCart = useCartStore((state) => state.addItem);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const params = useLocalSearchParams();
  const { images, name, price, products, in_stock, size } = params;
  const allProducts = products ? JSON.parse(products) : [];
  // console.log(productDetails.images[0])
  // console.log(productDetails.images[1])

  const imagesArray = Array.isArray(productDetails.images)
    ? productDetails.images.map((img) => {
      // If the image path already contains the full URL, use it as is
      if (img.startsWith("http://") || img.startsWith("https://")) {
        return img;
      }
      // Otherwise, append the base URL to the relative image path
      return `${MEDIA_BASE_URL}${img}`;
    })
    : []; // Default to empty array if images is not an array

  // console.log(imagesArray); // Debug to check the image URLs

  // console.log(productDetails);

  const [activeIndex, setActiveIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("XS");
  const navigation = useNavigation();
  const router = useRouter();
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  // const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const isInWishlist = useWishlistStore((state) => state.wishlist.some((item) => item.id === productDetails.id));
  const [modalVisible, setModalVisible] = useState(false);
  const [cartPopupVisible, setCartPopupVisible] = useState(false);
  const isInCart = useCartStore((state) =>
    state.items.some(
      (item) => item.id === productDetails.id
    )
  );
  const totalCartItems = useCartStore((state) => state.getTotalItems());

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    // Check and update the stock status when the component mounts
    handleUpdateStockStatus(productDetails);
  }, [productDetails]);

  const isOutOfStock = (sizes) => {
    return sizes.every(size => size.number_of_items === 0);
  };

  const handleUpdateStockStatus = (productDetails) => {
    if (isOutOfStock(productDetails.sizes)) {
      // Update product data with in_stock set to false
      const updatedProductData = {
        data: {
          // ...productDetails,
          in_stock: false,
        }
      };

      updateProduct(productDetails.documentId, updatedProductData)
        .then(response => {
          // console.log("Product stock status updated successfully:", response);
        })
        .catch(error => {
          // console.error("Error updating product stock status:", error);
        });
    }
  };



  const handleAddToCart = () => {
    // Check if the same product with the same size is already in the cart
    const existingItem = useCartStore.getState().items.find(
      (cartItem) => cartItem.id === productDetails.id && cartItem.size === selectedSize
    );

    if (existingItem) {
      setCartPopupVisible(true); // Show the cart popup if the same product with the same size exists
    } else {
      // Add the product with the selected size to the cart
      const item = {
        id: productDetails.id,
        name: productDetails.name,
        price: productDetails.price,
        quantity: quantity,
        size: selectedSize,
        image: imagesArray[0],
      };

      addItemToCart(item); // Add the new item to the cart
      setIsAddedToCart(true);
      router.push("/pages/cart");
    }
  };



  const handleCartPopupConfirmation = (confirm) => {
    setCartPopupVisible(false);
    if (confirm) {
      router.push("/pages/cart");
    }
  };

  const handleAddToWishlist = () => {
    if (isInWishlist) {
      setModalVisible(true); // Show confirmation modal
    } else {
      const item = {
        id: productDetails.id,
        name: productDetails.name,
        price: productDetails.price,
        image: imagesArray[0],
      };
      addToWishlist(item);
      router.push("/pages/wishlist");
      // alert("Product added to wishlist!");
    }
  };

  const handleConfirmWishlistNavigation = () => {
    setModalVisible(false);
    router.push("/pages/wishlist");
  };


  const handleImageScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.floor(contentOffsetX / (width * 0.8));
    setActiveIndex(newIndex);
  };
  const handleRequest = () => {
    router.push("/pages/cart");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
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
      <ScrollView showsVerticalScrollIndicator={false}>
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
                  styles.dot,
                  {
                    backgroundColor:
                      index === activeIndex ? "#8FFA09" : "#A4A4AA",
                  },
                ]}
              />
            ))}
          </View>

        </View>

        <View style={styles.productInfo}>
          <Text style={styles.productName}>{productDetails.name}</Text>
          <Text style={styles.productPrice}>₹{productDetails.price}</Text>
          {productDetails.in_stock ? (
            <Text style={styles.inStockText}>In Stock</Text>
          ) : (
            <Text style={styles.outOfStockText}>Out of Stock</Text>
          )}
        </View>

        <View style={styles.quantitySection}>
          <Text style={styles.quantityLabel}>Quantity</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={decrement} style={styles.quantityButton}>
              <Text style={styles.quantityText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={increment} style={styles.quantityButton}>
              <Text style={styles.quantityText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.sizeSection}>
          <Text style={styles.sizeLabel}>Size</Text>
          <View style={styles.sizeContainer}>
            {productDetails.sizes &&
              productDetails.sizes.map((sizeObj, index) => (
                <View key={index} style={styles.sizeItem}>
                  <TouchableOpacity
                    onPress={() => setSelectedSize(sizeObj.size)}
                    style={[
                      styles.sizeButton,
                      {
                        backgroundColor:
                          sizeObj.number_of_items === 0
                            ? "#4A4A4A" // Disabled color
                            : selectedSize === sizeObj.size
                              ? "#8FFA09" // Selected size color
                              : "#1D2221", // Default button color
                      },
                    ]}
                    disabled={sizeObj.number_of_items === 0} // Disable button if no stock
                  >
                    <Text
                      style={{
                        color: sizeObj.number_of_items === 0 ? "#A4A4AA" : "#ffffff", // Dim text color if disabled
                      }}
                    >
                      {sizeObj.size}
                    </Text>
                  </TouchableOpacity>

                  {/* Display number of products and stock status */}
                  <Text style={styles.sizeInfo}>{`${sizeObj.number_of_items}`}</Text>
                  <Text style={styles.sizeInfo}>
                    {`Stock: ${sizeObj.in_stock ? "Yes" : "No"}`}
                  </Text>
                </View>
              ))}
          </View>
        </View>


        <View style={styles.actionButtons}>
          <TouchableOpacity
            onPress={handleAddToCart}
            style={[styles.addToCartButton, !productDetails.in_stock && styles.disabledButton]}
            disabled={!productDetails.in_stock}
          >
            <Text style={styles.addToCartText}>
              {isAddedToCart ? "In Cart" : "Add to Cart"}
            </Text>
          </TouchableOpacity>

          <Modal
            visible={cartPopupVisible}
            transparent={true}
            animationType="fade" // Better for a mobile experience
            onRequestClose={() => setCartPopupVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>
                  Product already in cart! Do you want to go to your cart?
                </Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    onPress={() => handleCartPopupConfirmation(false)}
                    style={styles.modalButton}
                  >
                    <Text style={styles.modalButtonText}>No</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleCartPopupConfirmation(true)}
                    style={styles.modalButton}
                  >
                    <Text style={styles.modalButtonText}>Yes</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <View>
            {/* Add to Wishlist Button */}
            <TouchableOpacity
              onPress={handleAddToWishlist}
              style={styles.addToWishlistButton}
            >
              <Text style={styles.addToWishlistText}>Add to Wishlist</Text>
            </TouchableOpacity>

            {/* Modal for Confirmation */}
            <Modal
              visible={modalVisible}
              transparent={true}
              animationType="slide"
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalText}>
                    This product is already in your wishlist. Do you want to go to the wishlist page?
                  </Text>
                  <View style={styles.modalButtons}>
                    <TouchableOpacity
                      onPress={() => setModalVisible(false)}
                      style={styles.modalButton}
                    >
                      <Text style={styles.modalButtonText}>No</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={handleConfirmWishlistNavigation}
                      style={styles.modalButton}
                    >
                      <Text style={styles.modalButtonText}>Yes</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </View>

        <View style={styles.detailsSection}>
          <Text style={styles.detailsTitle}>Product Details</Text>
          <Text style={styles.detailsText}>
            {productDetails.description}
          </Text>
          {/* <Text style={styles.detailsText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit...
          </Text> */}
          <TouchableOpacity>
            <Text style={styles.seeMoreText}>See More</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.relatedProductsSection}>
          <Text style={styles.relatedProductsTitle}>Related Products</Text>
          <ScrollView>
            <ProductList products={allProducts} />
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "black",
    paddingLeft: 20,
    paddingRight: 20,
  },

  // Header

  header: {
    display: "flex",
    flexDirection: "row",
    gap: 260,
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

  // Image Section
  imageSection: {
    marginBottom: 16,
    marginTop: 20,
  },
  imageContainer: {
    width: width * 0.8,
    height: 300,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#333",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },

  // Product Info
  productInfo: {
    marginBottom: 16,
  },
  productName: {
    fontSize: 24,
    color: "white",
  },
  productPrice: {
    fontSize: 20,
    color: "white",
    marginVertical: 8,
  },
  outOfStockText: {
    fontSize: 16,
    color: "#A4A4AA",
    marginTop: 8,
  },

  // Quantity Section
  quantitySection: {
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quantityLabel: {
    fontSize: 18,
    color: "white",
    marginVertical: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1D2221",
    borderRadius: 50,
    paddingVertical: 1,
    paddingHorizontal: 12,
  },
  quantityButton: {
    padding: 8,
    backgroundColor: "#1D2221",
  },
  quantityText: {
    color: "#fff",
    fontSize: 16,
  },

  // Size Section
  sizeSection: {
    marginBottom: 16,
  },
  sizeLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "#ffffff",
  },
  sizeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allows wrapping to the next line
    justifyContent: 'center', // Centers the buttons
    gap: 10, // Even spacing between buttons
  },
  sizeItem: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  sizeButton: {
    width: 50, // Fixed width for uniform buttons
    height: 35, // Fixed height for uniform buttons
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#1D2221', // Default button color
  },
  sizeInfo: {
    fontSize: 12,
    color: '#8FFA09',
    marginTop: 5, // Adds spacing below the button
  },



  // Action Buttons
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 16,
  },
  addToCartButton: {
    backgroundColor: "#1D2221",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  addToCartText: {
    color: "#8FFA09",
    fontSize: 18,
    textAlign: "center",
  },
  addToWishlistButton: {
    backgroundColor: "#1D2221",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  addToWishlistText: {
    color: "#8FFA09",
    fontSize: 18,
    textAlign: "center",
  },

  // Product Details Section
  detailsSection: {
    marginBottom: 16,
  },
  detailsTitle: {
    fontSize: 24,
    color: "white",
    marginVertical: 8,
  },
  detailsText: {
    fontSize: 16,
    color: "white",
    marginVertical: 8,
  },
  seeMoreText: {
    color: "#A4A4AA",
    fontSize: 16,
  },

  // Related Products Section
  relatedProductsSection: {
    flexDirection: "column",
    marginBottom: 16,
  },
  relatedProductsTitle: {
    fontSize: 24,
    color: "white",
    marginVertical: 8,
  },
  inStockText: {
    fontSize: 16,
    color: "#8FFA09", // Green for in stock
    marginTop: 8,
  },

  // Disabled Button Style
  disabledButton: {
    backgroundColor: "#A4A4AA", // Gray for disabled button
  },

  // Out of Stock Text Style
  outOfStockText: {
    fontSize: 16,
    color: "#FF6B6B", // Red for out of stock
    marginTop: 8,
  },
  addToWishlistButton: {
    backgroundColor: "#1D2221",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#8FFA09",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: "#1D2221",
    borderRadius: 5,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default ProductDetails;
