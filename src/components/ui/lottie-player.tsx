"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface LottiePlayerProps {
  animationData: any;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
}

export default function LottiePlayer({ 
  animationData, 
  loop = true, 
  autoplay = true, 
  className = "" 
}: LottiePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('lottie-web').then((lottie) => {
        if (containerRef.current) {
          const animation = lottie.default.loadAnimation({
            container: containerRef.current,
            renderer: 'svg',
            loop,
            autoplay,
            animationData,
          });

          return () => animation.destroy();
        }
      });
    }
  }, [animationData, loop, autoplay]);

  return (
    <motion.div
      ref={containerRef}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    />
  );
}