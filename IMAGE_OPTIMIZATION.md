# Image Optimization in Club App

## Overview

This document outlines the image optimization strategy implemented in the Club app to improve performance, reduce memory usage, and prevent crashes, especially on iOS Safari.

## The Problem

The app was using high-resolution images (up to 4000x4000 pixels) in product lists, which caused:
- Excessive memory usage
- Slow loading times
- Potential crashes on iOS Safari due to memory limitations
- Unnecessary network bandwidth consumption

## The Solution

We've implemented a context-aware image loading system that uses different image sizes based on where the image is being displayed:

1. **Product Lists**: Uses smaller image formats (thumbnail or small) to reduce memory usage
2. **Product Details**: Uses larger image formats for better quality when viewing individual products

## Implementation Details

### Image Formats Available

The API provides multiple image formats for each product image:

- **thumbnail**: ~156x156 pixels
- **small**: ~500x500 pixels
- **medium**: ~750x750 pixels
- **large**: ~1000x1000 pixels
- **original**: Full-size image (sometimes 4000x4000 pixels!)

### Utility Functions

We've added new utility functions in `imageUtils.js`:

- `getOptimizedImageUrl(image, context)`: Returns the appropriate image URL based on the context
- `getOptimizedImageSource(image, context)`: Returns a source object for React Native Image components

### Usage

```javascript
// In list views (ProductList, NewArrival, etc.)
const imageUrl = ImageUtils.getOptimizedImageUrl(product.product_image[0], 'list');

// In detail views
const detailImages = product.product_image.map(img => 
  ImageUtils.getOptimizedImageUrl(img, 'detail')
);
```

## Benefits

- **Reduced Memory Usage**: Using smaller images in lists significantly reduces memory consumption
- **Faster Loading**: Smaller images load faster, improving the user experience
- **Fewer Crashes**: Lower memory usage means fewer crashes on memory-constrained devices
- **Better Battery Life**: Less processing required for smaller images
- **Reduced Bandwidth**: Smaller images use less network data

## Future Improvements

- Implement progressive image loading (blur-up technique)
- Add image caching for offline use
- Implement lazy loading for images outside the viewport
- Add image compression options for further optimization 