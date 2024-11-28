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
    console.log(`${key}:`, value);
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
    backgroundColor: 'black',
    paddingHorizontal: 16, // Equivalent to px-4
  },
  measurementContainer: {
    marginBottom: 64, // Equivalent to mb-16
    borderRadius: 16, // Equivalent to rounded-2xl
    backgroundColor: '#181818',
    paddingVertical: 32, // Equivalent to py-8
    paddingHorizontal: 20, // Equivalent to px-5
    marginTop: 8, // Equivalent to mt-2
  },
  title: {
    color: 'white',
    fontSize: 24, // Equivalent to text-2xl
    marginBottom: 24, // Equivalent to mb-6
    fontFamily: 'Poppins-SemiBold', // Replace with your font
  },
  input: {
    marginBottom: 16, // Equivalent to mb-4
    backgroundColor: '#919EAB29',
    color: 'white',
    padding: 12, // Equivalent to p-3
    borderRadius: 8, // Equivalent to rounded-md
  },
  multilineInput: {
    height: 144, // Adjust height for multiline input
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  goBackButton: {
    backgroundColor: 'white',
    borderRadius: 8, // Equivalent to rounded-lg
    padding: 12, // Equivalent to p-3
    flex: 1,
    marginRight: 8, // Equivalent to mr-2
  },
  nextSectionButton: {
    backgroundColor: '#8FFA09', // Replace with your primary color
    borderRadius: 8, // Equivalent to rounded-lg
    padding: 12, // Equivalent to p-3
    flex: 1,
  },
  buttonText: {
    color: 'black',
    fontSize: 16, // Equivalent to text-base
    fontFamily: 'Poppins-SemiBold', // Replace with your font
    textAlign: 'center',
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 8,
  },
  errorInput: {
    borderColor: "red",
    borderWidth: 1,
  },
});

export default measurement;
