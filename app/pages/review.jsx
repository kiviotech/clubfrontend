import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StepIndicator from "../../components/StepIndicator";
import { router } from 'expo-router';
import svgs from '../../constants/svgs';

const Review = () => {
  const handlePrevSection = () => {
    router.push("../pages/upload");
  };

  const handleEditRequestDesign = () => {
    router.push("../pages/request-design");
  };

  const handleEditMeasurements = () => {
    router.push("../pages/measurement");
  };

  const handleEditUploads = () => {
    router.push("../pages/upload");
  };

  const handleConfirm = () => {
    // Handle the final confirmation or submission logic here
    alert('Confirmed!');
  };

  return (
    <SafeAreaView className="flex-1 bg-black px-4">
      <TouchableOpacity onPress={handlePrevSection}>
        <svgs.back />
      </TouchableOpacity>
      <StepIndicator currentPosition={3} />

      <View className="mb-40 rounded-2xl bg-[#181818] px-5 py-8">
        <Text className="text-white text-2xl mb-6 font-psemibold">
          Review Your Details
        </Text>

        <View className="mb-4">
          <Text className="text-white text-xl mb-2">Design Details</Text>
          <TouchableOpacity
            className="bg-gray-800 p-3 rounded-lg"
            onPress={handleEditRequestDesign}
          >
            <Text className="text-primary">Edit Design Details</Text>
          </TouchableOpacity>
        </View>

        <View className="mb-4">
          <Text className="text-white text-xl mb-2">Measurements</Text>
          <TouchableOpacity
            className="bg-gray-800 p-3 rounded-lg"
            onPress={handleEditMeasurements}
          >
            <Text className="text-primary">Edit Measurements</Text>
          </TouchableOpacity>
        </View>

        <View className="mb-4">
          <Text className="text-white text-xl mb-2">Uploads</Text>
          <TouchableOpacity
            className="bg-gray-800 p-3 rounded-lg"
            onPress={handleEditUploads}
          >
            <Text className="text-primary">Edit Uploads</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="bg-primary p-3 rounded-lg"
          onPress={handleConfirm}
        >
          <Text className="text-black text-base font-psemibold text-center">
            Confirm and Submit
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Review;
