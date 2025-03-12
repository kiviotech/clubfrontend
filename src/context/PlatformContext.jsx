import React, { createContext, useContext, useState, useEffect } from 'react';
import { Platform } from 'react-native';

// Create context with default values
const PlatformContext = createContext({
  isIOS: false,
  isIOSWeb: false,
  useReducedAnimations: false,
  isLowMemoryDevice: false,
  isSafari: false,
});

export const PlatformProvider = ({ children }) => {
  // Initialize state with basic platform detection
  const [platformState, setPlatformState] = useState({
    isIOS: Platform.OS === 'ios',
    isIOSWeb: false,
    useReducedAnimations: false,
    isLowMemoryDevice: false,
    isSafari: false,
  });

  useEffect(() => {
    // Only run this in web environment
    if (Platform.OS === 'web' && typeof navigator !== 'undefined') {
      try {
        // Detect iOS web
        const isIOSWeb = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        
        // Detect Safari browser
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        
        // Determine if we should use reduced animations
        // This is true for iOS web or if the user has requested reduced motion
        const prefersReducedMotion = typeof window !== 'undefined' && 
          window.matchMedia && 
          window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          
        // Check for low memory device (heuristic based on iOS + older device indicators)
        const isLowMemoryDevice = isIOSWeb && (
          // Check for indicators of older iOS devices
          /iPhone\s(5|6|7|8|SE)/.test(navigator.userAgent) ||
          // Or check for iPad older than iPad Pro
          (/iPad/.test(navigator.userAgent) && !/iPad\sPro/.test(navigator.userAgent))
        );
        
        // Update state with all platform information
        setPlatformState({
          isIOS: Platform.OS === 'ios',
          isIOSWeb,
          useReducedAnimations: isIOSWeb || prefersReducedMotion,
          isLowMemoryDevice,
          isSafari,
        });
        
        // Log platform detection for debugging
        if (isIOSWeb) {
          console.log('iOS web detected - optimizations enabled');
          console.log('Platform details:', {
            isIOSWeb,
            isSafari,
            useReducedAnimations: isIOSWeb || prefersReducedMotion,
            isLowMemoryDevice,
          });
        }
      } catch (error) {
        console.error('Error in platform detection:', error);
      }
    }
  }, []);

  return (
    <PlatformContext.Provider value={platformState}>
      {children}
    </PlatformContext.Provider>
  );
};

// Custom hook to use the platform context
export const usePlatform = () => {
  const context = useContext(PlatformContext);
  if (context === undefined) {
    throw new Error('usePlatform must be used within a PlatformProvider');
  }
  return context;
}; 