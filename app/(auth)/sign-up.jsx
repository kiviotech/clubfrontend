import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import logo from "../../assets/logo.png";
import SocialLoginButtons from "../../components/SocialLoginButtons/SocialLoginButtons";
import { router } from "expo-router";
import { signup } from "../../src/utils/auth";
import { createProfileService } from "../../src/api/services/profileService";
import { useStore } from "zustand";

// Helper function for storage
export const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error("Error saving to AsyncStorage:", error);
    throw new Error("Failed to save data");
  }
};

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validateUsername = () => {
    if (username.trim() === "") {
      setUsernameError("Username is required.");
      return false;
    }
    setUsernameError("");
    return true;
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format.");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      return false;
    }
    setPasswordError("");
    return true;
  };



  const handleSignup = async () => {
    const isValidUsername = validateUsername();
    const isValidEmail = validateEmail();
    const isValidPassword = validatePassword();

    if (isValidUsername && isValidEmail && isValidPassword) {
      router.push("/sign-in"); // Only route when all validations pass
    } else {
      // Optionally, you can handle the case when any validation fails
      console.log("Validation failed. Fix the errors.");
    }


    try {
      const response = await signup(username, email, password);
      console.log("Signup successful:", response);

      // Extract token and user information from the response
      const { jwt, user } = response.data;

      // **Store token and user ID depending on platform**
      await saveData("token", jwt); // Save the JWT token
      await saveData("userId", user.id); // Save the user ID
      console.log(username,id,profile_img)

      const profileData = {
        profile_img:"https://myraymond.com/cdn/shop/files/XMKB06320-N8_1.jpg?v=1731656640",
        username: user.username,  
        name: user.username,      
        user: user.id,            
        locale: 'en',             
        // localizations: [],       
      };

      // Call the createProfileService to create a new profile
      const profileResponse = await createProfileService(profileData);
      console.log("Profile created successfully:", profileResponse);

     
      
      router.push("/view-profile");
    } catch (error) {
      console.error("Signup error:", error);
      Alert.alert(
        "Signup Error",
        error.message || "There was an issue with signup. Please try again."
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: "black" }}>
      <View style={{ marginBottom: 144 }}>
        <Image source={logo} />
      </View>

      <View style={{ marginBottom: 8 }}>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 18, paddingBottom: 8 }}>
          Get started absolutely free
        </Text>
      </View>

      <View style={{ flexDirection: "row", gap: 8, marginBottom: 32 }}>
        <Text style={{ color: "white", fontSize: 16 }}>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/sign-in")}>
          <Text style={{ color: "#8FFA09" }}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: 16 }}>
        <TextInput
          style={{
            backgroundColor: "black",
            borderColor: "#919EAB",
            borderWidth: 1,
            color: "white",
            padding: 12,
            borderRadius: 8,
          }}
          placeholder="Username"
          placeholderTextColor="#a0aec0"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            if (usernameError) validateUsername();
          }}
          onBlur={validateUsername}
        />
        {usernameError ? (
          <Text style={{ color: "red" }}>{usernameError}</Text>
        ) : null}
      </View>

      <View style={{ marginBottom: 16 }}>
        <TextInput
          style={{
            backgroundColor: "black",
            borderColor: "#919EAB",
            borderWidth: 1,
            color: "white",
            padding: 12,
            borderRadius: 8,
          }}
          placeholder="Email address"
          placeholderTextColor="#a0aec0"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (emailError) validateEmail();
          }}
          onBlur={validateEmail}
        />
        {emailError ? <Text style={{ color: "red" }}>{emailError}</Text> : null}
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 24, backgroundColor: "black", borderColor: "#919EAB", borderWidth: 1, padding: 12, borderRadius: 8 }}>
        <TextInput
          style={{ flex: 1, color: "white" }}
          placeholder="Password"
          placeholderTextColor="#a0aec0"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (passwordError) validatePassword();
          }}
          onBlur={validatePassword}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Icon name={passwordVisible ? "eye" : "eye-off"} size={20} color="#a0aec0" />
        </TouchableOpacity>
      </View>

      {passwordError ? (
        <Text style={{ color: "red" }}>{passwordError}</Text>
      ) : null}

      <TouchableOpacity
        style={{ width: "100%", backgroundColor: "#8FFA09", padding: 12, borderRadius: 8 }}
        onPress={handleSignup}
      >
        <Text style={{ textAlign: "center", fontWeight: "bold", color: "black" }}>Create Account</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginTop: 20 }}>
        <Text style={{ color: "white", marginHorizontal: 8 }}>I agree to</Text>
        <TouchableOpacity onPress={() => router.push("/terms-of-use")}>
          <Text style={{ color: "#8FFA09" }}>Terms of Use</Text>
        </TouchableOpacity>
        <Text style={{ color: "white", marginHorizontal: 8 }}>and</Text>
        <TouchableOpacity onPress={() => router.push("/privacy-policy")}>
          <Text style={{ color: "#8FFA09" }}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>

      <SocialLoginButtons />
    </SafeAreaView>
  );
};

export default SignUp;

