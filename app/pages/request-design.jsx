import React, { useState } from "react";
import { View, Text, TouchableOpacity,StyleSheet ,ScrollView} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownPicker from "react-native-dropdown-picker";
import { TextInput } from "react-native";
import StepIndicator from "../../components/StepIndicator"
import { router } from "expo-router";
import svgs from "../../constants/svgs";

const RequestDesign = () => {
  const [fabricOpen, setFabricOpen] = useState(false);
  const [fabricValue, setFabricValue] = useState(null);
  const [fabricItems, setFabricItems] = useState([
    { label: "Cotton", value: "cotton" },
    { label: "Polyester", value: "polyester" },
    { label: "Silk", value: "silk" },
  ]);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [deadline, setDeadline] = useState("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDeadline(date.toLocaleDateString());
    hideDatePicker();
  };

  
  const handlePrevSection = () => {
    router.push("/(tabs)/home");
  };

  const handleNextSection = () => {
    router.push("../pages/measurement");
  };

  const handleGoHome = () => {
    router.push("/(tabs)/home");
  }

  return (


<SafeAreaView style={styles.container}>
      <ScrollView>
        <TouchableOpacity onPress={handleGoHome}>
          <svgs.back />
        </TouchableOpacity>
        <StepIndicator currentPosition={0} />

        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Design Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Design Title"
            placeholderTextColor="#ccc"
          />

          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Description"
            placeholderTextColor="#ccc"
            multiline={true}
            numberOfLines={4}
          />
          <DropDownPicker
            open={fabricOpen}
            value={fabricValue}
            items={fabricItems}
            setOpen={setFabricOpen}
            setValue={setFabricValue}
            setItems={setFabricItems}
            placeholder="Fabric Preferences"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            placeholderStyle={styles.placeholderStyle}
          />

          <TextInput
            style={styles.input}
            placeholder="Colour Preferences"
            placeholderTextColor="#ccc"
          />

          <TouchableOpacity style={styles.deadlineButton} onPress={showDatePicker}>
            <Text style={styles.deadlineText}>{deadline || "Select Deadline"}</Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            themeVariant="dark"
          />

          <TextInput
            style={styles.input}
            placeholder="Budget"
            placeholderTextColor="#ccc"
          />
        </View>

        {/* Buttons Section */}
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
    backgroundColor: 'black',
    paddingHorizontal: 16, // Equivalent to px-4
  },
  detailsContainer: {
    marginBottom: 64, // Equivalent to mb-16
    borderRadius: 16, // Equivalent to rounded-2xl
    backgroundColor: '#181818',
    paddingVertical: 32, // Equivalent to py-8
    paddingHorizontal: 20, // Equivalent to px-5
    marginTop: 12, // Equivalent to mt-3
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
    height: 96, // Adjust height for multiline input
  },
  dropdown: {
    marginBottom: 16, // Equivalent to mb-4
    backgroundColor: '#919EAB29',
  },
  dropdownContainer: {
    backgroundColor: 'white',
  },
  placeholderStyle: {
    color: 'white',
  },
  deadlineButton: {
    marginBottom: 16, // Equivalent to mb-4
    backgroundColor: '#919EAB29',
    padding: 12, // Equivalent to p-3
    borderRadius: 8, // Equivalent to rounded-md
  },
  deadlineText: {
    color: 'white',
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
});

export default RequestDesign;
