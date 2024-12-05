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
  Linking, // Import Linking for external URL navigation
} from "react-native";
import { useRouter } from "expo-router";
import useBrandCollabStore from "../../src/store/useBrandCollabStore";
import { getBrandCollabs } from "../../src/api/repositories/brandCollabRepository";
import { MEDIA_BASE_URL } from "../../src/api/apiClient";
import { getBrandById } from "../../src/api/repositories/brandRepository";
import { useBrandStore } from "../../src/store/brandStore";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = 365;
const ITEM_SPACING = 5;

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
        const data = response.data.data; // Use data as it is, no shuffling
        setBrandCollabs(data);
        setFetchedBrandCollabs(data);
      } catch (error) {
        console.error("Failed to fetch brand collabs:", error);
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
    }, 4000);

    return () => clearInterval(interval);
  }, [fetchedBrandCollabs]);

  const handleImagePress = async (index) => {
    // For index 0, navigate to the external URL
    if (index === 0) {
      const url = "https://new.express.adobe.com/webpage/cv645dfNQJYKt";
      try {
        await Linking.openURL(url); // Opens the URL in the default browser
      } catch (error) {
        console.error("Failed to open URL:", error);
      }
    } else if (index === 3 || index === 2 || index === 4|| index === 5) {
      // Existing code for index 3 (brand info)
      const brandId = "lagbzfc1r1ltzf7pobf893q4";
      if (brandId) {
        try {
          const response = await getBrandById(brandId);
          const brandData = response.data.data;
          const brandName = brandData.brand_name;
          const brandDescription = brandData.description;
          const brandImage = `${MEDIA_BASE_URL}${brandData.brand_logo.url}`;
          const id = brandData.id;

          setBrandById(brandData); // Store the fetched brand details in state
          setSelectedBrand(brandName);
          router.push({
            pathname: "/pages/brand_info",
            params: {
              brandName,
              brandDescription,
              brandImage,
              id,
            },
          });
        } catch (error) {
          console.error("Failed to fetch brand details:", error);
        }
      } else {
        console.warn("No brand ID found for this item");
      }
    }else if (index === 1) {
      // If index is 1, navigate to /pages/request-design
      router.push("/pages/request-design");
    }  else {
      // For other indices, use the route map to navigate
      const route = routeMap[index]; // Get the route from the map based on the index
      if (route) {
        router.push(route); // Navigate to the specific route
      } else {
        console.warn("No route defined for this item");
      }
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
          onPress={() => handleImagePress(index)} // Use the index to determine the route
          style={{ flex: 1 }}
          activeOpacity={0.9}
        >
           {index === 1 && (
          <Text style={[styles.textAboveImage, styles.textBackground]}>
          Contact us on WhatsApp: 1234567890
        </Text>
        )}
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl || "https://example.com/fallback.png" }}
              style={styles.image}
            />
          ) : (
            <Text style={{ color: "#fff" }}>Image not available</Text>
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <Animated.FlatList
      ref={scrollRef}
      data={fetchedBrandCollabs} // Use the fetched data
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
      inverted={direction === "right-to-left"} // Inverts the scroll direction for right to left
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
  textAboveImage: {
    position: "absolute",
    top: 120,
    left: 10,
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    zIndex: 1, // Ensure the text appears above the image
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5, // Optional: For rounded corners
  },
  textBackground: {
    backgroundColor: "#8FFA09", // Light green background
  },
});

export default HorizontalCarousel;
