/**
 * Memory management utilities for iOS Safari
 * This module provides functions to help manage memory usage in iOS Safari
 */

import { Platform } from 'react-native';
import { usePlatform } from '../../src/context/PlatformContext';

// Memory usage thresholds in MB
const MEMORY_WARNING_THRESHOLD = 150; // MB
const MEMORY_CRITICAL_THRESHOLD = 200; // MB

/**
 * Check if the current memory usage is above the warning threshold
 * Only works in browsers that support the performance.memory API
 * @returns {boolean} True if memory usage is above warning threshold
 */
export const isMemoryUsageHigh = () => {
  if (Platform.OS !== 'web' || !window.performance || !window.performance.memory) {
    return false;
  }
  
  const usedMemoryMB = window.performance.memory.usedJSHeapSize / (1024 * 1024);
  return usedMemoryMB > MEMORY_WARNING_THRESHOLD;
};

/**
 * Check if the current memory usage is above the critical threshold
 * Only works in browsers that support the performance.memory API
 * @returns {boolean} True if memory usage is above critical threshold
 */
export const isMemoryUsageCritical = () => {
  if (Platform.OS !== 'web' || !window.performance || !window.performance.memory) {
    return false;
  }
  
  const usedMemoryMB = window.performance.memory.usedJSHeapSize / (1024 * 1024);
  return usedMemoryMB > MEMORY_CRITICAL_THRESHOLD;
};

/**
 * Get the current memory usage in MB
 * @returns {number|null} Memory usage in MB or null if not available
 */
export const getCurrentMemoryUsage = () => {
  if (Platform.OS !== 'web' || !window.performance || !window.performance.memory) {
    return null;
  }
  
  return window.performance.memory.usedJSHeapSize / (1024 * 1024);
};

/**
 * Force garbage collection if possible
 * Note: This is not guaranteed to work in all browsers
 */
export const forceGarbageCollection = () => {
  if (Platform.OS !== 'web') return;
  
  try {
    // Try to force garbage collection by creating and releasing a large object
    let largeArray = null;
    
    // Create a large array
    largeArray = new Array(1000000).fill(0);
    
    // Release the reference
    largeArray = null;
    
    // Try to hint the browser to collect garbage
    if (window.gc) {
      window.gc();
    }
    
    console.log('Attempted to force garbage collection');
  } catch (error) {
    console.error('Error forcing garbage collection:', error);
  }
};

/**
 * React hook to monitor memory usage and take actions when thresholds are reached
 * @param {Object} options Configuration options
 * @param {Function} options.onWarning Callback when warning threshold is reached
 * @param {Function} options.onCritical Callback when critical threshold is reached
 * @returns {Object} Memory monitoring state and actions
 */
export const useMemoryMonitor = (options = {}) => {
  const { isIOSWeb } = usePlatform();
  
  // Only enable memory monitoring on iOS web
  if (!isIOSWeb || Platform.OS !== 'web') {
    return {
      memoryUsage: null,
      isHigh: false,
      isCritical: false,
      forceCleanup: () => {},
    };
  }
  
  const memoryUsage = getCurrentMemoryUsage();
  const isHigh = isMemoryUsageHigh();
  const isCritical = isMemoryUsageCritical();
  
  // Call callbacks if provided
  if (isHigh && options.onWarning) {
    options.onWarning(memoryUsage);
  }
  
  if (isCritical && options.onCritical) {
    options.onCritical(memoryUsage);
  }
  
  return {
    memoryUsage,
    isHigh,
    isCritical,
    forceCleanup: forceGarbageCollection,
  };
};

/**
 * Unload resources that are not currently needed
 * @param {Array} resources Array of resources to unload
 */
export const unloadResources = (resources = []) => {
  if (Platform.OS !== 'web' || !resources.length) return;
  
  resources.forEach(resource => {
    if (resource && typeof resource.unload === 'function') {
      resource.unload();
    }
  });
};

/**
 * Create a debounced function that limits how often a function can be called
 * @param {Function} func The function to debounce
 * @param {number} wait The time to wait in milliseconds
 * @returns {Function} The debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Create a throttled function that limits how often a function can be called
 * @param {Function} func The function to throttle
 * @param {number} limit The time limit in milliseconds
 * @returns {Function} The throttled function
 */
export const throttle = (func, limit = 300) => {
  let inThrottle;
  
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

export default {
  isMemoryUsageHigh,
  isMemoryUsageCritical,
  getCurrentMemoryUsage,
  forceGarbageCollection,
  useMemoryMonitor,
  unloadResources,
  debounce,
  throttle,
}; 