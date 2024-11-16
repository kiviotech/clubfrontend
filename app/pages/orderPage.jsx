import React from 'react';
import { View, ScrollView, SafeAreaView, StyleSheet,Text,TouchableOpacity } from 'react-native';
import OrderCart from './orderCart';
import { useNavigation } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";

const OrderPage = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" color="white" size={30} />
            </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Orders</Text>
        <View style={styles.container}>
          {/* Add multiple OrderCart components if needed */}
          <OrderCart />
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000', // Black background
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 10, // Add padding for spacing at the top and bottom
  },
  container: {
    flex: 1,
    backgroundColor: '#000', // Black background for inner container
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 20,
    marginLeft:17,
},
backButton: {
    marginTop: 15,
   marginLeft:15
},
});

export default OrderPage;
