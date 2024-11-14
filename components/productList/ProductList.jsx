import React, { useEffect, useState } from "react";
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

const ProductList = ({ limit}) => {
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
  
  

  const imagesArray =
    typeof products.images === "string"
      ? [`${MEDIA_BASE_URL}${products.images}`]
      : (products.images || []).map((img) => `${MEDIA_BASE_URL}${img}`);


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




  const displayedProducts = limit ? products.slice(0, limit) : products;
 

  const handleProductDetails = (product) => {
    setProductDetails({
      id: product.id,
      images: product.product_image.url,
      name: product.name,
      price: product.price,
      products,
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
    const imageUrl = `${MEDIA_BASE_URL}${product.product_image.url}`;
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: imageUrl,
    };

    if (wishlist.some((wishItem) => wishItem.id === product.id)) {
      removeFromWishlist(product.id);
      setPopupMessage("Removed from wishlist! ❌");
    } else {
      addToWishlist(item);
      setPopupMessage("Added to wishlist!✔️");
    }

    setTimeout(() => {
      setPopupMessage("");
    }, 2000);
  };

  const handleCartAdd = (product) => {
    const imageUrl = `${MEDIA_BASE_URL}${product.product_image.url}`;
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: imageUrl,
    };

    addItemToCart(item);
    setPopupMessage("Added to cart! 🛒");

    // Automatically clear the popup message after 2 seconds
    setTimeout(() => {
      setPopupMessage("");
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {popupMessage ? (
        <View style={styles.popup}>
          <Text style={styles.popupText}>{popupMessage}</Text>
        </View>
      ) : null}
      {displayedProducts.map((product, index) => {
        const imageUrl = `${MEDIA_BASE_URL}${product.product_image.url}`;
        const isOutOfStock = !product.in_stock;
        const isInWishlist = wishlist.some((wishItem) => wishItem.id === product.id);

        return (
          <View key={index} style={styles.productCard}>
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
                <Text style={styles.productdiscount}>{product.discount}% discount</Text>
                <Text style={styles.productBrand}>
                  {product.brand.brand_name}
                </Text>
                <Text style={styles.productDescription}>
                  {product.description}
                </Text>
                <Text style={styles.productPrice}>{product.price}</Text>
                {isOutOfStock && <Text style={styles.stockText}></Text>}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.addToCartButton, isOutOfStock && styles.disabledButton]}
              onPress={() => !isOutOfStock && handleCartAdd(product)}
              disabled={isOutOfStock}
            >
              <Text style={styles.cartText}>{isOutOfStock ? 'Out of Stock' : 'Add to Cart'}</Text>
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
    backgroundColor: "#1F2937",
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
  },
  productdiscount:{
    color: "red",
    fontSize: 12,
  },
  productBrand: {
    color: "#9CA3AF",
    fontSize: 12, // Font size
  },
  productDescription: {
    color: "#9CA3AF",
    fontSize: 12, // Font size
    marginTop: 2, // Reduced margin for less height
  },
  productPrice: {
    color: "#ffffff",
    fontSize: 16, // Font size
    marginTop: 4, // Reduced margin for less height
    fontWeight: "bold",
  },
  productimage: {
    width: "100%", // Make image responsive
    height: 150, // Increase image height for a larger appearance
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
    paddingVertical: 6, // Padding for button
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 4, // Reduced margin for less height
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
});

export default ProductList;
