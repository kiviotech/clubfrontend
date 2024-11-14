
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import ProductList from '../../components/productList';
import Icon from 'react-native-vector-icons/FontAwesome';
import FilteredProductList from './filteredProductList';

const FlashSaleSelector = () => {
  const [selectedDiscount, setSelectedDiscount] = useState('All'); // Default selected discount

  const discounts = ['All', '10%', '20%', '30%', '40%', '50%'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flash Sale</Text>
      <Text style={styles.subtitle}>Choose your discount</Text>
      <View style={styles.selectorContainer}>
        {discounts.map((discount) => (
          <TouchableOpacity
            key={discount}
            style={[
              styles.discountButton,
              selectedDiscount === discount && styles.selectedButton,
            ]}
            onPress={() => setSelectedDiscount(discount)}
          >
            <Text
              style={[
                styles.discountText,
                selectedDiscount === discount && styles.selectedText,
              ]}
            >
              {typeof discount === 'string' ? discount : `${discount}%`}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>{selectedDiscount} Discount</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="sliders" size={18} color="#0F0" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <FilteredProductList selectedDiscount={selectedDiscount}/>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#121212',
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#BBBBBB',
    marginBottom: 15,
  },
  selectorContainer: {
    flexDirection: 'row',
    backgroundColor: '#333333',
    borderRadius: 10,
    padding: 5,
  },
  discountButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#555555',
    marginHorizontal: 2,
  },
  selectedButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#00FF00',
    borderWidth: 2,
  },
  discountText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  selectedText: {
    color: '#00FF00',
    fontWeight: 'bold',
  },
  scrollView: {
    flexGrow: 1,

  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    gap:150
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginRight: 10,
  },
  iconButton: {
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 20,
  },
});

export default FlashSaleSelector;

