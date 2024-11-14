import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import logo from "../../assets/logo.png";
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import NewArrival from '../../components/productList/NewArrival';
import Slider from "../pages/slider"
import Category from './category';
import ProductList from '../../components/productList';
import Brand_page from './brand_page';

const brand_info = () => {
  const { brandName, brandImage, brandDescription } = useLocalSearchParams();


  return ( 
    <ScrollView>
      <View style={styles.container}>
        <Image source={logo} />
        <View style={styles.searchContainer}>
          <FontAwesome name="search" size={25} color="#424646" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Products"
            placeholderTextColor="#424646"
          />
        </View>

        {/* Main image with logo overlay */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: brandImage }}
            style={styles.mainImage}
          />
          <View style={styles.logoContainer}>
            <Image
              source={{ uri: brandImage }}
              style={styles.logoImage}
            />
          </View>
        </View>

        {/* Brand info */}
        <View style={styles.brandInfoContainer}>
          <Text style={styles.brandName}>{brandName}</Text>
          <Text style={styles.brandDescription}>{brandDescription}</Text>
          <FontAwesome name="share" size={24} color="#8FFA09" style={styles.shareIcon} />
        </View>

        {/* Follow button */}
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>Follow</Text>
        </TouchableOpacity>

        <Text style={styles.popularProductsTitle}>New Arrival</Text>
        <NewArrival />

        <View style={styles.slider}>
          <Slider />
        </View>

        <Text style={styles.popularProductsTitle}>Shop by Category</Text>
        <Category />

        <View>
          <Text style={styles.popularProductsTitle}>Most Selling</Text>
          <ProductList limit={4} />
        </View>

        <View>
          <Brand_page />
        </View>

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
    // borderRadius: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#161B1B',
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 26,
    marginTop: 15,
    height: 50,
  },
  searchInput: {
    marginLeft: 8,
    color: '#FFFFFF',
    fontSize: 16,
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  mainImage: {
    width: '100%',
    height: 198,
    borderRadius: 8,
  },
  logoContainer: {
    position: 'absolute',
    bottom: -25,
    left: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 35,
    padding: 2,
    
  },
  logoImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2, // Adjust the width as needed
    borderColor: '#8FFA09',
    
  },
  brandInfoContainer: {
    // backgroundColor: '#222222',
    padding: 16,
    borderRadius: 8,
    marginTop: 24, // Adjusted to give space for the overlaid logo
  },
  brandName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  brandDescription: {
    color: '#B3B3B3',
    fontSize: 14,
    marginTop: 4,
  },
  shareIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  followButton: {
    backgroundColor: '#8FFA09',
    width: 110,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginLeft: 15,
    marginBottom: 20,
  },
  followButtonText: {
    color: '#111111',
    fontSize: 16,
    fontWeight: 'bold',
  },
  popularProductsTitle: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginVertical: 8,
    paddingLeft: 10,
    marginBottom: 20,
    marginTop: 30
  },
  slider: {
    marginTop: 30
  }
});


export default brand_info