import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useCartStore from "../../src/store/useCartStore";
import { useRouter } from "expo-router"; // To navigate to the cart

const ProductCard = ({ id, productname, price, image, isWishlist, onDelete, inStock }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [alreadyInCart, setAlreadyInCart] = useState(false);
  const addItemToCart = useCartStore((state) => state.addItem);
  const cartItems = useCartStore((state) => state.items);
  const router = useRouter();
  // console.log(inStock);

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
      };
      addItemToCart(product);
      setAlreadyInCart(false); // This ensures the modal shows the correct message for new items.
    }
    setModalVisible(true); // Show the modal for both cases.
  };

  const navigateToCart = () => {
    setModalVisible(false); // Close the modal.
    router.push("/pages/cart"); // Navigate to the cart page.
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
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
        {/* Add to Cart Button */}
        <TouchableOpacity
          style={[styles.button, !inStock && styles.disabledButton]} // Add conditional style for disabled state
          onPress={inStock ? handleAddToCart : null} // Disable action if out of stock
          disabled={!inStock} // Disable button when out of stock
        >
          <Text style={styles.buttonText}>
            {inStock ? "Add to Cart" : "Out of Stock"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal for cart confirmation */}
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
    width: 170,
    position: "relative",
    flexDirection: "column", // Change to column for stacking items vertically
    justifyContent: "space-between",
    marginBottom: 10, // Space between cards
  },
  image: {
    width: "100%",
    height: 150,
    padding: 10,
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
    padding: 10, // Increase padding for better spacing
  },
  productName: {
    color: "white",
    fontSize: 16,
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
    fontSize: 8,
  },
  price: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#8FFA09",
    paddingVertical: 6,
    alignItems: "center",
    borderRadius: 5,
    width: "100%", // Full width button
  },
  disabledButton: {
    backgroundColor: "#B0B0B0", // Gray color when out of stock
  },
  buttonText: {
    color: "black",
    fontSize: 14,
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
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
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
    padding: 10,
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

