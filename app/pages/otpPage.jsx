import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const otpPage = () => {
    const [code, setCode] = useState(["", "", "", ""]);
    const navigation = useNavigation();
    const router = useRouter();

    const handleReset = () => {
        router.push("/pages/ResetPasswordScreen"); 
      };

    const inputs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
    ];

    const handleChangeText = (text, index) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        if (text && index < 3) {
            inputs[index + 1].current.focus();
        }
    };

    return (
        <SafeAreaView style={styles.safecontainer}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" color="white" size={30} />
            </TouchableOpacity>
            <View style={styles.container}>
                <Text style={styles.title}>Verification</Text>
                <Text style={styles.subtitle}>
                    We have sent you a verification code to noname@nodomain.com
                </Text>

                <View style={styles.inputContainer}>
                    {code.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={inputs[index]}
                            style={styles.input}
                            keyboardType="number-pad"
                            maxLength={1}
                            value={digit}
                            onChangeText={(text) => handleChangeText(text, index)}
                        />
                    ))}
                </View>

                <TouchableOpacity style={styles.button} onPress={handleReset}>
                    <Text style={styles.buttonText}>Verify</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safecontainer: {
        flex: 1,
        backgroundColor: '#000',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 200,
        paddingHorizontal: 20,
    },
    backButton: {
        marginTop:25,
        marginLeft:20,
    },
    title: {
        fontSize: 28,
        color: '#fff',
        fontWeight: '600',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#aaa',
        textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 20,

    },
    input: {
        width: 50,
        height: 50,
        backgroundColor: '#000',
        color: '#fff',
        fontSize: 24,
        textAlign: 'center',
        borderRadius: 10,
        borderWidth: 1,  // Adding border when editing
        borderColor: '#fff',
    },
    button: {
        width: '95%',
        height: 50,
        backgroundColor: '#8FFA09',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default otpPage