import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import StepIndicator from "../../components/StepIndicator";
import { router } from "expo-router";
import svgs from "../../constants/svgs";
import { BASE_URL } from "../../src/api/apiClient";
import axios from "axios";
import useFormStore from "../../src/store/useFormStore";

const Measurement = () => {
  const [images, setImages] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageId, setProfileImageId] = useState(null); // Track uploaded image ID
  const [uploading, setUploading] = useState(false);
  const { setUploads } = useFormStore();
  const [error, setError] = useState(null);

  const pickImage = async () => {
    setError(null);
    // Request permission to access the media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    // Launch the image library for selection
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImages([uri]);

      try {
        setUploading(true);

        // Convert URI to Blob for upload
        const imageBlob = await (await fetch(uri)).blob();
        const formData = new FormData();
        formData.append("files", imageBlob, {
          name: uri.split("/").pop() || "image.jpg",
          type: imageBlob.type || "image/jpeg",
        });


        const uploadResponse = await axios.post(
          `${BASE_URL}/upload`,
          formData,
          {
            headers: {
              Authorization: `d52d17664c1b99486004f8cf9aca564b7696f0422229ab8ccd6c7aa4fa1c42aaad566097c1d87ed2487880e6b7c961ea57838c964a3a225fa6c713afab850e4b5bd3c5e1261e3fe5d45712e26dccb313da5f2c26f92a8101c74c4814ad3a0ace9cf9ca7b548082640741f96ce67ea60f00dd3a442fb948300f75e3a22dab556c`, // Replace with a valid JWT token
            },
          }
        )
        const uploadedImageId = uploadResponse.data[0]?.id;
        console.log(uploadedImageId)// Assuming the backend returns the uploaded file ID

        if (uploadedImageId) {
          setProfileImageId(uploadedImageId);
          setUploads(uploadedImageId);
          setError(null);
          Alert.alert("Upload Successful", "Profile image uploaded successfully!");
        } else {
          throw new Error("Failed to retrieve uploaded image ID.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        Alert.alert("Upload Error", "Failed to upload the image.");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleNextSection = () => {
    if (!profileImageId) {
      setError("One image should be uploaded."); // Set error if no image is uploaded
    } else {
      setError(null); // Clear any existing error
      router.push("../pages/review");
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  //  const handleNextSection = () => {
  //    router.push("../pages/review");
  //  };
  const handlePrevSection = () => {
    router.push("../pages/measurement");
  };
  const handleGoHome = () => {
    router.push("/(tabs)/home");
  };

  return (


    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TouchableOpacity onPress={handleGoHome}>
          <svgs.back />
        </TouchableOpacity>
        <StepIndicator currentPosition={2} />

        <View style={styles.uploadsContainer}>
          <Text style={styles.uploadsTitle}>Uploads</Text>
          <View style={styles.dropZone}>
            <TouchableOpacity onPress={pickImage}>
              <View style={styles.uploadButton}>
                <Text style={styles.uploadText}>Select files</Text>
              </View>
            </TouchableOpacity>
          </View>
          {images.length > 0 && (
            <FlatList
              data={images}
              horizontal
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: item }} // Show image using the URI
                    style={styles.image}
                  />
                  <TouchableOpacity
                    onPress={() => removeImage(index)}
                    style={styles.removeButton}
                  >
                    <Text style={styles.removeButtonText}>X</Text>
                  </TouchableOpacity>
                </View>
              )}
              contentContainerStyle={styles.flatListContainer}
            />
          )}
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            // onPress={onRemoveAll}
            style={styles.removeAllButton}
          >
            <Text style={styles.removeAllText}>Remove All</Text>
          </TouchableOpacity>

          <TouchableOpacity
            // onPress={onUpload}
            style={styles.uploadButtonContainer}
          >
            <Text style={styles.uploadText}>Upload</Text>
            <Text style={styles.uploadIcon}>☁️</Text>
          </TouchableOpacity>
        </View>

        {/* Buttons Section */}
        <View style={styles.actionButtonContainer}>
          <TouchableOpacity
            style={styles.goBackButton}
            onPress={handlePrevSection}
          >
            <Text style={styles.goBackButtonText}>Go Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.reviewButton}
            onPress={handleNextSection}
          >
            <Text style={styles.reviewButtonText}>Review</Text>
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
  uploadsContainer: {
    marginBottom: 16, // Equivalent to mb-4
    borderRadius: 16, // Equivalent to rounded-2xl
    backgroundColor: '#181818',
    paddingHorizontal: 20, // Equivalent to px-5
    paddingVertical: 32, // Equivalent to py-8
  },
  uploadsTitle: {
    color: 'white',
    fontSize: 24, // Equivalent to text-2xl
    marginBottom: 24, // Equivalent to mb-6
    fontWeight: '600', // Equivalent to font-psemibold
  },
  dropZone: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40, // Equivalent to p-10
    borderColor: 'gray',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 10, // Equivalent to rounded-lg
  },
  uploadButton: {
    height: 128, // Equivalent to h-32
    width: 128, // Equivalent to w-32
    backgroundColor: '#1E1E1E',
    borderRadius: 10, // Equivalent to rounded-lg
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    color: 'white',
  },
  imageContainer: {
    position: 'relative',
    marginRight: 8, // Equivalent to mr-2
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  removeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'black',
    borderRadius: 50, // Equivalent to rounded-full
    padding: 4, // Equivalent to p-1
  },
  removeButtonText: {
    color: 'white',
  },
  flatListContainer: {
    marginTop: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 60,
  },
  removeAllButton: {
    backgroundColor: '#1E1E1E', // Equivalent to bg-gray-800
    borderRadius: 10, // Equivalent to rounded-lg
    paddingHorizontal: 16, // Equivalent to px-4
    paddingVertical: 8, // Equivalent to py-2
    marginRight: 8, // Equivalent to mr-2
  },
  removeAllText: {
    color: '#A9A9A9', // Equivalent to text-gray-400
    fontSize: 12, // Equivalent to text-sm
  },
  uploadButtonContainer: {
    backgroundColor: '#1E1E1E', // Equivalent to bg-gray-800
    borderRadius: 10, // Equivalent to rounded-lg
    paddingHorizontal: 16, // Equivalent to px-4
    paddingVertical: 8, // Equivalent to py-2
    flexDirection: 'row',
    alignItems: 'center',
  },
  uploadIcon: {
    color: 'white',
  },
  actionButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  goBackButton: {
    backgroundColor: 'white',
    borderRadius: 10, // Equivalent to rounded-lg
    padding: 12, // Equivalent to p-3
    flex: 1,
    marginRight: 8, // Equivalent to mr-2
  },
  goBackButtonText: {
    color: 'black',
    fontSize: 16, // Equivalent to text-base
    fontWeight: '600', // Equivalent to font-psemibold
    textAlign: 'center',
  },
  reviewButton: {
    backgroundColor: '#8FFA09', // Equivalent to bg-primary
    borderRadius: 10, // Equivalent to rounded-lg
    padding: 12, // Equivalent to p-3
    flex: 1,
  },
  reviewButtonText: {
    color: 'black',
    fontSize: 16, // Equivalent to text-base
    fontWeight: '600', // Equivalent to font-psemibold
    textAlign: 'center',
  },
  errorText: {
    color: "red",
    marginTop: 10,
    fontSize: 14,
    fontWeight: "500",
  },
});

export default Measurement;
