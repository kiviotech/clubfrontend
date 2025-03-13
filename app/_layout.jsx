import React, { useEffect, useState, useCallback, useRef } from "react";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { Platform } from 'react-native';
import { PlatformProvider } from '../src/context/PlatformContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import * as memoryManager from './utils/memoryManager';
import * as ExpoSplashScreen from 'expo-splash-screen';
import * as debugUtils from './utils/debugUtils';

// Keep splash screen visible until fonts are loaded
SplashScreen.preventAutoHideAsync();
ExpoSplashScreen.preventAutoHideAsync();

// Simple iOS Safari optimizations
const applyIOSSafariOptimizations = () => {
  debugUtils.debugLog('Running on iOS Safari - applying essential optimizations');
  
  // Check if optimizations have already been applied
  if (window._iOSOptimizationsApplied) {
    debugUtils.debugLog('iOS optimizations already applied, skipping');
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
        debugUtils.logMemoryUsage();
        
        // If memory usage is critical, take action
        if (memoryManager.isMemoryUsageCritical()) {
          debugUtils.debugLog('Critical memory usage detected, attempting cleanup');
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
        debugUtils.debugLog('Page hidden, forcing garbage collection');
        memoryManager.forceGarbageCollection();
      }
    });
    
    // Prevent reload on iOS when pulling down
    document.body.style.overscrollBehavior = 'none';
    
  } catch (error) {
    debugUtils.logError('Error applying iOS Safari optimizations', error);
  }
};

const RootLayout = () => {
  // Add logging for app initialization
  debugUtils.debugLog('App initializing...');
  
  // Add logging for navigation events
  const routeNameRef = useRef();
  const navigationRef = useRef();
  
  // Track memory usage
  useEffect(() => {
    const logMemoryUsage = () => {
      debugUtils.logMemoryUsage();
    };
    
    const interval = setInterval(logMemoryUsage, 10000); // Log every 10 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  // Log when screens change
  const onReady = () => {
    if (navigationRef.current) {
      routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      debugUtils.logNavigation('Initial', routeNameRef.current);
    }
  };
  
  const onStateChange = () => {
    if (navigationRef.current) {
      const previousRouteName = routeNameRef.current;
      const currentRouteName = navigationRef.current.getCurrentRoute().name;
      
      if (previousRouteName !== currentRouteName) {
        debugUtils.logNavigation(previousRouteName, currentRouteName);
      }
      
      routeNameRef.current = currentRouteName;
    }
  };

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
      debugUtils.logError('Font loading error', error);
      // Don't throw the error, just log it to prevent crashes
      SplashScreen.hideAsync().catch(e => debugUtils.logError('Error hiding splash screen', e));
    }

    if (fontsLoaded) {
      // Fonts are loaded, let the index.jsx handle the splash screen
      debugUtils.debugLog('Fonts loaded successfully');
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
        debugUtils.logError('Error detecting platform', e);
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
    debugUtils.logError('[GLOBAL ERROR]', error);
  }, []);
  
  // Handle retry in a way that doesn't cause reloads
  const handleRetry = useCallback(() => {
    debugUtils.debugLog('Attempting to recover from error');
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
