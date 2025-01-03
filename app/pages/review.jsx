import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StepIndicator from "../../components/StepIndicator";
import { router } from 'expo-router';
import svgs from '../../constants/svgs';
import useFormStore from '../../src/store/useFormStore';
import { createNewDesignRequest } from '../../src/api/services/designRequestService';
import useUserDataStore from '../../src/store/userData';

const Review = () => {
  const { designDetails, measurements, uploads } = useFormStore(state => state); // Access Zustand store
  const userId = useUserDataStore((state) => state.users[0]?.id);
  const [isSubmitting, setIsSubmitting] = useState(false);


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

  const handleConfirm = async () => {
    if (isSubmitting) return; // Prevent further submissions
    setIsSubmitting(true);
    // Prepare data to send to backend
    const data = {
      data: {
        title: designDetails?.title || "string",
        description: designDetails?.description || "string",
        fabric_preferences: designDetails?.fabricPreferences || "Cotton",
        color_preferences: designDetails?.color || "string",
        deadline: designDetails?.formattedDeadline || "2024-11-26",
        budget: designDetails?.budget || 0,
        bust: measurements?.bust || "XS",
        contactNumber: designDetails?.contactNumber || "Not provided",
        waist: measurements?.waist || "XS",
        hip: measurements?.hip || "XS",
        weight: measurements?.weight || 0,
        special_instructions: measurements?.specialInstructions || "string",
        image: uploads.imageId,
        users: userId,
        height: measurements?.height || "XS",
      }
    }

    try {
      // Send the data to the backend via API
      const response = await createNewDesignRequest(data);

      useFormStore.getState().resetFormData();


      // Handle success response
      Alert.alert('Success', 'Your design request has been submitted successfully!');
      router.push("pages/designRequestCart"); // Redirect to a confirmation page or next step

    } catch (error) {
      // Handle error response
      Alert.alert('Error', 'There was an issue submitting your design request. Please try again.');
      // console.error('Error creating design request:', error);
    }
  };

  return (


    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handlePrevSection}>
        <svgs.back />
      </TouchableOpacity>
      <StepIndicator currentPosition={3} />

      <View style={styles.reviewContainer}>
        <Text style={styles.title}>Review Your Details</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Design Details</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditRequestDesign}
          >
            <Text style={styles.editButtonText}>Edit Design Details</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Measurements</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditMeasurements}
          >
            <Text style={styles.editButtonText}>Edit Measurements</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Uploads</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditUploads}
          >
            <Text style={styles.editButtonText}>Edit Uploads</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirm}
        >
          <Text style={styles.confirmButtonText}>Confirm and Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 16, // Equivalent to px-4
  },
  reviewContainer: {
    
    marginBottom: 370, // Equivalent to mb-40
    borderRadius: 16, // Equivalent to rounded-2xl
    // backgroundColor: '#181818',
    paddingHorizontal: 20, // Equivalent to px-5
    paddingVertical: 32, // Equivalent to py-8
  },
  title: {
    color: 'white',
    fontSize: 24, // Equivalent to text-2xl
    marginBottom: 24, // Equivalent to mb-6
    fontWeight: '600', // Equivalent to font-psemibold
  },
  section: {
    marginBottom: 16, // Equivalent to mb-4
  },
  sectionTitle: {
    color: 'white',
    fontSize: 20, // Equivalent to text-xl
    marginBottom: 8, // Equivalent to mb-2
  },
  editButton: {
    backgroundColor: '#1E1E1E', // Equivalent to bg-gray-800
    padding: 12, // Equivalent to p-3
    borderRadius: 10, // Equivalent to rounded-lg
  },
  editButtonText: {
    color: '#8FFA09', // Equivalent to text-primary
  },
  confirmButton: {
    backgroundColor: '#8FFA09', // Equivalent to bg-primary
    padding: 12, // Equivalent to p-3
    borderRadius: 10, // Equivalent to rounded-lg
  },
  confirmButtonText: {
    color: 'black',
    fontSize: 16, // Equivalent to text-base
    fontWeight: '600', // Equivalent to font-psemibold
    textAlign: 'center',
  },
});

export default Review;
