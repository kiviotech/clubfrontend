import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // You can use any icon library like react-native-vector-icons

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <View style={styles.container}>
      {/* Add Search Icon */}
      <FontAwesome name="search" size={30} color="gray" />
      {/* Search Input */}
      <TextInput
        style={styles.input}
        placeholder="Search"
        placeholderTextColor="gray"
        onChangeText={(text) => setSearchTerm(text)}
        
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",        // Equivalent to flex-row
    alignItems: "center",        // Equivalent to items-center
    backgroundColor: "#4B5563",  // Equivalent to bg-gray-800
    borderRadius: 6,             // Equivalent to rounded-md (md = 6px)
    marginRight: 20, 
    marginLeft: -15,              // Equivalent to mr-2
    padding: 8,                  // Equivalent to p-2
  },
  input: {
    flex: 1,                     // Equivalent to flex-1
    marginLeft: 8,               // Equivalent to ml-2
    color: "white",              // Equivalent to text-white
    fontSize: 16,                // Optionally added for a more refined look
  },
});

export default SearchBar;
