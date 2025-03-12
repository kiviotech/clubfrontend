import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { usePlatform } from '../../src/context/PlatformContext';
import * as memoryManager from '../utils/memoryManager';

/**
 * Enhanced error boundary component that handles errors without causing reloads
 */
class ErrorBoundaryClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorCount: 0,
      lastErrorTime: 0,
      recoveryAttempted: false
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    
    // Update state with error details
    this.setState(prevState => ({
      errorInfo,
      errorCount: prevState.errorCount + 1,
      lastErrorTime: Date.now()
    }));
    
    // Report the error to an error reporting service if available
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
    
    // If on iOS web, try to free up memory
    if (Platform.OS === 'web' && 
        /iPad|iPhone|iPod/.test(navigator.userAgent) && 
        !window.MSStream) {
      this.attemptMemoryCleanup();
    }
    
    // Attempt automatic recovery for certain errors
    if (this.canAutoRecover(error)) {
      setTimeout(() => {
        this.handleRetry();
      }, 1000);
    }
  }
  
  canAutoRecover(error) {
    // Check if the error is something we can auto-recover from
    if (!error) return false;
    
    // Don't auto-recover if we've already tried
    if (this.state.recoveryAttempted) return false;
    
    // Auto-recover from network errors
    if (error.message && (
      error.message.includes('network') || 
      error.message.includes('fetch') ||
      error.message.includes('Network request failed')
    )) {
      return true;
    }
    
    // Auto-recover from memory errors
    if (error.message && (
      error.message.includes('memory') ||
      error.message.includes('allocation')
    )) {
      return true;
    }
    
    return false;
  }
  
  attemptMemoryCleanup = () => {
    try {
      // Force garbage collection
      memoryManager.forceGarbageCollection();
      
      // Clear image caches if possible
      if (window.caches) {
        caches.keys().then(cacheNames => {
          cacheNames.forEach(cacheName => {
            if (cacheName.includes('image')) {
              caches.delete(cacheName);
            }
          });
        });
      }
      
      // Clear any large objects in localStorage
      try {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          const value = localStorage.getItem(key);
          if (value && value.length > 10000) {
            localStorage.removeItem(key);
          }
        }
      } catch (e) {
        console.error('Error clearing localStorage:', e);
      }
      
      console.log('Memory cleanup attempted after error');
    } catch (e) {
      console.error('Error during memory cleanup:', e);
    }
  };
  
  handleRetry = () => {
    // Reset the error state
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null,
      recoveryAttempted: true
    });
    
    // Attempt memory cleanup before retrying
    this.attemptMemoryCleanup();
    
    // Call onRetry prop if provided
    if (this.props.onRetry) {
      this.props.onRetry();
    }
  };
  
  handleReload = () => {
    // Instead of reloading the whole page, just clear the error state
    this.handleRetry();
    
    // Force garbage collection
    this.attemptMemoryCleanup();
    
    // Only reload as a last resort if we've tried recovery multiple times
    if (this.state.errorCount > 3) {
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        // Add a parameter to prevent cache issues
        window.location.href = window.location.pathname + '?reload=' + Date.now();
      }
    }
  };
  
  shouldComponentUpdate(nextProps, nextState) {
    // Prevent rapid re-renders if errors are happening frequently
    if (this.state.hasError && nextState.hasError) {
      const timeSinceLastError = Date.now() - this.state.lastErrorTime;
      if (timeSinceLastError < 1000) { // Less than 1 second since last error
        return false;
      }
    }
    return true;
  }

  render() {
    const { hasError, error, errorCount } = this.state;
    const { fallback, children } = this.props;
    
    if (hasError) {
      // Use custom fallback if provided
      if (fallback) {
        return fallback({ error, resetError: this.handleRetry });
      }
      
      // Default error UI
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Something went wrong</Text>
          
          <Text style={styles.message}>
            {error?.message || 'An unexpected error occurred'}
          </Text>
          
          {errorCount > 1 && (
            <Text style={styles.errorCount}>
              This error has occurred {errorCount} times
            </Text>
          )}
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.button} 
              onPress={this.handleRetry}
            >
              <Text style={styles.buttonText}>Try Again</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.reloadButton]} 
              onPress={this.handleReload}
            >
              <Text style={styles.buttonText}>Reload App</Text>
            </TouchableOpacity>
          </View>
          
          {__DEV__ && error && (
            <View style={styles.devErrorContainer}>
              <Text style={styles.devErrorTitle}>Error Details (Dev Only):</Text>
              <Text style={styles.devErrorText}>{error.toString()}</Text>
              {error.stack && (
                <Text style={styles.devErrorStack}>{error.stack}</Text>
              )}
            </View>
          )}
        </View>
      );
    }

    return children;
  }
}

// Wrapper component to provide platform context to the error boundary
export const ErrorBoundary = (props) => {
  const platform = usePlatform();
  
  // Add platform-specific behavior
  const enhancedProps = {
    ...props,
    onRetry: () => {
      // If on iOS web, do additional cleanup
      if (platform.isIOSWeb) {
        memoryManager.forceGarbageCollection();
      }
      
      // Call original onRetry if provided
      if (props.onRetry) {
        props.onRetry();
      }
    }
  };
  
  return <ErrorBoundaryClass {...enhancedProps} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#dc3545',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#343a40',
    textAlign: 'center',
    marginBottom: 20,
  },
  errorCount: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  reloadButton: {
    backgroundColor: '#6c757d',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  devErrorContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#f8d7da',
    borderRadius: 5,
    width: '100%',
    maxWidth: 500,
  },
  devErrorTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#721c24',
    marginBottom: 10,
  },
  devErrorText: {
    fontSize: 14,
    color: '#721c24',
    marginBottom: 10,
  },
  devErrorStack: {
    fontSize: 12,
    color: '#721c24',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : Platform.OS === 'android' ? 'monospace' : 'Consolas',
  },
});

export default ErrorBoundary;