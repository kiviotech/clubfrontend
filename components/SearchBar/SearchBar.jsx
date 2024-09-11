import React from "react";
import { View, TextInput } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // You can use any icon library like react-native-vector-icons

const SearchBar = () => {
  return (
    <View className="flex-row items-center bg-gray-800 rounded-md mr-2 p-2">
      {/* Add Search Icon */}
      <FontAwesome name="search" size={30} color="gray"/>
      {/* Search Input */}
      <TextInput
        className="flex-1 ml-2 text-white "
        placeholder="Search"
        placeholderTextColor="gray"
      />
    </View>
  );
};

export default SearchBar;
