import React, { createContext, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';

const PlatformContext = createContext({
  isIOS: false,
  isIOSWeb: false,
  useReducedAnimations: false,
});

export const PlatformProvider = ({ children }) => {
  const [isIOSWeb, setIsIOSWeb] = useState(false);
  
  useEffect(() => {
    if (Platform.OS === 'web') {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      setIsIOSWeb(isIOS);
      
      if (isIOS) {
        console.log('PlatformContext: Running on iOS web - enabling optimizations');
      }
    }
  }, []);
  
  const value = {
    isIOS: Platform.OS === 'ios',
    isIOSWeb,
    useReducedAnimations: isIOSWeb, // Enable reduced animations on iOS web
  };
  
  return (
    <PlatformContext.Provider value={value}>
      {children}
    </PlatformContext.Provider>
  );
};

export const usePlatform = () => useContext(PlatformContext); 