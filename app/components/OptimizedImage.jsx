import React, { useState, useEffect, useRef } from 'react';
import { Image, Platform, StyleSheet } from 'react-native';
import { usePlatform } from '../../src/context/PlatformContext';
import { getImageSource } from '../utils/imageUtils';
import * as memoryManager from '../utils/memoryManager';

/**
 * OptimizedImage component that handles iOS Safari memory constraints
 * Features:
 * - Lazy loading for web
 * - Automatic unloading when off-screen
 * - Progressive loading (low quality placeholder)
 * - Memory usage monitoring
 * - Fallback handling
 */
const OptimizedImage = ({
  source,
  style,
  resizeMode = 'cover',
  priority = false,
  placeholder,
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [optimizedSource, setOptimizedSource] = useState(null);
  const imageRef = useRef(null);
  const { isIOSWeb, isLowMemoryDevice } = usePlatform();
  
  // Process the image source
  useEffect(() => {
    const processImageSource = async () => {
      try {
        // For iOS web, use a more aggressive approach to reduce memory usage
        if (isIOSWeb) {
          // If not a priority image and we're on a low memory device, use a very small image
          if (!priority && isLowMemoryDevice) {
            // For remote URLs, add width parameter to reduce size
            if (typeof source === 'string' && source.startsWith('http')) {
              const smallSource = { uri: `${source}?width=150&quality=60` };
              setOptimizedSource(smallSource);
              return;
            }
          }
        }
        
        // Get optimized image source
        const processedSource = await getImageSource(source, {
          width: style?.width || 300,
          height: style?.height || 300,
          optimizeForWeb: Platform.OS === 'web',
          lowQuality: isIOSWeb && !priority,
        });
        
        setOptimizedSource(processedSource);
        setHasError(false);
      } catch (error) {
        console.error('Error processing image source:', error);
        // Fallback to original source or a simple object if source is a string
        setOptimizedSource(typeof source === 'string' ? { uri: source } : source);
        setHasError(true);
      }
    };
    
    processImageSource();
    
    // Cleanup function to help with memory management
    return () => {
      if (isIOSWeb) {
        // Help garbage collection by explicitly removing references
        setOptimizedSource(null);
      }
    };
  }, [source, style?.width, style?.height, isIOSWeb, isLowMemoryDevice, priority]);
  
  // Set up intersection observer for web
  useEffect(() => {
    if (Platform.OS !== 'web' || !imageRef.current || priority) {
      return;
    }
    
    try {
      // Create intersection observer to detect when image is in viewport
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Image is in viewport, load it
              const img = entry.target;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.dataset.src = '';
              }
            } else if (isIOSWeb) {
              // Image is out of viewport and we're on iOS, unload it
              const img = entry.target;
              if (!img.dataset.src && img.src && !img.src.startsWith('data:')) {
                img.dataset.src = img.src;
                img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
              }
            }
          });
        },
        { rootMargin: '100px' } // Reduced from 200px to be more aggressive
      );
      
      // Observe the image element
      if (imageRef.current) {
        observer.observe(imageRef.current);
      }
      
      return () => {
        if (imageRef.current) {
          observer.unobserve(imageRef.current);
        }
        observer.disconnect();
      };
    } catch (error) {
      console.error('Error setting up intersection observer:', error);
    }
  }, [imageRef.current, priority, isIOSWeb]);
  
  // Handle image load
  const handleLoad = (event) => {
    setIsLoaded(true);
    
    // Call original onLoad handler if provided
    if (onLoad) {
      onLoad(event);
    }
    
    // Check memory usage after image load on iOS web
    if (isIOSWeb && memoryManager.isMemoryUsageHigh()) {
      console.log('Memory usage high after image load, attempting cleanup');
      memoryManager.forceGarbageCollection();
    }
  };
  
  // Handle image error
  const handleError = (event) => {
    console.error('Image load error:', source);
    setHasError(true);
    
    // Call original onError handler if provided
    if (onError) {
      onError(event);
    }
    
    // Use a tiny placeholder on error for iOS
    if (isIOSWeb && imageRef.current) {
      const img = imageRef.current;
      if (img.src && !img.src.startsWith('data:')) {
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
      }
    }
  };
  
  // If we're on web and it's an iOS device, use the web-optimized approach
  if (Platform.OS === 'web') {
    // For iOS web, use img tag with additional optimizations
    if (isIOSWeb) {
      // Use React Native's Image component which will render as img on web
      return (
        <Image
          ref={imageRef}
          source={optimizedSource || placeholder || source}
          style={[
            styles.image,
            style,
            !isLoaded && styles.loading,
            hasError && styles.error
          ]}
          resizeMode={resizeMode}
          onLoad={handleLoad}
          onError={handleError}
          // Add data attributes for the web version
          dataSet={{
            priority: priority ? 'true' : 'false',
            src: !priority ? (optimizedSource?.uri || '') : '',
            isEssential: priority ? 'true' : 'false',
          }}
          // Add loading attribute for browsers that support it
          loading={priority ? 'eager' : 'lazy'}
          {...props}
        />
      );
    }
    
    // For other web browsers, use standard Image component
    return (
      <Image
        source={optimizedSource || source}
        style={[styles.image, style, hasError && styles.error]}
        resizeMode={resizeMode}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    );
  }
  
  // For native platforms, use standard Image component
  return (
    <Image
      source={optimizedSource || source}
      style={[styles.image, style, hasError && styles.error]}
      resizeMode={resizeMode}
      onLoad={handleLoad}
      onError={handleError}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    backgroundColor: '#f0f0f0', // Light gray placeholder
  },
  loading: {
    opacity: 0.7,
  },
  error: {
    backgroundColor: '#ffdddd', // Light red to indicate error
  },
});

export default OptimizedImage;