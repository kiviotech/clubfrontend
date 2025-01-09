import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import useFormStore from '../../src/store/useFormStore';
import { useRouter } from 'expo-router';

const CustomizeCard = ( { id, documentId,title, description, image, onLearnMore, onCustomize }) => {
    const setSelectedProduct = useFormStore((state) => state.setSelectedProduct);
    const router = useRouter();

  const handleProductSelect = () => {
    setSelectedProduct(id, documentId); // Store the selected product id and document id
  };

  const handleStartCustomizing = () => {
    handleProductSelect();
    router.push("/pages/request-design");  // Navigate to the request design page
  };
  

    return (
        <View style={styles.card}>
          <View style={styles.imageContainer}>
            {/* Replace this with an actual Image component */}
            <Image
          style={styles.image}
          source={{ uri: image }} // Use the image prop
        />
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            <View style={styles.buttonContainer}>
              {/* <TouchableOpacity onPress={onLearnMore} style={styles.learnMoreButton}>
                <Text style={styles.learnMoreText}>Learn More</Text>
              </TouchableOpacity> */}
              <TouchableOpacity onPress={() => { handleStartCustomizing(); handleProductSelect(); }} style={styles.customizeButton}>
            <Text style={styles.customizeText}>Start Customizing</Text>
          </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      card: {
        backgroundColor: '#000',
        borderRadius: 10,
        marginVertical: 10,
        padding: 15,
      },
      imageContainer: {
        alignItems: 'center',
        marginBottom: 10,
      },
      image: {
        width: '100%',
        height: 140,
        resizeMode: 'cover',
        borderRadius: 8,
      },
      detailsContainer: {
        paddingHorizontal: 10,
      },
      title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
      },
      description: {
        fontSize: 14,
        color: '#aaa',
        marginBottom: 10,
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      learnMoreButton: {
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 10,
      },
      learnMoreText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 14,
      },
      customizeButton: {
        backgroundColor: '#8FFA09',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
      },
      customizeText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 14,
      },
    });
    

export default CustomizeCard