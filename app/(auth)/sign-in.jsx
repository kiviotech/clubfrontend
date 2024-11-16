import { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, Alert, Platform,StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import logo from "../../assets/logo.png";
import SocialLoginButtons from "../../components/SocialLoginButtons/SocialLoginButtons";
import { router } from "expo-router";
import { login } from "../../src/utils/auth";
import useStore from "../../src/store/useStore";

// Helper functions for platform-specific storage
const saveData = async (key, value) => {
  if (Platform.OS === 'web') {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value);
    } else {
      console.error("localStorage is not available");
    }
  } else {
    await AsyncStorage.setItem(key, value);
  }
};

const getData = async (key) => {
  if (Platform.OS === 'web') {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(key);
    } else {
      console.error("localStorage is not available");
      return null;
    }
  } else {
    return await AsyncStorage.getItem(key);
  }
};

const removeData = async (key) => {
  if (Platform.OS === 'web') {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(key);
    } else {
      console.error("localStorage is not available");
    }
  } else {
    await AsyncStorage.removeItem(key);
  }
};


const SignIn = () => {
  const [formValues, setFormValues] = useState({ username: "", password: "" });
  const [formErrors, setFormErrors] = useState({ username: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { setUser } = useStore();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validateForm = () => {
    const errors = {};
    if (!formValues.username.trim()) {
      errors.username = "Username is required";
    }
    if (!formValues.password.trim()) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const handleChange = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const handleSubmit = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      try {
        // Make the login API call
        const response = await login(formValues.username, formValues.password);

       // Assuming the API returns a token or other information
       const { token, userId } = response.user;
       console.log("signin",response.user.id); // Log the user ID

       // Store token and userId using AsyncStorage (or localStorage for web) 
       await saveData("token", token);  // Save token
       await saveData("userId", userId);  // Save userId

       // Update the Zustand store with the user info
       setUser(formValues.username, token, userId);
        // If successful, navigate to the home screen
        router.push("/home");
      } catch (error) {
        // Handle API errors
        setFormErrors({
          ...formErrors,
          password: "Invalid username or password", // Set API error message
        });
        Alert.alert("Login Error", "Invalid username or password.");
      }
    }
  };


  return (
    <SafeAreaView style={styles.safeAreaView}>
    <View style={styles.logoContainer}>
      <Image source={logo} />
    </View>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>Sign in to ClubUnplugged.</Text>
    </View>
    <View style={styles.newUserContainer}>
      <Text style={styles.newUserText}>New User?</Text>
      <TouchableOpacity onPress={() => router.push("/sign-up")}>
        <Text style={styles.newUserLink}>Create your account.</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#a0aec0"
        value={formValues.username}
        onChangeText={(text) => handleChange("username", text)}
      />
      {formErrors.username && (
        <Text style={styles.errorText}>{formErrors.username}</Text>
      )}
    </View>

    <View style={styles.passwordContainer}>
      <TextInput
        style={styles.passwordInput}
        placeholder="Password"
        placeholderTextColor="#a0aec0"
        secureTextEntry={!passwordVisible}
        value={formValues.password}
        onChangeText={(text) => handleChange("password", text)}
      />
      <TouchableOpacity onPress={togglePasswordVisibility}>
        <Icon name={passwordVisible ? "eye" : "eye-off"} size={20} color="#a0aec0" />
      </TouchableOpacity>
    </View>
    {formErrors.password && (
      <Text style={styles.errorText}>{formErrors.password}</Text>
    )}

    <TouchableOpacity style={styles.forgotPasswordContainer}>
      <Text style={styles.forgotPasswordText}>Forgot password?</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.loginButton}
     // onPress={router.push("/home")}
      onPress={handleSubmit}
    >
      <Text style={styles.loginButtonText}>Login</Text>
    </TouchableOpacity>

    <SocialLoginButtons />
  </SafeAreaView>
);
};

const styles = StyleSheet.create({
safeAreaView: {
  height: '100%',
  padding: 20,
  backgroundColor: 'black', // Tailwind: h-full p-5 bg-black
},
logoContainer: {
  marginBottom: 160, // Tailwind: mb-40
},
titleContainer: {
  marginBottom: 8, // Tailwind: mb-2
},
title: {
  color: 'white',
  fontWeight: 'bold',
  fontSize: 18,
  paddingBottom: 8, // Tailwind: text-white font-pbold text-lg pb-1
},
newUserContainer: {
  flexDirection: 'row',
  gap: 8,
  marginBottom: 32, // Tailwind: flex flex-row gap-2 mb-8
},
newUserText: {
  color: 'white',
  fontSize: 16, // Tailwind: text-white font-plight text-base
},
newUserLink: {
  color: '#8FFA09', // Tailwind: font-plight text-primary
},
inputContainer: {
  marginBottom: 16, // Tailwind: mb-4
},
input: {
  backgroundColor: 'black',
  borderColor: '#919EAB',
  borderWidth: 1,
  color: 'white',
  padding: 12,
  borderRadius: 8, // Tailwind: bg-black border border-[#919EAB] text-white p-3 rounded-lg
},
errorText: {
  color: 'red', // Tailwind: text-red-500
},
passwordContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: 'black',
  borderColor: '#919EAB',
  borderWidth: 1,
  padding: 12,
  borderRadius: 8,
  marginBottom: 16, // Tailwind: flex flex-row items-center mb-4 bg-black border border-[#919EAB] p-3 rounded-lg
},
passwordInput: {
  flex: 1,
  color: 'white', // Tailwind: flex-1 text-white
},
forgotPasswordContainer: {
  marginBottom: 16,
  flexDirection: 'row-reverse', // Tailwind: mb-4 flex-row-reverse
},
forgotPasswordText: {
  color: '#a0aec0', // Tailwind: text-gray-400
},
loginButton: {
  width: '100%',
  backgroundColor: '#8FFA09',
  padding: 12,
  borderRadius: 8, // Tailwind: w-full bg-primary p-3 rounded-lg
},
loginButtonText: {
  textAlign: 'center',
  color: 'black',
  fontWeight: 'bold', // Tailwind: text-center font-pbold text-black
},
});

export default SignIn;