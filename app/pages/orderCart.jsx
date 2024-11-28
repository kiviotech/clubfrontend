import React,{useState,useEffect} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
const OrderCart = ({ imageUrl, productName, productPrice ,level,id,documentId}) => {
  const router = useRouter();
  // console.log(id,documentId)

  
  const handleTrack = () => {
    router.push({
      pathname: "/pages/TrackOrderScreen", // Adjust the path based on your app's structure
      params: {
        imageUrl,
        productName,
        productPrice,
        level,
        id,
        documentId
      },
    });
  };

  return (
    <View style={styles.card}>
      <View style={styles.row}>
      <Image
          source={{ uri: imageUrl  ||'https://example.com/fallback.png' }} // Use dynamic image URL
          style={styles.productImage}
        />
        <View style={styles.details}>
        <Text style={styles.productName}>{productName}</Text>
          <Text style={styles.orderId}>Order #123456</Text>
          <Text style={styles.deliveryDate}>Delivering on 28 Nov, 2024</Text>
        </View>
        <Text style={styles.price}>${productPrice}</Text>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.trackButton, styles.trackButtonCurved]} onPress={handleTrack}>
          <Text style={styles.trackButtonText}>Track Order</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.cancelButton, styles.cancelButtonCurved]}>
          <Text style={styles.cancelButtonText}>Cancel Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#333333',
    borderRadius: 10,
    paddingTop: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  details: {
    flex: 1,
    marginLeft: 15,
  },
  productName: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  orderId: {
    fontSize: 14,
    color: '#AAAAAA',
    marginBottom: 3,
  },
  deliveryDate: {
    fontSize: 14,
    color: '#AAAAAA',
  },
  price: {
    fontSize: 20,
    color: '#8FFA09',
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#555555', // Blend the buttons with the card
  },
  trackButton: {
    backgroundColor: '#8FFA09',
    paddingVertical: 15,
    flex: 1,
    alignItems: 'center',
    borderRadius: 0, // Remove default rounded corners
  },
  cancelButton: {
    backgroundColor: '#444444',
    paddingVertical: 15,
    flex: 1,
    alignItems: 'center',
    borderRadius: 0, // Remove default rounded corners
  },
  trackButtonCurved: {
    borderBottomLeftRadius: 10, // Add curve to bottom-left corner
  },
  cancelButtonCurved: {
    borderBottomRightRadius: 10, // Add curve to bottom-right corner
  },
  trackButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: '#8FFA09',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrderCart;
