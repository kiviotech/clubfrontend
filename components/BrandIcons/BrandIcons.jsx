
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from "react-native";
import { getBrands } from '../../src/api/repositories/brandRepository';
import { useBrandStore } from "../../src/store/brandStore"; // Import the Zustand store
import { MEDIA_BASE_URL } from "../../src/api/apiClient";
import { useRouter } from 'expo-router';


const BrandIcons = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Zustand state for selected brand
  const setSelectedBrand = useBrandStore((state) => state.setSelectedBrand);
  const selectedBrand = useBrandStore((state) => state.selectedBrand);

  const router = useRouter();


  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await getBrands(); 
        setBrands(response.data.data); 
        // console.log(response.data.data[0].brand_name)
        // console.log(response.data.data[0].description)
        // console.log(response.data.data[0].brand_logo.url)
       
      } catch (error) {
        setError("Failed to load brands"); 
      } finally {
        setLoading(false); 
      }
    };

    fetchBrands();
  }, []);

  const handleIconPress = (brand) => {
     const brandPosterUrl = brand.brand_poster?.[0]?.url
          ? `${MEDIA_BASE_URL}${brand.brand_poster[0].url}`
          : 'https://example.com/fallback-image.jpg';
    
    setSelectedBrand(brand.brand_name);
    router.push({
      pathname: "/pages/brand_info",
      params: {
        brandName: brand.brand_name,
        brandId: brand.id,
        brandImage: `${MEDIA_BASE_URL}${brand.brand_logo.url}`,
        brandDescription: brand.description,
        brandPoster: brandPosterUrl,
      },
    });
  };

  if (loading) {
    return <Text>Loading brands...</Text>; 
  }

  if (error) {
    return <Text>{error}</Text>; 
  }

 

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {brands.map((brand, index) => {
          const imageUrl = `${MEDIA_BASE_URL}${brand.brand_logo.url}`;
          return (
          <TouchableOpacity key={index} onPress={() => handleIconPress(brand)}>
            <View style={styles.brandItem}>
            <Image 
                source={{ uri: imageUrl}} 
                style={styles.brandLogo} 
                resizeMode="contain"
              />
              <Text style={styles.brandName}>{brand.brand_name}</Text>
              {selectedBrand === brand.brand_name && <View style={styles.selectedText}></View>}
            </View>
          </TouchableOpacity>
           );
})}
      </View>
    </ScrollView>
  );
};

// Define styles for your component
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 16,
    gap: 15,
  },
  brandItem: {
    alignItems: "center",
    marginHorizontal: 8,
  },
  brandName: {
    color: "white",
    fontSize: 16,
    marginTop: 4,
  },
  brandLogo: {
    width: 50, 
    height: 50, 
    borderRadius:50
  },
  selectedText: {
    backgroundColor: "#8FFA09",
    // fontSize: 14,
    marginTop: 2,
    height: 2, // Height of the line (thickness)
    width: 40,
  },
});

export default BrandIcons;
