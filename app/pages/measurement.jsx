import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownPicker from "react-native-dropdown-picker";
import { TextInput } from "react-native";
import StepIndicator from "../../components/StepIndicator";
import { router } from "expo-router";
import MeasurementField from "../../components/MeasurementField";
import svgs from "../../constants/svgs";
import Svgs from "../../constants/svgs";

const measurement = () => {

    const handleNextSection = () => {
       router.push("../pages/upload");
    };
    const handlePrevSection = () => {
      router.push("../pages/request-design");
    };
    const handleGoHome = () => {
      router.push("/(tabs)/home");
    };

  return (
    <SafeAreaView className="flex-1 bg-black px-4">
      <TouchableOpacity onPress={handleGoHome}>
        <Svgs.back />
      </TouchableOpacity>
      <StepIndicator currentPosition={1} />

      <View className="mb-16 rounded-2xl bg-[#181818] px-5 py-8 mt-2">
        <Text className="text-white text-2xl mb-6 font-psemibold">
          Measurements
        </Text>

        <MeasurementField label="Bust" />
        <MeasurementField label="Waist" />
        <MeasurementField label="Hip" />
        <MeasurementField label="Height" />

        <TextInput
          className="mb-4 bg-[#919EAB29] text-white p-3 rounded-md"
          placeholder="Weight"
          placeholderTextColor="#ccc"
        />
        <TextInput
          className="mb-4 bg-[#919EAB29] text-white p-3 rounded-md"
          placeholder="Special Instruction"
          placeholderTextColor="#ccc"
          multiline={true}
          numberOfLines={6}
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

export default measurement;
