import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useCartStore from "../../src/store/useCartStore";
import { useRouter } from "expo-router";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const ProductCard = ({
  id,
  productname,
  price,
  image,
  isWishlist,
  onDelete,
  inStock,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [alreadyInCart, setAlreadyInCart] = useState(false);
  const addItemToCart = useCartStore((state) => state.addItem);
  const cartItems = useCartStore((state) => state.items);
  const router = useRouter();

  const handleAddToCart = () => {
    const productExists = cartItems.some((item) => item.id === id);
    if (productExists) {
      setAlreadyInCart(true);
    } else {
      const product = {
        id,
        name: productname,
        price,
        image,
        size: "S",
      };
      addItemToCart(product);
      setAlreadyInCart(false);
    }
    setModalVisible(true);
  };

  const navigateToCart = () => {
    setModalVisible(false);
    router.push("/pages/cart");
  };

  return (
    <View style={[styles.card, { width: screenWidth * 0.45 }]}>
      <Image
        source={{ uri: image }}
        style={[styles.image, { height: screenHeight * 0.2 }]}
      />
      {isWishlist && (
        <TouchableOpacity style={styles.deleteIcon} onPress={onDelete}>
          <Ionicons name="trash-outline" size={24} color="white" />
        </TouchableOpacity>
      )}
      <View style={styles.details}>
        <Text style={styles.productName}>{productname}</Text>
        <View style={styles.rating}>
          <Text>⭐ ⭐ ⭐ ⭐ ⭐</Text>
          <Text style={styles.ratingText}>(32k Ratings)</Text>
        </View>
        <Text style={styles.price}>₹{price}</Text>
        <TouchableOpacity
          style={[styles.button, !inStock && styles.disabledButton]}
          onPress={inStock ? handleAddToCart : null}
          disabled={!inStock}
        >
          <Text style={styles.buttonText}>
            {inStock ? "Add to Cart" : "Out of Stock"}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              {alreadyInCart
                ? "This product is already in your cart. Do you want to go to your cart?"
                : "Product added to cart! Do you want to go to your cart?"}
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonYes]}
                onPress={navigateToCart}
              >
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonNo]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1C1C1E",
    borderRadius: 10,
    overflow: "hidden",
    // margin: 10,
    flexDirection: "column",
    padding:7
  },
  image: {
    width: "100%",
    resizeMode: "cover",
  },
  deleteIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 5,
    borderRadius: 15,
  },
  details: {
    padding: 10,
  },
  productName: {
    color: "white",
    fontSize: screenHeight * 0.016, // Reduced font size
    fontWeight: "bold",
    marginBottom: 5,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  ratingText: {
    color: "white",
    fontSize: screenHeight * 0.010, // Reduced font size
  },
  price: {
    color: "white",
    fontSize: screenHeight * 0.020, // Reduced font size
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#8FFA09",
    paddingVertical: screenHeight * 0.005,
    alignItems: "center",
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: "#B0B0B0",
  },
  buttonText: {
    color: "black",
    fontSize: screenHeight * 0.016, // Reduced font size
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#8FFA09",
    padding: screenHeight * 0.03,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    fontSize: screenHeight * 0.018, // Reduced font size
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    padding: screenHeight * 0.01,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  modalButtonYes: {
    backgroundColor: "#000",
  },
  modalButtonNo: {
    backgroundColor: "#000",
  },
  modalButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: screenHeight * 0.016, // Reduced font size
  },
});

export default ProductCard;




// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   Modal,
//   Button,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import useCartStore from "../../src/store/useCartStore";
// import { useRouter } from "expo-router"; // To navigate to the cart

// const ProductCard = ({ id, productname, price, image, isWishlist, inStock, onDelete }) => {
//   console.log(inStock)
//   const [modalVisible, setModalVisible] = useState(false);
//   const [alreadyInCart, setAlreadyInCart] = useState(false);
//   const addItemToCart = useCartStore((state) => state.addItem);
//   const cartItems = useCartStore((state) => state.items);
//   const router = useRouter();

