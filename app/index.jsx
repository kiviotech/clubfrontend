import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Video } from "expo-av";
import SignIn from "./(auth)/sign-in";

const { width, height } = Dimensions.get("window");

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    if (isVideoLoaded) {
      // Set a timeout to hide the splash after the video loads
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [isVideoLoaded]);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  if (showSplash) {
    return (
      <SafeAreaView style={styles.container}>
        <Video
          source={require("../assets/FrontScreen.mp4")} // Local video file
          style={styles.backgroundVideo}
          resizeMode="cover"
          shouldPlay
          isLooping
          onLoad={handleVideoLoad} // Callback for video load
          onError={(error) => {
            console.error("Video load error:", error);
            setIsVideoLoaded(false); // Handle video load error
          }}
        />
        <View style={styles.overlay}>
          {/* <Text style={styles.text}>
            {isVideoLoaded ? "Welcome to ClubUnplugged!" : "Loading..."}
          </Text> */}
        </View>

        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }

  return <SignIn />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black", // Ensure background is black
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
  },
  backgroundVideo: {
    width: width * 0.9, // 80% of screen width
    height: height * 0.5, // 40% of screen height
    borderRadius: 10, // Optional: Add rounded corners
    overflow: "hidden", // Ensure content doesn't overflow rounded corners
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay for text visibility
  },
  text: {
    color: "white",
    fontSize: 24,
    fontFamily: "Poppins-SemiBold", // Adjust font family as needed
  },
});

