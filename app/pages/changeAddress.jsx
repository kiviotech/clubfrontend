import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";

const ChangeAddress = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');
    const [phone, setPhone] = useState('');
    const navigation = useNavigation();

    const handleSaveAddress = () => {
        console.log("Address Saved:", { name, address, state, pincode, phone });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" color="white" size={30} />
            </TouchableOpacity>
            <Text style={styles.title}>Change Address</Text>

            {/* Name */}
            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your name"
                placeholderTextColor="#AAAAAA"
                value={name}
                onChangeText={setName}
            />

            {/* Address */}
            <Text style={styles.label}>Address</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your address"
                placeholderTextColor="#AAAAAA"
                value={address}
                onChangeText={setAddress}
            />

            {/* State and Pincode */}
            <View style={styles.row}>
                <View style={{ width: '48%' }}>
                    <Text style={styles.label}>State</Text>
                    <TextInput
                        style={[styles.input]}
                        placeholder="Enter state"
                        placeholderTextColor="#AAAAAA"
                        value={state}
                        onChangeText={setState}
                    />
                </View>
                <View style={{ width: '48%' }}>
                    <Text style={styles.label}>Pincode</Text>
                    <TextInput
                        style={[styles.input]}
                        placeholder="Enter pincode"
                        placeholderTextColor="#AAAAAA"
                        value={pincode}
                        onChangeText={setPincode}
                        keyboardType="numeric"
                    />
                </View>
            </View>

            {/* Phone Number */}
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter phone number"
                placeholderTextColor="#AAAAAA"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />

            <TouchableOpacity style={styles.button} onPress={handleSaveAddress}>
                <Text style={styles.buttonText}>Save Address</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 20,
    },
    backButton: {
        marginTop: 5,
        marginBottom: 10
    },
    title: {
        fontSize: 28,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 20,
    },
    label: {
        color: '#FFFFFF',
        fontSize: 16,
        marginBottom: 5, // Space between label and input
    },
    input: {
        backgroundColor: '#333333',
        color: '#FFFFFF',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 12,
        fontSize: 16,
        marginBottom: 15,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10, // Add margin for rows
    },
    button: {
        backgroundColor: '#8FFA09',
        borderRadius: 8,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ChangeAddress;
