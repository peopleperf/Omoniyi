"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  life: number;
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      // Create particle trail
      const newParticle: Particle = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        life: 1
      };
      
      setParticles(prev => [...prev, newParticle].slice(-20));
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') !== null ||
        target.closest('a') !== null
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  // Update particle life
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => 
        prev
          .map(p => ({ ...p, life: p.life - 0.02 }))
          .filter(p => p.life > 0)
      );
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>
      
      {/* Particle Trail */}
      <div className="pointer-events-none fixed inset-0 z-[9998]">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-primary rounded-full"
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              left: particle.x - 2,
              top: particle.y - 2,
              opacity: particle.life
            }}
          />
        ))}
      </div>

      {/* Main Cursor */}
      <motion.div
        ref={cursorRef}
        className="pointer-events-none fixed z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%'
        }}
      >
        <motion.div
          className="relative"
          animate={{
            scale: isPointer ? 1.5 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          {/* Outer Ring */}
          <motion.div
            className="absolute inset-0 border-2 border-white rounded-full"
            animate={{
              width: isPointer ? 40 : 30,
              height: isPointer ? 40 : 30,
            }}
            transition={{ duration: 0.2 }}
            style={{
              transform: 'translate(-50%, -50%)',
              top: '50%',
              left: '50%'
            }}
          />
          
          {/* Center Dot */}
          <motion.div
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              transform: 'translate(-50%, -50%)',
              top: '50%',
              left: '50%'
            }}
          />
        </motion.div>
      </motion.div>
    </>
  );
}
