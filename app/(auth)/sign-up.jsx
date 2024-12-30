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
import useProfileStore from "../../src/store/profileStore";
// import { useStore } from "zustand";

// Helper function for storage
export const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    // console.error("Error saving to AsyncStorage:", error);
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
    const nameRegex = /^[a-zA-Z]+$/; // Allows only alphabetic characters
    if (username.trim() === "") {
      setUsernameError("Username is required.");
      return false;
    } else if (!nameRegex.test(username)) {
      setUsernameError("Username must contain only alphabetic characters.");
      return false;
    }
    setUsernameError("");
    return true;
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Valid email regex
    if (email.trim() === "") {
      setEmailError("Email is required.");
      return false;
    } else if (!emailRegex.test(email)) {
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

 
  const createUserProfile = async (user) => {
    
    const data = {
      username: user.username || user.user_name,  // Adjust if the actual field name is different
      name: user.username || user.user_name,
      user: user.documentId || user.id,
      locale: 'en',
    };

    try {
      const profileResponse = await createProfileService(data);
      // console.log("Profile created successfully:", profileResponse);

      useProfileStore.getState().setProfile(profileResponse);

      return profileResponse;
    } catch (error) {
      // console.error("Profile creation error:", error);
      throw new Error("Failed to create user profile");
    }
  };

  const handleSignup = async () => {
    const isValidUsername = validateUsername();
    const isValidEmail = validateEmail();
    const isValidPassword = validatePassword();

    if (!isValidUsername || !isValidEmail || !isValidPassword) {
      return; // Stop if validation fails
    }

    try {
      const response = await signup(username, email, password);
      // console.log("Signup successful:", response.user);
      // console.log("Signup successful:", response.user.username);

     const user = response.user;  // Extract the user from the response
    //  console.log(user)

      // Proceed to create the user profile
      await createUserProfile(user);
      router.push("/sign-in");
      // Optionally, save token and user data to AsyncStorage
      await saveData("token", response.data.jwt);
      await saveData("userId", user.id);

      // Navigate to the sign-in page after successful signup
      
    } catch (error) {
      
      if (error.response && error.response.status === 400) {
       
          setEmailError("Email already exists. Please use a different email.");
        
          // console.error("Signup error:", error);
          // Alert.alert("Error", "Something went wrong. Please try again later.");
        
      } else {
        // console.error("Signup error:", error);
        // Alert.alert("Error", "Something went wrong. Please try again later.");
      }
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

      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5, backgroundColor: "black", borderColor: "#919EAB", borderWidth: 1, padding: 12, borderRadius: 8 }}>
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
        style={{ width: "100%", backgroundColor: "#8FFA09", padding: 20, borderRadius: 8 }}
        onPress={handleSignup}
      >
        <Text style={{ textAlign: "center", fontWeight: "bold", color: "black" }}>Create Account</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginTop: 20 }}>
        <Text style={{ color: "white", marginHorizontal: 8 }}>I agree to</Text>
        <TouchableOpacity >
          <Text style={{ color: "#8FFA09" }}>Terms of Use</Text>
        </TouchableOpacity>
        <Text style={{ color: "white", marginHorizontal: 8 }}>and</Text>
        <TouchableOpacity>
          <Text style={{ color: "#8FFA09" }}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>

      {/* <SocialLoginButtons /> */}
    </SafeAreaView>
  );
};

export default SignUp;

