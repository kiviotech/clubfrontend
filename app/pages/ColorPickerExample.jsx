import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import WheelColorPicker from 'react-native-wheel-color-picker';
import useColorStore from '../../src/store/useColorStore'; // Import Zustand store

const ColorPickerExample = ({ onColorSelect }) => {
  const { setSelectedColor } = useColorStore();
  const [color, setColor] = useState('#000000');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColorName, setSelectedColorName] = useState(null);

  const initialColors = ['#FF5733', '#33FF57', '#5733FF', '#FF33A6', '#FFFF33', '#33C4FF'];

  const handleColorChange = (selectedColor) => {
    setColor(selectedColor);
  };

  const handleSubmit = () => {
    // console.log('Submitting color:', color);
    
    // Save the selected color into Zustand store
    setSelectedColor(color, selectedColorName || color);

    // Pass the selected color to the parent
    onColorSelect(color);

    // Close the color picker
    setShowColorPicker(false);
  };

  const toggleColorPicker = () => {
    setShowColorPicker((prev) => !prev);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Pick a Color {selectedColorName && <Text style={[styles.colorName, { color }]}>({selectedColorName})</Text>}
      </Text>

      <View style={styles.colorContainer}>
        <ScrollView horizontal style={styles.colorList}>
          {initialColors.map((col) => (
            <TouchableOpacity
              key={col}
              style={[styles.colorBox, { backgroundColor: col }]}
              onPress={() => {
                setColor(col);
      setSelectedColorName(col);
      setSelectedColor(col, col);
              }}
            />
          ))}
        </ScrollView>

        <TouchableOpacity onPress={toggleColorPicker} style={styles.moreButton}>
          <Text style={styles.moreButtonText}>More</Text>
        </TouchableOpacity>
      </View>

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
    </ScrollView>
  );
};

// Style the component
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
    alignItems: 'center',
  },
  colorList: {
    marginBottom: 5,
  },
  colorBox: {
    width: 50,
    height: 50,
    borderRadius: 50,
    margin: 5,
  },
  moreButton: {
    marginTop: 10,
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

