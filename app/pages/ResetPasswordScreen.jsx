import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useNavigation } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from 'react-native-safe-area-context';
import { changePassword } from '../../src/api/repositories/userRepository';

const ResetPasswordScreen = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(''); // State to track server-side errors
  const navigation = useNavigation();

  const validateForm = () => {
    let formErrors = {};
    if (!currentPassword) formErrors.currentPassword = 'Current password is required';
    if (!newPassword) formErrors.newPassword = 'New password is required';
    else if (newPassword.length < 8) formErrors.newPassword = 'New password should be at least 8 characters';
    if (!confirmPassword) formErrors.confirmPassword = 'Confirm password is required';
    else if (newPassword !== confirmPassword) formErrors.confirmPassword = 'Passwords do not match';
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const apihandleResetPassword = async () => {
    setServerError(''); // Clear any previous server error
    if (validateForm()) {
      try {
        const data = {
          currentPassword,
          password: newPassword,
          passwordConfirmation: confirmPassword,
        };
        await changePassword(data);
        setShowSuccessAlert(true);
      } catch (error) {
        console.error('Password reset error:', error);
        const errorMessage = error.response?.data?.message || 'Failed to reset password Current PassWord is Incorrect';
        setServerError(errorMessage); // Update the serverError state
      }
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

        {/* Current Password Field */}
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, errors.currentPassword && styles.inputError]}
            placeholder="Current password"
            placeholderTextColor="#888"
            secureTextEntry={!showCurrentPassword}
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowCurrentPassword(!showCurrentPassword)}
          >
            <Ionicons name={showCurrentPassword ? "eye-off" : "eye"} color="white" size={24} />
          </TouchableOpacity>
        </View>
        {errors.currentPassword && <Text style={styles.errorText}>{errors.currentPassword}</Text>}

        {/* New Password Field */}
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, errors.newPassword && styles.inputError]}
            placeholder="New password"
            placeholderTextColor="#888"
            secureTextEntry={!showNewPassword}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowNewPassword(!showNewPassword)}
          >
            <Ionicons name={showNewPassword ? "eye-off" : "eye"} color="white" size={24} />
          </TouchableOpacity>
        </View>
        {errors.newPassword && <Text style={styles.errorText}>{errors.newPassword}</Text>}

        {/* Confirm Password Field */}
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, errors.confirmPassword && styles.inputError]}
            placeholder="Confirm new password"
            placeholderTextColor="#888"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} color="white" size={24} />
          </TouchableOpacity>
        </View>
        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

        {/* Display server error */}
        {serverError && <Text style={styles.serverErrorText}>{serverError}</Text>}

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
  inputContainer: {
    position: 'relative',
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
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'left',
  },
  serverErrorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
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
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
});

export default ResetPasswordScreen;
