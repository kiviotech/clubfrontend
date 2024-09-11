import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const CategoryButtons = ({ categories }) => {
  return (
    <View className="flex-row space-x-2 my-4">
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          className="px-4 py-2 bg-gray-800 rounded-full"
        >
          <Text className="text-white">{category}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CategoryButtons;
