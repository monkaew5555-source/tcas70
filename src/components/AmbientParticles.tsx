import React, { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { AppTheme } from '../types';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  color: string;
  twinkleSpeed: number;
  twinklePhase: number;
  shape: 'circle' | 'star' | 'diamond';
}

const THEME_PALETTES: Record<AppTheme, string[]> = {
  sky: ['#38bdf8', '#7dd3fc', '#0284c7', '#bae6fd', '#00668a'],
  'sky-dark': ['#38bdf8', '#0ea5e9', '#60a5fa', '#93c5fd', '#0284c7'],
  pink: ['#f472b6', '#fb7185', '#fda4af', '#f43f5e', '#be185d'],
  'pink-dark': ['#fb7185', '#f472b6', '#db2777', '#f43f5e', '#fda4af'],
  purple: ['#c084fc', '#a855f7', '#d8b4fe', '#9333ea', '#6d28d9'],
  'purple-dark': ['#c084fc', '#a855f7', '#7c3aed', '#e9d5ff', '#d8b4fe'],
  green: ['#34d399', '#10b981', '#6ee7b7', '#059669', '#047857'],
  'green-dark': ['#34d399', '#10b981', '#059669', '#6ee7b7', '#a7f3d0'],
  orange: ['#fb923c', '#f97316', '#fdba74', '#ea580c', '#c2410c'],
  'orange-dark': ['#fb923c', '#f97316', '#ea580c', '#fed7aa', '#fdba74'],
  classic: ['#38bdf8', '#00668a', '#60a5fa', '#3b82f6', '#93c5fd'],
  'classic-dark': ['#60a5fa', '#38bdf8', '#93c5fd', '#1d4ed8', '#bfdbfe'],
};

export const AmbientParticles: React.FC = () => {
  const { currentTheme, isParticleEnabled } = useApp();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isParticleEnabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const colors = THEME_PALETTES[currentTheme] || THEME_PALETTES.sky;
    const particleCount = Math.min(38, Math.floor((width * height) / 28000));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const baseAlpha = Math.random() * 0.45 + 0.15;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.45 - 0.1, // gently drift upwards
        size: Math.random() * 3.5 + 1.2,
        alpha: baseAlpha,
        baseAlpha,
        color: colors[Math.floor(Math.random() * colors.length)],
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
        shape: Math.random() > 0.65 ? 'star' : Math.random() > 0.5 ? 'diamond' : 'circle',
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.twinklePhase += p.twinkleSpeed;
        p.alpha = p.baseAlpha + Math.sin(p.twinklePhase) * 0.2;
        p.alpha = Math.max(0.05, Math.min(0.85, p.alpha));

        // Wrap around screen
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.size * 2;

        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 'star') {
          // 4-pointed sparkle
          const r = p.size * 1.5;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y - r);
          ctx.lineTo(p.x + r * 0.3, p.y - r * 0.3);
          ctx.lineTo(p.x + r, p.y);
          ctx.lineTo(p.x + r * 0.3, p.y + r * 0.3);
          ctx.lineTo(p.x, p.y + r);
          ctx.lineTo(p.x - r * 0.3, p.y + r * 0.3);
          ctx.lineTo(p.x - r, p.y);
          ctx.lineTo(p.x - r * 0.3, p.y - r * 0.3);
          ctx.closePath();
          ctx.fill();
        } else {
          // diamond
          const r = p.size * 1.2;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y - r);
          ctx.lineTo(p.x + r, p.y);
          ctx.lineTo(p.x, p.y + r);
          ctx.lineTo(p.x - r, p.y);
          ctx.closePath();
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentTheme, isParticleEnabled]);

  if (!isParticleEnabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 transition-opacity duration-500"
      style={{ opacity: 0.85 }}
    />
  );
};
