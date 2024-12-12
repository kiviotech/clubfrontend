
// import React, { useEffect } from "react";
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
// } from "react-native";
// import useProductStore from "../../src/store/useProductStore";
// import { getProducts } from "../../src/api/repositories/productRepository";
// import { MEDIA_BASE_URL } from "../../src/api/apiClient";
// import { useRouter } from "expo-router";

// const FlashSaleComponent = () => {
//   const router = useRouter();
//   const { productDetails, setProductDetails } = useProductStore();

//   const handleSale = () => {
//     router.push("/pages/flash_sale"); // Update the path if necessary
//   };

//   useEffect(() => {
//     if (productDetails.length === 0) {
//       const fetchProducts = async () => {
//         try {
//           const response = await getProducts();
//           const products = response.data.data.map((product) => {
//             const imageUrl = `${MEDIA_BASE_URL}${product.product_image.url}`;
//             // console.log("Image URL:", imageUrl); // Log URL to verify correctness
//             return {
//               id: product.id,
//               name: product.name,
//               description: product.description,
//               image: imageUrl,
//               backgroundColor: getRandomColor(),
//             };
//           });
//           setProductDetails(products);
//         } catch (error) {
//           // console.error("Error fetching products:", error);
//         }
//       };
//       fetchProducts();
//     }
//   }, []);

//   const handleItemPress = (item) => {
//     // console.log("Product Details:", item);
//   };

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       style={[
//         styles.itemContainer,
//         { backgroundColor: item.backgroundColor || getRandomColor() },
//       ]}
//       onPress={() => handleItemPress(item)}
//     >
//       <Image
//         source={{ uri: item.mainImage  ||'https://example.com/fallback.png'}}
//         style={styles.image}
//         // onError={() => console.log("Error loading image:", item.image)}
//       />
//       <View style={styles.discountBadge}>
//         <Text style={styles.discountText}>-30%</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Flash Sale</Text>
//         <Text
//           style={styles.seeAll}
//           onPress={handleSale}
//         >
//           See all
//         </Text>
//       </View>
//       <FlatList
//         data={productDetails}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id.toString()}
//         numColumns={3}
//         columnWrapperStyle={styles.row}
//       />
//     </View>
//   );
// };

// const getRandomColor = () => {
//   const colors = [
//     "#4143A7",
//     "#7F7749",
//     "#2CDEE7",
//     "#8CB237",
//     "#9B9B9B",
//     "#DEDEDE",
//   ];
//   return colors[Math.floor(Math.random() * colors.length)];
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 5,
//     backgroundColor: "#000",
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   title: {
//     color: "#FFF",
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   seeAll: {
//     color: "#999",
//     fontSize: 16,
//   },
//   row: {
//     justifyContent: "space-between",
//   },
//   itemContainer: {
//     width: "30%",
//     aspectRatio: 1,
//     borderRadius: 10,
//     marginBottom: 16,
//     alignItems: "center",
//     justifyContent: "center",
//     position: "relative",
//   },
//   image: {
//     width: "80%",
//     height: "80%",
//     resizeMode: "contain",
//   },
//   discountBadge: {
//     position: "absolute",
//     top: 8,
//     right: 8,
//     backgroundColor: "#39FF14",
//     paddingVertical: 2,
//     paddingHorizontal: 6,
//     borderRadius: 5,
//   },
//   discountText: {
//     color: "#000",
//     fontSize: 14,
//     fontWeight: "bold",
//   },
// });

// export default FlashSaleComponent;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { getProducts } from "../../src/api/repositories/productRepository";
import { MEDIA_BASE_URL } from "../../src/api/apiClient"
import { useRouter } from "expo-router";

const FlashSaleComponent = () => {
  const [products, setProducts] = useState([]);
  const router = useRouter();

    const handleSale = () => {
    router.push("/pages/flash_sale"); // Update the path if necessary
  };

  useEffect(() => {
    // Fetch products from the backend
    const fetchProducts = async () => {
      try {
        const response = await getProducts(); // Fetch the products from the API
        console.log(response.data.data[0].product_image[0].url);
        console.log(response.data.data[0].product_image[1].url);
        
        // Limit the products to the first 6 items
        const limitedProducts = response.data.data.slice(0, 6);

        const products = limitedProducts.map((product) => ({
          id: product.id,
          name: product.name,
          image: product.product_image?.[0]?.url // Get only the first image
            ? `${MEDIA_BASE_URL}${product.product_image[0].url}` // Prepend MEDIA_BASE_URL
            : "", // If no image, set empty string
          backgroundColor: getRandomColor(),
        }));
        
        setProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const getRandomColor = () => {
    const colors = [
      "#4143A7",
      "#7F7749",
      "#2CDEE7",
      "#8CB237",
      "#9B9B9B",
      "#DEDEDE",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.itemContainer, { backgroundColor: item.backgroundColor }]}
    >
      <Image
        source={{ uri: item.image || "https://via.placeholder.com/150" }} // Use placeholder if no image
        style={styles.image}
      />
      <View style={styles.discountBadge}>
        <Text style={styles.discountText}>-30%</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Flash Sale</Text>
        <Text
           style={styles.seeAll}
           onPress={handleSale}
         >
           See all
        </Text>
      </View>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  seeAll: {
    color: "#999",
    fontSize: 16,
  },
  row: {
    justifyContent: "space-between",
  },
  itemContainer: {
    width: "30%",
    aspectRatio: 1,
    borderRadius: 10,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  image: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
  discountBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#39FF14",
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 5,
  },
  discountText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default FlashSaleComponent;
