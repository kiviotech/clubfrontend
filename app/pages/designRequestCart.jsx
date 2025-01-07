import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import RequestCart from "../../components/requestCart/requestCart";
import { getUserWithDesignRequests } from '../../src/api/repositories/userRepository';
import useUserDataStore from '../../src/store/userData';
import { MEDIA_BASE_URL } from '../../src/api/apiClient';
import logo from "../../assets/logo.png";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";

const DesignRequestCart = () => {
  const [designRequests, setDesignRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = useUserDataStore((state) => state.users[0]?.id);
  const navigation = useNavigation();
  const router = useRouter();

  // Function to delete request locally
  const handleDeleteRequest = (requestId) => {
    setDesignRequests((prevRequests) =>
      prevRequests.filter((request) => request.id !== requestId)
    );
  };

  useEffect(() => {
    if (!userId) {
      // console.log("User ID is not available.");
      return;
    }

    const fetchDesignRequests = async () => {
      try {
        // console.log("Fetching design requests for userId:", userId);
        const response = await getUserWithDesignRequests(userId);

        // Extract and deduplicate design requests
        let requests = [];
        if (response.data?.design_requests) {
          requests = response.data.design_requests;
          
        } else if (response.data?.attributes?.design_requests) {
          requests = response.data.attributes.design_requests;
        }

        // Remove duplicates based on `id`
        const uniqueRequests = requests.filter(
          (request, index, self) =>
            index === self.findIndex((r) => r.id === request.id)
        );

        setDesignRequests(uniqueRequests); // Set deduplicated data
      } catch (error) {
        setError("Error fetching design requests");
        // console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDesignRequests();
  }, [userId]);

  const handleprofile = () => {
    router.push("/profile");
  };
  const handleHome = () => {
    router.push("/home");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          } else {
            handleprofile();
          }
        }} style={styles.backButton}>
          <Ionicons name="arrow-back" color="white" size={20} />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Image source={logo} />
        </View>
      </View>

      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        designRequests.map((designRequest) => {
          console.log("hello",designRequest.custom_design.name)
          const title = designRequest.title || "Untitled";
          const description = designRequest.description || "Untitled";
          const selectType = designRequest.fabric_preferences || "Untitled";
          const colorPreferences = designRequest.color_preferences || "N/A";
          const deadline = designRequest.deadline || "Not set";
          const contactNumber = designRequest.contactNumber || "0.00";
          const budget = designRequest.budget || "0.00"; 
          const special_instructions = designRequest.special_instructions || "Not set"; 
          const waist = designRequest.waist || "Not set"; 
          const size = designRequest.size || "Not set"; 
          const chest = designRequest.chest || "Not set";
          const imageUrls = designRequest.image?.map(image => `${MEDIA_BASE_URL}${image.url}`); // Handling multiple images
          const requestId = designRequest.id; // Extract the requestId here
          const documentId = designRequest.documentId;
          const customDesignName = designRequest.custom_design?.name || "No Name"; 
          // console.log(imageUrls)

          return (
            <RequestCart
              key={requestId} // Use the requestId as the key for better performance
              requestId={requestId} // Pass requestId to the RequestCart component
              documentId={documentId}
              title={title}
              budget={budget}
              colorPreferences={colorPreferences}
              deadline={deadline}
              image={imageUrls}
              description={description}
              selectType={selectType}
              contactNumber={contactNumber}
              special_instructions={special_instructions}
              waist={waist}
              size={size}
              chest={chest}
              customDesignName={customDesignName}
              onDelete={handleDeleteRequest} // Pass the delete handler to the RequestCart component
            />
          );
        })
      )}

      {/* After the design requests, add the "Go to Home" section */}
      <View style={styles.homeContainer}>
        <TouchableOpacity onPress={handleHome} style={styles.homeButton}>
          <Ionicons name="home" color="black" size={20} />
          <Text style={styles.homeText}>Click here to go to the Home Page</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8FFA09',
    padding: 10,
    borderRadius: 5,
  },
  homeText: {
    color: 'black',
    marginLeft: 10,
  },
});

export default DesignRequestCart;
