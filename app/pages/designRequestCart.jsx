import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import RequestCart from "../../components/requestCart/requestCart";
import { getUserWithDesignRequests } from '../../src/api/repositories/userRepository';
import useUserDataStore from '../../src/store/userData';
import { MEDIA_BASE_URL } from '../../src/api/apiClient';
import logo from "../../assets/logo.png";

const DesignRequestCart = () => {
  const [designRequests, setDesignRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = useUserDataStore((state) => state.users[0]?.id);

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
        rese
        setError("Error fetching design requests");
        // console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDesignRequests();
  }, [userId]);

  // console.log(designRequests)
  return (
    <ScrollView style={styles.container}>
      <View style={styles.logo}>
        <Image source={logo} />
      </View>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        designRequests.map((designRequest) => {
          const title = designRequest.title || "Untitled";
          const budget = designRequest.budget || "0.00";
          const colorPreferences = designRequest.color_preferences || "N/A";
          const deadline = designRequest.deadline || "Not set";
          const imageUrl = `${MEDIA_BASE_URL}${designRequest.image?.url}`;
          const requestId = designRequest.id; // Extract the requestId here
          const documentId = designRequest.documentId;

          return (
            <RequestCart
              key={requestId} // Use the requestId as the key for better performance
              requestId={requestId} // Pass requestId to the RequestCart component
              documentId={documentId}
              title={title}
              budget={budget}
              colorPreferences={colorPreferences}
              deadline={deadline}
              image={imageUrl}
              onDelete={handleDeleteRequest} // Pass the delete handler to the RequestCart component
            />
          );
        })
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure it takes the full screen height
    backgroundColor: '#000', // Black background
    padding: 10, // Optional padding if needed
  },
  logo: {
    padding: 20
  }
});

export default DesignRequestCart;
