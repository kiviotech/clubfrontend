import React, { useEffect, useState, useCallback } from "react";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { Platform } from 'react-native';
import { PlatformProvider } from '../src/context/PlatformContext';
import ErrorBoundary from './components/ErrorBoundary';
import * as memoryManager from './utils/memoryManager';

// Keep splash screen visible until fonts are loaded
SplashScreen.preventAutoHideAsync();

// Simple iOS Safari optimizations
const applyIOSSafariOptimizations = () => {
  console.log('Running on iOS Safari - applying essential optimizations');
  
  // Check if optimizations have already been applied
  if (window._iOSOptimizationsApplied) {
    console.log('iOS optimizations already applied, skipping');
    return;
  }
  
  try {
    // 1. Add iOS-specific CSS to document
    const style = document.createElement('style');
    style.innerHTML = `
      * {
        -webkit-overflow-scrolling: touch;
      }
      img {
        -webkit-user-select: none;
        max-height: 100vh;
      }
      body {
        -webkit-text-size-adjust: 100%;
      }
      * {
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
      }
    `;
    document.head.appendChild(style);
    
    // 2. Set viewport meta for iOS
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover';
    document.head.appendChild(meta);
    
    // 3. Monitor memory usage
    if (window.performance && window.performance.memory) {
      const memoryMonitorId = setInterval(() => {
        const used = window.performance.memory.usedJSHeapSize;
        console.log(`Memory usage: ${Math.round(used / 1048576)}MB`);
        
        // If memory usage is critical, take action
        if (used > 250 * 1048576) { // Over 250MB
          console.warn('Critical memory usage detected, attempting cleanup');
          memoryManager.forceGarbageCollection();
        }
      }, 30000); // Check every 30 seconds
      
      // Store interval ID for cleanup
      window._memoryMonitorId = memoryMonitorId;
    }
    
    // Mark optimizations as applied
    window._iOSOptimizationsApplied = true;
    
    // Add event listener for page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        // Page is hidden, force garbage collection
        memoryManager.forceGarbageCollection();
      }
    });
    
    // Prevent reload on iOS when pulling down
    document.body.style.overscrollBehavior = 'none';
    
  } catch (error) {
    console.error('Error applying iOS Safari optimizations:', error);
  }
};

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });
  
  const [optimizationsApplied, setOptimizationsApplied] = useState(false);

  // Handle font loading and iOS optimizations
  useEffect(() => {
    if (error) {
      console.error('Font loading error:', error);
      // Don't throw the error, just log it to prevent crashes
      SplashScreen.hideAsync().catch(e => console.error('Error hiding splash screen:', e));
    }

    if (fontsLoaded) {
      // Fonts are loaded, let the index.jsx handle the splash screen
      console.log('Fonts loaded successfully');
    }

    // Apply iOS Safari optimizations only once
    if (!optimizationsApplied && Platform.OS === 'web') {
      try {
        // Check for iOS Safari
        const isIOS = typeof navigator !== 'undefined' && 
          /iPad|iPhone|iPod/.test(navigator.userAgent) && 
          !window.MSStream;
          
        if (isIOS) {
          applyIOSSafariOptimizations();
          setOptimizationsApplied(true);
        }
      } catch (e) {
        console.error('Error detecting platform:', e);
      }
    }
    
    // Cleanup function
    return () => {
      if (Platform.OS === 'web' && window._memoryMonitorId) {
        clearInterval(window._memoryMonitorId);
      }
    };
  }, [fontsLoaded, error, optimizationsApplied]);

  // Handle errors in a way that doesn't crash the app
  const handleError = useCallback((error, errorInfo) => {
    console.error('[GLOBAL ERROR]', error, errorInfo);
  }, []);
  
  // Handle retry in a way that doesn't cause reloads
  const handleRetry = useCallback(() => {
    console.log('Attempting to recover from error');
    if (Platform.OS === 'web') {
      memoryManager.forceGarbageCollection();
    }
  }, []);

  // If fonts aren't loaded yet, return null to keep the splash screen visible
  if (!fontsLoaded && !error) return null;

  return (
    <ErrorBoundary
      onError={handleError}
      onRetry={handleRetry}
    >
      <PlatformProvider>
        <Stack 
          screenOptions={{ 
            animation: 'fade',
            headerShown: false
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="pages" />
        </Stack>
      </PlatformProvider>
    </ErrorBoundary>
  );
};

export default RootLayout;
