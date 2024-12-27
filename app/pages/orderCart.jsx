import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import useOrderStorelevel from "../../src/store/useOrderStorelevel"

const OrderCart = ({ imageUrl, productName, productPrice, level, id, documentId, total, quantity, updatedAt }) => {
  const router = useRouter();
  const orderLevel = useOrderStorelevel((state) => state.orderLevel);
  // console.log(orderLevel)

  const formattedDate = new Date(updatedAt).toLocaleDateString('en-GB', {
    day: '2-digit', // Two-digit day (e.g., 03)
    month: '2-digit', // Two-digit month (e.g., 12)
    year: '2-digit', // Two-digit year (e.g., 24)
  });


  const handleTrack = () => {
    router.push({
      pathname: "/pages/TrackOrderScreen", // Adjust the path based on your app's structure
      params: {
        imageUrl,
        productName,
        productPrice,
        level,
        id,
        documentId,
        total,
        formattedDate,
        quantity
      },
    });
  };



  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image
          source={{ uri: imageUrl || 'https://example.com/fallback.png' }} // Use dynamic image URL
          style={styles.productImage}
        />
        <View style={styles.details}>
          <Text style={styles.productName}>{productName}</Text>
          <Text style={styles.orderId}>Order#{documentId}</Text>
          <Text style={styles.deliveryDate}>Quantity: {quantity}</Text>
          <Text style={styles.deliveryDate}>Updated At: {formattedDate}</Text>


        </View>
        <View style={styles.priceDetails}>
          <Text style={styles.priceLabel}>Price:</Text>
          <Text style={styles.priceValue}>₹{productPrice}</Text>
          <Text style={styles.priceLabel}>Total Order:</Text>
          <Text style={styles.priceValue}>₹{total}</Text>
        </View>

      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.trackButton, styles.trackButtonCurved]} onPress={handleTrack}>
          <Text style={styles.trackButtonText}>Track Order</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.cancelButton, styles.cancelButtonCurved]} onPress={handleTrack}>
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
    fontSize: 10,
    color: '#AAAAAA',
    marginBottom: 3,
  },
  deliveryDate: {
    fontSize: 14,
    color: '#8FFA09',
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
  priceDetails: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginLeft: 10,
  },
  priceLabel: {
    fontSize: 14,
    color: '#AAAAAA',
    marginBottom: 2,
  },
  priceValue: {
    fontSize: 20,
    color: '#8FFA09',
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default OrderCart;
