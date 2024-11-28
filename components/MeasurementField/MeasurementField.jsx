import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // using react-native-vector-icons

const measurements = {
  XS: "76-81 cm",
  S: "82-87 cm",
  M: "88-93 cm",
  L: "94-99 cm",
};

const MeasurementField = ({ label, value, onChange, error }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSizeSelect = (size) => {
    onChange(size); // Update the parent component with the selected size
    setIsModalVisible(false);
  };

  return (
    <View>
      <View style={[styles.container, error && styles.errorContainer]}>
        <Text style={styles.label}>{label}</Text>
        <TouchableOpacity
          style={styles.sizeSelector}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.selectedSize}>{value || "Select a size"}</Text>
          <Icon name="chevron-down" size={16} color="white" />
        </TouchableOpacity>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}

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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    marginBottom: 8,
    backgroundColor: "#919EAB29",
    borderRadius: 8,
  },
  errorContainer: {
    borderColor: "red",
    borderWidth: 1,
  },
  label: {
    color: "white",
    fontSize: 14,
  },
  sizeSelector: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectedSize: {
    color: "white",
    fontSize: 14,
    marginRight: 4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    maxWidth: "80%",
    width: "100%",
  },
  sizeOption: {
    padding: 8,
  },
  sizeText: {
    fontSize: 18,
    color: "black",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});

export default MeasurementField;
