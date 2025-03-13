import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { getProducts } from "../../src/api/repositories/productRepository";
import { useBrandStore } from "../../src/store/brandStore";
import { MEDIA_BASE_URL } from "../../src/api/apiClient";
import useProductStore from "../../src/store/useProductStore";
import useCartStore from "../../src/store/useCartStore";
import useWishlistStore from "../../src/store/useWishlistStore";
import { updateProduct } from "../../src/api/repositories/productRepository";
import * as ImageUtils from "../../app/utils/imageUtils";

const ProductList = ({ limit }) => {
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
  const [selectedSize, setSelectedSize] = useState(null);

  const imagesArray =
    typeof products.images === "string"
      ? [`${MEDIA_BASE_URL}${products.images}`]
      : (products.images || []).map((img) => `${MEDIA_BASE_URL}${img}`);

  // Helper function to get the first image URL with optimized format
  const getImageUrl = useCallback((images) => {
    if (Array.isArray(images) && images.length > 0) {
      // Use the optimized image URL for list view
      return ImageUtils.getOptimizedImageUrl(images[0], 'list');
    }
    return null; // Fallback if no images
  }, []);

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Limit the number of products fetched to reduce memory usage
        const response = await getProducts();
        
        // Only process a limited number of products to avoid memory issues
        const limitedProducts = response.data.data.slice(0, 10); // Limit to 10 products
        setProducts(limitedProducts);

        // Process stock updates in batches to avoid too many state updates
        const updatedProducts = [...limitedProducts];
        let hasChanges = false;

        for (let i = 0; i < updatedProducts.length; i++) {
          const product = updatedProducts[i];
          const hasAvailableStock = product.sizes.some(
            (size) => size.number_of_items > 0
          );

          if (hasAvailableStock !== product.in_stock) {
            updatedProducts[i] = {
              ...product,
              in_stock: hasAvailableStock,
            };
            hasChanges = true;
            
            // Update on server in background
            updateProduct(product.documentId, {
              data: { in_stock: hasAvailableStock }
            }).catch(err => console.log('Error updating product:', err));
          }
        }

        // Only update state if changes were made
        if (hasChanges) {
          setProducts(updatedProducts);
        }
      } catch (error) {
        setError("Failed to load products");
      }
    };

    fetchProducts();
  }, [selectedBrand]);

  const displayedProducts = limit ? products.slice(0, limit) : products;

  const handleProductDetails = useCallback((product) => {
    // Use full-size images for product details
    const images = product.product_image.map(
      (img) => ImageUtils.getOptimizedImageUrl(img, 'detail')
    );

    setProductDetails({
      id: product.id,
      images: images,
      name: product.name,
      price: product.price,
      in_stock: product.in_stock,
      sizes: product.sizes, // Include sizes in the details
      documentId: product.documentId,
      description: product.description,
    });

    router.push("../../pages/productDetails");
  }, [router, setProductDetails]);

  // if (loading) {
  //   return <ActivityIndicator size="large" color="#0000ff" />;
  // }

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
      in_stock: product.in_stock,
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
    const sizeStock = product.sizes[1]?.number_of_items || 0;
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: imageUrl,
      size: "S",
      stockAvailable: sizeStock,
    };

    // Check if the product is already in the cart
    const isProductInCart = useCartStore
      .getState()
      .items.some((cartItem) => cartItem.id === product.id);

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

  // Optimize image rendering
  const productimage = {
    width: "100%",
    height: 130,
    // Use aspectRatio instead of fixed height for better scaling
    aspectRatio: 1,
  };

  return (
    <View style={styles.container}>
      {displayedProducts.map((product, index) => {
        const imageUrl = getImageUrl(product.product_image);
        const isOutOfStock = !product.in_stock;
        const isInWishlist = wishlist.some(
          (wishItem) => wishItem.id === product.id
        );
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
                // Add error handling and loading placeholder
                onError={(e) => console.log('Image loading error:', e.nativeEvent.error)}
                progressiveRenderingEnabled={true}
                fadeDuration={300}
              />
            )}
            <View style={styles.buttonContainer}>
              {/* Wishlist Button */}
              <TouchableOpacity
                style={styles.wishlistButton}
                onPress={() => handleWishlistAdd(product)}
              >
                <Text style={styles.heartIcon}>
                  {isInWishlist ? "❤️" : "🤍"}
                </Text>
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
                {/* {isOutOfStock && <Text style={styles.stockText}></Text>} */}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginVertical: 16,
    paddingHorizontal: 8, // Padding for spacing
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
    textAlign: "center",
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
    textAlign: "center",
  },
  productPrice: {
    color: "#ffffff",
    fontSize: 16, // Font size
    marginTop: 4, // Reduced margin for less height
    fontWeight: "bold",
  },
  productimage: {
    width: "100%",
    height: 130,
    // Use aspectRatio instead of fixed height for better scaling
    aspectRatio: 1,
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
    position: "absolute",
    top: "50%",
    left: "35%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    backgroundColor: "#000",
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
    width: "80%", // Adjust width as needed
  },
  popupText: {
    color: "#fff",
    textAlign: "center",
  },
  disabledButton: {
    backgroundColor: "#D3D3D3",
    opacity: 0.6,
  },
});

export default ProductList;
