import { useState, useEffect } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import logo from "../../assets/logo.png";
import SocialLoginButtons from "../../components/SocialLoginButtons/SocialLoginButtons";
import { router } from "expo-router";
import { login } from "../../src/utils/auth";
import useStore from "../../src/store/useStore";
import useUserDataStore from "../../src/store/userData";

// Helper functions for platform-specific storage
const saveData = async (key, value) => {
  if (Platform.OS === "web") {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(key, value);
    }
  } else {
    await AsyncStorage.setItem(key, value);
  }
};

const getData = async (key) => {
  if (Platform.OS === "web") {
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem(key);
    }
    return null;
  } else {
    return await AsyncStorage.getItem(key);
  }
};

const SignIn = () => {
  const [formValues, setFormValues] = useState({ username: "", password: "" });
  const [formErrors, setFormErrors] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const setUser = useStore((state) => state.setShippingInfo);
  const addUser = useUserDataStore((state) => state.addUser);

  // Check for existing token on component mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = await getData("token");
        if (token) {
          // If token exists, redirect to home
          router.replace("/(tabs)/profile");
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
      }
    };

    checkAuthStatus();
  }, []);

  const handlePassword = () => {
    router.push("/pages/changePasswordScreen");
  };

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
    setErrorMessage("");
  };

  const handleSubmit = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      try {
        const response = await login(formValues.username, formValues.password);
        const { jwt, user } = response;

        // Save token and user data
        await saveData("token", jwt);
        await saveData("userId", user.id.toString());

        // Update stores with user data
        addUser({
          id: user.id,
          username: user.username,
          email: user.email,
        });

        setUser({
          id: user.id,
          username: user.username,
          email: user.email,
        });

        router.replace("/home");
      } catch (error) {
        setErrorMessage(
          error.response?.data?.error?.message || "Invalid credentials"
        );
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
          <Icon
            name={passwordVisible ? "eye" : "eye-off"}
            size={20}
            color="#a0aec0"
          />
        </TouchableOpacity>
      </View>
      {formErrors.password && (
        <Text style={styles.errorText}>{formErrors.password}</Text>
      )}

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      <TouchableOpacity
        style={styles.forgotPasswordContainer}
        onPress={handlePassword}
      >
        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <SocialLoginButtons />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    height: "100%",
    padding: 20,
    backgroundColor: "black", // Tailwind: h-full p-5 bg-black
  },
  logoContainer: {
    marginBottom: 160, // Tailwind: mb-40
  },
  titleContainer: {
    marginBottom: 8, // Tailwind: mb-2
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    paddingBottom: 8, // Tailwind: text-white font-pbold text-lg pb-1
  },
  newUserContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 32, // Tailwind: flex flex-row gap-2 mb-8
  },
  newUserText: {
    color: "white",
    fontSize: 16, // Tailwind: text-white font-plight text-base
  },
  newUserLink: {
    color: "#8FFA09", // Tailwind: font-plight text-primary
  },
  inputContainer: {
    marginBottom: 16, // Tailwind: mb-4
  },
  input: {
    backgroundColor: "black",
    borderColor: "#919EAB",
    borderWidth: 1,
    color: "white",
    padding: 12,
    borderRadius: 8,
    WebkitTextFillColor: "white",
    WebkitBoxShadow: "0 0 0 30px black inset",
  },
  errorText: {
    color: "red", // Tailwind: text-red-500
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black",
    borderColor: "#919EAB",
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16, // Tailwind: flex flex-row items-center mb-4 bg-black border border-[#919EAB] p-3 rounded-lg
  },
  passwordInput: {
    flex: 1,
    color: "white",
    WebkitTextFillColor: "white",
    WebkitBoxShadow: "0 0 0 30px black inset",
  },
  forgotPasswordContainer: {
    marginBottom: 16,
    flexDirection: "row-reverse", // Tailwind: mb-4 flex-row-reverse
  },
  forgotPasswordText: {
    color: "#a0aec0", // Tailwind: text-gray-400
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#8FFA09",
    padding: 12,
    borderRadius: 8, // Tailwind: w-full bg-primary p-3 rounded-lg
  },
  loginButtonText: {
    textAlign: "center",
    color: "black",
    fontWeight: "bold", // Tailwind: text-center font-pbold text-black
  },
});

export default SignIn;
