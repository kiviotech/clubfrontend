import React, { useEffect } from 'react';
import { View, Image, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { getProducts } from '../../src/api/repositories/productRepository';
import useProductStore from '../../src/store/useProductStore';
import { MEDIA_BASE_URL } from '../../src/api/apiClient';
import { useBrandStore } from '../../src/store/brandStore';
import { useRouter } from 'expo-router';

const BrandCard = ({ mainImage, brandName, handleIconPress }) => (
  <TouchableOpacity style={styles.cardContainer} onPress={() => handleIconPress(brandName)}>
    <View style={styles.upperContainer}>
      <Image source={{ uri: mainImage  ||'https://example.com/fallback.png'}} style={styles.mainImage} />
    </View>
    <View style={styles.logoBottomContainer}>
      <Text style={styles.brandName}>{brandName}</Text>
    </View>
  </TouchableOpacity>
);

const ShopByBrands = () => {
  const router = useRouter();
  const { productDetails, setProductDetails } = useProductStore();
  const setSelectedBrand = useBrandStore((state) => state.setSelectedBrand);
  const selectedBrand = useBrandStore((state) => state.selectedBrand);

  // Handle brand selection and navigate to the brand page
  const handleIconPress = (brandName) => {
    setSelectedBrand(brandName); // Set the selected brand in Zustand
    // Optionally navigate to the brand page here using router (if required)
    router.push('pages/brand'); // Uncomment if you want to navigate
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        const products = response.data.data.map(product => ({
          id: product.id,
          mainImage: `${MEDIA_BASE_URL}${product.product_image.url}`, // Adjust if your structure is different
          brandName: product.brand?.brand_name || 'Default Brand', // Default name if brand is not available
        }));

        setProductDetails(products);
      } catch (error) {
        // console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={productDetails}
        renderItem={({ item }) => (
          <BrandCard 
            mainImage={item.mainImage}
            brandName={item.brandName} // Pass brandName here
            handleIconPress={handleIconPress} // Pass handleIconPress function
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 5,
  },
  cardContainer: {
    width: 150,
    backgroundColor: '#333',
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  mainImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  upperContainer: {
    borderRadius: 10,
  },
  logoBottomContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#fff',
    height: 50,
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  brandName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000', // Customize the color as needed
  },
});

export default ShopByBrands;
