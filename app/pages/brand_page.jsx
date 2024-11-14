import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useBrandStore } from '../../src/store/brandStore';
import { getBrands } from '../../src/api/repositories/brandRepository';
import { MEDIA_BASE_URL } from '../../src/api/apiClient';
import { useRouter } from "expo-router";


const brand_page = () => {
  const { brands, setBrands } = useBrandStore();
  const [logo, setLogo] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const router = useRouter();
  const setSelectedBrand = useBrandStore((state) => state.setSelectedBrand);


  // const handleRequest = (brandName) => {
  //   setSelectedBrand(brandName);
  //   router.push("/pages/brand_details"); // Update the path if necessary
  // };
  const handleinfo = (brands,brandName) => {
    setSelectedBrand(brandName);
    router.push({
      pathname: "/pages/brand_info",
      params: {
        brandName: brands.brand_name,
        brandId: brands.id,
        brandImage: brands.brand_logo.url,
        brandDescription: brands.description,
      },

    }); // Update the path if necessary
  };


  const fetchBrands = async () => {
    try {
      const response = await getBrands();
      setBrands(response.data.data);
      setBrands(response.data.data[1].brand_poster[0].url)
      setLogo(`${MEDIA_BASE_URL}${response.data.data[0].brand_logo.url}`)
      setDescription(response.data.data[0].description)
      setName(response.data.data[0].brand_name);
      // console.log(brands)
      // console.log(response.data.data[0].description)

    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  useEffect(() => {
    fetchBrands(); // Fetch brands when component mounts
  }, []);

  const brand_poster = `${MEDIA_BASE_URL}${brands}`;
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        {/* Logo and Share Icon */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <TouchableOpacity onPress={() => handleinfo({
              brand_name: name,
              id: brands.id,
              brand_logo: { url: logo },
              description
            })}>
              <Image
                source={{ uri: logo }}
                style={styles.brandLogo}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.brandName}>{name}</Text>

          </View>
          <Icon name="share" size={20} color="#fff" style={styles.shareIcon} />
        </View>

        {/* Description */}
        <Text style={styles.description}>{description}</Text>

        {/* Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: brand_poster }} // Replace with actual image URL
            style={styles.image}
          />
        </View>
      </TouchableOpacity>

      {/* Products Button */}
      <TouchableOpacity style={styles.button}>
        <Icon name="shopping-bag" size={16} color="#fff" />
        <Text style={styles.buttonText}>7 Products</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
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
    // backgroundColor: '#fff',
    padding: 4,
    borderRadius: 50,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row",
    marginLeft: 20,
    gap: 9

  },
  logoText: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 12,
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
    objectFit: "cover"
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
    borderRadius: 50
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 8,
  },
});

export default brand_page;