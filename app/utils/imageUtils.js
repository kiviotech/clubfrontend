import { Platform } from 'react-native';
import { Image } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { MEDIA_BASE_URL } from '../../src/api/apiClient';

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

// Cache configuration
const CACHE_FOLDER = `${FileSystem.cacheDirectory}images/`;
const DEFAULT_CACHE_TIME = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

/**
 * Ensures the cache directory exists
 */
const ensureCacheDirExists = async () => {
  try {
    const dirInfo = await FileSystem.getInfoAsync(CACHE_FOLDER);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(CACHE_FOLDER, { intermediates: true });
    }
  } catch (error) {
    console.error('Error creating cache directory:', error);
  }
};

/**
 * Generates a cache key for an image URL
 * @param {string} url - The image URL
 * @returns {string} - The cache key
 */
const getCacheKey = (url) => {
  return url
    .replace(/[^a-zA-Z0-9]/g, '')
    .toLowerCase()
    .substring(0, 50);
};

/**
 * Gets the cached file path for an image URL
 * @param {string} url - The image URL
 * @returns {string} - The cached file path
 */
const getCachedFilePath = (url) => {
  const key = getCacheKey(url);
  return `${CACHE_FOLDER}${key}`;
};

/**
 * Checks if an image is cached and not expired
 * @param {string} url - The image URL
 * @param {number} maxAge - Maximum age of the cache in milliseconds
 * @returns {Promise<boolean>} - Whether the image is cached and not expired
 */
export const isImageCached = async (url, maxAge = DEFAULT_CACHE_TIME) => {
  try {
    if (Platform.OS === 'web') {
      return false; // No caching on web
    }
    
    const filePath = getCachedFilePath(url);
    const fileInfo = await FileSystem.getInfoAsync(filePath);
    
    if (!fileInfo.exists) {
      return false;
    }
    
    // Check if the cache is expired
    if (maxAge > 0) {
      const now = new Date().getTime();
      const modificationTime = fileInfo.modificationTime * 1000; // Convert to milliseconds
      return now - modificationTime < maxAge;
    }
    
    return true;
  } catch (error) {
    console.error('Error checking image cache:', error);
    return false;
  }
};

/**
 * Caches an image from a URL
 * @param {string} url - The image URL
 * @returns {Promise<string>} - The cached file path
 */
export const cacheImage = async (url) => {
  try {
    if (Platform.OS === 'web') {
      return url; // No caching on web
    }
    
    await ensureCacheDirExists();
    const filePath = getCachedFilePath(url);
    
    // Download the image to the cache
    const downloadResult = await FileSystem.downloadAsync(url, filePath);
    
    if (downloadResult.status === 200) {
      return filePath;
    }
    
    return url;
  } catch (error) {
    console.error('Error caching image:', error);
    return url;
  }
};

/**
 * Gets the source URI for an image, using cache if available
 * @param {string} url - The image URL
 * @returns {Promise<string>} - The source URI
 */
export const getImageSourceCached = async (url) => {
  try {
    if (!url) {
      return null;
    }
    
    // Handle relative URLs
    if (url.startsWith('/')) {
      url = `${MEDIA_BASE_URL}${url}`;
    }
    
    if (Platform.OS === 'web') {
      return url; // No caching on web
    }
    
    // Check if the image is cached
    const isCached = await isImageCached(url);
    
    if (isCached) {
      return getCachedFilePath(url);
    }
    
    // Cache the image
    return await cacheImage(url);
  } catch (error) {
    console.error('Error getting image source:', error);
    return url;
  }
};

/**
 * Clears the image cache
 * @returns {Promise<void>}
 */
export const clearImageCache = async () => {
  try {
    if (Platform.OS === 'web') {
      return; // No caching on web
    }
    
    const dirInfo = await FileSystem.getInfoAsync(CACHE_FOLDER);
    if (dirInfo.exists) {
      await FileSystem.deleteAsync(CACHE_FOLDER);
      await ensureCacheDirExists();
    }
  } catch (error) {
    console.error('Error clearing image cache:', error);
  }
};

/**
 * Preloads an array of images
 * @param {Array<string>} urls - Array of image URLs to preload
 * @returns {Promise<void>}
 */
