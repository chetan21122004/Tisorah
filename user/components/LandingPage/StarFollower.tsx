"use client"
import React, { useRef, useEffect } from 'react';

// Helper to draw a sparkle (4-pointed) star
function drawStar(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string, rotation: number, alpha: number) {
  ctx.save();
  ctx.beginPath();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  for (let i = 0; i < 4; i++) {
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -r);
    ctx.lineTo(0, -r * 0.3);
    ctx.rotate(Math.PI / 2);
  }
  ctx.closePath();
  ctx.strokeStyle = color;
  ctx.lineWidth = r * 0.25;
  ctx.globalAlpha = alpha;
  ctx.stroke();
  ctx.restore();
}

// Use vibrant, fully opaque colors
function randomColor() {
  const colors = [
    '#FF5E5B', // red
    '#FFD700', // yellow
    '#00CECB', // teal
    '#FF7F66', // orange
    '#6A4C93', // purple
    '#FFD166', // gold
    '#06D6A0', // green
    '#118AB2', // blue
    '#EF476F', // pink
    '#8338EC', // violet
    '#3A86FF'  // blue
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
}

const StarFollower: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stars = useRef<Star[]>([]);
  const animationRef = useRef<number | null>(null);
  const lastPos = useRef<{x: number, y: number} | null>(null);

  // Resize canvas to fit parent
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function animate() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.current = stars.current.filter(star => star.alpha > 0.01);
      for (const star of stars.current) {
        if (ctx) {
          drawStar(ctx, star.x, star.y, star.r, star.color, star.rotation, star.alpha);
          star.alpha *= 0.95;
          star.r += 0.15;
          star.rotation += 0.18;
          ctx.globalAlpha = star.alpha;
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    }
    animate();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Mouse move handler with gap
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (!lastPos.current || Math.hypot(x - lastPos.current.x, y - lastPos.current.y) > 26) {
        stars.current.push({
          x,
          y,
          r: 7 + Math.random() * 5,
          color: randomColor(),
          alpha: 1,
          life: 0,
          rotation: Math.random() * Math.PI * 2
        });
        lastPos.current = {x, y};
      }
    };
    canvas.addEventListener('mousemove', handleMouseMove);
    return () => canvas.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'auto',
        zIndex: 50
      }}
    />
  );
};

export default StarFollower; 