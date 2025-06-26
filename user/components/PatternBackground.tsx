import React from 'react';
import { cn } from "@/lib/utils";

// Common pattern styles
interface PatternProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

// Linear geometric pattern with clean thin strokes
export function LinearPatternBackground({ className, style, children }: PatternProps) {
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={style}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full bg-gradient-to-r from-secondary/10 via-secondary/5 to-secondary/10">
          <div className="grid grid-cols-6 h-full">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="border-r border-secondary/10 h-full"></div>
              ))}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

// Geometric corner accent in Art Deco style
export function GeometricCornerAccent({ className }: PatternProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-secondary", className)}
    >
      <path 
        d="M4 4H12V6H6V12H4V4Z" 
        fill="currentColor"
      />
      <path 
        d="M20 20H12V18H18V12H20V20Z" 
        fill="currentColor" 
      />
      <path 
        d="M8 8L16 16" 
        stroke="currentColor" 
        strokeWidth="1.5"
      />
    </svg>
  );
}

// Art Deco style border for cards and containers
export function ArtDecoBorder({ className, children }: PatternProps) {
  return (
    <div className={cn("relative border border-gray-200 rounded-md overflow-hidden", className)}>
      {/* Art Deco corners */}
      <div className="absolute top-0 left-0 w-5 h-5">
        <div className="absolute top-0 left-0 w-[1px] h-3 bg-secondary"></div>
        <div className="absolute top-0 left-0 w-3 h-[1px] bg-secondary"></div>
      </div>
      <div className="absolute top-0 right-0 w-5 h-5">
        <div className="absolute top-0 right-0 w-[1px] h-3 bg-secondary"></div>
        <div className="absolute top-0 right-0 w-3 h-[1px] bg-secondary"></div>
      </div>
      <div className="absolute bottom-0 left-0 w-5 h-5">
        <div className="absolute bottom-0 left-0 w-[1px] h-3 bg-secondary"></div>
        <div className="absolute bottom-0 left-0 w-3 h-[1px] bg-secondary"></div>
      </div>
      <div className="absolute bottom-0 right-0 w-5 h-5">
        <div className="absolute bottom-0 right-0 w-[1px] h-3 bg-secondary"></div>
        <div className="absolute bottom-0 right-0 w-3 h-[1px] bg-secondary"></div>
      </div>
      
      {children}
    </div>
  );
}

// Decorative divider with Art Deco flair
export function PatternDivider({ className }: PatternProps) {
  return (
    <div className={cn("flex items-center justify-center w-full my-4", className)}>
      <div className="flex-1 h-px bg-gray-200"></div>
      <div className="mx-4 flex items-center">
        <div className="w-1 h-1 bg-secondary rounded-full"></div>
        <div className="w-6 h-px bg-secondary mx-1"></div>
        <div className="w-2 h-2 bg-secondary rotate-45"></div>
        <div className="w-6 h-px bg-secondary mx-1"></div>
        <div className="w-1 h-1 bg-secondary rounded-full"></div>
      </div>
      <div className="flex-1 h-px bg-gray-200"></div>
    </div>
  );
}

export default function PatternBackground({
  className,
  style,
  children,
}: PatternProps) {
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{
        ...style,
      }}
    >
      <div className="absolute inset-0">
        <div className="h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white to-transparent" />

      {children}
    </div>
  );
}