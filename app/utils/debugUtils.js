/**
 * Debugging utilities for tracking down issues in the app
 */

import { Platform } from 'react-native';

// Enable or disable debug logging
const DEBUG_ENABLED = true;

/**
 * Log a debug message if debugging is enabled
 * @param {string} message - The message to log
 * @param {any} data - Optional data to log
 */
export const debugLog = (message, data) => {
  if (!DEBUG_ENABLED) return;
  
  if (data) {
    console.log(`[DEBUG] ${message}`, data);
  } else {
    console.log(`[DEBUG] ${message}`);
  }
};

/**
 * Log component lifecycle events
 * @param {string} componentName - The name of the component
 * @param {string} lifecycleEvent - The lifecycle event (mount, update, unmount)
 * @param {any} data - Optional data to log
 */
export const logLifecycle = (componentName, lifecycleEvent, data) => {
  if (!DEBUG_ENABLED) return;
  
  console.log(`[LIFECYCLE] ${componentName} - ${lifecycleEvent}`);
  if (data) {
    console.log(data);
  }
};

/**
 * Log navigation events
 * @param {string} from - The screen navigating from
 * @param {string} to - The screen navigating to
 * @param {any} params - Optional navigation parameters
 */
export const logNavigation = (from, to, params) => {
  if (!DEBUG_ENABLED) return;
  
  console.log(`[NAVIGATION] ${from} -> ${to}`);
  if (params) {
    console.log('Params:', params);
  }
};

/**
 * Log memory usage if available
 */
export const logMemoryUsage = () => {
  if (!DEBUG_ENABLED) return;
  
  if (Platform.OS === 'web' && window.performance && window.performance.memory) {
    const { usedJSHeapSize, totalJSHeapSize } = window.performance.memory;
    console.log(`[MEMORY] Used: ${Math.round(usedJSHeapSize / 1024 / 1024)}MB / Total: ${Math.round(totalJSHeapSize / 1024 / 1024)}MB`);
  } else {
    console.log('[MEMORY] Memory usage information not available');
  }
};

/**
 * Log errors with additional context
 * @param {string} context - The context where the error occurred
 * @param {Error} error - The error object
 */
export const logError = (context, error) => {
  console.error(`[ERROR] ${context}:`, error);
  
  // Log additional information for debugging
  if (error.stack) {
    console.error('[ERROR STACK]', error.stack);
  }
};

/**
 * Create a hook for tracking component renders
 * @param {string} componentName - The name of the component
 * @returns {Function} - A function to call in the component body
 */
export const useRenderTracker = (componentName) => {
  if (!DEBUG_ENABLED) return () => {};
  
  let renderCount = 0;
  
  return () => {
    renderCount++;
    console.log(`[RENDER] ${componentName} rendered ${renderCount} times`);
  };
};

/**
 * Track API calls
 * @param {string} endpoint - The API endpoint
 * @param {string} method - The HTTP method
 * @param {any} requestData - The request data
 * @param {any} responseData - The response data
 * @param {number} duration - The duration of the request in ms
 */
export const logApiCall = (endpoint, method, requestData, responseData, duration) => {
  if (!DEBUG_ENABLED) return;
  
  console.log(`[API] ${method} ${endpoint} (${duration}ms)`);
  if (requestData) {
    console.log('[API REQUEST]', requestData);
  }
  if (responseData) {
    console.log('[API RESPONSE]', responseData);
  }
};

export default {
  debugLog,
  logLifecycle,
  logNavigation,
  logMemoryUsage,
  logError,
  useRenderTracker,
  logApiCall,
}; 