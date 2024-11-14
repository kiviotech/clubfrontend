// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Dimensions,
//   TouchableOpacity,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
// import Icon from "react-native-vector-icons/Ionicons";
// import { Ionicons } from "@expo/vector-icons";
// import logo from "../../assets/logo.png";
// import ProductList from "../../components/productList";
// import useProductStore from "../../src/store/useProductStore";
// import { MEDIA_BASE_URL } from "../../src/api/apiClient";

// const { width } = Dimensions.get("window");

// const ProductDetails = () => {
//   const productDetails = useProductStore((state) => state.productDetails);
//   const params = useLocalSearchParams();
//   const { images, name, price, products } = params;
//   const allProducts = products ? JSON.parse(products) : [];
//   const imageArray = images ? images.split(",").map((img) => img.trim()) : [];

//   console.log(productDetails);

//   const [activeIndex, setActiveIndex] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedSize, setSelectedSize] = useState("XS");
//   const router = useRouter();
//   const navigation = useNavigation();

//   const increment = () => {
//     setQuantity(quantity + 1);
//   };

//   const decrement = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1);
//     }
//   };

//   const handleAddToCart = () => {
//     // Functionality to handle adding product to cart
//   };
//   const handleAddToWishlist = () => {
//     // Functionality to handle adding product to wishlist
//   };

//   const handleImageScroll = (event) => {
//     const contentOffsetX = event.nativeEvent.contentOffset.x;
//     const newIndex = Math.floor(contentOffsetX / (width * 0.8)); // Adjusting for the narrower width
//     setActiveIndex(newIndex);
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" color="white" size={30} />
//         </TouchableOpacity>
//         <Image style={styles.logo} source={logo} />
//       </View>

//       <ScrollView showsVerticalScrollIndicator={false}>
//         <View style={styles.imageSection}>
//           {/* Custom Carousel */}
//           <ScrollView
//             horizontal
//             pagingEnabled
//             showsHorizontalScrollIndicator={false}
//             onScroll={handleImageScroll}
//             scrollEventThrottle={16}
//             decelerationRate="fast"
//             snapToInterval={width * 0.8} // Width with margin applied
//             contentContainerStyle={{ paddingHorizontal: (width * 0.1) / 2 }} // Ensure padding on the sides
//           >
//             {Array.isArray(images) && images.length > 0 ? (
//               images.map((item, index) => (
//                 <View
//                   key={index}
//                   style={[
//                     styles.imageContainer,
//                     {
//                       marginLeft: index === 0 ? 0 : 10,
//                       marginRight: index === images.length - 1 ? 0 : 10,
//                     },
//                   ]}
//                 >
//                   <Image
//                     source={{ uri: `${MEDIA_BASE_URL}${item.image_path}` }}
//                     style={styles.image}
//                     resizeMode="cover"
//                   />
//                 </View>
//               ))
//             ) : (
//               <Text style={{ color: "white", textAlign: "center" }}>
//                 No images available
//               </Text>
//             )}
//           </ScrollView>

//           {/* Pagination Dots */}
//           <View style={styles.paginationContainer}>
//             {imageArray.map((_, index) => (
//               <View
//                 key={index}
//                 style={[
//                   styles.dot,
//                   {
//                     backgroundColor:
//                       index === activeIndex ? "#8FFA09" : "#A4A4AA",
//                   },
//                 ]}
//               />
//             ))}
//           </View>
//         </View>

//         <View style={styles.productInfo}>
//           <Text style={styles.productName}>{productDetails.name}</Text>
//           <Text style={styles.productPrice}>{productDetails.price}</Text>
//         </View>

