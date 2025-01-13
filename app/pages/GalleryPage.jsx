import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import GalleryCard from "../../components/Gall/GalleryCard";
import logo from "../../assets/logo.png";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { getGalleries } from "../../src/api/repositories/galleriesRepository";
import { MEDIA_BASE_URL } from "../../src/api/apiClient"; // Ensure this import is correct

const GalleryPage = () => {
  const router = useRouter();
  const [galleryData, setGalleryData] = useState([]);

  useEffect(() => {
    // Fetch gallery data when component mounts
    const fetchGalleries = async () => {
      try {
        const response = await getGalleries();
        console.log(response.data.data); // Log the fetched data to check its structure
        setGalleryData(response.data.data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      }
    };

    fetchGalleries(); // Call function to fetch the data
  }, []);

  const handleBack = () => {
    router.back("/home");
  };

  const handleCardPress = (item) => {
    router.push({
      pathname: "/pages/GalleryDetail",
      params: {
        imageSrc: `${MEDIA_BASE_URL}${item.Image.url}`, // Use MEDIA_BASE_URL to build the image URL
        productName: item.name,
        category: item.catagory,
        description: item.description,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" color="white" size={30} />
        </TouchableOpacity>
        <Image style={styles.logo} source={logo} />
      </View>
      <Text style={styles.title}>Club Galleria</Text>
      <Text style={styles.subtitle}>
        Explore our Curated Collection of exclusive designs
      </Text>
      <ScrollView contentContainerStyle={styles.grid}>
        {galleryData.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleCardPress(item)}
            style={styles.cardContainer}
          >
            <GalleryCard
              imageSrc={{ uri: `${MEDIA_BASE_URL}${item.Image.url}` }} // Dynamically use MEDIA_BASE_URL for image URL
              productName={item.name}
              category={item.catagory}
              description={item.description}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 10,
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#8FFA09",
    textAlign: "center",
    marginVertical: 15,
  },
  subtitle: {
    fontSize: 14,
    color: "#ddd",
    marginBottom: 15,
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 8,
  },
  cardContainer: {
    width: "48%", // This ensures 2 cards per row with some spacing
    marginBottom: 16,
  },
});

export default GalleryPage;
