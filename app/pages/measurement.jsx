import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView,Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownPicker from "react-native-dropdown-picker";
import { TextInput } from "react-native";
import StepIndicator from "../../components/StepIndicator";
import { router } from "expo-router";
import MeasurementField from "../../components/MeasurementField";
import svgs from "../../constants/svgs";
import Svgs from "../../constants/svgs";
import useFormStore from "../../src/store/useFormStore";

const measurement = () => {
  const { measurements, setMeasurements } = useFormStore();
  const [validationErrors, setValidationErrors] = useState({});

  const handleNextSection = () => {
    const errors = validateFields();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      Alert.alert("Validation Error", "Please correct the highlighted fields.");
    } else {
      setValidationErrors({});
      router.push("/pages/upload");
    }
  };

  const handlePrevSection = () => {
    router.push("../pages/request-design");
  };

  const handleGoHome = () => {
    router.push("/(tabs)/home");
  };

  const handleMeasurementsChange = (key, value) => {
    // console.log(`${key}:`, value);
    setMeasurements({ [key]: value }); // Update global state
  };

  const validateFields = () => {
    const errors = {};
    if (!measurements.bust) errors.bust = "Bust measurement is required.";
    if (!measurements.waist) errors.waist = "Waist measurement is required.";
    if (!measurements.hip) errors.hip = "Hip measurement is required.";
    if (!measurements.height) errors.height = "Height measurement is required.";
    if (!measurements.weight) {
      errors.weight = "Weight is required.";
    } else if (!/^\d+$/.test(measurements.weight)) {
      errors.weight = "Weight must be a valid number.";
    }
    if (!measurements.specialInstructions) errors.specialInstructions = "Special instructions are required.";
    return errors;
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TouchableOpacity onPress={handleGoHome}>
          <Text>Back</Text>
        </TouchableOpacity>
        <StepIndicator currentPosition={1} />

        <View style={styles.measurementContainer}>
          <Text style={styles.title}>Measurements</Text>

          {/* Pass value and onChange to MeasurementField */}
          <MeasurementField
            label="Bust"
            value={measurements.bust} // Get value from global store
            onChange={(value) => handleMeasurementsChange("bust", value)} // Pass the selected size to global store
            error={validationErrors.bust}
          />
          <MeasurementField
            label="Waist"
            value={measurements.waist}
            onChange={(value) => handleMeasurementsChange("waist", value)}
            error={validationErrors.waist}
          />
          <MeasurementField
            label="Hip"
            value={measurements.hip}
            onChange={(value) => handleMeasurementsChange("hip", value)}
            error={validationErrors.hip}
          />
          <MeasurementField
            label="Height"
            value={measurements.height}
            onChange={(value) => handleMeasurementsChange("height", value)}
            error={validationErrors.height}
          />



          <TextInput
            style={styles.input}
            placeholder="Weight"
            placeholderTextColor="#ccc"
            value={measurements.weight}
            onChangeText={(value) => handleMeasurementsChange("weight", value)}
          />
           {validationErrors.weight && <Text style={styles.errorText}>{validationErrors.weight}</Text>}


          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Special Instruction"
            placeholderTextColor="#ccc"
            multiline={true}
            numberOfLines={6}
            value={measurements.specialInstruction}
            onChangeText={(value) => handleMeasurementsChange("specialInstructions", value)}
          />
           {validationErrors.specialInstructions && (
            <Text style={styles.errorText}>{validationErrors.specialInstructions}</Text>
          )}
        </View>

        {/* Buttons Section */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.goBackButton}
            onPress={handlePrevSection}
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.nextSectionButton}
            onPress={handleNextSection}
          >
            <Text style={styles.buttonText}>Next Section</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: 14, // Reduced padding
  },
  measurementContainer: {
    marginBottom: 32, // Reduced spacing
    borderRadius: 12, // Slightly smaller radius
    // backgroundColor: "#181818",
    paddingVertical: 16, // Reduced padding
    paddingHorizontal: 14, // Reduced padding
    marginTop: 8,
  },
  title: {
    color: "white",
    fontSize: 18, // Smaller font size
    marginBottom: 16,
    fontFamily: "Poppins-SemiBold",
  },
  input: {
    marginBottom: 12, // Reduced spacing
    backgroundColor: "#919EAB29",
    color: "white",
    paddingVertical: 8, // Reduced padding
    paddingHorizontal: 10,
    borderRadius: 6, // Slightly smaller radius
    fontSize: 14, // Smaller font size
    marginTop:10,
  },
  multilineInput: {
    height: 100, // Reduced height
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8, // Reduced spacing
  },
  goBackButton: {
    backgroundColor: "white",
    borderRadius: 6, // Slightly smaller radius
    paddingVertical: 8, // Reduced padding
    paddingHorizontal: 10,
    flex: 1,
    marginRight: 8,
  },
  nextSectionButton: {
    backgroundColor: "#8FFA09",
    borderRadius: 6, // Slightly smaller radius
    paddingVertical: 8, // Reduced padding
    paddingHorizontal: 10,
    flex: 1,
  },
  buttonText: {
    color: "black",
    fontSize: 14, // Smaller font size
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    fontSize: 10, // Smaller error text
    marginBottom: 6, // Reduced spacing
  },
  errorInput: {
    borderColor: "red",
    borderWidth: 1,
  },
});


export default measurement;
