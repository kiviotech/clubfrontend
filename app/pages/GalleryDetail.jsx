import React from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, Image,TouchableOpacity } from 'react-native';
import logo from "../../assets/logo.png"
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from 'expo-router';

const GalleryDetail = () => {

    const router = useRouter();
    const { imageSrc, productName, category, description } = useLocalSearchParams();
    const handleBack = () => {
        router.back("/home");
    };

    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack}>
              <Ionicons name="arrow-back" color="white" size={30} />
            </TouchableOpacity>
            <Image style={styles.logo} source={logo} />
          </View>
          <View style={styles.card}>
            <Image
              source={{ uri: imageSrc }} // Use the passed image URL
              style={styles.image}
              resizeMode="cover" // Ensures the image scales properly
            />
            <Text style={styles.productName}>{productName}</Text>  {/* Dynamically display the product name */}
            <Text style={styles.category}>{category}</Text>  {/* Dynamically display the category */}
            <Text style={styles.description}>Description:</Text>
            <Text style={styles.descriptionText}>{description}</Text>  {/* Dynamically display the description */}
          </View>
        </View>
      );
    };
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 16,
    },
    header: {
        flexDirection: "row",
        height: 48,
        width: "100%",
        padding: 8,
        alignItems: "center",
      },
      logo: {
        marginLeft: 8,
      },
    card: {
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    image: {
        width: Dimensions.get('window').width - 64,
        height: 250,
        borderRadius: 4,
    },
    productName: {
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginTop: 8,
    },
    category: {
        fontSize: 14,
        color: '#00C853',
        backgroundColor: '#1b5e20',
        paddingHorizontal: 8,
        paddingVertical: 4,
        alignSelf: 'flex-start',
        borderRadius: 12,
        marginTop: 4,
    },
    description: {
        fontSize: 20,
        color: '#fff',
        marginTop: 8,
        lineHeight: 20,
        fontWeight: "bold"
    },
    descriptionText:{
        fontSize: 14,
        color: '#B0BEC5',
        marginTop: 8,
        lineHeight: 20,
    }
});

export default GalleryDetail;