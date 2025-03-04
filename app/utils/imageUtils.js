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
  // Only apply optimization on web
  if (Platform.OS !== 'web') {
    return imageUrl;
  }
  
  // Check for iOS in web browser using navigator.userAgent
  const isIOSWeb = Platform.OS === 'web' && 
    typeof navigator !== 'undefined' && 
    /iPad|iPhone|iPod/.test(navigator.userAgent) && 
    !window.MSStream;
    
  // If it's a remote URL and on iOS, we can add query params to request a smaller image
  if (imageUrl && imageUrl.startsWith('http') && isIOSWeb) {
    // For many CDNs, adding width/height params can return optimized images
    const separator = imageUrl.includes('?') ? '&' : '?';
    const width = options.width || 300; // Default optimized width
    return `${imageUrl}${separator}width=${width}&optimize=medium`;
  }
  
  return imageUrl;
};

// Helper function for image source with fallback
export const getImageSource = (imageUrl, options = {}) => {
  if (imageUrl) {
    // Apply optimization for web
    const optimizedUrl = Platform.OS === 'web' ? optimizeImageForWeb(imageUrl, options) : imageUrl;
    return { uri: optimizedUrl };
  }
  return getFallbackImageSource();
}; 