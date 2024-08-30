import { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import logo from "../../assets/logo.png";
import SocialLoginButtons from "../../components/SocialLoginButtons/SocialLoginButtons";
import { router } from "expo-router";

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <SafeAreaView className="h-full p-5 bg-black">
      <View className="mb-36">
        <Image source={logo} />
      </View>
      <View className="mb-2">
        <Text className="text-white font-pbold text-lg pb-2">
          Get started absolutely free
        </Text>
      </View>
      <View className="flex flex-row gap-2 mb-8">
        <Text className="text-white font-plight text-base">
          Already have an account?
        </Text>
        <TouchableOpacity onPress={() => router.push("/sign-in")}>
          <Text className="font-plight text-primary">Login</Text>
        </TouchableOpacity>
      </View>

      <View className="flex flex-row mb-4 gap-4">
        <TextInput
          className="bg-black border border-[#919EAB] flex-1 text-white p-3 rounded-lg "
          placeholder="First name"
          placeholderTextColor="#a0aec0"
        />
        <TextInput
          className="bg-black text-white p-3 rounded-lg border border-[#919EAB] flex-1"
          placeholder="Last name"
          placeholderTextColor="#a0aec0"
        />
      </View>
      <View className="mb-4">
        <TextInput
          className="bg-black border border-[#919EAB] text-white p-3 rounded-lg"
          placeholder="Email address"
          placeholderTextColor="#a0aec0"
        />
      </View>

      <View className="flex flex-row items-center mb-6 bg-black border border-[#919EAB] p-3 rounded-lg">
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

      <TouchableOpacity className="w-full bg-primary p-3 rounded-lg">
        <Text className="text-center font-pbold text-black">
          Create Account
        </Text>
      </TouchableOpacity>
      <View className="flex flex-row flex-wrap justify-center mt-5 ">
        <Text className="text-white mx-2">I agree to</Text>

        <TouchableOpacity onPress={() => router.push("/terms-of-use")}>
          <Text className="font-plight text-primary">Terms of Use</Text>
        </TouchableOpacity>
        <Text className="text-white mx-2">and</Text>
        <TouchableOpacity onPress={() => router.push("/privacy-policy")}>
          <Text className="font-plight text-primary">Privacy Policy</Text>
        </TouchableOpacity>
      </View>
      {/* <Text className="text-gray-600 w-full text-xl mt-5">
        {`  ---------------------------  OR  --------------------------- `}
      </Text> */}
      <SocialLoginButtons />
    </SafeAreaView>
  );
};

export default SignUp;
