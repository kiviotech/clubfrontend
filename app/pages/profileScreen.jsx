// import React from 'react';
// import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { useLocalSearchParams } from 'expo-router';
// import { useState } from 'react';
// import { useNavigation } from 'expo-router';
// import { Ionicons } from "@expo/vector-icons";
// import { updateProfile } from '../../src/api/repositories/profileRepository';

// const ProfileScreen = () => {

//     const navigation = useNavigation();
//     const { profile_img = '', name = 'Default Name', username = 'DefaultUsername' } = useLocalSearchParams();
//     const [isEditing, setIsEditing] = useState(false);
//     const [editedName, setEditedName] = useState(name); // State for edited name
//     const [editedUsername, setEditedUsername] = useState(username);
//     const userId = "23";

//     const toggleEditMode = () => {
//         setIsEditing(!isEditing);
//     };

//     // Handle Save
//     const handleSave = async () => {
//         try {
//             // Send the updated profile data to the backend
//             const updatedData = {
//                 name: editedName,
//                 username: editedUsername,
//             };

//             // Make the API call to update the profile
//             await updateProfile(userId, updatedData);  // Pass userId to the update API
//             // On success, exit edit mode
//             setIsEditing(false);
//             console.log('Profile updated successfully');
//         } catch (error) {
//             console.error('Error updating profile:', error);
//         }
//     };


//     return (
//         <SafeAreaView style={styles.container}>
//             <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//                 <Ionicons name="arrow-back" color="white" size={30} />
//             </TouchableOpacity>
//             {/* Profile Header */}
//             <View style={styles.header}>
//                 <Text style={styles.title}>Profile</Text>
//                 <TouchableOpacity onPress={toggleEditMode}>
//                     <Text style={styles.editText}>{isEditing ? 'Cancel' : 'Edit'}</Text>
//                 </TouchableOpacity>
//             </View>

//             {/* Profile Picture */}
//             <View style={styles.profileImageContainer}>
//                 {profile_img ? (
//                     <Image source={{ uri: profile_img }} style={styles.profilePlaceholder} />
//                 ) : (
//                     <View style={styles.profilePlaceholder}>
//                         <Icon name="person-outline" size={60} color="#fff" />
//                     </View>
//                 )}
//                 <TouchableOpacity style={styles.cameraIcon}>
//                     <Icon name="camera-outline" size={20} color="#000" />
//                 </TouchableOpacity>
//             </View>

//             {/* Name Input or Display */}
//             <View style={styles.inputContainer}>
//                 {isEditing ? (
//                     <TextInput
//                         style={[styles.input, isEditing && styles.inputEditing]} // Conditionally apply border style
//                         value={editedName}
//                         onChangeText={setEditedName}
//                         placeholder="Enter your name"
//                         placeholderTextColor="#fff"
//                     />
//                 ) : (
//                     <Text style={styles.input}>{editedName}</Text>
//                 )}
//             </View>

//             {/* Username Input or Display */}
//             <View style={styles.inputContainer}>
//                 {isEditing ? (
//                     <TextInput
//                         style={[styles.input, isEditing && styles.inputEditing]} // Conditionally apply border style
//                         value={editedUsername}
//                         onChangeText={setEditedUsername}
//                         placeholder="Enter your username"
//                         placeholderTextColor="#fff"
//                     />
//                 ) : (
//                     <Text style={styles.input}>{editedUsername}</Text>
//                 )}
//             </View>

