import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownPicker from "react-native-dropdown-picker";
import StepIndicator from "../../components/StepIndicator";
import { router } from "expo-router";
import svgs from "../../constants/svgs";
import CrossPlatformDatePicker from "./CrossPlatformDatePicker";
import useFormStore from "../../src/store/useFormStore";
import { Ionicons } from "@expo/vector-icons";

const RequestDesign = () => {
  const [fabricOpen, setFabricOpen] = useState(false);
  const [fabricValue, setFabricValue] = useState(null);
  const [fabricItems, setFabricItems] = useState([
    { label: "Cotton", value: "Cotton" },
    { label: "Cotton Blends", value: "Cotton Blends" },
    { label: "Polyester", value: "Polyester" },
    { label: "Silk", value: "silk" },
    { label: "Spandex(Elastane)", value: "Spandex(Elastane)" },
    { label: "Bamboo Fiber", value: "Bamboo Fiber" },
    { label: "Lycra", value: "Lycra" },
    { label: "Organic Cotton", value: "Organic Cotton" },
    { label: "Terrycloth", value: "Terrycloth" },
    { label: "Wool Blends", value: "Wool Blends" },
    { label: "Denim(Jean)", value: "Denim(Jean)" },
    { label: "Leather", value: "Leather" },
    { label: "Canvas", value: "Canvas" },
    { label: "Suede", value: "Suede" },
    { label: "Velvet", value: "Velvet" },
    { label: "Others", value: "Others" },
  ]);
  const [startDate, setStartDate] = useState(null);
  const { designDetails, setDesignDetails } = useFormStore();
  const [validationErrors, setValidationErrors] = useState({});

  const handlePrevSection = () => {
    router.push("/(tabs)/home");
  };

  // const handleNextSection = () => {
  //   router.push("../pages/measurement");
  // };

  const handleGoHome = () => {
    router.push("/(tabs)/home");
  };

  const handleDesignDetailsChange = (key, value) => {
    // console.log(`${key}:`, value);
    setDesignDetails({ [key]: value });
  };

  const handleNextSection = () => {
    const errors = validateFields();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      Alert.alert("Validation Error", "Please correct the highlighted fields.");
    } else {
      setValidationErrors({});
      router.push("../pages/measurement");
    }
  };

  const validateFields = () => {
    const errors = {};
    if (!designDetails.title) {
      errors.title = "Design Title is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(designDetails.title)) {
      errors.title = "Design Title can only contain letters and spaces.";
    }
    if (!designDetails.description) errors.description = "Description is required.";
    if (!fabricValue) errors.fabric = "Fabric selection is required.";
    if (!designDetails.color) errors.color = "Color preference is required.";
    if (!startDate) errors.deadline = "Deadline is required.";
    else if (startDate < new Date()) errors.deadline = "Deadline must be a future date.";
    if (!designDetails.budget) {
      errors.budget = "Budget is required.";
    } else if (!/^\d+$/.test(designDetails.budget)) {
      errors.budget = "Budget must be a valid number.";
    }
    return errors;
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TouchableOpacity onPress={handleGoHome}>
          {/* Ensure svgs.back renders a valid component */}
          {svgs.back ? <svgs.back /> : <Text style={styles.backText}>Back</Text>}
        </TouchableOpacity>
        <StepIndicator currentPosition={0} />

        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Design Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Design Title"
            placeholderTextColor="#ccc"
            value={designDetails.title}
            onChangeText={(text) => handleDesignDetailsChange("title", text)}
          />
          {validationErrors.title && <Text style={styles.errorText}>{validationErrors.title}</Text>}

          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Description"
            placeholderTextColor="#ccc"
            multiline={true}
            value={designDetails.description}
            onChangeText={(text) => handleDesignDetailsChange("description", text)}
          />
          {validationErrors.description && <Text style={styles.errorText}>{validationErrors.description}</Text>}

          <Text style={styles.label}>Select Fabric</Text>
          <DropDownPicker
            open={fabricOpen}
            value={fabricValue}
            items={fabricItems}
            setOpen={setFabricOpen}
            setValue={setFabricValue}
            setItems={setFabricItems}
            placeholder="Select Fabric"
            placeholderStyle={styles.placeholderStyle}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            textStyle={styles.dropdownText}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            listItemContainerStyle={{
              backgroundColor: '#181818', // Set the background for items to black
            }}

            ArrowDownIconComponent={({ style }) => (
              <Ionicons name="chevron-down" size={20} color="white" style={style} />
            )}
            ArrowUpIconComponent={({ style }) => (
              <Ionicons name="chevron-up" size={20} color="white" style={style} />
            )}
            onChangeValue={(value) => handleDesignDetailsChange("fabric", value)}
          />


          {validationErrors.fabric && <Text style={styles.errorText}>{validationErrors.fabric}</Text>}


          <TextInput
            style={styles.input}
            placeholder="Colour Preferences"
            placeholderTextColor="#ccc"
            value={designDetails.color}
            onChangeText={(text) => handleDesignDetailsChange("color", text)}
          />
          {validationErrors.color && <Text style={styles.errorText}>{validationErrors.color}</Text>}

          <CrossPlatformDatePicker
            label="Select Deadline"
            value={startDate}
            onChange={(date) => {
              setStartDate(date);
              handleDesignDetailsChange("deadline", date);
            }}
            icon={ <Ionicons
              name="calendar"
              size={20}
              color="white"
              style={{ position: "absolute", right: 10, top: 10 }}
            />} // Add this prop if supported
          />

          {validationErrors.deadline && <Text style={styles.errorText}>{validationErrors.deadline}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Budget"
            placeholderTextColor="#ccc"
            value={designDetails.budget}
            onChangeText={(text) => handleDesignDetailsChange("budget", text)}
          />
          {validationErrors.budget && <Text style={styles.errorText}>{validationErrors.budget}</Text>}

        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.goBackButton} onPress={handlePrevSection}>
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextSectionButton} onPress={handleNextSection}>
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
    paddingHorizontal: 14,
    paddingBottom: 20,
  },
  detailsContainer: {
    marginBottom: 32, // Reduced spacing
    borderRadius: 16,
    // backgroundColor: "#181818",
    paddingVertical: 12, // Reduced padding
    paddingHorizontal: 16, // Reduced padding
    marginTop: 12,
  },
  title: {
    color: "white",
    fontSize: 20, // Reduced font size
    marginBottom: 16, // Reduced spacing
    fontFamily: "Poppins-SemiBold",
  },
  input: {
    marginBottom: 12, // Reduced spacing
    backgroundColor: "#919EAB29",
    color: "white",
    padding: 8, // Reduced padding
    borderRadius: 6, // Slightly smaller border radius
    fontSize: 14, // Reduced font size
  },
  multilineInput: {
    height: 72, // Reduced height
  },
  dropdown: {
    marginBottom: 12, // Reduced spacing
    backgroundColor: "#919EAB29",
    borderColor: "transparent",
    height: 40, // Smaller height
  },
  dropdownContainer: {
    backgroundColor: "#fff",
    borderColor: "#919EAB29",
  },
  dropdownText: {
    color: "white", // Dropdown text color
    fontSize: 14, // Reduced font size
    fontFamily: "Poppins-Regular",
  },
  placeholderStyle: {
    color: "white", // Placeholder text color
    fontSize: 14, // Reduced font size
    fontFamily: "Poppins-Regular",
  },
  label: {
    color: "#ccc",
    fontSize: 14, // Reduced font size
    marginBottom: 8, // Reduced spacing
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  goBackButton: {
    backgroundColor: "white",
    borderRadius: 6, // Slightly smaller border radius
    padding: 10, // Reduced padding
    flex: 1,
    marginRight: 8,
  },
  nextSectionButton: {
    backgroundColor: "#8FFA09",
    borderRadius: 6, // Slightly smaller border radius
    padding: 10, // Reduced padding
    flex: 1,
  },
  buttonText: {
    color: "black",
    fontSize: 14, // Reduced font size
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
  },
  backText: {
    color: "white",
    fontSize: 14, // Reduced font size
    fontFamily: "Poppins-SemiBold",
  },
  errorText: {
    color: "red",
    fontSize: 10, // Smaller error text
    marginBottom: 8,
  },
});


export default RequestDesign;
