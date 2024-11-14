// import { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Image,
//   TouchableOpacity,
//   Alert,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import Icon from "react-native-vector-icons/Ionicons";
// import logo from "../../assets/logo.png";
// import SocialLoginButtons from "../../components/SocialLoginButtons/SocialLoginButtons";
// import { router } from "expo-router";
// import { createUser } from "../../src/api/repositories/userRepository";

// const SignUp = () => {
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   // const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
//   // const [confirmPassword, setConfirmPassword] = useState("");

//   const [usernameError, setUsernameError] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   // const [confirmPasswordError, setConfirmPasswordError] = useState("");

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   // const toggleConfirmPasswordVisibility = () => {
//   //   setConfirmPasswordVisible(!confirmPasswordVisible);
//   // };
//   const validateUsername = () => {
//     if (username.trim() === "") {
//       setUsernameError("Username is required.");
//       return false;
//     }
//     setUsernameError("");
//     return true;
//   };

//   const validateEmail = () => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setEmailError("Invalid email format.");
//       return false;
//     }
//     setEmailError("");
//     return true;
//   };


//   const validatePassword = () => {
//     if (password.length < 8) {
//       setPasswordError("Password must be at least 8 characters.");
//       return false;
//     }
//     setPasswordError("");
//     return true;
//   };

//   // const validateConfirmPassword = () => {
//   //   if (password !== confirmPassword) {
//   //     setConfirmPasswordError("Passwords do not match.");
//   //     return false;
//   //   }
//   //   setConfirmPasswordError("");
//   //   return true;
//   // };


//   const handleSignup = async () => {
//     const isValidUsername = validateUsername();
//     const isValidEmail = validateEmail();
//     const isValidPassword = validatePassword();
//     // const isValidConfirmPassword = validateConfirmPassword();

//     if (!isValidUsername || !isValidEmail || !isValidPassword) {
//       return;
//     }

//     try {
//       const response = await createUser(username, email, password);
//       console.log("Signup successful:", response);

//       // Navigate to profile or home page after successful signup
//       router.push("/view-profile");
//     } catch (error) {
//       console.error("Signup error:", error);
//       Alert.alert("Signup Error", "There was an issue with signup. Please try again.");
//     }
//   };

//   return (
//     <SafeAreaView className="h-full p-5 bg-black">
//       <View className="mb-36">
//         <Image source={logo} />
//       </View>
//       <View className="mb-2">
//         <Text className="text-white font-pbold text-lg pb-2">
//           Get started absolutely free
//         </Text>
//       </View>
//       <View className="flex flex-row gap-2 mb-8">
//         <Text className="text-white font-plight text-base">
//           Already have an account?
//         </Text>
//         <TouchableOpacity onPress={() => router.push("/sign-in")}>
//           <Text className="font-plight text-primary">Login</Text>
//         </TouchableOpacity>
//       </View>

//       <View className="mb-4">
//         <TextInput
//           className="bg-black border border-[#919EAB] text-white p-3 rounded-lg"
//           placeholder="Username"
//           placeholderTextColor="#a0aec0"
//           value={username}
//             onChangeText={(text) => {
//               setUsername(text);
//               if (usernameError) validateUsername();
//             }}
//             onBlur={validateUsername}
//         />
//          {usernameError ? <Text className="text-red-500">{usernameError}</Text> : null}
//       </View>
//       <View className="mb-4">
//         <TextInput
//           className="bg-black border border-[#919EAB] text-white p-3 rounded-lg"
//           placeholder="Email address"
//           placeholderTextColor="#a0aec0"
//           value={email}
//             onChangeText={(text) => {
//               setEmail(text);
//               if (emailError) validateEmail();
//             }}
//             onBlur={validateEmail}
//         />
//          {emailError ? <Text className="text-red-500">{emailError}</Text> : null}
//       </View>

//       <View className="flex flex-row items-center mb-6 bg-black border border-[#919EAB] p-3 rounded-lg">
//         <TextInput
//           className="flex-1 text-white"
//           placeholder="Password"
//           placeholderTextColor="#a0aec0"
//           secureTextEntry={!passwordVisible}
//           value={password}
//             onChangeText={(text) => {
//               setPassword(text);
//               if (passwordError) validatePassword();
//             }}
//             onBlur={validatePassword}
//         />
//         <TouchableOpacity onPress={togglePasswordVisibility}>
//           <Icon
//             name={passwordVisible ? "eye" : "eye-off"}
//             size={20}
//             color="#a0aec0"
//           />
//         </TouchableOpacity>
//       </View>

//       {passwordError ? <Text className="text-red-500">{passwordError}</Text> : null}

//       <TouchableOpacity
//         className="w-full bg-primary p-3 rounded-lg"
//         onPress={handleSignup} // Attach the handleSignup function to the button
//       >
//         <Text className="text-center font-pbold text-black">
//           Create Account
//         </Text>
//       </TouchableOpacity>
//       <View className="flex flex-row flex-wrap justify-center mt-5 ">
//         <Text className="text-white mx-2">I agree to</Text>

