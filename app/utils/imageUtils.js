import { Platform } from 'react-native';

// For web, return a direct path to the asset in the web build
export const getFallbackImageUri = () => {
  return '/assets/Picture2.png';
};

// For components that expect a source object
export const getFallbackImageSource = () => {
  return { uri: '/assets/Picture2.png' };
};

// Add this function to optimize image loading on iOS - without hook dependency
export const optimizeImageForWeb = (imageUrl, options = {}) => {
  // Early return if not on web platform
  if (Platform.OS !== 'web') {
    return imageUrl;
  }
  
  // Check for iOS in web browser
  const isIOSWeb = Platform.OS === 'web' && 
    typeof navigator !== 'undefined' && 
    /iPad|iPhone|iPod/.test(navigator.userAgent) && 
    !window.MSStream;
    
  // Always initialize optimizedUrl
  let optimizedUrl = imageUrl; 
  
  // Only modify URLs for iOS web and if URL exists and is a remote URL
  if (imageUrl && typeof imageUrl === 'string' && imageUrl.startsWith('http') && isIOSWeb) {
    try {
      const separator = imageUrl.includes('?') ? '&' : '?';
      const width = options.width || 300;
      optimizedUrl = `${imageUrl}${separator}width=${width}&optimize=medium`;
    } catch (error) {
      console.error('Error optimizing image URL:', error);
      // Fall back to original URL on error
      optimizedUrl = imageUrl;
    }
  }
  
  return optimizedUrl;
};

// Helper function for image source with fallback
export const getImageSource = (imageUrl, options = {}) => {
  try {
    if (imageUrl) {
      // Apply optimization for web with safety checks
      let finalUrl = imageUrl;
      
      if (Platform.OS === 'web') {
        finalUrl = optimizeImageForWeb(imageUrl, options) || imageUrl;
      }
      
      return { uri: finalUrl };
    }
    return getFallbackImageSource();
  } catch (error) {
    console.error('Error in getImageSource:', error);
    return getFallbackImageSource();
  }
}; 