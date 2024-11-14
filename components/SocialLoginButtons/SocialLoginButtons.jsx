import React from "react";
import { View, TouchableOpacity,Image,StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import svgs from "../../constants/svgs";
import { styled } from "nativewind";

// import Ficon from "../../assets/icons/ficon.svg";



const SocialLoginButtons = () => {
  const Ficon = svgs.ficon;
  const Ticon = svgs.ticon;
  return (
    <View style={{ flexDirection: "row", justifyContent: "center", gap: 16, marginTop: 40 }}>
    <TouchableOpacity
      style={{
        backgroundColor: "#2d3748", // Tailwind 'bg-gray-800'
        padding: 16,
        borderRadius: 12,
      }}
    >
      <Image source={svgs.gicon} style={{ width: 20, height: 20 }} />
    </TouchableOpacity>
    <TouchableOpacity
      style={{
        backgroundColor: "#2d3748", // Tailwind 'bg-gray-800'
        padding: 16,
        borderRadius: 12,
      }}
    >
      <Ficon width={20} height={20} />
    </TouchableOpacity>
    <TouchableOpacity
      style={{
        backgroundColor: "#2d3748", // Tailwind 'bg-gray-800'
        padding: 16,
        borderRadius: 12,
      }}
    >
      <Ticon width={20} height={20} />
    </TouchableOpacity>
  </View>
);
};

export default SocialLoginButtons;
