import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { deleteDesignRequest } from '../../src/api/repositories/designRequestRepository';
import { removeDesignRequest } from '../../src/api/services/designRequestService';
import useRequestStore from '../../src/store/useRequestStore';

const RequestCart = ({ title, budget, colorPreferences, deadline,image,requestId, onDelete, documentId}) => {
  // const [quantity, setQuantity] = useState(1);
  // console.log(documentId)
  const { getQuantity, updateQuantity } = useRequestStore();
  const quantity = getQuantity(requestId);
  const incrementQuantity = () => updateQuantity(requestId, quantity + 1);
  const decrementQuantity = () => {
    if (quantity > 1) updateQuantity(requestId, quantity - 1);
  };

  const handleDelete = async () => {
    try {
      // Call the service to delete the request from the backend using the documentId
      await removeDesignRequest(documentId);

      // Call the onDelete function passed from the parent component to remove the item from frontend state
      onDelete(requestId); // Pass the requestId to the delete function (or pass documentId if needed)

    } catch (error) {
      console.error("Failed to delete the request:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Delete Button */}
      <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
        <Ionicons name="trash" size={18} color="white" />
      </TouchableOpacity>

      {/* Product Image */}
      <Image
        source={{ uri: image || 'https://via.placeholder.com/100x100' }} // Replace with your image URL
        style={styles.productImage}
      />

      {/* Product Details */}
      <View style={styles.details}>
        <Text style={styles.productTitle}>{title}</Text>
        <Text style={styles.productPrice}>${budget}</Text>
        <Text style={styles.productColor}>Color Preferences: {colorPreferences}</Text>
        {/* Expected Delivery */}
        <Text style={styles.deliveryText}>Expected Delivery:</Text>
        <Text style={styles.datePlaceholder}>{deadline}</Text>
      </View>

      {/* Quantity Controls */}
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={decrementQuantity} style={styles.quantityButton}>
          <Text style={styles.quantityText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityValue}>{quantity}</Text>
        <TouchableOpacity onPress={incrementQuantity} style={styles.quantityButton}>
          <Text style={styles.quantityText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1C',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#FF0000',
    padding: 4,
    borderRadius: 50,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  productTitle: {
    color: '#7CFC00',
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    color: '#fff',
    fontSize: 16,
    marginTop: 4,
  },
  productColor: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 4,
  },
  deliveryText: {
    color: '#ff4500',
    fontSize: 14,
    marginTop: 4,
  },
  datePlaceholder: {
    color: '#fff',
    fontSize: 14,
    marginTop: 2,
  },
  quantityContainer: {
    position: 'absolute',
    bottom: 5,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  quantityButton: {
    paddingHorizontal: 8,
  },
  quantityText: {
    color: '#fff',
    fontSize: 12,
  },
  quantityValue: {
    color: '#fff',
    fontSize: 12,
    marginHorizontal: 8,
  },
});

export default RequestCart;
