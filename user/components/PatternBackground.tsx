import React from 'react';

interface PatternBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  overlay?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'none';
  opacity?: number;
}

export const PatternBackground: React.FC<PatternBackgroundProps> = ({
  children,
  className = '',
  overlay = 'none',
  opacity = 0.1,
}) => {
  const overlayClass = overlay !== 'none' ? `pattern-${overlay}-overlay` : '';
  
  const customStyle = {
    '--pattern-opacity': opacity,
  } as React.CSSProperties;

  return (
    <div 
      className={`pattern-section ${overlayClass} ${className}`}
      style={customStyle}
    >
      {children}
    </div>
  );
};

export const PatternDivider: React.FC<{ className?: string }> = ({ className = '' }) => {
  return <div className={`pattern-divider ${className}`} />;
};

export default PatternBackground; 