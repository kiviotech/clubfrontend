import React from "react";
import { View, StyleSheet, Platform, Dimensions } from "react-native";
import { Video } from "expo-av";
import { Asset } from "expo-asset";

const Loading = () => {
  // Load the video asset
  const videoUri = Asset.fromModule(require("../../assets/loading.mp4")).uri;

  // Get screen dimensions
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  // Calculate video size based on screen size, maintaining aspect ratio
  const videoSize = {
    width: screenWidth * 0.6, // Adjust width to 60% of screen width
    height: (screenWidth * 0.6 * 9) / 16, // Maintain a 16:9 aspect ratio
  };

  return (
    <View style={styles.container}>
      {Platform.OS === "web" ? (
        <video
          src={videoUri}
          style={{ ...styles.video, ...videoSize }} // Apply dynamic size for web
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <Video
          source={{ uri: videoUri }}
          style={{ ...styles.video, ...videoSize }} // Apply dynamic size for mobile
          resizeMode="contain"
          shouldPlay
          isLooping
          useNativeControls={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  video: {
    width: "100%", // Default to full width if needed
    height: 200,   // Default height, will be overridden dynamically
  },
});

export default Loading;
