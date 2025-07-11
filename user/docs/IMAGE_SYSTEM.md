# Product Image System Documentation

## Overview
The Tisorah product system supports three types of images for enhanced user experience:

1. **Display Image** (`display_image`) - Primary product image shown in cards and detail pages
2. **Hover Image** (`hover_image`) - Alternative image shown on hover for interactive effects
3. **Additional Images** (`images`) - Array of supplementary product images for detail views

## Database Schema

### Products Table Image Columns
```sql
-- Main display image
display_image TEXT NULL,

-- Hover effect image  
hover_image TEXT NULL DEFAULT 'https://images.unsplash.com/photo-1586282391129-76a6df230234?w=800',

-- Additional product images
images TEXT[] NULL
```

## Implementation Details

### 1. Product Cards (`app/products/page.tsx`)
- Uses `display_image` as primary image
- Falls back to `image` prop, then first item in `images` array
- Shows `hover_image` on hover with smooth opacity transition
- Includes error handling with fallback to `/placeholder.svg`

```typescript
// Image selection logic
const displayImage = product.display_image || product.image || product.images?.[0] || '/placeholder.svg';
const hoverImage = product.hover_image || product.display_image || product.image || product.images?.[0] || '/placeholder.svg';
```

### 2. Product Detail Page (`app/products/[id]/page.tsx`)
- Primary image uses `display_image`
- Thumbnail gallery shows `display_image` + all items from `images` array
- Supports image zoom functionality
- Includes error handling for broken images

### 3. Product Grid Component (`components/LandingPage/ProductGrid.tsx`)
- Implements same image logic as product cards
- Supports hover effects on desktop
- Responsive image sizing for mobile/desktop
- Error handling with placeholder fallback

## Image Fallback Strategy

The system uses a cascading fallback approach:

1. **Primary**: `display_image` (dedicated display image)
2. **Secondary**: `image` (legacy image field)
3. **Tertiary**: `images[0]` (first additional image)
4. **Final**: `/placeholder.svg` (fallback placeholder)

## API Integration

### Data Fetching
All product fetching functions now include image fields:

```typescript
.select('*, display_image, hover_image, images')
```

### Functions Updated:
- `getFeaturedProducts()`
- `getProducts()`
- `getLatestProducts()`
- `searchProducts()`
- `getRelatedProducts()`

## Type Definitions

### Product Interface (`types/database.ts`)
```typescript
export interface Product {
  // ... other fields
  display_image?: string | null;
  hover_image?: string | null;
  images?: string[] | null;
  // ... other fields
}
```

## Error Handling

### Image Load Errors
All image components include `onError` handlers:

```typescript
onError={(e) => {
  const target = e.target as HTMLImageElement;
  target.src = '/placeholder.svg';
}}
```

### Null/Undefined Handling
- All image fields are optional with null checks
- Fallback chain ensures images always display
- Graceful degradation when images fail to load

## Usage Examples

### Product Card Hover Effect
```tsx
<img
  src={displayImage}
  className={`transition-opacity duration-500 ${hovered && hoverImage !== displayImage ? 'opacity-0' : 'opacity-100'}`}
/>
{hoverImage && hoverImage !== displayImage && (
  <img
    src={hoverImage}
    className={`absolute inset-0 transition-opacity duration-500 ${hovered ? 'opacity-100' : 'opacity-0'}`}
  />
)}
```

### Product Detail Gallery
```tsx
<Image
  src={
    selectedImage === 0 && product?.display_image
      ? product.display_image
      : selectedImage > 0 && product?.images?.[selectedImage - 1]
      ? product.images[selectedImage - 1]
      : product?.display_image || product?.images?.[0] || "/placeholder.svg"
  }
/>
```

## Migration Notes

### Database Migration Applied
- Added `display_image` and `hover_image` columns
- Ensured `images` column is properly typed as `TEXT[]`
- Added sample data for testing
- Created indexes for performance

### Code Updates
- Updated all product fetching queries
- Modified product card components
- Enhanced error handling
- Updated type definitions
- Improved fallback logic

## Testing

### Manual Testing Checklist
- [ ] Product cards display correct images
- [ ] Hover effects work smoothly
- [ ] Product detail page shows all images
- [ ] Thumbnail navigation functions
- [ ] Error handling works for broken images
- [ ] Mobile responsiveness maintained
- [ ] Performance is acceptable

### Test Data
The system includes sample products with proper image data:
- Products have `display_image` set
- Products have `hover_image` for hover effects
- Products have multiple images in `images` array

## Performance Considerations

### Image Optimization
- Use appropriate image sizes for different contexts
- Implement lazy loading where appropriate
- Consider using Next.js Image component for optimization
- Add proper `alt` attributes for accessibility

### Loading States
- Show loading placeholders during image load
- Implement skeleton screens for better UX
- Handle slow network conditions gracefully

## Future Enhancements

### Potential Improvements
1. **Image Compression**: Implement automatic image optimization
2. **CDN Integration**: Use CDN for faster image delivery
3. **Lazy Loading**: Implement intersection observer for performance
4. **Image Variants**: Support different sizes/formats
5. **Alt Text Management**: Better accessibility support
6. **Image Analytics**: Track image performance and usage

### Admin Features
1. **Image Upload Interface**: Admin panel for managing images
2. **Bulk Image Operations**: Mass upload/update capabilities
3. **Image Validation**: Ensure proper formats and sizes
4. **Image Preview**: Preview functionality before saving

## Troubleshooting

### Common Issues

1. **Images Not Loading**
   - Check image URLs are accessible
   - Verify CORS settings if using external images
   - Ensure fallback images exist

2. **Hover Effects Not Working**
   - Verify hover_image is different from display_image
   - Check CSS transitions are properly applied
   - Ensure hover states are properly managed

3. **Performance Issues**
   - Optimize image sizes
   - Implement lazy loading
   - Consider using WebP format
   - Check network conditions

### Debug Steps
1. Check browser console for image load errors
2. Verify database contains proper image URLs
3. Test with different image sources
4. Check responsive behavior across devices
5. Validate accessibility features 