import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

class ErrorBoundaryClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
    
    // You can also log the error to an analytics service here
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback ? (
        this.props.fallback(this.state.error, this.resetError)
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.message}>{this.state.error?.message || 'An unexpected error occurred'}</Text>
          
          {this.props.showDetails && this.state.errorInfo && (
            <ScrollView style={styles.detailsContainer}>
              <Text style={styles.detailsText}>
                {this.state.errorInfo.componentStack}
              </Text>
            </ScrollView>
          )}
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={this.resetError}>
              <Text style={styles.buttonText}>Try Again</Text>
            </TouchableOpacity>
            
            {this.props.onNavigateHome && (
              <TouchableOpacity style={[styles.button, styles.homeButton]} onPress={this.props.onNavigateHome}>
                <Text style={styles.buttonText}>Go to Home</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      );
    }

    return this.props.children;
  }
}

// Wrapper component to provide router access
const ErrorBoundaryWithRouter = (props) => {
  const router = useRouter();
  
  const handleNavigateHome = () => {
    router.push('/home');
  };
  
  return (
    <ErrorBoundaryClass
      {...props}
      onNavigateHome={handleNavigateHome}
    />
  );
};

// Higher-order component (HOC) that wraps a component with ErrorBoundary
const withErrorBoundary = (Component) => {
  // Return a function component that renders the wrapped component inside ErrorBoundary
  const WithErrorBoundary = (props) => (
    <ErrorBoundaryWithRouter>
      <Component {...props} />
    </ErrorBoundaryWithRouter>
  );
  
  // Set display name for debugging
  const displayName = Component.displayName || Component.name || 'Component';
  WithErrorBoundary.displayName = `withErrorBoundary(${displayName})`;
  
  return WithErrorBoundary;
};

// Default fallback component that can be used directly
export const DefaultErrorFallback = ({ error, resetError }) => {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Something went wrong</Text>
      <Text style={styles.message}>{error?.message || 'An unexpected error occurred'}</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={resetError}>
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.homeButton]} 
          onPress={() => router.push('/home')}
        >
          <Text style={styles.buttonText}>Go to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ff6b6b',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 24,
  },
  detailsContainer: {
    maxHeight: 200,
    width: '100%',
    marginBottom: 24,
    backgroundColor: '#1e1e1e',
    padding: 12,
    borderRadius: 8,
  },
  detailsText: {
    color: '#ccc',
    fontSize: 12,
    fontFamily: 'monospace',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: '#8FFA09',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 0.48,
    alignItems: 'center',
  },
  homeButton: {
    backgroundColor: '#333',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

// Export the ErrorBoundary component for direct use
export const ErrorBoundary = ErrorBoundaryWithRouter;

// Export the HOC as default
export default withErrorBoundary; 