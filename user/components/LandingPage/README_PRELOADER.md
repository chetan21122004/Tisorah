# Premium Preloader Implementation

## Overview

This implementation provides a luxury, brand-aligned preloader for the Tisorah corporate gifting website. The preloader embodies the premium, elegant aesthetic defined in the brand guidelines while providing a smooth loading experience.

## Components

### 1. PremiumPreloader.tsx
The main preloader component featuring:
- **Art Deco Design**: Minimal, geometric patterns inspired by luxury aesthetics
- **Brand Colors**: Uses Tisorah's brand palette (#323433, #F4F4F4, #AD9660, #AB8E76)
- **Typography**: Frank Ruhl Libre (serif) for the brand name, Poppins (sans) for supporting text
- **Animations**: Smooth Framer Motion animations with spring physics
- **Progress Tracking**: Visual progress bar with percentage display
- **Dynamic Messages**: Rotating loading messages for better user engagement

### 2. ClientLayout.tsx
A wrapper component that:
- Integrates the preloader with the main layout
- Manages the transition between loading and loaded states
- Provides smooth opacity transitions

### 3. usePageLoading Hook
A custom hook that:
- Manages loading state intelligently
- Responds to route changes
- Checks document ready state
- Provides minimum loading time for better UX

## Features

### Visual Elements
- **Rotating Logo Ring**: Subtle dashed border animation around the logo
- **Art Deco Patterns**: Geometric background patterns with brand colors
- **Luxury Shimmer**: Subtle shimmer effect across the screen
- **Corner Decorations**: Art Deco-inspired corner elements
- **Floating Particles**: Gentle particle animation for added elegance
- **Progress Visualization**: Smooth progress bar with gradient colors

### UX Enhancements
- **Smart Timing**: Minimum 1.5-2 second display for brand recognition
- **Smooth Transitions**: Elegant fade-in/out animations
- **Responsive Design**: Works seamlessly on all device sizes
- **Loading Messages**: Contextual messages that rotate during loading
- **Spring Physics**: Natural, premium feeling animations

### Brand Alignment
- **Color Palette**: Strict adherence to brand guidelines
- **Typography**: Proper use of Frank Ruhl Libre and Poppins fonts
- **Tone**: "Elegant", "Exclusive", and "Empowering" brand personality
- **Luxury Feel**: High-end aesthetic matching the corporate gifting market

## Integration

The preloader is integrated at the layout level (`app/layout.tsx`) and automatically appears:
- On initial page load
- During route transitions
- When heavy components are loading

## Customization

### Timing
Adjust loading duration in `hooks/use-page-loading.tsx`:
```typescript
const loadingTimer = setTimeout(() => {
  setIsLoading(false)
}, 2000) // Adjust this value
```

### Messages
Modify loading messages in `PremiumPreloader.tsx`:
```typescript
const loadingMessages = [
  "Crafting Excellence...",
  "Curating Premium Gifts...",
  // Add more messages here
]
```

### Colors
Update brand colors in the component or use Tailwind CSS custom colors defined in `tailwind.config.ts`.

## Performance

- Uses Framer Motion for optimized animations
- Minimal bundle impact with tree-shaking
- GPU-accelerated transforms and opacity changes
- Responsive image loading with Next.js Image component

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- Framer Motion compatibility
- Graceful degradation for older browsers 