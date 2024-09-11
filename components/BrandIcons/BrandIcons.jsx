import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Example, you may need different sets for different brand icons

const BrandIcons = ({ brands, onIconPress }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View className="flex-row space-x-4 my-4">
        {brands.map((brand, index) => (
          <TouchableOpacity key={index} onPress={() => onIconPress(brand.name)}>
            <View className="items-center">
              <Icon name={brand.icon} size={40} color="white" />
              <Text className="text-white font-pmedium mt-1">{brand.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default BrandIcons;
