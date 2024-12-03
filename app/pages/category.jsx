


import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Dimensions } from 'react-native';
import useProductStore from '../../src/store/useProductStore';
import { getProducts } from '../../src/api/repositories/productRepository';
import { MEDIA_BASE_URL } from '../../src/api/apiClient';

const numColumns = 2;
const screenWidth = Dimensions.get('window').width;

const Category = () => {
  const { productDetails, setProductDetails } = useProductStore();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        const products = response.data.data.map((product) => {
          const imageUrl = `${MEDIA_BASE_URL}${product.product_image.url}`;
          return {
            id: product.id,
            image: { uri: imageUrl }, // Wrap the image URL in an object with `uri` key
            category: product.category || "Product Category", // Replace with the actual category field
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

  
  const limitedProductDetails = Array.isArray(productDetails) ? productDetails.slice(0, 4) : [];


  return (
    <View style={styles.container}>
      <FlatList
        data={limitedProductDetails}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image  ||'https://example.com/fallback.png'} style={styles.image} resizeMode="contain" />
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
      />
    </View>
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
});

export default Category;