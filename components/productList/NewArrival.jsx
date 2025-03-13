import React, { useEffect, useState, useCallback, useMemo, memo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  FlatList,
  Dimensions,
  InteractionManager,
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
import { updateProduct } from "../../src/api/repositories/productRepository";
import * as ImageUtils from "../../app/utils/imageUtils";

const { width } = Dimensions.get('window');

const NewArrival = ({ limit = 6 }) => {
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
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Use useEffect with proper cleanup
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        
        // Process data after interactions to prevent UI blocking
        InteractionManager.runAfterInteractions(() => {
          if (!isMounted) return;
          
          // Limit the number of products to reduce memory usage
          const limitedProducts = response.data.data.slice(0, limit);
          setProducts(limitedProducts);
    
          // Process stock updates in batches
          let hasUpdates = false;
          const updatedProducts = [...limitedProducts];
    
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
              hasUpdates = true;
              
              // Update on server in background without awaiting
              updateProduct(product.documentId, {
                data: { in_stock: hasAvailableStock }
              }).catch(err => console.log('Error updating product:', err));
            }
          }
    
          if (hasUpdates && isMounted) {
            setProducts(updatedProducts);
          }
          
          setLoading(false);
          setIsRefreshing(false);
        });
      } catch (error) {
        console.error("Failed to load products:", error);
        if (isMounted) {
          setError("Failed to load products");
          setLoading(false);
          setIsRefreshing(false);
        }
      }
    };
    
    fetchProducts();
    
    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [selectedBrand, limit]);

  // Memoize displayed products to prevent unnecessary calculations
  const displayedProducts = useMemo(() => {
    return limit ? products.slice(0, limit) : products;
  }, [products, limit]);

  // Memoize image URL function
  const getImageUrl = useCallback((images) => {
    if (Array.isArray(images) && images.length > 0) {
      // Use optimized image URL for list view
      return ImageUtils.getOptimizedImageUrl(images[0], 'list');
    }
    return null; // Fallback if no images
  }, []);

  // Function to handle product details click with useCallback
  const handleProductDetails = useCallback((product) => {
    try {
      // Use optimized image URLs for detail view
      const images = product.product_image.map(img => 
        ImageUtils.getOptimizedImageUrl(img, 'detail')
      );
      
      setProductDetails({
        id: product.id,
        images: images,
        name: product.name,
        price: product.price,
        in_stock: product.in_stock,
        sizes: product.sizes,
        documentId: product.documentId,
        description: product.description
      });
  
      router.push("../../pages/productDetails");
    } catch (error) {
      console.error("Navigation error:", error);
    }
  }, [router, setProductDetails]);

  const handleWishlistAdd = useCallback((product) => {
    try {
      const isInWishlist = wishlist.some((wishItem) => wishItem.id === product.id);
      const imageUrl = getImageUrl(product.product_image);
      
      const item = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: imageUrl,
        in_stock: product.in_stock,
      };
  
      if (isInWishlist) {
        removeFromWishlist(product.id);
        setPopupMessage("Removed from wishlist! ❌");
      } else {
        addToWishlist(item);
        setPopupMessage("Added to wishlist! ✔️");
      }
  
      setTimeout(() => {
        setPopupMessage("");
      }, 2000);
    } catch (error) {
      console.error("Wishlist operation error:", error);
    }
  }, [wishlist, removeFromWishlist, addToWishlist, getImageUrl]);

  const handleNotify = useCallback(() => {
    router.push("/pages/viewProduct");
  }, [router]);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    // Trigger the same effect as when selectedBrand changes
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        
        // Limit the number of products to reduce memory usage
        const limitedProducts = response.data.data.slice(0, limit);
        setProducts(limitedProducts);
        setIsRefreshing(false);
      } catch (error) {
        console.error("Failed to refresh products:", error);
        setError("Failed to refresh products");
        setIsRefreshing(false);
      }
    };
    
    fetchProducts();
  }, [limit]);

  // Memoize renderItem function to prevent unnecessary re-renders
  const renderItem = useCallback(({ item }) => {
    const imageUrl = getImageUrl(item.product_image);
    
    return (
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.productImage}
            resizeMode="contain"
            // Add error handling and loading placeholder
            onError={() => console.log('Image loading error for product:', item.id)}
            progressiveRenderingEnabled={true}
            fadeDuration={300}
            defaultSource={require("../../assets/placeholder.png")}
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

        <TouchableOpacity onPress={handleNotify}>
          <View style={styles.addToCartButton}>
            <Icon name="add" size={18} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
    );
  }, [getImageUrl, handleProductDetails, handleNotify]);

  // Memoize keyExtractor function
  const keyExtractor = useCallback((item) => item.id.toString(), []);

  if (loading && !isRefreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8FFA09" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={onRefresh}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {popupMessage ? (
        <View style={styles.popup}>
          <Text style={styles.popupText}>{popupMessage}</Text>
        </View>
      ) : null}
      <FlatList
        data={displayedProducts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        // Performance optimizations
        initialNumToRender={3}
        maxToRenderPerBatch={2}
        windowSize={3}
        removeClippedSubviews={true}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        getItemLayout={(data, index) => ({
          length: width * 0.50 + 10, // card width + margin
          offset: (width * 0.50 + 10) * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 5,
    paddingBottom: 15,
  },
  listContainer: {
    // No extra padding
  },
  card: {
    width: width * 0.50,
    height: 250,
    backgroundColor: '#333',
    borderRadius: 10,
    marginRight: 10,
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
    height: 150,
    resizeMode: 'contain',
  },
  productName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  productBrand: {
    color: '#8FFA09',
    fontSize: 14,
  },
  productPrice: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  addToCartButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#8FFA09',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 10,
    borderRadius: 5,
    zIndex: 1000,
    alignItems: 'center',
  },
  popupText: {
    color: '#fff',
    fontSize: 14,
  },
  loadingContainer: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#ff6b6b',
    marginBottom: 15,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#8FFA09',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

// Use memo to prevent unnecessary re-renders
export default memo(NewArrival);
