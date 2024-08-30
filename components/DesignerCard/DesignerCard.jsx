import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const DesignerCard = ({ designer }) => {
  const { image, name, rating } = designer;
  const router = useRouter();

  const handlePress = () => {
    // Navigate to the view-profile page with designer data as params
    router.push({
      pathname: "/pages/view-profile",
      params: designer, // Passing the entire designer object
    });
  };

  return (
    <View className="w-40 mr-4 bg-[#181818] rounded-2xl items-center">
      <Image source={{ uri: image }} className="w-full h-36 rounded-2xl mb-4" />
      <View className="flex flex-row justify-between w-full pl-2 pr-2 items-center">
        <Text className="text-white text-base font-psemibold">{name}</Text>
        <Text className="text-primary font-pregular text-base">{rating}</Text>
      </View>
      <TouchableOpacity
        className="bg-[#243647] rounded-full w-36 p-3 m-4 items-center"
        onPress={handlePress}
      >
        <Text className="text-white font-pmedium text-base">View Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DesignerCard;
