import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Platform, Image, Alert } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { fetchProfileById, updateProfileById } from '../../src/api/services/profileService';
import { BASE_URL } from '../../src/api/apiClient';
import { uploadNewFile } from '../../src/api/services/uploadServices';
import useUserDataStore from '../../src/store/userData';
import { getUserProfile } from '../../src/api/repositories/userRepository';
import useProfileStore from '../../src/store/useProfileStore';
import { MEDIA_BASE_URL } from '../../src/api/apiClient';
import { useRouter } from 'expo-router';


const ProfileScreen = () => {
  const navigation = useNavigation();
  const { id, profile_img = '', name: initialName = 'Default Name', username: initialUsername = 'DefaultUsername' } = useLocalSearchParams();
  const [name, setName] = useState(initialName);
  const [username, setUsername] = useState(initialUsername);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageId, setProfileImageId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const userId = useUserDataStore((state) => state.users[0]?.id);
  const [profileId, setProfileId] = useState("")
  const [profileData,setProfileData]=useState("")
  const { setProfile } = useProfileStore();
  const router = useRouter();
  
  // console.log('id', id, 'userid',userId)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (userId) {
          const response = await getUserProfile(userId);
          const { data } = response;
          // console.log('Fetched Profile Data:', data);
          setProfileId(data?.profile?.documentId);
          
          const imageUrl = data?.profile?.image?.url 
            ? `${MEDIA_BASE_URL}${data.profile.image.url}`
            : '';
            
          setProfile({
            name: data?.profile?.name || '',
            username: data?.profile?.username || '',
            image: imageUrl
          });
          
          setProfileData(data);
          setName(data?.profile?.name || '');
          setUsername(data?.profile?.username || '');
          setProfileImage(imageUrl);
        }
      } catch (error) {
        // console.error('Error fetching profile:', error);
        Alert.alert('Error', 'Failed to fetch profile.');
      }
    };

    fetchProfile();
  }, [id]);


  useEffect(() => {
    const getProfileData = async () => {
      try {
        if (id) {
          const profileData = await fetchProfileById(id);
          // console.log('Profile Data by ID:', {
          //   id: id,
          //   profileData: profileData
          // });
        }
      } catch (error) {
        // console.error('Error fetching profile:', error);
      }
    };

    getProfileData();
  }, [id]);

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
  
        // Fetch the image as a Blob
        const imageBlob = await (await fetch(uri)).blob(); // Convert URI to Blob
  
        // Create FormData
        const formData = new FormData();
        formData.append('files', imageBlob, 'profile-image.jpg'); // Append the blob with a filename
  
        // Upload the file with a bearer token
        const uploadResponse = await axios.post(
          `${BASE_URL}/upload`,
          formData,
          {
            headers: {
              'Authorization': 'Bearer e243b33014fab23926d9b9079d6c90018b288b84740bb443eb910febdec1b93b6563c2b091a18081788c2bb2eb950ad15bead95e14029283ab2bfd0f4ea563eb590955e3cbbfdc100e9ef8a565993c6bd8e02985ef14df8f83123689c5f139ac50263be891842c8522877b7b73fe5136c56e0ae9823d1e9d96743ebcff502780',
              'Content-Type': 'multipart/form-data',
              'Accept': 'application/json',
            },
          }
        );
  
        // Check the upload response and get the uploaded image ID
        const uploadedImageId = uploadResponse.data[0]?.id;
        if (uploadedImageId) {
          setProfileImageId(uploadedImageId); // Store the image ID
          Alert.alert("Upload Successful", "Profile image uploaded successfully!");
        } else {
          throw new Error("Failed to retrieve uploaded image ID.");
        }
      } catch (error) {
        // console.error("Error uploading image:", error.response?.data || error.message);
        Alert.alert("Upload Error", "Failed to upload the image.");
      } finally {
        setUploading(false);
      }
    }
  };
  

  const handleUpdateProfile = async () => {
    try {
      setUploading(true);
      
      const updateData = {
        username,
        name,
        user:userId,
        // Only include image if profileImageId exists
        ...(profileImageId && {image: profileImageId.toString() }),
        locale: "en"
      };
      // console.log('data', updateData)

      const response = await updateProfileById(profileId, updateData);
      Alert.alert("Success", "Profile updated successfully!");
      // console.log("Updated Profile:", response);

      useProfileStore.getState().setProfile({
        name,
        username,
        image: profileImage ? profileImage : profileData?.profile?.image?.url,
      });

      navigation.goBack();
    } catch (error) {
      // console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleHome = () => {
    router.push("/profile");
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => {
      if (navigation.canGoBack()) {
        navigation.goBack(); // Go to the previous screen if available
      } else {
        handleHome() // Navigate to the correct route
      }
    }} style={styles.backButton}>
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

      <TouchableOpacity style={styles.saveButton} onPress={handleUpdateProfile} disabled={uploading}>
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
