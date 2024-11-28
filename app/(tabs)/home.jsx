import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/logo.png";
import svgs from "../../constants/svgs";
import DesignerCard from "../../components/DesignerCard";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import fonts from "../../constants/fonts";
import Slider from "../pages/slider";
import BrandIcons from "../../components/BrandIcons";
import ProductList from "../../components/productList";
import Sale from "../pages/sale";
import NewArrival from "../../components/productList/NewArrival";
import Shop_Brands from "../pages/shop_Brands";
import Brand_page from "../pages/brand_page";
import { getProfileByUserId } from "../../src/api/repositories/profileRepository";
import useUserDataStore from "../../src/store/userData";
import { getUserById } from "../../src/api/repositories/userRepository";


const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const userId = useUserDataStore((state) => state.users[0]?.id);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(userId); // Fetch user data by ID
        console.log(response.data.username);
        setUser(response.data); // Set the fetched user data to the state
        
      } catch (error) {
        console.error("Failed to fetch user data", error);
      } finally {
        setLoading(false); // Set loading to false once the data is fetched
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const openVideoLink = (videoUrl) => {
    Linking.openURL(videoUrl);
  };

  const handleRequest = () => {
    router.push("/pages/request-design");
  };

  const handleNotify = () => {
    router.push("/pages/notification");
  };

  const handleProfileNavigation = (designer) => {
    router.push({
      pathname: "/pages/view-profile",
      params: {
        name: designer.name,
        image: designer.image,
        rating: designer.rating,
        location: designer.location,
        company: designer.company,
        skills: designer.skills,
        experience: designer.experience,
        education: designer.education,
      },
    });
  };

  const Nicon = svgs.nbell;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} />
        <TouchableOpacity onPress={handleNotify}>
          <Nicon />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeBox}>
          <Text style={styles.welcomeText}>Welcome back 👋</Text>
          {user?.username ? (
            <Text style={styles.userName}>{user.username}</Text> // Display the username
          ) : (
            <Text style={styles.userName}>User</Text> // Fallback for undefined username
          )}
          <Text style={styles.explore}>Explore Brands</Text>
          <Slider />
        </View>

        <View style={styles.mostRatedDesigners}>
          <Text style={styles.sectionTitle}>Most Rated Designers</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <BrandIcons />
          </ScrollView>
        </View>

        <View style={styles.collaboration}>
          <Text style={styles.explore}>Brand Collaborations</Text>
          <Slider />
        </View>

        <TouchableOpacity style={styles.requestDesignButton} onPress={handleRequest}>
          <Text style={styles.requestDesignButtonText}>Request Design</Text>
        </TouchableOpacity>

        <View style={styles.popularProductsHeader}>
          <Text style={styles.popularProductsTitle}>Popular Products</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <View>
          <ProductList limit={4} />
        
        </View>

        <View>
          <Sale />
        </View>

        <View>
          <Text style={styles.popularProductsTitle}>New Arrival</Text>
          <NewArrival />
        </View>

        <View>
          <Text style={styles.popularProductsTitle}>Shop by Brands</Text>
          <Shop_Brands />
        </View>

        <View>
          <Text style={styles.popularProductsTitle}>Just For You</Text>
          <ProductList />
        </View>
        <View>
          <Brand_page />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2022 ClubUnplugged</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 48,
    width: "100%",
    padding: 8,
  },
  welcomeBox: {
    marginBottom: 20,
    borderRadius: 20,
    marginTop: 12,
  },
  welcomeText: {
    color: "white",
    fontSize: 24,
    marginBottom: 8,
    fontFamily: fonts["Poppins-SemiBold"],
  },
  userName: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: fonts["Poppins-Bold"],
  },
  collaboration: {
    marginBottom: 26,
  },
  explore: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    fontFamily: fonts["Poppins-Bold"],
  },
  description: {
    color: "#A0A0A0",
    fontSize: 16,
    marginBottom: 16,
    fontFamily: fonts["Poppins-Regular"],
  },
  requestButton: {
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#8FFA09",
  },
  requestButtonText: {
    color: "black",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
    fontFamily: fonts["Poppins-SemiBold"],
  },
  mostRatedDesigners: {
    marginBottom: 16,
  },
  sectionTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    fontFamily: fonts["Poppins-Bold"],
  },
  exploreSection: {
    borderRadius: 10,
    backgroundColor: "#181818",
    marginBottom: 24,
  },
  exploreImage: {
    width: "100%",
    height: 240,
    borderRadius: 10,
  },
  exploreText1: {
    position: "absolute",
    bottom: 88,
    left: 8,
    color: "#8FFA09",
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: fonts["Poppins-Bold"],
  },
  exploreText2: {
    position: "absolute",
    bottom: 56,
    left: 8,
    color: "#8FFA09",
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: fonts["Poppins-Bold"],
  },
  exploreText3: {
    position: "absolute",
    bottom: 24,
    left: 8,
    color: "#8FFA09",
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: fonts["Poppins-Bold"],
  },
  whatsNewSection: {
    marginVertical: 20,
  },
  videoContainer: {
    position: "relative",
    marginRight: 16,
  },
  videoThumbnail: {
    width: 280,
    height: 180,
    borderRadius: 10,
  },
  playIconContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    alignItems: "center",
    marginVertical: 20,
  },
  footerText: {
    color: "#A0A0A0",
    fontSize: 12,
  },
  popularProductsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  popularProductsTitle: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginVertical: 8,
    paddingLeft: 10,
  },
  viewAll: {
    fontSize: 14,
    color: "white",
    fontWeight: "500",
    marginVertical: 12,
  },
  requestDesignButton: {
    backgroundColor: "#8FFA09", // Bright green
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8, // Rounded corners
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 12,
    marginTop: 16,
    shadowColor: "#8FFA09", // Subtle shadow for the button
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 4, // Shadow for Android
  },
  requestDesignButtonText: {
    color: "black", // Contrast text
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: fonts["Poppins-SemiBold"],
  },
});

export default Home;
