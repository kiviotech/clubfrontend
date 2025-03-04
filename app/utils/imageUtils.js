import { Platform } from 'react-native';

// For web, return a direct path to the asset in the web build
export const getFallbackImageUri = () => {
  return '/assets/Picture2.png';
};

// For components that expect a source object
export const getFallbackImageSource = () => {
  return { uri: '/assets/Picture2.png' };
};

// Helper function for image source with fallback
export const getImageSource = (imageUrl) => {
  if (imageUrl) {
    return { uri: imageUrl };
  }
  return getFallbackImageSource();
}; 