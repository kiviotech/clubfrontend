import React from "react";
import { View, TextInput, StyleSheet, Dimensions, Platform } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

// Apply global styles for web to remove focus outlines
if (Platform.OS === "web") {
  const globalStyles = `
    input:focus, textarea:focus {
      outline: none !important; /* Removes browser focus outline */
      box-shadow: none !important; /* Removes browser focus shadow */
    }
  `;
  const style = document.createElement("style");
  style.innerHTML = globalStyles;
  document.head.appendChild(style);
}

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <View style={styles.container}>
      <FontAwesome name="search" size={20} color="#6B7280" />
      <TextInput
        style={styles.input}
        placeholder="Search"
        placeholderTextColor="#9CA3AF"
        onChangeText={(text) => setSearchTerm(text)}
        value={searchTerm}
        underlineColorAndroid="transparent"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#919eab29",
    borderRadius: 20, // Rounded corners for the container
    padding: 10,
    marginVertical: 10,
    width: Dimensions.get("window").width - 20,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: "#F9FAFB", // Input text color
    fontSize: 16,
    outlineStyle: "none", // Remove browser's focus outline
    outlineWidth: 0,      // Ensure outline is fully removed
    borderWidth: 0,       // Remove any default border
    backgroundColor: "transparent", // Transparent background for input
    boxShadow: "none",    // Remove any shadow on focus
  },
});

export default SearchBar;
