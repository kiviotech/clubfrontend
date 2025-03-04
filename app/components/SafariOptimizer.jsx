import React, { useEffect, useState } from 'react';
import { View, Platform, ActivityIndicator } from 'react-native';

export const SafariOptimizer = ({ children, complexity = 'normal' }) => {
  const [isIOSSafari, setIsIOSSafari] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  
  useEffect(() => {
    if (Platform.OS === 'web') {
      const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      setIsIOSSafari(ios);
      
      // For high complexity components, delay rendering on iOS Safari
      if (ios && complexity === 'high') {
        setTimeout(() => setShouldRender(true), 500);
      } else {
        setShouldRender(true);
      }
    } else {
      setShouldRender(true);
    }
  }, [complexity]);
  
  if (!shouldRender) {
    return (
      <View style={{ padding: 20, alignItems: 'center' }}>
        <ActivityIndicator size="small" color="#8FFA09" />
      </View>
    );
  }
  
  // If iOS Safari and high complexity, render a simplified version
  if (isIOSSafari && complexity === 'high') {
    return (
      <View style={{ padding: 10 }}>
        {/* Simplified version of your component */}
        {/* For example, render less items, disable animations */}
      </View>
    );
  }
  
  return children;
}; 