import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Dimensions, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Video } from "expo-av";
import SignIn from "./(auth)/sign-in";
import { Asset } from "expo-asset";

const { width, height } = Dimensions.get("window");

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Preload video URI
  const videoUri = Asset.fromModule(require("../assets/FrontScreen.mp4")).uri;

  useEffect(() => {
    // Hide splash screen after timeout
    if (isVideoLoaded) {
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [isVideoLoaded]);

  const handleVideoLoad = () => {
    console.log("Video loaded");
    setIsVideoLoaded(true); // Trigger timeout after the video loads
  };

  // Debug log to ensure state updates
  useEffect(() => {
    console.log("Show splash:", showSplash);
  }, [showSplash]);

  if (showSplash) {
    return (
      <SafeAreaView style={styles.container}>
        {Platform.OS === "web" ? (
          <video
            src={videoUri}
            style={styles.backgroundVideoWeb}
            autoPlay
            loop
            muted
            onLoadedData={handleVideoLoad} // For web, use onLoadedData
          />
        ) : (
          <Video
            source={{ uri: videoUri }}
            style={styles.backgroundVideo}
            resizeMode="cover"
            shouldPlay
            isLooping
            onLoad={handleVideoLoad} // Callback for video load
            onError={(error) => {
              console.error("Video load error:", error);
            }}
          />
        )}
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }

  // Show SignIn screen after splash
  return <SignIn />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundVideo: {
    width: width * 0.9,
    height: height * 0.5,
    borderRadius: 10,
    overflow: "hidden",
  },
  backgroundVideoWeb: {
    width: "90%",
    height: "50%",
    borderRadius: 10,
    objectFit: "cover",
  },
});


// import React, { useEffect, useState } from "react";
// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Dimensions, Platform } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Video } from "expo-av";
// import { Asset } from "expo-asset";
// import SignIn from "./(auth)/sign-in";

// const { width, height } = Dimensions.get("window");

// export default function App() {
//   const [showSplash, setShowSplash] = useState(true);
//   const [isVideoLoaded, setIsVideoLoaded] = useState(false);

//   useEffect(() => {
//     if (isVideoLoaded) {
//       const timer = setTimeout(() => {
//         setShowSplash(false);
//       }, 3500); // Time to show splash screen
//       return () => clearTimeout(timer);
//     }
//   }, [isVideoLoaded]);

//   const handleVideoLoad = () => {
//     setIsVideoLoaded(true);
//   };

//   const videoUri = Asset.fromModule(require("../assets/FrontScreen.mp4")).uri;

//   // Show SignIn screen after splash
//   if (!showSplash) {
//     return <SignIn />;
//   }

//   // Splash screen with video
//   return (
//     <SafeAreaView style={styles.container}>
//       {Platform.OS === "web" ? (
//         <video
//           src={videoUri}
//           style={styles.backgroundVideoWeb}
//           autoPlay
//           loop
//           muted
//         />
//       ) : (
//         <Video
//           source={{ uri: videoUri }}
//           style={styles.backgroundVideo}
//           resizeMode="cover"
//           shouldPlay
//           isLooping
//           onLoad={handleVideoLoad}
//           onError={(error) => {
//             console.error("Video load error:", error);
//           }}
//         />
//       )}
//       <StatusBar style="auto" />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "black",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   backgroundVideo: {
//     width: width * 0.9,
//     height: height * 0.5,
//     borderRadius: 10,
//     overflow: "hidden",
//   },
//   backgroundVideoWeb: {
//     width: "90%",
//     height: "50%",
//     borderRadius: 10,
//     objectFit: "cover",
//   },
// });
