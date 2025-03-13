import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

/**
 * Utility for making API calls with error handling, retry logic, and offline support
 */
class ApiUtils {
  /**
   * Make an API request with error handling and retry logic
   * @param {Function} apiCall - The API function to call (e.g., axios.get, axios.post)
   * @param {Object} options - Configuration options
   * @param {number} options.maxRetries - Maximum number of retry attempts (default: 3)
   * @param {number} options.retryDelay - Delay between retries in milliseconds (default: 1000)
   * @param {boolean} options.showErrorAlert - Whether to show an error alert on failure (default: false)
   * @param {string} options.errorTitle - Title for the error alert (default: 'Error')
   * @param {Function} options.onError - Custom error handler function
   * @param {boolean} options.requiresAuth - Whether the request requires authentication (default: false)
   * @returns {Promise} - Promise that resolves with the API response or rejects with an error
   */
  static async makeRequest(apiCall, options = {}) {
    const {
      maxRetries = 3,
      retryDelay = 1000,
      showErrorAlert = false,
      errorTitle = 'Error',
      onError = null,
      requiresAuth = false,
    } = options;

    // Check for internet connection
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      const error = new Error('No internet connection');
      error.isOffline = true;
      
      if (showErrorAlert) {
        Alert.alert(
          'No Connection',
          'Please check your internet connection and try again.',
          [{ text: 'OK' }]
        );
      }
      
      if (onError) {
        onError(error);
      }
      
      throw error;
    }

    // Add authentication token if required
    if (requiresAuth) {
      try {
        const token = await AsyncStorage.getItem('jwt');
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
          const error = new Error('Authentication required');
          error.isAuthError = true;
          
          if (onError) {
            onError(error);
          }
          
          throw error;
        }
      } catch (error) {
        console.error('Error retrieving auth token:', error);
        throw error;
      }
    }

    // Attempt the API call with retries
    let lastError = null;
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const response = await apiCall();
        return response;
      } catch (error) {
        console.error(`API request failed (attempt ${attempt + 1}/${maxRetries}):`, error);
        lastError = error;

        // Handle specific error cases
        if (error.response) {
          // Server responded with an error status code
          const { status } = error.response;
          
          // Don't retry for certain status codes
          if (status === 401 || status === 403) {
            // Authentication error
            if (showErrorAlert) {
              Alert.alert(
                'Authentication Error',
                'Your session has expired. Please log in again.',
                [{ text: 'OK' }]
              );
            }
            break;
          } else if (status === 404) {
            // Resource not found
            if (showErrorAlert) {
              Alert.alert(
                'Not Found',
                'The requested resource was not found.',
                [{ text: 'OK' }]
              );
            }
            break;
          } else if (status >= 400 && status < 500) {
            // Client error - don't retry
            if (showErrorAlert) {
              Alert.alert(
                errorTitle,
                error.response.data?.message || 'An error occurred with your request.',
                [{ text: 'OK' }]
              );
            }
            break;
          }
        }

        // If this is not the last attempt, wait before retrying
        if (attempt < maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
      }
    }

    // If we got here, all attempts failed
    if (showErrorAlert) {
      Alert.alert(
        errorTitle,
        lastError?.response?.data?.message || 'An error occurred. Please try again later.',
        [{ text: 'OK' }]
      );
    }

    if (onError) {
      onError(lastError);
    }

    throw lastError;
  }

  /**
   * Make a GET request with error handling
   * @param {string} url - The URL to request
   * @param {Object} options - Configuration options (see makeRequest)
   * @returns {Promise} - Promise that resolves with the API response
   */
  static async get(url, options = {}) {
    return this.makeRequest(() => axios.get(url), options);
  }

  /**
   * Make a POST request with error handling
   * @param {string} url - The URL to request
   * @param {Object} data - The data to send
   * @param {Object} options - Configuration options (see makeRequest)
   * @returns {Promise} - Promise that resolves with the API response
   */
  static async post(url, data, options = {}) {
    return this.makeRequest(() => axios.post(url, data), options);
  }

  /**
   * Make a PUT request with error handling
   * @param {string} url - The URL to request
   * @param {Object} data - The data to send
   * @param {Object} options - Configuration options (see makeRequest)
   * @returns {Promise} - Promise that resolves with the API response
   */
  static async put(url, data, options = {}) {
    return this.makeRequest(() => axios.put(url, data), options);
  }

  /**
   * Make a DELETE request with error handling
   * @param {string} url - The URL to request
   * @param {Object} options - Configuration options (see makeRequest)
   * @returns {Promise} - Promise that resolves with the API response
   */
  static async delete(url, options = {}) {
    return this.makeRequest(() => axios.delete(url), options);
  }
}

export default ApiUtils; 