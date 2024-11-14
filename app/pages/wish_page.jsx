import React from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

const ProductCard = ({ id,productname, price, image, isWishlist,onDelete  }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      {isWishlist && (
        <TouchableOpacity style={styles.deleteIcon}  onPress={onDelete} >
          <Ionicons name="trash-outline" size={24} color="white" />
        </TouchableOpacity>
      )}
      <View style={styles.details}>
        <Text style={styles.productName}>{productname}</Text>
        <View style={styles.rating}>
          <Text>⭐ ⭐ ⭐ ⭐ ⭐</Text> 
          <Text style={styles.ratingText}>(32k Ratings)</Text>
        </View>
        <View style={styles.pricebutton}>
        <Text style={styles.price}>${price}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1C1C1E',
    borderRadius: 10,
    overflow: 'hidden',
    width: 190,
    margin: 10,
    position: 'relative',
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  image: {
    width: '90%',
    height: 150,
  },
  deleteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    borderRadius: 15,
  },
  details: {
    padding: 10,
  },
  productName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ratingText: {
    color: 'white',
    marginLeft: 5,
    fontSize:10
  },
  price: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    
  },
  button: {
    backgroundColor: '#39D353',
    paddingVertical: 6, // Reduced padding for smaller button
    paddingHorizontal: 10, // Reduced horizontal padding
    alignItems: 'center',
    borderRadius: 5,
    width: 100,
    // marginLeft:70
  },
  buttonText: {
    color: 'black',
    fontSize: 14, // Reduced font size for smaller text
    fontWeight: 'bold',
  },
  pricebutton:{
    flexDirection:'row',
    justifyContent: "space-evenly",
    alignItems:"center",
    gap:5
    

  }
});

export default ProductCard;