import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import WheelColorPicker from 'react-native-wheel-color-picker';
import useColorStore from '../../src/store/useColorStore';  // Import the Zustand store

const ColorPickerExample = ({ onColorSelect }) => {
  const { setSelectedColor } = useColorStore(); // Access the function to set color in Zustand store
  const [color, setColor] = useState('#000000');  // Default color is black
  const [showColorPicker, setShowColorPicker] = useState(false); // Track if color picker is visible
  const [selectedColorName, setSelectedColorName] = useState(null); // To display the selected color name

  // Sample set of initial 5-6 colors for display
  const initialColors = [
    '#FF5733', '#33FF57', '#5733FF', '#FF33A6', '#FFFF33', '#33C4FF'
  ];

  const handleColorChange = (selectedColor) => {
    setColor(selectedColor);  // Update state with selected color
  };

  const handleSubmit = () => {
    setSelectedColor(color); // Store the selected color in Zustand store
    setSelectedColorName(color); // Set color name (hex value)
    onColorSelect(color);  // Pass the selected color to the parent component
  };

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker); // Toggle color picker visibility
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Pick a Color {selectedColorName && <Text style={[styles.colorName, { color }]}>({selectedColorName})</Text>}
      </Text>

      {/* Container for color boxes and the More button */}
      <View style={styles.colorContainer}>
        {/* Display pre-selected colors in a horizontal row */}
        <ScrollView horizontal style={styles.colorList}>
          {initialColors.map((col) => (
            <TouchableOpacity
              key={col}
              style={[styles.colorBox, { backgroundColor: col }]}
              onPress={() => {
                setColor(col);
                setSelectedColorName(col);
                setSelectedColor(col); // Optionally update Zustand
              }}
            />
          ))}
        </ScrollView>

        {/* More button just below the colors */}
        <TouchableOpacity onPress={toggleColorPicker} style={styles.moreButton}>
          <Text style={styles.moreButtonText}>More</Text>
        </TouchableOpacity>
      </View>

      {/* Show ColorPicker if showColorPicker is true */}
      {showColorPicker && (
        <View style={styles.colorPickerContainer}>
          <WheelColorPicker
            color={color}
            onColorChange={handleColorChange}
            style={styles.colorWheel}
          />
          <View style={[styles.colorPreview, { backgroundColor: color }]} />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Confirm Color</Text>
          </TouchableOpacity>
        </View>
      )}

      {selectedColorName && (
        <Text style={styles.selectedColorText}>Color: {selectedColorName}</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 16,
    marginBottom: 15,
    color: '#FFF',
  },
  colorName: {
    fontWeight: 'bold',
  },
  colorContainer: {
    alignItems: 'center',  // Align color boxes and button center
  },
  colorList: {
    marginBottom: 5, // Minimal space between color boxes and More button
  },
  colorBox: {
    width: 50,
    height: 50,
    borderRadius: 50,
    margin: 5,
  },
  moreButton: {
    marginTop: 10, // Adjust the space between colors and More button
    paddingVertical: 8,
    paddingHorizontal: 25,
    backgroundColor: '#8FFA09',
    borderRadius: 5,
  },
  moreButtonText: {
    color: '#000',
    fontSize: 14,
  },
  colorPickerContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  colorWheel: {
    width: 150,
    height: 150,
  },
  colorPreview: {
    marginTop: 15,
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  colorText: {
    color: 'white',
    fontSize: 14,
  },
  button: {
    marginTop: 15,
    paddingVertical: 8,
    paddingHorizontal: 25,
    backgroundColor: '#8FFA09',
    borderRadius: 5,
  },
  buttonText: {
    color: '#000',
    fontSize: 14,
  },
  selectedColorText: {
    marginTop: 20,
    fontSize: 16,
    color: '#FFF',
  },
});

export default ColorPickerExample;
