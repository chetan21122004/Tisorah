"use client"
import React, { useRef, useEffect } from 'react';

// Helper to draw a more elegant star shape
function drawStar(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string, rotation: number, alpha: number) {
  ctx.save();
  ctx.beginPath();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  
  // Create a more elegant 5-pointed star
  for (let i = 0; i < 5; i++) {
    ctx.rotate(Math.PI * 2 / 5);
    ctx.lineTo(0, -r);
    ctx.rotate(Math.PI / 5);
    ctx.lineTo(0, -r * 0.4); // Shorter inner points for elegance
  }
  
  ctx.closePath();
  
  // Add a luxurious gradient fill
  const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0.2)');
  
  ctx.fillStyle = gradient;
  ctx.globalAlpha = alpha;
  ctx.fill();
  
  // Add a subtle glow effect
  ctx.shadowColor = color;
  ctx.shadowBlur = r * 2;
  ctx.strokeStyle = color;
  ctx.lineWidth = r * 0.1;
  ctx.stroke();
  
  ctx.restore();
}

// Luxury color palette with gold and elegant tones
function randomColor() {
  const colors = [
    '#FFD700', // gold
    '#FFDF00', // golden yellow
    '#F0E68C', // khaki gold
    '#DAA520', // goldenrod
    '#B8860B', // dark goldenrod
    '#FFF8DC', // cream
    '#FFFAF0', // floral white
    '#E6BE8A', // pale gold
    '#CFB53B', // old gold
    '#D4AF37', // metallic gold
    '#FFFFFF'  // white (for contrast)
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

interface Star {
  x: number;
  y: number;
  r: number;
  color: string;
  alpha: number;
  life: number;
  rotation: number;
  rotationSpeed: number;
  growthRate: number;
  fadeRate: number;
}

const StarFollower: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stars = useRef<Star[]>([]);
  const animationRef = useRef<number | null>(null);
  const lastPos = useRef<{x: number, y: number} | null>(null);
  const lastAddTime = useRef<number>(0);

  // Resize canvas to cover the entire viewport
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const resize = () => {
      // Set canvas to cover the entire viewport
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
    };
    
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // Animation loop with smoother transitions
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function animate() {
      if (!canvas || !ctx) return;
      
      // Clear the canvas completely - transparent background
      ctx.clearRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));
      
      stars.current = stars.current.filter(star => star.alpha > 0.01);
      
      for (const star of stars.current) {
        drawStar(ctx, star.x, star.y, star.r, star.color, star.rotation, star.alpha);
        star.alpha *= star.fadeRate;
        star.r += star.growthRate;
        star.rotation += star.rotationSpeed;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    }
    
    animate();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Enhanced mouse move handler with timing control
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const x = e.clientX;
      const y = e.clientY;
      
      // Add stars with timing and distance control for elegance
      if (now - lastAddTime.current > 40 && 
          (!lastPos.current || Math.hypot(x - lastPos.current.x, y - lastPos.current.y) > 5)) {
        
        // Add a cluster of 1-2 stars (reduced from 2-3)
        const starCount = Math.floor(Math.random() * 1.5) + 1;
        
        for (let i = 0; i < starCount; i++) {
          const offsetX = (Math.random() - 0.5) * 55;
          const offsetY = (Math.random() - 0.5) * 55;
          
          stars.current.push({
            x: x + offsetX,
            y: y + offsetY,
            r: 1 + Math.random() * 2,
            color: randomColor(),
            alpha: 1,
            life: 0,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: 0.01 + Math.random() * 0.01,
            growthRate: 0.05 + Math.random() * 0.01, // Reduced from 0.1 to 0.05
            fadeRate: 0.96 + Math.random() * 0.03
          });
        }
        
        lastAddTime.current = now;
        lastPos.current = {x, y};
      }
    };
    
    // Add the event listener to document instead of canvas
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', // Changed from absolute to fixed
        left: 0,
        top: 0,
        width: '100vw', // Changed from 100% to 100vw
        height: '100vh', // Changed from 100% to 100vh
        pointerEvents: 'none',
        zIndex: 9999, // Higher z-index to ensure it's above everything
        background: 'transparent'
      }}
    />
  );
};

export default StarFollower; 