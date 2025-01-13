import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const GalleryCard = ({ imageSrc, productName, category, description }) => {
  return (
    <View style={styles.card}>
      <Image source={imageSrc} style={styles.image} />
      <Text style={styles.productName}>{productName}</Text>
      <Text style={styles.category}>{category}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    // width: '48%',
    backgroundColor: "#1D2221",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  category: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#88c540",
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    color: "#ddd",
  },
});

export default GalleryCard;