//         <TouchableOpacity onPress={() => router.push("/terms-of-use")}>
//           <Text className="font-plight text-primary">Terms of Use</Text>
//         </TouchableOpacity>
//         <Text className="text-white mx-2">and</Text>
//         <TouchableOpacity onPress={() => router.push("/privacy-policy")}>
//           <Text className="font-plight text-primary">Privacy Policy</Text>
//         </TouchableOpacity>
//       </View>
//       <SocialLoginButtons />
//     </SafeAreaView>
//   );
// };

// export default SignUp;


// import { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Image,
//   TouchableOpacity,
//   Alert,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import Icon from "react-native-vector-icons/Ionicons";
// import logo from "../../assets/logo.png";
// import SocialLoginButtons from "../../components/SocialLoginButtons/SocialLoginButtons";
// import { router } from "expo-router";
// import { signup } from "../../src/utils/auth";

// const SignUp = () => {
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [usernameError, setUsernameError] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   const validateUsername = () => {
//     if (username.trim() === "") {
//       setUsernameError("Username is required.");
//       return false;
//     }
//     setUsernameError("");
//     return true;
//   };

//   const validateEmail = () => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setEmailError("Invalid email format.");
//       return false;
//     }
//     setEmailError("");
//     return true;
//   };

//   const validatePassword = () => {
//     if (password.length < 8) {
//       setPasswordError("Password must be at least 8 characters.");
//       return false;
//     }
//     setPasswordError("");
//     return true;
//   };

//   const handleSignup = async () => {
//     const isValidUsername = validateUsername();
//     const isValidEmail = validateEmail();
//     const isValidPassword = validatePassword();

//     if (!isValidUsername || !isValidEmail || !isValidPassword) {
//       return;
//     }

//     try {
//       const response = await signup(username, email, password);
//       console.log("Signup successful:", response);

//       // Navigate to the profile or home page after successful signup
//       router.push("/view-profile");
//     } catch (error) {
//       console.error("Signup error:", error);
//       Alert.alert("Signup Error", error || "There was an issue with signup. Please try again.");
//     }
//   };

//   return (
//     <SafeAreaView className="h-full p-5 bg-black">
//       <View className="mb-36">
//         <Image source={logo} />
//       </View>
//       <View className="mb-2">
//         <Text className="text-white font-pbold text-lg pb-2">
//           Get started absolutely free
//         </Text>
//       </View>
//       <View className="flex flex-row gap-2 mb-8">
//         <Text className="text-white font-plight text-base">Already have an account?</Text>
//         <TouchableOpacity onPress={() => router.push("/sign-in")}>
//           <Text className="font-plight text-primary">Login</Text>
//         </TouchableOpacity>
//       </View>

//       <View className="mb-4">
//         <TextInput
//           className="bg-black border border-[#919EAB] text-white p-3 rounded-lg"
//           placeholder="Username"
//           placeholderTextColor="#a0aec0"
//           value={username}
//           onChangeText={(text) => {
//             setUsername(text);
//             if (usernameError) validateUsername();
//           }}
//           onBlur={validateUsername}
//         />
//         {usernameError ? <Text className="text-red-500">{usernameError}</Text> : null}
//       </View>

//       <View className="mb-4">
//         <TextInput
//           className="bg-black border border-[#919EAB] text-white p-3 rounded-lg"
//           placeholder="Email address"
//           placeholderTextColor="#a0aec0"
//           value={email}
//           onChangeText={(text) => {
//             setEmail(text);
//             if (emailError) validateEmail();
//           }}
//           onBlur={validateEmail}
//         />
//         {emailError ? <Text className="text-red-500">{emailError}</Text> : null}
//       </View>

//       <View className="flex flex-row items-center mb-6 bg-black border border-[#919EAB] p-3 rounded-lg">
//         <TextInput
//           className="flex-1 text-white"
//           placeholder="Password"
//           placeholderTextColor="#a0aec0"
//           secureTextEntry={!passwordVisible}
//           value={password}
//           onChangeText={(text) => {
//             setPassword(text);
//             if (passwordError) validatePassword();
//           }}
//           onBlur={validatePassword}
//         />
//         <TouchableOpacity onPress={togglePasswordVisibility}>
//           <Icon name={passwordVisible ? "eye" : "eye-off"} size={20} color="#a0aec0" />
//         </TouchableOpacity>
//       </View>

//       {passwordError ? <Text className="text-red-500">{passwordError}</Text> : null}

//       <TouchableOpacity className="w-full bg-primary p-3 rounded-lg" onPress={handleSignup}>
//         <Text className="text-center font-pbold text-black">Create Account</Text>
//       </TouchableOpacity>

//       <View className="flex flex-row flex-wrap justify-center mt-5">
//         <Text className="text-white mx-2">I agree to</Text>
//         <TouchableOpacity onPress={() => router.push("/terms-of-use")}>
//           <Text className="font-plight text-primary">Terms of Use</Text>
//         </TouchableOpacity>
//         <Text className="text-white mx-2">and</Text>
//         <TouchableOpacity onPress={() => router.push("/privacy-policy")}>
//           <Text className="font-plight text-primary">Privacy Policy</Text>
//         </TouchableOpacity>
//       </View>

//       <SocialLoginButtons />
//     </SafeAreaView>
//   );
// };

// export default SignUp;

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

      // Navigate to the profile or home page after successful signup
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

