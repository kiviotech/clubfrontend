
// import React from 'react';
// import { View, Image, StyleSheet, FlatList } from 'react-native';
// import { getProducts } from '../../src/api/repositories/productRepository';
// import useProductStore from '../../src/store/useProductStore';
// import { useState,useEffect } from 'react';
// import { MEDIA_BASE_URL } from '../../src/api/apiClient';

// // const brands = [
// //   {
// //     id: '1',
// //     mainImage: 'https://m.media-amazon.com/images/I/61S5nUPVufL._SX679_.jpg',
// //     brandLogo: 'https://m.media-amazon.com/images/I/61S5nUPVufL._SX679_.jpg',
// //     brandName: 'Brand Name 1',
// //   },
// //   {
// //     id: '2',
// //     mainImage: 'https://m.media-amazon.com/images/I/61S5nUPVufL._SX679_.jpg',
// //     brandLogo: 'https://m.media-amazon.com/images/I/61S5nUPVufL._SX679_.jpg',
// //     brandName: 'Brand Name 2',
// //   },
// //   {
// //     id: '3',
// //     mainImage: 'https://m.media-amazon.com/images/I/61S5nUPVufL._SX679_.jpg',
// //     brandLogo: 'https://m.media-amazon.com/images/I/61S5nUPVufL._SX679_.jpg',
// //     brandName: 'Brand Name 3',
// //   },
// //   {
// //     id: '4',
// //     mainImage: 'https://m.media-amazon.com/images/I/61S5nUPVufL._SX679_.jpg',
// //     brandLogo: 'https://m.media-amazon.com/images/I/61S5nUPVufL._SX679_.jpg',
// //     brandName: 'Brand Name 4',
// //   },
// // ];

// const BrandCard = ({ mainImage, brandLogo }) => (
//   <View style={styles.cardContainer}>
//     <View style={styles.upperContainer}>
//       <Image source={{ uri: mainImage }} style={styles.mainImage} />
//     </View>
//     <View style={styles.logoBottomContainer}>
//       {/* <Image source={{ uri: brandLogo }} style={styles.logoBottom} /> */}
//       <Text style={styles.brandName}>{brandName}</Text>
//     </View>
//   </View>
// );

// const ShopByBrands = () => {

//     const { productDetails, setProductDetails } = useProductStore();

//     useEffect(() => {
//       const fetchProducts = async () => {
//         try {
//           const response = await getProducts();
//           const products = response.data.data.map(product => ({
//             id: product.id,
//             mainImage: `${MEDIA_BASE_URL}${product.product_image.url}`, // Adjust this if your structure is different
//             brandName: product.brand.brand_name || 'Default Brand', // Use a default logo if not available
//           }));
  
//           setProductDetails(products);
//           console.log(products);
//         } catch (error) {
//           console.error("Error fetching products:", error);
//         }
//       };
  
//       fetchProducts();
//     }, []); 
    

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={productDetails}
//         renderItem={({ item }) => (
//           <BrandCard 
//           mainImage={item.mainImage}
//           brandName={item.brandName} 
//         //   brandLogo={item.brandLogo} 
//           />
//         )}
//         keyExtractor={(item) => item.id}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//     padding: 20,
//   },
//   cardContainer: {
//     width: 150,
//     backgroundColor: '#333',
//     borderRadius: 10,
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   mainImage: {
//     width: 100,
//     height: 100,
//     resizeMode: 'contain',
//   },
//   upperContainer: {
//     borderRadius: 10,
//   },
//   logoBottomContainer: {
//     flexDirection: 'column',
//     alignItems: 'center',
//     marginTop: 10,
//     backgroundColor: '#fff',
//     height: 50,
//     width: '100%',
//     borderBottomLeftRadius: 10,
//     borderBottomRightRadius: 10,
//   },
//   logoBottom: {
//     width: 100,
//     height: 40,
//   },
//   brandName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#fff', // Customize the color as needed
//   },
// });

// export default ShopByBrands;


import React, { useEffect } from 'react';
import { View, Image, StyleSheet, FlatList, Text } from 'react-native';
import { getProducts } from '../../src/api/repositories/productRepository';
import useProductStore from '../../src/store/useProductStore';
import { MEDIA_BASE_URL } from '../../src/api/apiClient';

const BrandCard = ({ mainImage, brandName }) => (
  <View style={styles.cardContainer}>
    <View style={styles.upperContainer}>
      <Image source={{ uri: mainImage }} style={styles.mainImage} />
    </View>
    <View style={styles.logoBottomContainer}>
      <Text style={styles.brandName}>{brandName}</Text>
    </View>
  </View>
);

const ShopByBrands = () => {
  const { productDetails, setProductDetails } = useProductStore();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        const products = response.data.data.map(product => ({
          id: product.id,
          mainImage: `${MEDIA_BASE_URL}${product.product_image.url}`, // Adjust this if your structure is different
          brandName: product.brand.brand_name || 'Default Brand', // Use a default name if not available
        }));

        setProductDetails(products);
        // console.log(products);
      } catch (error) {
        console.error("Error fetching products:", error);
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
          />
        )}
        keyExtractor={(item) => item.id}
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
    padding: 20,
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
