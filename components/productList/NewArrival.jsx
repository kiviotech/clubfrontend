
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


  const handleProduct = () => {
    router.push("/ProductList");
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

  // const filteredProducts = selectedBrand
  //   ? products.filter((product) => product.brand.brand_name === selectedBrand)
  //   : products;
  // const displayedProducts = limit ? filteredProducts.slice(0, limit) : filteredProducts;

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
            <TouchableOpacity
              style={styles.favoriteIcon}
              onPress={() => handleWishlistAdd(item)}
            >
              <MaterialIcons
                name={wishlist.some((wishItem) => wishItem.id === item.id) ? "favorite" : "favorite-border"}
                size={24}
                color={wishlist.some((wishItem) => wishItem.id === item.id) ? "red" : "#fff"}
              />
            </TouchableOpacity>
            <Image
              source={{ uri: `${MEDIA_BASE_URL}${item.product_image.url}` }}
              style={styles.productImage}
              resizeMode="contain"
            />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productBrand}>{item.brand.brand_name}</Text>
            <View style={styles.ratingContainer}>
              <Icon name="star" size={18} color="#FFD700" />
              <Icon name="star" size={18} color="#FFD700" />
              <Icon name="star" size={18} color="#FFD700" />
              <Icon name="star" size={18} color="#FFD700" />
              <Icon name="star-half" size={18} color="#FFD700" />
              <Text style={styles.reviewsText}>({item.reviews} Ratings)</Text>
            </View>
            <Text style={styles.productPrice}>${item.price}</Text>
            <TouchableOpacity onPress={handleProduct}>
              <View style={styles.addToCartButton}>
                <Icon name="add" size={18} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  card: {
    width: width * 0.45,
    backgroundColor: '#333',
    borderRadius: 10,
    marginHorizontal: 10,
    padding: 10,
    // alignItems: 'center',
    position: 'relative',
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
    height: 120,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  productName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productBrand: {
    color: '#9CA3AF',
    fontSize: 12,
    marginBottom: 5,
  },
  productPrice: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
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
    fontSize: 14,
    marginLeft: 5,
  },
  priceText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addToCartButton: {
    position: 'absolute',
    bottom: 5,
    right: 10,
    backgroundColor: '#666',
    padding: 8,
    borderRadius: 20,
  },
});

export default NewArrival;

