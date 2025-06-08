import React from 'react';

interface PatternBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  overlay?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'none';
  opacity?: number;
  interactive?: boolean;
  size?: 'default' | 'large' | 'small';
  intensity?: 'subtle' | 'medium' | 'strong';
}

export const PatternBackground: React.FC<PatternBackgroundProps> = ({
  children,
  className = '',
  overlay = 'none',
  opacity = 0.08,
  interactive = false,
  size = 'default',
  intensity = 'medium',
}) => {
  const overlayClass = overlay !== 'none' ? `pattern-${overlay}-overlay` : '';
  const interactiveClass = interactive ? 'interactive' : '';
  
  // Calculate opacity based on intensity
  const opacityMultiplier = 
    intensity === 'subtle' ? 0.7 : 
    intensity === 'strong' ? 1.4 : 
    1;
  
  const finalOpacity = opacity * opacityMultiplier;
  
  // Calculate pattern size
  const patternSize = 
    size === 'large' ? '400px' :
    size === 'small' ? '200px' :
    '300px';
  
  const customStyle = {
    '--pattern-opacity': finalOpacity,
    '--pattern-size': patternSize,
  } as React.CSSProperties;

  return (
    <div 
      className={`pattern-section ${overlayClass} ${interactiveClass} ${className}`}
      style={customStyle}
    >
      {children}
    </div>
  );
};

interface PatternDividerProps {
  className?: string;
  thick?: boolean;
  withFade?: boolean;
}

export const PatternDivider: React.FC<PatternDividerProps> = ({ 
  className = '',
  thick = false,
  withFade = false
}) => {
  const thickClass = thick ? 'thick' : '';
  const fadeClass = withFade ? 'with-fade' : '';
  
  return <div className={`pattern-divider ${thickClass} ${fadeClass} ${className}`} />;
};

export const PatternAccentCorner: React.FC<{ 
  className?: string;
  children?: React.ReactNode;
}> = ({ 
  className = '',
  children
}) => {
  return (
    <div className={`pattern-accent-corner ${className}`}>
      {children}
    </div>
  );
};

export default PatternBackground; 