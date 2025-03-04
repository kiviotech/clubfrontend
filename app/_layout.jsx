import React, { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { ErrorBoundary } from 'react-error-boundary';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { PlatformProvider } from '../src/context/PlatformContext';

SplashScreen.preventAutoHideAsync();

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

  useEffect(() => {
    if (error) {
      throw error;
    }

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }

    if (Platform.OS === 'web') {
      console.log('Running on web platform');
      // Add special handling for iOS Safari
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      if (isIOS) {
        console.log('Running on iOS Safari');
        // Reduce animations or special handling for iOS
        console.log('Running on iOS Safari - applying optimizations');
        
        // Apply iOS Safari specific optimizations
        // 1. Limit animation frame rate
        if (window.requestAnimationFrame) {
          const originalRAF = window.requestAnimationFrame;
          window.requestAnimationFrame = callback => {
            return originalRAF(() => {
              if (typeof callback === 'function') callback();
            });
          };
        }
        
        // 2. Add iOS-specific CSS to document
        const style = document.createElement('style');
        style.innerHTML = `
          * {
            -webkit-overflow-scrolling: touch;
          }
          img {
            -webkit-user-select: none;
          }
        `;
        document.head.appendChild(style);

        // Add this section to observe images and unload those not in view
        setTimeout(() => {
          try {
            const observer = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                if (entry.target instanceof HTMLImageElement) {
                  if (!entry.isIntersecting) {
                    // Lower resolution of off-screen images to save memory
                    if (!entry.target._originalSrc) {
                      entry.target._originalSrc = entry.target.src;
                    }
                    entry.target.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; // 1px transparent GIF
                  } else if (entry.target._originalSrc) {
                    // Restore original when back in view
                    entry.target.src = entry.target._originalSrc;
                  }
                }
              });
            }, { rootMargin: '200px' });
            
            // Observe all images
            document.querySelectorAll('img').forEach(img => {
              observer.observe(img);
            });
            
            // Periodically check for new images
            const checkInterval = setInterval(() => {
              document.querySelectorAll('img:not([observed])').forEach(img => {
                img.setAttribute('observed', 'true');
                observer.observe(img);
              });
            }, 2000);
            
            return () => {
              clearInterval(checkInterval);
              observer.disconnect();
            };
          } catch (e) {
            console.error('Error setting up IntersectionObserver', e);
          }
        }, 1000);

        // Global config for iOS Safari
        window.iosSafariConfig = {
          // Limit the number of simultaneous network requests
          maxConcurrentRequests: 4,
          // Limit images displayed at once
          maxImagesPerScreen: 6,
          // Throttle animations
          reduceAnimations: true
        };
        
        // Patch fetch to limit concurrent requests
        const originalFetch = window.fetch;
        let activeRequests = 0;
        const requestQueue = [];
        
        window.fetch = function(...args) {
          if (activeRequests >= window.iosSafariConfig.maxConcurrentRequests) {
            // Queue this request for later
            return new Promise((resolve) => {
              requestQueue.push(() => {
                originalFetch(...args).then(resolve);
              });
            });
          }
          
          activeRequests++;
          return originalFetch(...args).finally(() => {
            activeRequests--;
            if (requestQueue.length > 0) {
              const nextRequest = requestQueue.shift();
              nextRequest();
            }
          });
        };

        // Monitor large network responses
        const originalXHROpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function(...args) {
          this.addEventListener('load', function() {
            if (this.responseText && this.responseText.length > 1000000) {
              console.warn('Large XHR response detected:', 
                Math.round(this.responseText.length / 1024), 'KB');
            }
          });
          return originalXHROpen.apply(this, args);
        };

        // Add viewport meta tag with specific settings for iOS Safari
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover, shrink-to-fit=no';
        document.head.appendChild(meta);
        
        // Force hardware acceleration
        const styleHardwareAccel = document.createElement('style');
        styleHardwareAccel.innerHTML = `
          * {
            -webkit-transform: translateZ(0);
            -moz-transform: translateZ(0);
            -ms-transform: translateZ(0);
            -o-transform: translateZ(0);
            transform: translateZ(0);
            -webkit-backface-visibility: hidden;
            -moz-backface-visibility: hidden;
            -ms-backface-visibility: hidden;
            backface-visibility: hidden;
            -webkit-perspective: 1000;
            -moz-perspective: 1000;
            -ms-perspective: 1000;
            perspective: 1000;
          }
        `;
        document.head.appendChild(styleHardwareAccel);
      }
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <PlatformProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{headerShown: false}} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="pages" options={{ headerShown: false }} />
        </Stack>
      </PlatformProvider>
    </ErrorBoundary>
  );
};

function ErrorFallback({ error }) {
  console.error('[GLOBAL ERROR]', error);
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorTitle}>Something went wrong</Text>
      <Text style={styles.errorMessage}>{error.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#222',
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff5252',
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

export default RootLayout;
