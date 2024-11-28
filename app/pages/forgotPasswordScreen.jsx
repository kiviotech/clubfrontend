import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { resetPassword } from '../../src/utils/auth';
import { useRouter, useLocalSearchParams } from 'expo-router';

const forgotPasswordScreen = () => {
  const [isNewPasswordHidden, setIsNewPasswordHidden] = useState(true);
  const [isConfirmNewPasswordHidden, setIsConfirmNewPasswordHidden] =
    useState(true);
  const { code } = useLocalSearchParams();
  const router = useRouter();

  const [form, setForm] = useState({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: '',
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!form.password || form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
      valid = false;
    }

    if (!form.confirmPassword || form.confirmPassword !== form.password) {
      newErrors.confirmPassword = 'Passwords do not match.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChangeText = (field, value) => {
    setForm({ ...form, [field]: value });

    // Clear errors for the field being updated
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const submit = async () => {
    const isValid = validateForm();

    if (isValid) {
      try {
        const data = {
          password: form.password,
          passwordConfirm: form.confirmPassword,
          code: code,
        };

        await resetPassword(data);
        Alert.alert('Success', 'Password reset successfully!');
        router.push('/pages/passwordChangedNotification');
      } catch (error) {
        console.error('Error:', error.message);
        Alert.alert('Error', 'An error occurred. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>
        Make sure your new password is secure and not the same as previous
        passwords.
      </Text>

      {/* New Password */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="New password"
          placeholderTextColor="#aaa"
          secureTextEntry={isNewPasswordHidden}
          value={form.password}
          onChangeText={(value) => handleChangeText('password', value)}
        />
        <TouchableOpacity
          onPress={() =>
            setIsNewPasswordHidden(!isNewPasswordHidden)
          }>
          <Ionicons
            name={isNewPasswordHidden ? 'eye-off' : 'eye'}
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
      {errors.password ? (
        <Text style={styles.errorText}>{errors.password}</Text>
      ) : null}

      {/* Confirm New Password */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm new password"
          placeholderTextColor="#aaa"
          secureTextEntry={isConfirmNewPasswordHidden}
          value={form.confirmPassword}
          onChangeText={(value) =>
            handleChangeText('confirmPassword', value)
          }
        />
        <TouchableOpacity
          onPress={() =>
            setIsConfirmNewPasswordHidden(!isConfirmNewPasswordHidden)
          }>
          <Ionicons
            name={isConfirmNewPasswordHidden ? 'eye-off' : 'eye'}
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
      {errors.confirmPassword ? (
        <Text style={styles.errorText}>{errors.confirmPassword}</Text>
      ) : null}

      {/* Reset Password Button */}
      <TouchableOpacity style={styles.button} onPress={submit}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    title: {
      fontSize: 24,
      color: '#fff',
      fontWeight: 'bold',
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 14,
      color: '#ccc',
      textAlign: 'center',
      marginBottom: 30,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#222',
      borderRadius: 10,
      marginBottom: 15,
      paddingHorizontal: 10,
      width: '100%',
      height: 50,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: '#fff',
      marginLeft: 10,
    },
    button: {
      backgroundColor: '#32cd32',
      paddingVertical: 15,
      borderRadius: 10,
      width: '100%',
      alignItems: 'center',
      marginTop: 20,
    },
    buttonText: {
      color: '#000',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default forgotPasswordScreen