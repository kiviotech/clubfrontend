import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import StepIndicator from "../../components/StepIndicator";
import { router } from "expo-router";
import svgs from "../../constants/svgs";

const Measurement = () => {
  const [images, setImages] = useState([]);

  const pickImage = async () => {
    // Request permission to access the media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    // Launch the image library for selection
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setImages([...images, ...result.assets]);
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    };
    
     const handleNextSection = () => {
       router.push("../pages/review");
     };
     const handlePrevSection = () => {
       router.push("../pages/measurement");
    };
     const handleGoHome = () => {
       router.push("/(tabs)/home");
     };

  return (
    <SafeAreaView className="flex-1 bg-black px-4">
      <TouchableOpacity onPress={handleGoHome}>
        <svgs.back />
      </TouchableOpacity>
      <StepIndicator currentPosition={2} />

      <View className="mb-4 rounded-2xl bg-[#181818] px-5 py-8">
        <Text className="text-white text-2xl mb-6 font-psemibold">Uploads</Text>
        <View className="items-center justify-center p-10 border border-dashed border-gray-500 rounded-lg">
          <TouchableOpacity onPress={pickImage}>
            <View className="h-32 w-32 bg-[#1E1E1E] rounded-lg justify-center items-center">
              {/* <svgs.upload /> */}
              <Text className="text-white">Select files</Text>
            </View>
          </TouchableOpacity>
        </View>
        {images.length > 0 && (
          <FlatList
            data={images}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View className="relative mr-2">
                <Image
                  source={{ uri: item.uri }}
                  style={{ width: 60, height: 60, borderRadius: 10 }}
                />
                <TouchableOpacity
                  onPress={() => removeImage(index)}
                  className="absolute top-0 right-0 bg-black rounded-full p-1"
                >
                  <Text className="text-white">X</Text>
                </TouchableOpacity>
              </View>
            )}
            contentContainerStyle={{ marginTop: 0 }}
          />
        )}
      </View>
      <View className="flex-row justify-end mb-60">
        <TouchableOpacity
          //   onPress={onRemoveAll}
          className="bg-gray-800 rounded-lg px-4 py-2 mr-2"
        >
          <Text className="text-gray-400 text-sm">Remove All</Text>
        </TouchableOpacity>

        <TouchableOpacity
          //   onPress={onUpload}
          className="bg-gray-800 rounded-lg px-4 py-2 flex-row items-center"
        >
          <Text className="text-white text-sm mr-2">Upload</Text>
          {/* Add an icon for the upload, for simplicity, I'm using text as a placeholder */}
          <Text className="text-white">☁️</Text>
        </TouchableOpacity>
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
            Review
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Measurement;
