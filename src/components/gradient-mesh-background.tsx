"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

export default function GradientMeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let time = 0;
    const colors = theme === 'light' ? [
      { r: 8, g: 145, b: 178, a: 0.06 }, // Primary color with lower opacity for light mode
      { r: 34, g: 197, b: 94, a: 0.03 }, // Green accent
      { r: 147, g: 51, b: 234, a: 0.03 }, // Purple accent
    ] : [
      { r: 8, g: 145, b: 178, a: 0.1 }, // Primary color with low opacity
      { r: 34, g: 197, b: 94, a: 0.05 }, // Green accent
      { r: 147, g: 51, b: 234, a: 0.05 }, // Purple accent
    ];

    const drawGradientMesh = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create animated gradient mesh
      for (let i = 0; i < 3; i++) {
        const x = (Math.sin(time * 0.001 + i) + 1) * 0.5 * canvas.width;
        const y = (Math.cos(time * 0.001 + i) + 1) * 0.5 * canvas.height;
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 400);
        const color = colors[i];
        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      time++;
      requestAnimationFrame(drawGradientMesh);
    };

    drawGradientMesh();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      style={{ zIndex: 1 }}
    />
  );
}
