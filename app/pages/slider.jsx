import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
} from "react-native";
import useBrandCollabStore from "../../src/store/useBrandCollabStore";
import { getBrandCollabs } from "../../src/api/repositories/brandCollabRepository";
import { MEDIA_BASE_URL } from "../../src/api/apiClient";

// Shuffle function to randomize the array
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const { width } = Dimensions.get("window");
const ITEM_WIDTH = 365;
const ITEM_SPACING = 10;

const HorizontalCarousel = ({ direction = "left-to-right" }) => {
  const { brandCollabs, setBrandCollabs } = useBrandCollabStore();
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef(null);
  const [shuffledBrandCollabs, setShuffledBrandCollabs] = useState([]);

  useEffect(() => {
    const fetchBrandCollabs = async () => {
      try {
        const response = await getBrandCollabs();
        const shuffledData = shuffleArray(response.data.data);
        setBrandCollabs(shuffledData);
        setShuffledBrandCollabs(shuffledData);
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
      if (scrollRef.current && shuffledBrandCollabs.length > 0) {
        currentIndex = (currentIndex + 1) % shuffledBrandCollabs.length;
        scrollRef.current.scrollToOffset({
          offset: currentIndex * (ITEM_WIDTH + ITEM_SPACING),
          animated: true,
        });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [shuffledBrandCollabs]);

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
          <Image source={{ uri: imageUrl || 'https://example.com/fallback.png' }} style={styles.image} />
        ) : (
          <Text style={{ color: "#fff" }}>Image not available</Text>
        )}
      </Animated.View>
    );
  };

  return (
    <Animated.FlatList
      ref={scrollRef}
      data={shuffledBrandCollabs}
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
      // Adjust the scroll direction based on the `direction` prop
      scrollEventThrottle={16}
      inverted={direction === "right-to-left"} // Inverts the scroll direction for right to left
    />
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    // paddingLeft: 5,
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
});

export default HorizontalCarousel;
