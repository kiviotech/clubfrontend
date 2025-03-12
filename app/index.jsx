import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useRouter, useSegments } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';

// Keep splash screen visible until we navigate
SplashScreen.preventAutoHideAsync();

const App = () => {
  const router = useRouter();
  const segments = useSegments();
  const [hasNavigated, setHasNavigated] = useState(false);

  // Navigate directly to the main app on component mount
  useEffect(() => {
    // Prevent multiple navigation attempts
    if (hasNavigated) return;

    // Check if we're already on a different screen
    if (segments.length > 0 && segments[0] !== 'index') {
      console.log('Already navigated to:', segments.join('/'));
      SplashScreen.hideAsync().catch(e => console.error("Error hiding splash screen:", e));
      return;
    }

    // Hide the native splash screen
    const hideSplashAndNavigate = async () => {
      try {
        setHasNavigated(true);
        
        // Small delay to ensure smooth transition
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Hide the splash screen
        await SplashScreen.hideAsync();
        
        // Navigate to the main app using replace to prevent history stacking
        router.replace("/home");
      } catch (error) {
        console.error("Navigation error:", error);
        // Even if there's an error, try to navigate
        router.replace("/home)");
      }
    };

    hideSplashAndNavigate();
  }, [router, segments, hasNavigated]);

  // Simple loading container that will be briefly shown during transition
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});

export default App;