//   const handleAddToCart = () => {
//     if (!inStock) {
//       alert("This product is out of stock and cannot be added to the cart.");
//       return;
//     }
    
//     const productExists = cartItems.some((item) => item.id === id);
//     if (productExists) {
//       setAlreadyInCart(true);
//     } else {
//       const product = {
//         id,
//         name: productname,
//         price,
//         image,
//       };
//       addItemToCart(product);
//       setAlreadyInCart(false); // Reset for new items.
//     }
//     setModalVisible(true); // Show the modal for both cases.
//   };

//   const navigateToCart = () => {
//     setModalVisible(false); // Close the modal.
//     router.push("/pages/cart"); // Navigate to the cart page.
//   };

//   return (
//     <View style={styles.card}>
//       <Image source={{ uri: image }} style={styles.image} />
//       {isWishlist && (
//         <TouchableOpacity style={styles.deleteIcon} onPress={onDelete}>
//           <Ionicons name="trash-outline" size={24} color="white" />
//         </TouchableOpacity>
//       )}
//       <View style={styles.details}>
//         <Text style={styles.productName}>{productname}</Text>
//         <View style={styles.rating}>
//           <Text>⭐ ⭐ ⭐ ⭐ ⭐</Text>
//           <Text style={styles.ratingText}>(32k Ratings)</Text>
//         </View>
//         <View style={styles.pricebutton}>
//           <Text style={styles.price}>${price}</Text>
//           <TouchableOpacity
//             style={[styles.button, !inStock && styles.buttonDisabled]}
//             onPress={handleAddToCart}
//             disabled={!inStock}
//           >
//             <Text style={styles.buttonText}>
//               {inStock ? "Add to Cart" : "Out of Stock"}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Modal for cart confirmation */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalText}>
//               {alreadyInCart
//                 ? "This product is already in your cart. Do you want to go to your cart?"
//                 : "Product added to cart! Do you want to go to your cart?"}
//             </Text>
//             <View style={styles.modalActions}>
//               <TouchableOpacity
//                 style={[styles.modalButton, styles.modalButtonYes]}
//                 onPress={navigateToCart}
//               >
//                 <Text style={styles.modalButtonText}>Yes</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.modalButton, styles.modalButtonNo]}
//                 onPress={() => setModalVisible(false)}
//               >
//                 <Text style={styles.modalButtonText}>No</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: "#1C1C1E",
//     borderRadius: 10,
//     overflow: "hidden",
//     width: 160,
//     position: "relative",
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },
//   image: {
//     width: "90%",
//     height: 150,
//   },
//   deleteIcon: {
//     position: "absolute",
//     top: 10,
//     right: 10,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     padding: 5,
//     borderRadius: 15,
//   },
//   details: {
//     padding: 1,
//   },
//   productName: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   rating: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 5,
//   },
//   ratingText: {
//     color: "white",
//     fontSize: 8,
//   },
//   price: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   button: {
//     backgroundColor: "#39D353",
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//     alignItems: "center",
//     borderRadius: 5,
//     width: 100,
//   },
//   buttonDisabled: {
//     backgroundColor: "#D3D3D3", // Light gray color to indicate a disabled button
//   },
//   buttonText: {
//     color: "black",
//     fontSize: 14,
//     fontWeight: "bold",
//   },
//   pricebutton: {
//     flexDirection: "row",
//     justifyContent: "space-evenly",
//     alignItems: "center",
//     gap: 5,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   modalContent: {
//     backgroundColor: "#8FFA09",
//     padding: 20,
//     borderRadius: 10,
//     width: "80%",
//     alignItems: "center",
//   },
//   modalText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   modalActions: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "100%",
//   },
//   modalButton: {
//     padding: 10,
//     borderRadius: 5,
//     flex: 1,
//     marginHorizontal: 5,
//   },
//   modalButtonYes: {
//     backgroundColor: "#000",
//   },
//   modalButtonNo: {
//     backgroundColor: "#000",
//   },
//   modalButtonText: {
//     color: "white",
//     textAlign: "center",
//     fontWeight: "bold",
//   },
// });

// export default ProductCard;

