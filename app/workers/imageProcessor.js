// This will run in a separate thread
self.addEventListener('message', (e) => {
  try {
    const { imageUrl, width } = e.data;
    
    // Always initialize optimizedUrl
    let optimizedUrl = imageUrl || ''; 
    
    // Only process if we have valid inputs
    if (imageUrl && width && typeof imageUrl === 'string') {
      try {
        const separator = imageUrl.includes('?') ? '&' : '?';
        optimizedUrl = `${imageUrl}${separator}width=${width}&optimize=medium`;
      } catch (error) {
        console.error('Error processing image in worker:', error);
        // Fall back to original URL
        optimizedUrl = imageUrl;
      }
    }
    
    // Post the processed result back
    self.postMessage({ processed: true, result: optimizedUrl, error: null });
  } catch (error) {
    // Handle any unexpected errors
    console.error('Worker error:', error);
    self.postMessage({ 
      processed: false, 
      result: null, 
      error: error.message || 'Unknown error in image processor' 
    });
  }
}); 