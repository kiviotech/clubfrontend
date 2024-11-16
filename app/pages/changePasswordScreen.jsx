import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useNavigation } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";
import svgs from '../../constants/svgs'; // Ensure this path is correct

const ChangePasswordScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const Forgot = svgs?.forgot; // Ensure the `forgot` SVG is properly defined and exported
  const [email, setEmail] = useState('');

  const handleOTP = () => {
    router.push("/pages/otpPage");
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" color="white" size={30} />
      </TouchableOpacity>

      {/* Forgot Password Illustration */}
      {Forgot && (
        <View style={styles.imageContainer}>
          <Forgot />
        </View>
      )}

      {/* Title and Subtitle */}
      <Text style={styles.title}>Change Password</Text>
      <Text style={styles.subtitle}>We will send the verification code to your email</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#666"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Send Verification Code Button */}
      <TouchableOpacity style={styles.button} onPress={handleOTP}>
        <Text style={styles.buttonText}>Send verification code</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  imageContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#333',
    borderRadius: 10,
    paddingHorizontal: 15,
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    width: '100%',
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

export default ChangePasswordScreen;
