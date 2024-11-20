import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ProductList from '../../components/productList';

const ViewProduct = () => {
  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.headerText}>All Products</Text>
        <ProductList />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
  },
  headerText: {
    fontSize: 24, // Adjust size as needed
    fontWeight: 'bold', // Make the text bold
    color: 'white', // Set text color to white
    textAlign: 'center', // Center-align the text
    marginVertical: 10, // Add vertical margin for spacing
  },
});

export default ViewProduct;
