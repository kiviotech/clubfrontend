import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert,Modal,Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { removeDesignRequest } from '../../src/api/services/designRequestService';
import useRequestStore from '../../src/store/useRequestStore';

const RequestCart = ({ title, budget, colorPreferences, deadline, image, requestId, onDelete, documentId }) => {
  const { getQuantity, updateQuantity } = useRequestStore();
  const quantity = getQuantity(requestId);
  const [modalVisible, setModalVisible] = useState(false);
  // Increment and Decrement Quantity
  const incrementQuantity = () => updateQuantity(requestId, quantity + 1);
  const decrementQuantity = () => {
    if (quantity > 1) updateQuantity(requestId, quantity - 1);
  };

  // Handle Delete Request
  const handleDelete = async () => {
    try {
      // Call service to remove request by documentId
      await removeDesignRequest(documentId);

      // If deletion is successful, execute the onDelete function passed from parent
      onDelete(requestId);
    } catch (error) {
      // console.error("Error deleting request:", error);
      Alert.alert("Error", "Unable to delete the request. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Delete Button */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)} // Open confirmation modal
        style={styles.deleteButton}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // Adds tappable margin
      >
        <Ionicons name="trash" size={18} color="white" />
      </TouchableOpacity>

      {/* Product Image */}
      <Image
        source={{ uri: image || 'https://via.placeholder.com/100x100' }} // Fallback if no image is provided
        style={styles.productImage}
      />

      {/* Product Details */}
      <View style={styles.details}>
        <Text style={styles.productTitle}>{title}</Text>
        <Text style={styles.productPrice}>₹{budget}</Text>
        <Text style={styles.productColor}>Color Preferences: {colorPreferences}</Text>
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

      {/* Confirmation Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirm Deletion</Text>
            <Text style={styles.modalMessage}>Are you sure you want to delete this request?</Text>
            <View style={styles.modalButtonContainer}>
              <Pressable
                style={styles.modalButton}
                onPress={() => setModalVisible(false)} // Close modal
              >
                <Text style={styles.modalButtonText}>No</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.modalDeleteButton]}
                onPress={() => {
                  setModalVisible(false); // Close modal
                  handleDelete(); // Perform delete action
                }}
              >
                <Text style={styles.modalButtonText}>Yes</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
    zIndex: 10,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#8FFA09',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 14,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    backgroundColor: '#1C1C1C',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  modalDeleteButton: {
    backgroundColor: '#1C1C1C',
  },
  modalButtonText: {
    color: '#8FFA09',
    fontWeight: 'bold',
  },
});

export default RequestCart;