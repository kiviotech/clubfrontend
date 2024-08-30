import { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import logo from "../../assets/logo.png";
import SocialLoginButtons from "../../components/SocialLoginButtons/SocialLoginButtons";
import { router } from "expo-router";

const SignIn = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = () => {
    router.push("/home");
  };

  return (
    <SafeAreaView className="h-full p-5 bg-black">
      <View className="mb-40">
        <Image source={logo} />
      </View>
      <View className="mb-2">
        <Text className="text-white font-pbold text-lg pb-1">
          Sign in to ClubUnplugged.
        </Text>
      </View>
      <View className="flex flex-row gap-2 mb-8">
        <Text className="text-white font-plight text-base">New User?</Text>
        <TouchableOpacity onPress={() => router.push("/sign-up")}>
          <Text className="font-plight text-primary">Create your account.</Text>
        </TouchableOpacity>
      </View>

      <View className="mb-4">
        <TextInput
          className="bg-black border border-[#919EAB] text-white p-3 rounded-lg"
          placeholder="Email"
          placeholderTextColor="#a0aec0"
        />
      </View>

      <View className="flex flex-row items-center mb-4 bg-black border border-[#919EAB] p-3 rounded-lg">
        <TextInput
          className="flex-1 text-white"
          placeholder="Password"
          placeholderTextColor="#a0aec0"
          secureTextEntry={!passwordVisible}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Icon
            name={passwordVisible ? "eye" : "eye-off"}
            size={20}
            color="#a0aec0"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity className="mb-4 flex-row-reverse">
        <Text className="text-gray-400">Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="w-full bg-primary p-3 rounded-lg"
        onPress={handleLogin}
      >
        <Text className="text-center font-pbold text-black">Login</Text>
      </TouchableOpacity>
      {/* <Text className="text-gray-600 w-full text-xl mt-5">
        {`  ---------------------------  OR  --------------------------- `}
      </Text> */}
      <SocialLoginButtons />
    </SafeAreaView>
  );
};

export default SignIn;
