// MeasurementField.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // using react-native-vector-icons

const measurements = {
  XS: "76-81 cm",
  S: "82-87 cm",
  M: "88-93 cm",
  L: "94-99 cm",
};

const MeasurementField = ({ label, value, onChange }) => {
  const [selectedSize, setSelectedSize] = useState(value); // Set initial value from parent
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSizeSelect = (size) => {
    setSelectedSize(size); // Update local state
    onChange(size); // Update the global state through the onChange callback
    setIsModalVisible(false); // Close the modal
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.sizeSelector}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.selectedSize}>{selectedSize}</Text>
        <Icon name="chevron-down" size={16} color="white" />
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <FlatList
              data={Object.keys(measurements)}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.sizeOption}
                  onPress={() => handleSizeSelect(item)}
                >
                  <Text style={styles.sizeText}>
                    {`${item} - ${measurements[item]}`}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16, // Equivalent to p-4
    marginBottom: 8, // Equivalent to mb-2
    backgroundColor: '#919EAB29',
    borderRadius: 8, // Equivalent to rounded-lg
  },
  label: {
    color: 'white',
    fontSize: 14, // Equivalent to text-sm
  },
  sizeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedSize: {
    color: 'white',
    fontSize: 14, // Equivalent to text-sm
    marginRight: 4, // Equivalent to mr-1
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    opacity: 0.5,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 16, // Equivalent to p-4
    borderRadius: 8, // Equivalent to rounded-lg
    maxWidth: '80%', // Equivalent to max-w-xs
    width: '100%',
  },
  sizeOption: {
    padding: 8, // Equivalent to p-2
  },
  sizeText: {
    fontSize: 18, // Equivalent to text-lg
    color: 'black',
  },
});

export default MeasurementField;