//             {/* Save Button */}
//             <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
//                 <Text style={styles.saveButtonText}>Save Changes</Text>
//             </TouchableOpacity>
//         </SafeAreaView>
//     );
// };
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#000',
//         paddingHorizontal: 20,
//         paddingTop: Platform.OS === 'android' ? 25 : 0,
//         paddingLeft:20,
//         paddingRight:20
//     },
//     backButton: {
//         marginBottom: 10,
//     },
//     header: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: 20,
//     },
//     title: {
//         color: '#fff',
//         fontSize: 28,
//         fontWeight: '600',
//     },
//     editText: {
//         color: '#8FFA09',
//         fontSize: 16,
//         fontWeight: '500',
//     },
//     profileImageContainer: {
//         alignItems: 'center',
//         marginVertical: 20,
//     },
//     profilePlaceholder: {
//         width: 120,
//         height: 120,
//         borderRadius: 60,
//         backgroundColor: '#333',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     cameraIcon: {
//         position: 'absolute',
//         bottom: 0,
//         right: '38%',
//         backgroundColor: '#8FFA09',
//         borderRadius: 15,
//         padding: 5,
//     },
//     inputContainer: {
//         marginBottom: 15,
//     },
//     input: {
//         backgroundColor: '#1e1e1e',
//         color: '#fff',
//         borderRadius: 5,
//         padding: 15,
//         fontSize: 16,
//     },
//     inputEditing: {
//         borderWidth: 2,
//         borderColor: '#8FFA09',
//     },
//     saveButton: {
//         backgroundColor: '#8FFA09',
//         borderRadius: 5,
//         paddingVertical: 15,
//         alignItems: 'center',
//         marginTop: 20,
//     },
//     saveButtonText: {
//         color: '#000',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
// });

// export default ProfileScreen;



import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Platform, Image,Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useNavigation } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";
import { createProfile } from '../../src/api/repositories/profileRepository'; // Import the createProfile function
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { uploadFileById } from '../../src/api/services/uploadServices';
import axios from 'axios';
import { BASE_URL } from '../../src/api/apiClient';
import { updateProfile } from '../../src/api/repositories/profileRepository';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { profile_img = '', name: initialName = 'Default Name', username: initialUsername = 'DefaultUsername' } = useLocalSearchParams();
  const [name, setName] = useState(initialName);
  const [username, setUsername] = useState(initialUsername);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageId, setProfileImageId] = useState(null); // Track uploaded image ID
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access media library is required!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setProfileImage(uri); // Set image locally for preview

      try {
        setUploading(true);

        // Convert URI to Blob for upload
        const imageBlob = await (await fetch(uri)).blob();
        const formData = new FormData();
        formData.append("files", imageBlob, uri.split("/").pop());

        // Upload file with ID (e.g., user ID or profile ID)
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

  const postProfileData = async () => {
    try {
      const profileData = {
        name:name,
        username:username,
        profile_img: String(profileImageId),
        user: "23", 
      };

      const response = await createProfile(profileData);
      console.log("Profile created successfully:", response.data);

      Alert.alert("Success", "Profile updated successfully!");
    } catch (error) {
      console.error("Error creating profile:", error);
      Alert.alert("Error", "Failed to create profile. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" color="white" size={30} />
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={styles.profileImageContainer}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profilePlaceholder} resizeMode="cover" />
        ) : (
          <View style={styles.profilePlaceholder}>
            <Ionicons name="person-outline" size={60} color="#fff" />
          </View>
        )}
        <TouchableOpacity style={styles.cameraIcon} onPress={pickImage}>
          <Icon name="camera-outline" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter Name"
          placeholderTextColor="#aaa"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter Username"
          placeholderTextColor="#aaa"
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={postProfileData} disabled={uploading}>
        <Text style={styles.saveButtonText}>{uploading ? "Uploading..." : "Save Changes"}</Text>
      </TouchableOpacity>
    </SafeAreaView> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    paddingLeft: 20,
    paddingRight: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '600',
  },
  editText: {
    color: '#8FFA09',
    fontSize: 16,
    fontWeight: '500',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profilePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: '38%',
    backgroundColor: '#8FFA09',
    borderRadius: 15,
    padding: 5,
    marginTop: 10, // Add some space between the icons
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    borderRadius: 5,
    padding: 15,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#8FFA09',
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
