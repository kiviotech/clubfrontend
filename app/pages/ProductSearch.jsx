import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { getProducts } from "../../src/api/repositories/productRepository";
import { useBrandStore } from "../../src/store/brandStore";
import { MEDIA_BASE_URL } from "../../src/api/apiClient";
import useProductStore from "../../src/store/useProductStore";
import useCartStore from "../../src/store/useCartStore";
import useWishlistStore from "../../src/store/useWishlistStore";
import { updateProduct } from "../../src/api/repositories/productRepository";

const ProductSearch = ({ limit,searchTerm }) => {
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

  const increment = () => setQuantity(quantity + 1);
  const decrement = () => quantity > 1 && setQuantity(quantity - 1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data.data);
  
        const updatedProducts = [...response.data.data];
  
        for (let i = 0; i < updatedProducts.length; i++) {
          const product = updatedProducts[i];
  
          // Check if any size has available stock
          const hasAvailableStock = product.sizes.some(
            (size) => size.number_of_items > 0
          );
  
          // If any size has stock, mark the product as in stock
          const updatedProductData = {
            data: {
              in_stock: hasAvailableStock,
            },
          };
  
          // Update product stock locally first
          if (hasAvailableStock !== product.in_stock) {
            updatedProducts[i] = {
              ...product,
              in_stock: hasAvailableStock, // Update the in_stock property immediately
            };
  
            setProducts(updatedProducts); // Update the state immediately for the UI
  
            // Then, send the updated data to the server
            await updateProduct(product.documentId, updatedProductData);
            // console.log(`Product ${product.name} stock status updated.`);
          }
        }
  
      } catch (error) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [selectedBrand]);
  

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      documentId:product.documentId,
      description:product.description
    });
  
    router.push("../../pages/productDetails");
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
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
    const imageUrl =getImageUrl(product.product_image);
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
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        {displayedProducts.map((product, index) => {
          // const imageUrl = `${MEDIA_BASE_URL}${product.product_image.url}`;
          const imageUrl = getImageUrl(product.product_image);
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
              <Image
                source={{ uri: imageUrl }}
                style={styles.productImage}
                resizeMode="contain"
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.wishlistButton}
                  onPress={() => handleWishlistAdd(product)}
                >
                  <Text style={styles.heartIcon}>{isInWishlist ? "❤️" : "🤍"}</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => handleProductDetails(product)}>
                <View style={styles.imageWrapper}>
                  <Text style={styles.productName}>{product.name}</Text>
                  {/* <Text style={styles.productDiscount}>{product.discount}% discount</Text> */}
                  <Text style={styles.productBrand}>{product.brand?.brand_name}</Text>
                  <Text style={styles.productDescription}>{product.product_Details}</Text>
                  <Text style={styles.productPrice}>₹{product.price}</Text>
                  {/* {isOutOfStock && <Text style={styles.stockText}>Out of Stock</Text>} */}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "black", // Set background color to black
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginVertical: 16,
    paddingHorizontal: 8,
  },
  productCard: {
    width: "48%",
    marginBottom: 16,
    backgroundColor: "#1D2221",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 5,
    borderColor: "#333",
    borderWidth: 1,
  },
  imageWrapper: {
    alignItems: "center",
  },
  productName: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 6,
    textAlign: 'center',
  },
  productDiscount: {
    color: "red",
    fontSize: 12,
  },
  productBrand: {
    color: "#8FFA09",
    fontSize: 12,
  },
  productDescription: {
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 2,
    textAlign: 'center',
  },
  productPrice: {
    color: "#ffffff",
    fontSize: 16,
    marginTop: 4,
    fontWeight: "bold",
  },
  productImage: {
    width: "100%",
    height: 130,
  },
  stockText: {
    color: "#FF6347",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 2,
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
    fontSize: 20,
    color: "#FF6347",
  },
  addToCartButton: {
    backgroundColor: "#8FFA09",
    paddingVertical: 4,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 4,
    marginBottom: 9,
  },
  cartText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
  },
  popup: {
    position: "absolute",
    top: "10%",
    left: "50%",
    transform: [{ translateX: -50 }],
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 8,
    zIndex: 100,
    elevation: 5,
  },
  popupText: {
    color: "#fff",
    textAlign: "center",
  },
  disabledButton: {
    backgroundColor: "#D3D3D3",
    opacity: 0.6,
  },
  errorText: {
    color: "white",
    textAlign: "center",
  },
});

export default ProductSearch;
