import React, { useState } from "react";
import { View, Text, TouchableOpacity, Platform, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";

const CrossPlatformDatePicker = ({ label, value, onChange }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  const currentDate = new Date();
  const todayString = currentDate.toISOString().split("T")[0]; // To get current date in YYYY-MM-DD format

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {Platform.OS === "web" ? (
        <input
          type="date"
          value={value ? value.toISOString().split("T")[0] : ""} // Ensure valid date format for web
          onChange={(e) => onChange(new Date(e.target.value))}
          min={todayString} // Disable past dates
          style={styles.webDatePicker}
        />
      ) : (
        <>
          <TouchableOpacity
            onPress={() => setShowPicker(true)}
            style={styles.dateButton}
          >
            <MaterialIcons name="calendar-today" size={24} color="#fff" />
            <Text style={styles.dateText}>
              {value ? value.toLocaleDateString() : "Select Date"}
            </Text>
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              value={value || new Date()} // Ensure there's a valid value for the picker
              mode="date"
              display="calendar" // Calendar display for Android/iOS
              onChange={handleDateChange}
              minimumDate={currentDate} // Ensure no past dates can be selected
              maximumDate={new Date(2100, 11, 31)}
              themeVariant="dark" // Dark theme to get a grayish calendar
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
    marginBottom: 10,
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: "#919EAB29", // Lighter background
    borderRadius: 8,
  },
  dateText: {
    fontSize: 16,
    color: "#fff", // White color text
    marginLeft: 10,
    fontWeight: "500",
  },
  webDatePicker: {
    padding: 12,
    fontSize: 16,
    borderRadius: 8,
    backgroundColor: "#919EAB29", // Light gray background
    color: "#fff", // White text color for web
    border: "none", // Remove border for web input
    outline: "none",
  },
});

export default CrossPlatformDatePicker;
