import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
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
    <SafeAreaView className="flex-1 bg-black px-4">
      <TouchableOpacity onPress={handleGoHome}>
        <svgs.back />
      </TouchableOpacity>
      <StepIndicator currentPosition={0} />

      <View className="mb-16 rounded-2xl bg-[#181818] px-5 py-8 mt-3">
        <Text className="text-white text-2xl mb-6 font-psemibold">
          Design Details
        </Text>
        <TextInput
          className="mb-4 bg-[#919EAB29] text-white p-3 rounded-md"
          placeholder="Design Title"
          placeholderTextColor="#ccc"
        />

        <TextInput
          className="mb-4 bg-[#919EAB29] text-white p-3 rounded-md"
          placeholder="Description"
          placeholderTextColor="#ccc"
          multiline={true}
          numberOfLines={4}
        />
        <DropDownPicker
          className="mb-4"
          open={fabricOpen}
          value={fabricValue}
          items={fabricItems}
          setOpen={setFabricOpen}
          setValue={setFabricValue}
          setItems={setFabricItems}
          placeholder="Fabric Preferences"
          style={{ backgroundColor: "#919EAB29", color: "white" }}
          dropDownContainerStyle={{ backgroundColor: "white" }}
          placeholderStyle={{ color: "white" }}
        />

        <TextInput
          className="mb-4 bg-[#919EAB29] text-white p-3 rounded-md"
          placeholder="Colour Preferences"
          placeholderTextColor="#ccc"
        />

        <TouchableOpacity
          className="mb-4 bg-[#919EAB29] text-white p-3 rounded-md"
          onPress={showDatePicker}
        >
          <Text className="text-white">{deadline || "Select Deadline"}</Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          themeVariant="dark"
        />

        <TextInput
          className="mb-4 bg-[#919EAB29] text-white p-3 rounded-md"
          placeholder="Budget"
          placeholderTextColor="#ccc"
        />
      </View>

      {/* Buttons Section */}
      <View className="flex-row justify-between">
        <TouchableOpacity
          className="bg-white rounded-lg p-3 flex-1 mr-2"
          onPress={handlePrevSection}
        >
          <Text className="text-black text-base font-psemibold text-center">
            Go Back
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-primary rounded-lg p-3 flex-1"
          onPress={handleNextSection}
        >
          <Text className="text-black text-base font-psemibold text-center">
            Next Section
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RequestDesign;
