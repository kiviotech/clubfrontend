import { Platform } from 'react-native';

export const getAnimationConfig = (config) => ({
  ...config,
  useNativeDriver: Platform.OS !== 'web',
}); 