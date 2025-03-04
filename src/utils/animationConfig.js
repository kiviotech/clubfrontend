import { Platform } from 'react-native';

// Helper function to get proper animation config based on platform
export const getAnimationConfig = (config) => {
  return {
    ...config,
    // Disable useNativeDriver on web platforms to prevent crashes
    useNativeDriver: Platform.OS !== 'web' && (config.useNativeDriver !== false),
  };
}; 