import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
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
        {/* <Text style={styles.title}>{item.title || "Brand Collaboration"}</Text> */}
        {/* <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            {item.buttonLabel || "Learn More"}
          </Text>
        </TouchableOpacity> */}
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <Text style={{ color: "#fff" }}>Image not available</Text>
        )}
      </Animated.View>
    );
  };

  return (
    <Animated.FlatList
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
    // backgroundColor:
    //   "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
    // // padding: 15,
    marginRight: ITEM_SPACING,
    justifyContent: "space-between",
    position: "relative",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  button: {
    backgroundColor: "#000",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  // image: {
  //   width: 60,
  //   height: 60,
  //   position: "absolute",
  //   right: 10,
  //   bottom: 10,
  // },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    resizeMode: "cover",
  },
});

export default HorizontalCarousel;
