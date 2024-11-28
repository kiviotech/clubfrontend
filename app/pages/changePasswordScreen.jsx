import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";
import svgs from '../../constants/svgs'; // Ensure this path is correct
import { forgotPassword } from '../../src/utils/auth';

const ChangePasswordScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const Forgot = svgs?.forgot; 
  const [email, setEmail] = useState(''); 
  const [loader, setLoader] = useState(false); 
  const [successMessage, setSuccessMessage] = useState(''); 
  const [errors, setErrors] = useState(''); 

  // API call for password reset
  // const forgotPassword = async (email) => {
  //   const response = await 

  //   if (!response.ok) {
  //     throw new Error('Failed to send reset link');
  //   }
  //   return await response.json();
  // };

  // Form validation function
  const validateForm = () => {
    if (!email) {
      setErrors('Email is required.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors('Please enter a valid email address.');
      return false;
    }
    setErrors(''); // Clear errors if validation passes
    return true;
  };

  // Function to handle password reset
  const handlePasswordReset = async () => {
    const isValid = validateForm();
    if (isValid) {
      setLoader(true);
      setSuccessMessage('');
      try {
        const response = await forgotPassword(email); // Pass the email directly
        if (response) {
          setSuccessMessage(
            'We have sent a password reset link to your email address. Please check your inbox and click the link to reset your password.'
          );
          Alert.alert('Success', 'Password reset link sent successfully.');
          // router.push('/pages/passwordChangedNotification'); // Navigate to the notification screen
        }
      } catch (error) {
        console.error('Error:', error.message);
        Alert.alert('Error', 'Failed to send reset link. Please try again.');
      } finally {
        setLoader(false);
      }
    } else {
      console.log('Form is not valid', errors);
    }
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
      {errors ? <Text style={styles.errorText}>{errors}</Text> : null}

      {/* Send Verification Code Button */}
      <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
        <Text style={styles.buttonText}>
          {loader ? 'Sending...' : 'Send verification code'}
        </Text>
      </TouchableOpacity>

      {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}
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
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
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
  successText: {
    color: 'green',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default ChangePasswordScreen;
