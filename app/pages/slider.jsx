// import React, { useRef, useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   Animated,
//   Dimensions,
// } from "react-native";
// import useBrandCollabStore from "../../src/store/useBrandCollabStore";
// import { getBrandCollabs } from "../../src/api/repositories/brandCollabRepository";
// import { MEDIA_BASE_URL } from "../../src/api/apiClient";

// // Shuffle function to randomize the array
// const shuffleArray = (array) => {
//   const shuffled = [...array];
//   for (let i = shuffled.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//   }
//   return shuffled;
// };

// const { width } = Dimensions.get("window");
// const ITEM_WIDTH = 365;
// const ITEM_SPACING = 5;

// const HorizontalCarousel = ({ direction = "left-to-right" }) => {
//   const { brandCollabs, setBrandCollabs } = useBrandCollabStore();
//   const scrollX = useRef(new Animated.Value(0)).current;
//   const scrollRef = useRef(null);
//   const [shuffledBrandCollabs, setShuffledBrandCollabs] = useState([]);

//   useEffect(() => {
//     const fetchBrandCollabs = async () => {
//       try {
//         const response = await getBrandCollabs();
//         const shuffledData = shuffleArray(response.data.data);
//         setBrandCollabs(shuffledData);
//         setShuffledBrandCollabs(shuffledData);
//       } catch (error) {
//         console.error("Failed to fetch brand collabs:", error);
//       }
//     };

//     fetchBrandCollabs();
//   }, [setBrandCollabs]);

//   // Auto-slide effect
//   useEffect(() => {
//     let currentIndex = 0;
//     const interval = setInterval(() => {
//       if (scrollRef.current && shuffledBrandCollabs.length > 0) {
//         currentIndex = (currentIndex + 1) % shuffledBrandCollabs.length;
//         scrollRef.current.scrollToOffset({
//           offset: currentIndex * (ITEM_WIDTH + ITEM_SPACING),
//           animated: true,
//         });
//       }
//     }, 4000);

//     return () => clearInterval(interval);
//   }, [shuffledBrandCollabs]);

//   const renderItem = ({ item, index }) => {
//     const inputRange = [
//       (index - 1) * (ITEM_WIDTH + ITEM_SPACING),
//       index * (ITEM_WIDTH + ITEM_SPACING),
//       (index + 1) * (ITEM_WIDTH + ITEM_SPACING),
//     ];

//     const scale = scrollX.interpolate({
//       inputRange,
//       outputRange: [0.8, 1, 0.8],
//       extrapolate: "clamp",
//     });

//     const opacity = scrollX.interpolate({
//       inputRange,
//       outputRange: [0.7, 1, 0.7],
//       extrapolate: "clamp",
//     });

//     const imageUrl = item.collab_image?.[0]?.url
//       ? `${MEDIA_BASE_URL}${item.collab_image[0].url}`
//       : null;

//     return (
//       <Animated.View style={[styles.card, { transform: [{ scale }], opacity }]}>
//         {imageUrl ? (
//           <Image source={{ uri: imageUrl || 'https://example.com/fallback.png' }} style={styles.image} />
//         ) : (
//           <Text style={{ color: "#fff" }}>Image not available</Text>
//         )}
//       </Animated.View>
//     );
//   };

//   return (
//     <Animated.FlatList
//       ref={scrollRef}
//       data={shuffledBrandCollabs}
//       renderItem={renderItem}
//       keyExtractor={(item) => item.id.toString()}
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       contentContainerStyle={styles.carouselContainer}
//       snapToInterval={ITEM_WIDTH + ITEM_SPACING}
//       decelerationRate="fast"
//       bounces={false}
//       onScroll={Animated.event(
//         [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//         { useNativeDriver: true }
//       )}
//       // Adjust the scroll direction based on the `direction` prop
//       scrollEventThrottle={16}
//       inverted={direction === "right-to-left"} // Inverts the scroll direction for right to left
//     />
//   );
// };

// const styles = StyleSheet.create({
//   carouselContainer: {
//     justifyContent: "center",
//     alignItems: "flex-start",
//     // paddingLeft: 5,
//   },
//   card: {
//     width: ITEM_WIDTH,
//     height: 190,
//     borderRadius: 10,

//     marginRight: ITEM_SPACING,
//     justifyContent: "center",
//     position: "relative",
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 10,
//     resizeMode: "cover",
//   },
// });

// export default HorizontalCarousel;

import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import useBrandCollabStore from "../../src/store/useBrandCollabStore";
import { getBrandCollabs } from "../../src/api/repositories/brandCollabRepository";
import { MEDIA_BASE_URL } from "../../src/api/apiClient";
import { getBrandById } from "../../src/api/repositories/brandRepository";
import { useBrandStore } from "../../src/store/brandStore";

const { width } = Dimensions.get("window"); // Fetch the screen width
const ITEM_SPACING = 5; // Spacing between items
const ITEM_WIDTH = width * 0.93; 