export const preloadImages = async (urls) => {
  try {
    if (Platform.OS === 'web' || !urls || !urls.length) {
      return;
    }
    
    await ensureCacheDirExists();
    
    // Preload images in parallel
    await Promise.all(
      urls.map(async (url) => {
        if (!url) return;
        
        // Handle relative URLs
        if (url.startsWith('/')) {
          url = `${MEDIA_BASE_URL}${url}`;
        }
        
        // Check if already cached
        const isCached = await isImageCached(url);
        if (!isCached) {
          await cacheImage(url);
        }
      })
    );
  } catch (error) {
    console.error('Error preloading images:', error);
  }
};

/**
 * Gets dimensions of a remote image
 * @param {string} url - The image URL
 * @returns {Promise<{width: number, height: number}>} - The image dimensions
 */
export const getImageDimensions = (url) => {
  return new Promise((resolve, reject) => {
    Image.getSize(
      url,
      (width, height) => {
        resolve({ width, height });
      },
      (error) => {
        console.error('Error getting image dimensions:', error);
        reject(error);
      }
    );
  });
};

/**
 * Calculates the aspect ratio of an image
 * @param {string} url - The image URL
 * @returns {Promise<number>} - The aspect ratio (width / height)
 */
export const getImageAspectRatio = async (url) => {
  try {
    const { width, height } = await getImageDimensions(url);
    return width / height;
  } catch (error) {
    console.error('Error calculating aspect ratio:', error);
    return 1; // Default to square aspect ratio
  }
};

/**
 * Gets the optimized image URL based on the context (list or detail view)
 * @param {Object} image - The image object from the API
 * @param {string} context - The context ('list', 'thumbnail', 'detail', or specific size like 'small', 'medium', 'large')
 * @returns {string} - The optimized image URL
 */
export const getOptimizedImageUrl = (image, context = 'detail') => {
  try {
    if (!image) {
      return null;
    }

    // If image is just a string URL, return it
    if (typeof image === 'string') {
      return image.startsWith('http') ? image : `${MEDIA_BASE_URL}${image}`;
    }

    // Handle case where image might be an array
    if (Array.isArray(image) && image.length > 0) {
      return getOptimizedImageUrl(image[0], context);
    }

    // If image has formats, select the appropriate one based on context
    if (image.formats) {
      let selectedFormat;

      switch (context) {
        case 'thumbnail':
          selectedFormat = image.formats.thumbnail;
          break;
        case 'list':
          // For lists, prefer small format, fallback to thumbnail or medium
          selectedFormat = image.formats.small || image.formats.thumbnail || image.formats.medium;
          break;
        case 'small':
          selectedFormat = image.formats.small;
          break;
        case 'medium':
          selectedFormat = image.formats.medium;
          break;
        case 'large':
          selectedFormat = image.formats.large;
          break;
        case 'detail':
        default:
          // For detail view, prefer large format, fallback to medium or original
          selectedFormat = image.formats.large || image.formats.medium;
          break;
      }

      if (selectedFormat && selectedFormat.url) {
        return `${MEDIA_BASE_URL}${selectedFormat.url}`;
      }
    }

    // Fallback to original image URL if formats not available
    return image.url ? `${MEDIA_BASE_URL}${image.url}` : null;
  } catch (error) {
    console.error('Error getting optimized image URL:', error);
    // Fallback to original URL or null
    return image && image.url ? `${MEDIA_BASE_URL}${image.url}` : null;
  }
};

/**
 * Gets the optimized image source object based on the context
 * @param {Object} image - The image object from the API
 * @param {string} context - The context ('list', 'thumbnail', 'detail')
 * @returns {Object} - The image source object
 */
export const getOptimizedImageSource = (image, context = 'detail') => {
  const url = getOptimizedImageUrl(image, context);
  return url ? { uri: url } : getFallbackImageSource();
};

export default {
  getImageSource,
  cacheImage,
  isImageCached,
  clearImageCache,
  preloadImages,
  getImageDimensions,
  getImageAspectRatio,
  getOptimizedImageUrl,
  getOptimizedImageSource,
}; 