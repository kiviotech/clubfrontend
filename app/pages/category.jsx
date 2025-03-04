import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Dimensions, Platform } from 'react-native';
import useProductStore from '../../src/store/useProductStore';
import { getProducts } from '../../src/api/repositories/productRepository';
import { MEDIA_BASE_URL } from '../../src/api/apiClient';
import { getFallbackImageSource } from '../utils/imageUtils';
import { usePlatform } from '../../src/context/PlatformContext';
import { ErrorBoundary } from 'react-error-boundary';

const numColumns = 2;
const screenWidth = Dimensions.get('window').width;

const Category = () => {
  const { productDetails, setProductDetails } = useProductStore();
  const { isIOSWeb } = usePlatform();
  const [visibleProducts, setVisibleProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        const products = response.data.data.map((product) => {
          const imageUrl = `${MEDIA_BASE_URL}${product.product_image.url}`;
          return {
            id: product.id,
            image: { uri: imageUrl },
            category: product.category || "Product Category",
          };
        });
        setProductDetails(products);
        // console.log("Fetched products:", products);
      } catch (error) {
        // console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (isIOSWeb && productDetails.length > 0) {
      // Only show 4 products initially on iOS Safari
      setVisibleProducts(productDetails.slice(0, 4));
    } else {
      setVisibleProducts(productDetails);
    }
  }, [productDetails, isIOSWeb]);

  return (
    <ErrorBoundary FallbackComponent={({ error }) => (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading categories: {error.message}</Text>
      </View>
    )}>
      <View style={styles.container}>
        <FlatList
          data={visibleProducts}
          renderItem={({ item }) => {
            console.log('[DEBUG] Rendering item:', item);
            
            let imageSource;
            try {
              imageSource = Platform.OS === 'web'
                ? (item.image?.uri ? item.image : { uri: '/assets/Picture2.png' })
                : (item.image?.uri ? item.image : require('../../assets/Picture2.png'));
              
              console.log('[DEBUG] Image source resolved:', 
                typeof imageSource === 'object' ? 'object' : imageSource);
            } catch (error) {
              console.error('[DEBUG] Error resolving image source:', error);
              // Fallback to a safe default
              imageSource = { uri: '' };
            }
            
            return (
              <View style={styles.card}>
                <Image 
                  source={item.image?.uri ? item.image : { uri: '/assets/Picture2.png' }} 
                  style={styles.image} 
                  resizeMode="contain"
                />
                <Text style={styles.categoryText}>{item.category}</Text>
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
        />
      </View>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  card: {
    flex: 1,
    backgroundColor: '#222',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    paddingVertical: 15,
    width: (screenWidth - 60) / numColumns,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  categoryText: {
    color: '#8FFA09',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Category;
