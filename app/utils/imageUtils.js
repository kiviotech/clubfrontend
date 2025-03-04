import { Platform } from 'react-native';

// For components that expect a URI string
export const getFallbackImageUri = () => {
  return Platform.OS === 'web' 
    ? '/assets/Picture2.png'
    : null; // Return null for native platforms
};

// For components that expect a source object
export const getFallbackImageSource = () => {
  return Platform.OS === 'web'
    ? { uri: '/assets/Picture2.png' }
    : require('../../assets/Picture2.png');
};

// Helper function for image source with fallback
export const getImageSource = (imageUrl) => {
  if (imageUrl) {
    return { uri: imageUrl };
  }
  return getFallbackImageSource();
}; 