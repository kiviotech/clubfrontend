import React, { useRef, useEffect, useState, useCallback, memo } from "react";
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
  Platform,
  InteractionManager
} from "react-native";
import { useRouter } from "expo-router";
import useBrandCollabStore from "../../src/store/useBrandCollabStore";
import { getBrandCollabs } from "../../src/api/repositories/brandCollabRepository";
import { MEDIA_BASE_URL } from "../../src/api/apiClient";
import { getBrandById } from "../../src/api/repositories/brandRepository";
import { useBrandStore } from "../../src/store/brandStore";
import { getImageSource } from '../utils/imageUtils';
import { ErrorBoundary } from 'react-error-boundary';

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
  const intervalRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch brand collabs with proper error handling
  useEffect(() => {
    const fetchBrandCollabs = async () => {
      try {
        setIsLoading(true);
        const response = await getBrandCollabs();
        const data = response.data.data;
        
        // Run after interactions to prevent UI blocking
        InteractionManager.runAfterInteractions(() => {
          setBrandCollabs(data);
          setFetchedBrandCollabs(data);
          setIsLoading(false);
        });
      } catch (error) {
        console.error("Failed to fetch brand collabs:", error);
        setIsLoading(false);
      }
    };

    fetchBrandCollabs();
  }, [setBrandCollabs]);

  // Auto-slide effect with proper cleanup
  useEffect(() => {
    let currentIndex = 0;
    
    // Only start the interval if we have items to display
    if (fetchedBrandCollabs.length > 0) {
      // Clear any existing interval first
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      intervalRef.current = setInterval(() => {
        if (scrollRef.current) {
          currentIndex = (currentIndex + 1) % fetchedBrandCollabs.length;
          scrollRef.current.scrollToOffset({
            offset: currentIndex * (ITEM_WIDTH + ITEM_SPACING),
            animated: true,
          });
        }
      }, 5000);
    }

    // Clean up the interval when component unmounts
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [fetchedBrandCollabs]);

  const openWhatsApp = useCallback(() => {
    const phoneNumber = "+919611717711"; // Replace with your WhatsApp phone number
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
  }, []);

  const handleImagePress = useCallback(async (index) => {
    try {
      if (index === 5) {
        router.push("/pages/GalleryPage");
      } else if (index === 3) {
        router.push("/pages/request-design");
      } else if (index === 1 || index === 2 || index === 4) {
        const brandId = index === 4 ? "o3palnwfu9qs18guh09a1it1" : "lagbzfc1r1ltzf7pobf893q4";
        
        if (brandId) {
          try {
            const response = await getBrandById(brandId);
            const brandData = response.data.data;
            const brandName = brandData.brand_name;
            const brandDescription = brandData.description;
            const brandImage = `${MEDIA_BASE_URL}${brandData.brand_logo.url}`;
            const brandPoster = `${MEDIA_BASE_URL}${brandData.brand_poster[0].url}`;
            const id = brandData.id;
            
            // Update state after interactions to prevent UI blocking
            InteractionManager.runAfterInteractions(() => {
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
            });
          } catch (error) {
            console.error("Failed to fetch brand details:", error);
          }
        }
      }
    } catch (error) {
      console.error("Navigation error:", error);
    }
  }, [router, setBrandById, setSelectedBrand]);

  const renderItem = useCallback(({ item, index }) => {
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

    const imageUrl = item.brand_collab_image?.url
      ? `${MEDIA_BASE_URL}${item.brand_collab_image.url}`
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
          <Image
            source={{ uri: imageUrl || '/assets/Picture2.png' }}
            style={styles.image}
            onError={(e) => console.log('Image loading error:', e.nativeEvent.error)}
            // Add default placeholder while loading
            defaultSource={require("../../assets/placeholder.png")}
            // Improve image loading performance
            progressiveRenderingEnabled={true}
            fadeDuration={300}
          />
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
  }, [handleImagePress, openWhatsApp, scrollX]);

  // Show loading state
  if (isLoading && fetchedBrandCollabs.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ErrorBoundary FallbackComponent={({ error }) => (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading slider: {error.message}</Text>
      </View>
    )}>
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
          { useNativeDriver: Platform.OS !== 'web' }
        )}
        scrollEventThrottle={16}
        inverted={direction === "right-to-left"}
        // Performance optimizations
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={5}
        removeClippedSubviews={true}
      />
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
  card: {
    width: ITEM_WIDTH,
    height: 180,
    borderRadius: 10,
    overflow: "hidden",
    marginHorizontal: ITEM_SPACING / 2,
    backgroundColor: "#333",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  whatsappButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#25D366",
    borderRadius: 20,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  whatsappIcon: {
    width: 20,
    height: 20,
    marginLeft: 5,
  },
  errorContainer: {
    padding: 20,
    backgroundColor: "#ffeeee",
    borderRadius: 10,
    marginVertical: 10,
  },
  errorText: {
    color: "#cc0000",
    textAlign: "center",
  },
  loadingContainer: {
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 10,
  },
  loadingText: {
    color: "#fff",
    fontSize: 16,
  },
});

// Use memo to prevent unnecessary re-renders
export default memo(HorizontalCarousel);
