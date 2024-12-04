import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import svgs from "../../constants/svgs";
import useCartStore from "../../src/store/useCartStore";

export default function CartList({
  id,
  productname,
  price,
  image,
  quantity: initialQuantity = 1,
  size,
  isWishlist = false,
}) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const increment = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateQuantity(id, newQuantity);
  };

  const decrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.productContainer}>
        <Image source={{ uri: image }} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{productname}</Text>
          <Text style={styles.productPrice}>${price}</Text>
          <Text style={styles.subtotal}>Size : {size}</Text>


          {!isWishlist && (
            <View style={styles.subtotalContainer}>
              <Text style={styles.subtotal}>Subtotal: ${price * quantity}</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  onPress={decrement}
                  style={styles.quantityButton}
                >
                  <Text style={styles.quantityText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity
                  onPress={increment}
                  style={styles.quantityButton}
                >
                  <Text style={styles.quantityText}>+</Text>
                </TouchableOpacity>
                
              </View>
            </View>
          )}
        </View>

        <TouchableOpacity 
  style={styles.deleteButton} 
  onPress={() => removeItem(id, size)} // Pass both id and size
>
  <svgs.TrashSimple />
</TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "black",
    flex: 1,
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    color: "#8FFA09",
    fontSize: 18,
    fontWeight: "bold",
  },
  productPrice: {
    color: "#fff",
    fontSize: 16,
    marginVertical: 5,
  },
  subtotalContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  subtotal: {
    color: "#fff",
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 50,
    paddingVertical: 1,
    paddingHorizontal: 12,
    marginLeft: 25,
  },
  quantityButton: {
    padding: 5,
    marginHorizontal: 2,
  },
  quantityText: {
    color: "#fff",
    fontSize: 16,
  },
  deleteButton: {
    padding: 10,
    backgroundColor: "black",
    borderRadius: 50,
    marginBottom: 60,
    marginRight: 5,
  },
});
