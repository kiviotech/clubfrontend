import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from 'react-native-safe-area-context';
import { changePassword } from '../../src/api/repositories/userRepository';
import { getToken } from '../../src/utils/storage';
import { Alert } from 'react-native';

const ResetPasswordScreen = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const apihandleResetPassword = async () => {
    console.log("hrrlo")
    if (newPassword === confirmPassword && newPassword.length >= 8) {
      try {
       
        const data = {
          currentPassword,
          password: newPassword, // API expects "password" for the new password
          passwordConfirmation: confirmPassword, // Confirm the new password
        };

        await changePassword(data);
        Alert.alert('Success', 'Password changed successfully', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } catch (error) {
        console.error('Password reset error:', error);
        Alert.alert('Error', error.response?.data?.message || 'Failed to reset password');
      }
    } else if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
    } else {
      Alert.alert('Error', 'New password is too short (minimum 8 characters)');
    }
  };


  return (
    <SafeAreaView style={styles.viewContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" color="white" size={30} />
      </TouchableOpacity>

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>
          Make sure your new password is secure and not the same as previous passwords.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Current password"
          placeholderTextColor="#888"
          secureTextEntry
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="New password"
          placeholderTextColor="#888"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm new password"
          placeholderTextColor="#888"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.button} onPress={apihandleResetPassword}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 10,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    color: '#CCCCCC',
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1A1A1A',
    color: '#FFFFFF',
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333333',
  },
  button: {
    backgroundColor: '#8FFA09',
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ResetPasswordScreen;
