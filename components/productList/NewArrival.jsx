import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { getProducts } from "../../src/api/repositories/productRepository";
import { useBrandStore } from "../../src/store/brandStore";
import { MEDIA_BASE_URL } from "../../src/api/apiClient";
import useProductStore from "../../src/store/useProductStore";
import useCartStore from "../../src/store/useCartStore";
import useWishlistStore from "../../src/store/useWishlistStore";
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProductList from "./ProductList";


const { width } = Dimensions.get('window');

const NewArrival = ({ limit }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const setProductDetails = useProductStore((state) => state.setProductDetails);
  const addItemToCart = useCartStore((state) => state.addItem);
  const selectedBrand = useBrandStore((state) => state.selectedBrand);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const { wishlist, removeFromWishlist } = useWishlistStore();
  const [popupMessage, setPopupMessage] = useState("");


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

  const getImageUrl = (images) => {
    if (Array.isArray(images) && images.length > 0) {
      return `${MEDIA_BASE_URL}${images[0].url}`; // Display only the first image
    }
    return null; // Fallback if no images
  };

  // Function to handle product details click

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
    const isInWishlist = wishlist.some((wishItem) => wishItem.id === product.id);
    // console.log("Is product in wishlist:", isInWishlist);
    const imageUrl = `${MEDIA_BASE_URL}${product.product_image.url}`;
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: imageUrl,
    };

    if (isInWishlist) {
      removeFromWishlist(product.id);
      // console.log("Removed from wishlist");
      setPopupMessage("Removed from wishlist! ❌");
    } else {
      addToWishlist(item);
      // console.log("Added to wishlist");
      setPopupMessage("Added to wishlist! ✔️");
    }

    setTimeout(() => {
      setPopupMessage("");
    }, 2000);
  };

  const handleNotify = () => {
    router.push("/pages/viewProduct");
  };


  return (
    <View style={styles.container}>
    {popupMessage ? (
      <View style={styles.popup}>
        <Text style={styles.popupText}>{popupMessage}</Text>
      </View>
    ) : null}
    <FlatList
      data={displayedProducts}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <TouchableOpacity
              onPress={() => handleWishlistAdd(item)}
              style={styles.favoriteIcon}
            >
              <MaterialIcons
                name={wishlist.some((wishItem) => wishItem.id === item.id)
                  ? "favorite"
                  : "favorite-border"}
                size={18}
                color={wishlist.some((wishItem) => wishItem.id === item.id)
                  ? "red"
                  : "#fff"}
              />
            </TouchableOpacity>

            {/* Display only the first image of each product */}
            <Image
              source={{ uri: getImageUrl(item.product_image) }}
              style={styles.productImage}
              resizeMode="contain"
            />

            <TouchableOpacity
              onPress={() => handleProductDetails(item)}
              style={styles.cardDetails}
            >
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productBrand}>{item.brand?.brand_name}</Text>
              <Text style={styles.productPrice}>₹{item.price}</Text>
            </TouchableOpacity>
          </View>

          {/* Add to cart button */}
          <TouchableOpacity onPress={handleNotify}>
            <View style={styles.addToCartButton}>
              <Icon name="add" size={18} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
    />
  </View>
  );
};


const styles = StyleSheet.create({
  container: {
    // No padding here to eliminate space on the left
    paddingLeft: 5,
    paddingBottom: 15,
  },
  listContainer: {
    // Removed horizontal padding to remove space on the left
    // No extra padding
  },
  card: {
    width: width * 0.50,  // Keep the width the same
    height: 250,  // Adjust the card height
    backgroundColor: '#333',
    borderRadius: 10,
    marginRight: 10,  // Only keep margin on the right for spacing
    padding: 10,
    position: 'relative',
  },
  cardContent: {
    flex: 1,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#444',
    padding: 5,
    borderRadius: 20,
  },
  productImage: {
    width: '100%',
    height: 150,  // Image height
    resizeMode: 'contain',
  },
  productName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  productBrand: {
    color: '#9CA3AF',
    fontSize: 10,
  },
  productPrice: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  popup: {
    position: 'absolute',
    top: '10%',
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: '#000',
    padding: 12,
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
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  reviewsText: {
    color: '#999',
    fontSize: 12,
    marginLeft: 5,
  },
  addToCartButton: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    backgroundColor: '#666',
    padding: 6,
    borderRadius: 20,
  },
});




export default NewArrival;