const HorizontalCarousel = ({ direction = "left-to-right" }) => {
  const { brandCollabs, setBrandCollabs } = useBrandCollabStore();
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef(null);
  const [fetchedBrandCollabs, setFetchedBrandCollabs] = useState([]);
  const router = useRouter();
  const [brandById, setBrandById] = useState(null);
  const setSelectedBrand = useBrandStore((state) => state.setSelectedBrand);

  useEffect(() => {
    const fetchBrandCollabs = async () => {
      try {
        const response = await getBrandCollabs();
        const data = response.data.data;
        setBrandCollabs(data);
        setFetchedBrandCollabs(data);
        
      } catch (error) {
        // console.error("Failed to fetch brand collabs:", error);
      }
    };

    fetchBrandCollabs();
  }, [setBrandCollabs]);

  // Auto-slide effect
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (scrollRef.current && fetchedBrandCollabs.length > 0) {
        currentIndex = (currentIndex + 1) % fetchedBrandCollabs.length;
        scrollRef.current.scrollToOffset({
          offset: currentIndex * (ITEM_WIDTH + ITEM_SPACING),
          animated: true,
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [fetchedBrandCollabs]);

  const openWhatsApp = () => {
    const phoneNumber = "+917788920072"; // Replace with your WhatsApp phone number
    const message = "Hello, I am interested in your brand collaborations.";
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;

    Linking.openURL(url).catch(() => {
      Alert.alert(
        "Error",
        "WhatsApp is not installed on your device. Please install it to proceed."
      );
    });
  };


  const handleImagePress = async (index) => {
    if (index === 0) {
      // const url = "https://new.express.adobe.com/webpage/cv645dfNQJYKt";
      // try {
      //   await Linking.openURL(url);
      // } catch (error) {
      //   console.error("Failed to open URL:", error);
      // }
      // router.push("/pages/request-design");
    } else if (index === 4) {
      router.push("/pages/request-design");
    } else if (index === 1 || index === 2 || index === 3) {
      const brandId = "lagbzfc1r1ltzf7pobf893q4";
      if (brandId) {
        try {
          const response = await getBrandById(brandId);
          // console.log(response.data.data.brand_poster[0].url)
          const brandData = response.data.data;
          const brandName = brandData.brand_name;
          const brandDescription = brandData.description;
          const brandImage = `${MEDIA_BASE_URL}${brandData.brand_logo.url}`;
          const brandPoster = `${MEDIA_BASE_URL}${brandData.brand_poster[0].url}`;
          const id = brandData.id;
          

          setBrandById(brandData);
          setSelectedBrand(brandName);
          router.push({
            pathname: "/pages/brand_info",
            params: {
              brandName,
              brandDescription,
              brandImage,
              brandPoster,
              id,
            },
          });
        } catch (error) {
          // console.error("Failed to fetch brand details:", error);
        }
      }
    }else if(index === 5){
      const brandId = "o3palnwfu9qs18guh09a1it1";
      if (brandId) {
        try {
          const response = await getBrandById(brandId);
          // console.log(response.data.data.brand_poster[0].url)
          const brandData = response.data.data;
          const brandName = brandData.brand_name;
          const brandDescription = brandData.description;
          const brandImage = `${MEDIA_BASE_URL}${brandData.brand_logo.url}`;
          const brandPoster = `${MEDIA_BASE_URL}${brandData.brand_poster[0].url}`;
          const id = brandData.id;
          

          setBrandById(brandData);
          setSelectedBrand(brandName);
          router.push({
            pathname: "/pages/brand_info",
            params: {
              brandName,
              brandDescription,
              brandImage,
              brandPoster,
              id,
            },
          });
        } catch (error) {
          // console.error("Failed to fetch brand details:", error);
        }
      }
    } 
    else {
      // console.warn("No action defined for this item");
    }
  };

  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * (ITEM_WIDTH + ITEM_SPACING),
      index * (ITEM_WIDTH + ITEM_SPACING),
      (index + 1) * (ITEM_WIDTH + ITEM_SPACING),
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: "clamp",
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.7, 1, 0.7],
      extrapolate: "clamp",
    });

    const imageUrl = item.collab_image?.[0]?.url
      ? `${MEDIA_BASE_URL}${item.collab_image[0].url}`
      : null;

    return (
      <Animated.View
        style={[styles.card, { transform: [{ scale }], opacity }]}
      >
        <TouchableOpacity
          onPress={() => handleImagePress(index)}
          style={{ flex: 1 }}
          activeOpacity={0.9}
        >
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl || "https://example.com/fallback.png" }}
              style={styles.image}
            />
          ) : (
            <Text style={{ color: "#fff" }}>Image not available</Text>
          )}
        </TouchableOpacity>
        {index === 0 && (
          <TouchableOpacity style={styles.whatsappButton} onPress={openWhatsApp}>
            <Text>Contact us</Text>
            <Image
              source={require("../../assets/whatsappIcon.png")} // Replace with your WhatsApp icon path
              style={styles.whatsappIcon}
            />
          </TouchableOpacity>
        )}
      </Animated.View>
    );
  };

  return (
    <Animated.FlatList
      ref={scrollRef}
      data={fetchedBrandCollabs}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.carouselContainer}
      snapToInterval={ITEM_WIDTH + ITEM_SPACING}
      decelerationRate="fast"
      bounces={false}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: true }
      )}
      scrollEventThrottle={16}
      inverted={direction === "right-to-left"}
    />
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
  card: {
    width: ITEM_WIDTH,
    height: 190,
    borderRadius: 10,
    marginRight: ITEM_SPACING,
    justifyContent: "center",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    resizeMode: "cover",
  },
  whatsappButton: {
    position: "absolute",
    bottom: 40,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#8FFA09", // WhatsApp green color
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    elevation: 5, // Adds shadow for depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  whatsappIcon: {
    width: 24,
    height: 24,
    marginLeft: 8,
    resizeMode: "contain", // Ensures the icon retains its aspect ratio
  },
  whatsappText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default HorizontalCarousel;
