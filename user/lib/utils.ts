import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Function to preserve scroll position
export function preserveScroll() {
  if (typeof window === 'undefined') return;
  
  // Store current scroll position
  const scrollPosition = window.scrollY;
  
  // Return a function that restores the scroll position
  return () => {
    window.scrollTo({
      top: scrollPosition,
      behavior: 'auto' // Use 'auto' instead of 'smooth' to prevent animation
    });
  };
}

// Format price helper
export function formatPrice(price: number, min?: number | null, max?: number | null, hasRange?: boolean | null) {
  if (hasRange && min != null && max != null) {
    return `₹${min.toLocaleString()} - ₹${max.toLocaleString()}`;
  }
  return `₹${price.toLocaleString()}`;
}
