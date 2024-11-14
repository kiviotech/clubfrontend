import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList,StyleSheet,ScrollView } from "react-native";
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
              source={{ uri: item.uri }}
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
});

export default Measurement;
