import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const FilterPanel = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const colors = ["purple", "black", "white", "green"]; // Color choices
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"]; // Sizes

  return (
    <View style={styles.container}>
      {/* Filters Header */}
      <Text style={styles.header}>Filters</Text>

      {/* Color Section */}
      <Text style={styles.subHeader}>Color</Text>
      <View style={styles.colorContainer}>
        {colors.map((color, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.colorCircle,
              { backgroundColor: color },
              selectedColor === color && styles.selectedColor,
            ]}
            onPress={() => setSelectedColor(color)}
          />
        ))}
      </View>

      {/* Size Section */}
      <Text style={styles.subHeader}>Size</Text>
      <View className="flex flex-row flex-wrap items-center justify-start mb-3">
        {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
          <TouchableOpacity
            key={size}
            onPress={() => setSelectedSize(size)}
            style={{
              backgroundColor: selectedSize === size ? "#8FFA09" : "#000",
            }}
            className="py-3 px-5 mx-1 my-1 rounded-lg"
          >
            <Text
              style={{
                color: selectedSize === size ? "#000000" : "#ffffff", // Black for selected, white for unselected
              }}
            >
              {size}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Apply Button */}
      <TouchableOpacity style={styles.applyButton}>
        <Text style={styles.applyButtonText}>Apply</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222", // Dark background color
    padding: 20,
    
  },
  header: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 20,
  },
  subHeader: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
  },
  colorContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: "#fff",
    borderWidth: 2,
  },
  selectedColor: {
    borderColor: "#00f", // Blue border for selected
  },
  sizeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  sizeButton: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    
  },
  selectedSize: {
    backgroundColor: "#32CD32", // Lime green background for selected size
  },
  sizeText: {
    color: "#fff",
    fontSize: 16,
  },
  applyButton: {
    backgroundColor: "#32CD32", // Lime green for Apply button
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FilterPanel;
