import React, { useEffect } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import useCartStore from '../../src/store/useCartStore';

const Totalamount = ({ delivery, onTotalChange=()=>{} }) => {
  const subtotal = useCartStore((state) => state.subtotal);

    const totalamount = subtotal + delivery;
    
    useEffect(() => {
      onTotalChange(totalamount);
  }, [totalamount]);

  return (
    <SafeAreaView>
        {/* Subtotal */}
        <View style={styles.row}>
              <Text style={styles.label}>Subtotal</Text>
              <Text style={styles.amount}>₹{subtotal}</Text>
            </View>

            {/* Delivery Charges */}
            <View style={styles.row}>
              <Text style={styles.label}>Delivery Charges</Text>
              <Text style={styles.amount}>  ₹{delivery}</Text>
            </View>

            {/* Horizontal Line */}
            <View style={styles.separator} />

            {/* Total Amount */}
            <View style={styles.row}>
              <Text style={[styles.label, styles.total]}>Total Amount</Text>
              <Text style={[styles.amount, styles.total]}>₹{totalamount}</Text>
            </View>
    </SafeAreaView>
  )
}

export default Totalamount;


const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        color: '#fff',
      },
      label: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '500',
        color: '#fff',
      },
      amount: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '400',
        color: '#fff',
      },
      separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#777',
        marginVertical: 10,
      },
      total: {
        fontWeight: '700',
      }
})