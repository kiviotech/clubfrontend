import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import ProductList from '../../components/productList'
import { ScrollView } from 'react-native-web'

const ViewProduct = () => {
  return (
    <ScrollView>
    <View style={styles.container}>
      <ProductList/>
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10, // Optional padding if needed
  },
})

export default ViewProduct
