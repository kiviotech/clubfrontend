import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Animated,
  Dimensions,
} from "react-native";
import useBrandCollabStore from "../../src/store/useBrandCollabStore";
import { getBrandCollabs } from "../../src/api/repositories/brandCollabRepository";
import { MEDIA_BASE_URL } from "../../src/api/apiClient";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = 270;
const ITEM_SPACING = 10;

const HorizontalCarousel = () => {
  const { brandCollabs, setBrandCollabs } = useBrandCollabStore();
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchBrandCollabs = async () => {
      try {
        const response = await getBrandCollabs();
        setBrandCollabs(response.data.data);
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
      if (scrollRef.current && brandCollabs.length > 0) {
        currentIndex = (currentIndex + 1) % brandCollabs.length; // Loop back to the start
        scrollRef.current.scrollToOffset({
          offset: currentIndex * (ITEM_WIDTH + ITEM_SPACING),
          animated: true,
        });
      }
    }, 2000); // Slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [brandCollabs]);

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
      <Animated.View style={[styles.card, { transform: [{ scale }], opacity }]}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl  ||'https://example.com/fallback.png'}} style={styles.image} />
        ) : (
          <Text style={{ color: "#fff" }}>Image not available</Text>
        )}
      </Animated.View>
    );
  };

  return (
    <Animated.FlatList
      ref={scrollRef} // Reference to FlatList
      data={brandCollabs}
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
    />
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    paddingHorizontal: (width - ITEM_WIDTH) / 2,
  },
  card: {
    width: ITEM_WIDTH,
    height: 170,
    borderRadius: 10,
    marginRight: ITEM_SPACING,
    justifyContent: "space-between",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    resizeMode: "cover",
  },
});

export default HorizontalCarousel;
