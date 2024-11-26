import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/Ionicons";

const DesignDetailsForm = () => {
  const [deadline, setDeadline] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || deadline;
    setShowDatePicker(Platform.OS === "ios");
    setDeadline(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Design Details</Text>

      <TextInput
        style={styles.input}
        placeholder="Design Title"
        placeholderTextColor="#6B7280"
      />
      <TextInput
        style={[styles.input, { height: 100, textAlignVertical: "top" }]}
        placeholder="Description"
        placeholderTextColor="#6B7280"
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Fabric Preferences"
        placeholderTextColor="#6B7280"
      />
      <TextInput
        style={styles.input}
        placeholder="Color Preferences"
        placeholderTextColor="#6B7280"
      />
      <TouchableOpacity
        style={styles.datePicker}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={{ color: deadline ? "#FFFFFF" : "#6B7280" }}>
          {deadline ? deadline.toDateString() : "Deadline"}
        </Text>
        <Icon name="calendar-outline" size={20} color="#6B7280" />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={deadline}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Budget"
        placeholderTextColor="#6B7280"
        keyboardType="numeric"
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.goBackButton}>
          <Text style={styles.goBackButtonText}>Go Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Next Section</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#000000",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#1F2937",
    color: "#FFFFFF",
    borderColor: "#374151",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  datePicker: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1F2937",
    borderColor: "#374151",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  goBackButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 8,
  },
  goBackButtonText: {
    color: "#000000",
    fontWeight: "bold",
  },
  nextButton: {
    flex: 1,
    backgroundColor: "#8FFA09",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 8,
  },
  nextButtonText: {
    color: "#000000",
    fontWeight: "bold",
  },
});

export default DesignDetailsForm;
