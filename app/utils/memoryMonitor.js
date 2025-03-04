export const initMemoryMonitor = () => {
  if (Platform.OS !== 'web' || 
      !(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream)) {
    return; // Only run on iOS web
  }
  
  let lastUsed = 0;
  
  const checkMemory = () => {
    if (window.performance && window.performance.memory) {
      const used = window.performance.memory.usedJSHeapSize;
      console.log(`Memory usage: ${Math.round(used / 1048576)}MB`);
      
      if (lastUsed > 0 && used > lastUsed * 1.5) {
        console.warn('Possible memory leak detected');
      }
      
      lastUsed = used;
    }
  };
  
  // Check memory usage every 10 seconds
  setInterval(checkMemory, 10000);
}; 