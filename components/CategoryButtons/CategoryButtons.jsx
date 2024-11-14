import React from "react";
import { View, Text, TouchableOpacity,StyleSheet } from "react-native";

const CategoryButtons = ({ categories }) => {
  return (
    <View style={styles.container}>
    {categories.map((category, index) => (
      <TouchableOpacity key={index} style={styles.button}>
        <Text style={styles.text}>{category}</Text>
      </TouchableOpacity>
    ))}
  </View>
);
};

const styles = StyleSheet.create({
container: {
  flexDirection: "row",     // Equivalent to flex-row
  marginVertical: 16,       // Equivalent to my-4 (my = marginVertical: 16)
  justifyContent: "space-evenly", // This ensures there is space between the buttons
},
button: {
  paddingVertical: 8,       // Equivalent to py-2
  paddingHorizontal: 16,    // Equivalent to px-4
  backgroundColor: "#4B5563", // Equivalent to bg-gray-800
  borderRadius: 9999,       // Equivalent to rounded-full (100% round)
  marginRight: 8,           // Adding space between the buttons
},
text: {
  color: "white",           // Equivalent to text-white
},
});

export default CategoryButtons;
