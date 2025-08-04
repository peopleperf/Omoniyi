"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingAnimationProps {
  isLoading: boolean;
}

export default function LoadingAnimation({ isLoading }: LoadingAnimationProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            {/* Animated Logo */}
            <motion.div
              className="text-6xl font-bold bg-gradient-to-r from-primary via-cyan-500 to-purple-500 bg-clip-text text-transparent"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.5,
                ease: "easeOut"
              }}
            >
              OI
            </motion.div>

            {/* Rotating Rings */}
            <motion.div
              className="absolute inset-0 -m-8"
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div className="w-32 h-32 border-2 border-primary/20 rounded-full" />
            </motion.div>

            <motion.div
              className="absolute inset-0 -m-12"
              animate={{ rotate: -360 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div className="w-40 h-40 border-2 border-cyan-500/20 rounded-full" />
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-32"
            >
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-cyan-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>

            {/* Loading Text */}
            <motion.p
              className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 text-sm text-muted-foreground whitespace-nowrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Initializing amazing experience...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
