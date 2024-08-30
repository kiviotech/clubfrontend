import React from "react";
import { View, TouchableOpacity,Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import svgs from "../../constants/svgs";
import { styled } from "nativewind";

// import Ficon from "../../assets/icons/ficon.svg";



const SocialLoginButtons = () => {
  const Ficon = svgs.ficon;
  const Ticon = svgs.ticon;
  return (
    <View className="flex flex-row justify-center gap-4 mt-3">
      
      <TouchableOpacity className="bg-gray-800 p-4 rounded-xl">
        <Image source={svgs.gicon} className="w-5 h-5" />
      </TouchableOpacity>
      <TouchableOpacity className="bg-gray-800 p-4 rounded-xl">
        <Ficon width={20} height={20} />
      </TouchableOpacity>
      <TouchableOpacity className="bg-gray-800 p-4 rounded-xl">
        <Ticon width={20} height={20} />
      </TouchableOpacity>
    </View>
  );
};

export default SocialLoginButtons;
