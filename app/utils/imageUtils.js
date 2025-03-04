import { Platform } from 'react-native';

// For components that expect a URI string
export const getFallbackImageUri = () => {
  console.log('[DEBUG] getFallbackImageUri called, platform:', Platform.OS);
  return Platform.OS === 'web' 
    ? '/assets/Picture2.png'
    : null; // Return null for native platforms
};

// For components that expect a source object
export const getFallbackImageSource = () => {
  console.log('[DEBUG] getFallbackImageSource called, platform:', Platform.OS);
  return Platform.OS === 'web'
    ? { uri: '/assets/Picture2.png' }
    : require('../../assets/Picture2.png');
};

// Helper function for image source with fallback
export const getImageSource = (imageUrl) => {
  console.log('[DEBUG] getImageSource called with imageUrl:', imageUrl);
  
  if (imageUrl) {
    console.log('[DEBUG] Using provided imageUrl');
    return { uri: imageUrl };
  }
  
  console.log('[DEBUG] Using fallback image');
  const fallbackSource = getFallbackImageSource();
  console.log('[DEBUG] Fallback source type:', typeof fallbackSource);
  return fallbackSource;
}; 