//         <View style={styles.quantitySection}>
//           <Text style={styles.quantityLabel}>Quantity</Text>
//           <View style={styles.quantityContainer}>
//             <TouchableOpacity onPress={decrement} style={styles.quantityButton}>
//               <Text style={styles.quantityText}>-</Text>
//             </TouchableOpacity>
//             <Text style={styles.quantityText}>{quantity}</Text>
//             <TouchableOpacity onPress={increment} style={styles.quantityButton}>
//               <Text style={styles.quantityText}>+</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//         <View style={styles.sizeSection}>
//           <Text style={styles.sizeLabel}>Size</Text>
//           <View style={styles.sizeContainer}>
//             {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
//               <TouchableOpacity
//                 key={size}
//                 onPress={() => setSelectedSize(size)}
//                 style={[
//                   styles.sizeButton,
//                   {
//                     backgroundColor:
//                       selectedSize === size ? "#8FFA09" : "#1D2221",
//                   },
//                 ]}
//               >
//                 <Text
//                   style={{
//                     color: selectedSize === size ? "#000000" : "#ffffff", // Black for selected, white for unselected
//                   }}
//                 >
//                   {size}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         <View style={styles.actionButtons}>
//           <TouchableOpacity
//             onPress={handleAddToCart}
//             style={styles.addToCartButton}
//           >
//             <Text style={styles.addToCartText}>Add to Cart</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={handleAddToWishlist}
//             style={styles.addToWishlistButton}
//           >
//             <Text style={styles.addToWishlistText}>Add to Wishlist</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.detailsSection}>
//           <Text style={styles.detailsTitle}>Product Details</Text>
//           <Text style={styles.detailsText}>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
//             felis justo, lacinia ac iaculis nec, efficitur in arcu. Suspendisse
//             posuere, elit ut tempor finibus, dolor tortor ullamcorper leo.
//           </Text>
//           <Text style={styles.detailsText}>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit...
//           </Text>
//           <TouchableOpacity>
//             <Text style={styles.seeMoreText}>See More</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.relatedProductsSection}>
//           <Text style={styles.relatedProductsTitle}>Related Products</Text>
//           <ScrollView>
//             <ProductList products={allProducts} />
//           </ScrollView>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "black",
//     paddingLeft: 20,
//     paddingRight: 20,
//   },
//   header: {
//     flexDirection: "row",
//     height: 48,
//     width: "100%",
//     padding: 8,
//     alignItems: "center",
//   },
//   logo: {
//     marginLeft: 8,
//   },
//   imageSection: {
//     marginBottom: 16,
//     marginTop: 20,
//   },
//   imageContainer: {
//     width: width * 0.8,
//     height: 300,
//     borderRadius: 20,
//     overflow: "hidden",
//     backgroundColor: "#333",
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//   },
//   paginationContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginTop: 10,
//   },
//   dot: {
//     height: 8,
//     width: 8,
//     borderRadius: 4,
//     marginHorizontal: 5,
//   },
//   productInfo: {
//     marginBottom: 16,
//   },
//   productName: {
//     fontSize: 24,
//     color: "white",
//   },
//   productPrice: {
//     fontSize: 20,
//     color: "white",
//     marginVertical: 8,
//   },
//   quantitySection: {
//     marginBottom: 16,
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   quantityLabel: {
//     fontSize: 18,
//     color: "white",
//     marginVertical: 8,
//   },
//   quantityContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#1D2221",
//     borderRadius: 50,
//     paddingVertical: 1,
//     paddingHorizontal: 12,
//   },
//   quantityButton: {
//     padding: 8,
//     backgroundColor: "#1D2221",
//   },
//   quantityText: {
//     color: "#fff",
//     fontSize: 16,
//   },
//   sizeSection: {
//     marginBottom: 16,
//   },
//   sizeLabel: {
//     fontSize: 18,
//     color: "white",
//     marginVertical: 8,
//   },
//   sizeContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     alignItems: "center",
//   },
//   sizeButton: {
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     marginHorizontal: 5,
//     marginVertical: 5,
//     borderRadius: 10,
//   },
//   actionButtons: {
//     flexDirection: "row",
//     justifyContent: "space-evenly",
//     marginBottom: 16,
//   },
//   addToCartButton: {
//     backgroundColor: "#1D2221",
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 10,
//   },
//   addToCartText: {
//     color: "#8FFA09",
//     fontSize: 18,
//     textAlign: "center",
//   },
//   addToWishlistButton: {
//     backgroundColor: "#1D2221",
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 10,
//   },
//   addToWishlistText: {
//     color: "#8FFA09",
//     fontSize: 18,
//     textAlign: "center",
//   },
//   detailsSection: {
//     marginBottom: 16,
//   },
//   detailsTitle: {
//     fontSize: 24,
//     color: "white",
//     marginVertical: 8,
//   },
//   detailsText: {
//     fontSize: 16,
//     color: "white",
//     marginVertical: 8,
//   },
//   seeMoreText: {
//     color: "#A4A4AA",
//     fontSize: 16,
//   },
//   relatedProductsSection: {
//     flexDirection: "column",
//     marginBottom: 16,
//   },
//   relatedProductsTitle: {
//     fontSize: 24,
//     color: "white",
//     marginVertical: 8,
//   },
// });

// export default ProductDetails;

import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import logo from "../../assets/logo.png";
import ProductList from "../../components/productList";
import useProductStore from "../../src/store/useProductStore";
import { MEDIA_BASE_URL } from "../../src/api/apiClient";
import useCartStore from "../../src/store/useCartStore";
import useWishlistStore from "../../src/store/useWishlistStore";

const { width } = Dimensions.get("window");

const ProductDetails = () => {
  
  const productDetails = useProductStore((state) => state.productDetails);
  const addItemToCart = useCartStore((state) => state.addItem);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const params = useLocalSearchParams();
  const { images, name, price, products } = params;
  const allProducts = products ? JSON.parse(products) : [];

  const imagesArray =
    typeof productDetails.images === "string"
      ? [`${MEDIA_BASE_URL}${productDetails.images}`]
      : (productDetails.images || []).map((img) => `${MEDIA_BASE_URL}${img}`);

  // console.log(productDetails);

  const [activeIndex, setActiveIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("XS");
  const navigation = useNavigation();
  const router = useRouter();
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
 

  const handleAddToCart = () => {
    const item = {
      id: productDetails.id, 
      name: productDetails.name,
      price: productDetails.price,
      quantity: quantity,
      image: imagesArray[0], 
    };
    const existingItem = useCartStore.getState().items.find(
      (cartItem) => cartItem.id === item.id && cartItem.size === selectedSize
    );
    if (existingItem) {
      // If the item exists and the size is the same, do not add again
      alert("This item with the selected size is already in your cart.");
    } else {
    addItemToCart(item);  
    setIsAddedToCart(true);
    router.push("/pages/cart"); 
    }
  };

  const handleAddToWishlist = () => {
    const item = {
      id: productDetails.id,
      name: productDetails.name,
      price: productDetails.price,
      image: imagesArray[0], 
    };
    addToWishlist(item); 
   
    router.push("/pages/wishlist");
  };

  const handleImageScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.floor(contentOffsetX / (width * 0.8)); 
    setActiveIndex(newIndex);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" color="white" size={30} />
        </TouchableOpacity>
        <Image style={styles.logo} source={logo} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageSection}>
          {/* Custom Carousel */}
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleImageScroll}
            scrollEventThrottle={16}
            decelerationRate="fast"
            snapToInterval={width * 0.8}
            contentContainerStyle={{ paddingHorizontal: (width * 0.1) / 2 }}
          >
            {imagesArray.length > 0 ? (
              imagesArray.map((item, index) => (
                <View
                  key={index}
                  style={[
                    styles.imageContainer,
                    {
                      marginLeft: index === 0 ? 0 : 10,
                      marginRight: index === imagesArray.length - 1 ? 0 : 10,
                    },
                  ]}
                >
                  <Image
                    source={{ uri: item }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                </View>
              ))
            ) : (
              <Text style={{ color: "white", textAlign: "center" }}>
                No images available
              </Text>
            )}
          </ScrollView>

          {/* Pagination Dots */}
          <View style={styles.paginationContainer}>
            {imagesArray.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      index === activeIndex ? "#8FFA09" : "#A4A4AA",
                  },
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.productInfo}>
          <Text style={styles.productName}>{productDetails.name}</Text>
          <Text style={styles.productPrice}>{productDetails.price}</Text>
        </View>

        <View style={styles.quantitySection}>
          <Text style={styles.quantityLabel}>Quantity</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={decrement} style={styles.quantityButton}>
              <Text style={styles.quantityText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={increment} style={styles.quantityButton}>
              <Text style={styles.quantityText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.sizeSection}>
          <Text style={styles.sizeLabel}>Size</Text>
          <View style={styles.sizeContainer}>
            {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
              <TouchableOpacity
                key={size}
                onPress={() => setSelectedSize(size)}
                style={[
                  styles.sizeButton,
                  {
                    backgroundColor:
                      selectedSize === size ? "#8FFA09" : "#1D2221",
                  },
                ]}
              >
                <Text
                  style={{
                    color: selectedSize === size ? "#000000" : "#ffffff", // Black for selected, white for unselected
                  }}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.actionButtons}>
        <TouchableOpacity
            onPress={handleAddToCart}
            style={styles.addToCartButton}
          >
            <Text style={styles.addToCartText}>
              {isAddedToCart ? "In Cart" : "Add to Cart"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleAddToWishlist}
            style={styles.addToWishlistButton}
          >
            <Text style={styles.addToWishlistText}>Add to Wishlist</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.detailsSection}>
          <Text style={styles.detailsTitle}>Product Details</Text>
          <Text style={styles.detailsText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            felis justo, lacinia ac iaculis nec, efficitur in arcu. Suspendisse
            posuere, elit ut tempor finibus, dolor tortor ullamcorper leo.
          </Text>
          <Text style={styles.detailsText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit...
          </Text>
          <TouchableOpacity>
            <Text style={styles.seeMoreText}>See More</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.relatedProductsSection}>
          <Text style={styles.relatedProductsTitle}>Related Products</Text>
          <ScrollView>
            <ProductList products={allProducts} />
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "black",
    paddingLeft: 20,
    paddingRight: 20,
  },
  header: {
    flexDirection: "row",
    height: 48,
    width: "100%",
    padding: 8,
    alignItems: "center",
  },
  logo: {
    marginLeft: 8,
  },
  imageSection: {
    marginBottom: 16,
    marginTop: 20,
  },
  imageContainer: {
    width: width * 0.8,
    height: 300,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#333",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  productInfo: {
    marginBottom: 16,
  },
  productName: {
    fontSize: 24,
    color: "white",
  },
  productPrice: {
    fontSize: 20,
    color: "white",
    marginVertical: 8,
  },
  quantitySection: {
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quantityLabel: {
    fontSize: 18,
    color: "white",
    marginVertical: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1D2221",
    borderRadius: 50,
    paddingVertical: 1,
    paddingHorizontal: 12,
  },
  quantityButton: {
    padding: 8,
    backgroundColor: "#1D2221",
  },
  quantityText: {
    color: "#fff",
    fontSize: 16,
  },
  sizeSection: {
    marginBottom: 16,
  },
  sizeLabel: {
    fontSize: 18,
    color: "white",
    marginVertical: 8,
  },
  sizeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  sizeButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 10,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 16,
  },
  addToCartButton: {
    backgroundColor: "#1D2221",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  addToCartText: {
    color: "#8FFA09",
    fontSize: 18,
    textAlign: "center",
  },
  addToWishlistButton: {
    backgroundColor: "#1D2221",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  addToWishlistText: {
    color: "#8FFA09",
    fontSize: 18,
    textAlign: "center",
  },
  detailsSection: {
    marginBottom: 16,
  },
  detailsTitle: {
    fontSize: 24,
    color: "white",
    marginVertical: 8,
  },
  detailsText: {
    fontSize: 16,
    color: "white",
    marginVertical: 8,
  },
  seeMoreText: {
    color: "#A4A4AA",
    fontSize: 16,
  },
  relatedProductsSection: {
    flexDirection: "column",
    marginBottom: 16,
  },
  relatedProductsTitle: {
    fontSize: 24,
    color: "white",
    marginVertical: 8,
  },
});

export default ProductDetails;
