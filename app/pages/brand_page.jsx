import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getBrands } from '../../src/api/repositories/brandRepository';
import { MEDIA_BASE_URL } from '../../src/api/apiClient';
import { useRouter } from "expo-router";
import { useBrandStore } from '../../src/store/brandStore';

const BrandPage = () => {
  const [brands, setBrands] = useState([]);
  const router = useRouter();
  const selectedBrand = useBrandStore((state) => state.selectedBrand);
  const setSelectedBrand = useBrandStore((state) => state.setSelectedBrand);

  const fetchBrands = async () => {
    try {
      const response = await getBrands();
      setBrands(response.data.data); // Store all brand data in state
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  useEffect(() => {
    fetchBrands(); // Fetch brands when component mounts
  }, []);

  const handleInfo = (brand) => {
    router.push({
      pathname: "/pages/brand_info",
      params: {
        brandName: brand.brand_name,
        brandId: brand.id,
        brandImage: `${MEDIA_BASE_URL}${brand.brand_logo.url}`,
        brandDescription: brand.description,
      },
    });
  };

 

  const handleIconPress = (brandName) => {
    
    setSelectedBrand(brandName); 
    router.push('pages/brand');
  };

  const renderBrand = ({ item }) => {
    const logoUrl = `${MEDIA_BASE_URL}${item.brand_logo.url}`;
    const brandPosterUrl = item.brand_poster?.[0]?.url
      ? `${MEDIA_BASE_URL}${item.brand_poster[0].url}`
      : 'https://example.com/fallback.png';

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => handleInfo(item)}>
          {/* Logo and Share Icon */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image
                source={{ uri: logoUrl }}
                style={styles.brandLogo}
                resizeMode="contain"
              />
              <Text style={styles.brandName}>{item.brand_name}</Text>
            </View>
            <TouchableOpacity onPress={() => handleInfo(item)}>
            <Icon name="share" size={20} color="#fff" style={styles.shareIcon} />
            </TouchableOpacity>
          </View>

          {/* Description */}
          <Text style={styles.description}>{item.description}</Text>

          {/* Image */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: brandPosterUrl }}
              style={styles.image}
            />
          </View>
        </TouchableOpacity>

        {/* Products Button */}
        
        <TouchableOpacity style={styles.button} onPress={() => handleIconPress(item.brand_name)}>
          <Icon name="shopping-bag" size={16} color="#fff" />
          <Text style={styles.buttonText}>{item.brand_name} Products</Text>
          {selectedBrand === item.brand_name && <View style={styles.selectedText}></View>}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      data={brands}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderBrand}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  shareIcon: {
    color: '#00ff00',
  },
  description: {
    color: '#fff',
    fontSize: 14,
    marginVertical: 16,
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#444',
    padding: 16,
    borderRadius: 8,
    width: '100%',
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00ff00',
    paddingVertical: 10,
    borderRadius: 8,
  },
  brandLogo: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 8,
  },
});

export default BrandPage;
