import React from 'react';
import { cn } from "@/lib/utils";

// Common pattern styles
interface PatternProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  overlay?: string;
  opacity?: number;
  intensity?: 'subtle' | 'medium' | 'strong';
  size?: 'small' | 'default' | 'large';
  interactive?: boolean;
}

interface DividerProps extends PatternProps {
  thick?: boolean;
  withFade?: boolean;
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
export function GeometricCornerAccent({ className, children }: PatternProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute top-0 left-0 w-16 h-16">
        <div className="absolute top-0 left-0 w-[2px] h-8 bg-[#AD9660]/20"></div>
        <div className="absolute top-0 left-0 w-8 h-[2px] bg-[#AD9660]/20"></div>
        <div className="absolute top-4 left-4 w-4 h-4 border-2 border-[#AD9660]/20 rotate-45"></div>
      </div>
      {children}
    </div>
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
export function PatternDivider({ className, thick, withFade }: DividerProps) {
  return (
    <div className={cn("flex items-center justify-center w-full my-4", className)}>
      <div className={cn(
        "flex-1 h-px",
        withFade ? "bg-gradient-to-r from-transparent via-gray-200 to-transparent" : "bg-gray-200",
        thick ? "h-0.5" : "h-px"
      )}></div>
      <div className="mx-4 flex items-center">
        <div className={cn("w-1 h-1 bg-secondary rounded-full", thick ? "w-1.5 h-1.5" : "")}></div>
        <div className={cn("w-6 h-px bg-secondary mx-1", thick ? "h-0.5" : "")}></div>
        <div className={cn("w-2 h-2 bg-secondary rotate-45", thick ? "w-2.5 h-2.5" : "")}></div>
        <div className={cn("w-6 h-px bg-secondary mx-1", thick ? "h-0.5" : "")}></div>
        <div className={cn("w-1 h-1 bg-secondary rounded-full", thick ? "w-1.5 h-1.5" : "")}></div>
      </div>
      <div className={cn(
        "flex-1 h-px",
        withFade ? "bg-gradient-to-r from-transparent via-gray-200 to-transparent" : "bg-gray-200",
        thick ? "h-0.5" : "h-px"
      )}></div>
    </div>
  );
}

export default function PatternBackground({
  className,
  style,
  children,
  overlay = 'primary',
  opacity = 0.05,
  intensity = 'medium',
  size = 'default',
  interactive = false,
}: PatternProps) {
  const getOverlayColor = () => {
    switch (overlay) {
      case 'primary': return '#323433';
      case 'secondary': return '#AD9660';
      case 'accent': return '#1E2A47';
      case 'neutral': return '#E6E2DD';
      default: return '#323433';
    }
  };

  const getPatternSize = () => {
    switch (size) {
      case 'small': return '12px';
      case 'large': return '24px';
      default: return '16px';
    }
  };

  const getPatternIntensity = () => {
    switch (intensity) {
      case 'subtle': return 0.5;
      case 'strong': return 2;
      default: return 1;
    }
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden transition-all duration-500",
        interactive && "hover:scale-[1.02]",
        className
      )}
      style={{
        ...style,
      }}
    >
      <div className="absolute inset-0">
        <div 
          className="h-full w-full [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"
          style={{
            background: `radial-gradient(${getOverlayColor()}${Math.round(opacity * 255).toString(16)} 1px,transparent 1px)`,
            backgroundSize: `${getPatternSize()} ${getPatternSize()}`,
            opacity: getPatternIntensity(),
          }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white to-transparent" />

      {children}
    </div>
  );
}