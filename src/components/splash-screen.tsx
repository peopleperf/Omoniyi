"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [mounted, setMounted] = useState(false);

  const lines = [
    { text: "Hey!", delay: 2000 },
    { text: "I am Omoniyi.", delay: 2500 },
    { text: "Some people call me TheHRGuy.", delay: 3000 },
    { text: "While others know me as the AI guy.", delay: 3000 },
    { text: "Welcome to my world...", delay: 3000 },
    { text: "Where Technology meets Humanity.", delay: 3500 },
    { text: "This is my story of bridging both worlds.", delay: 4000 }
  ];

  // Set mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (currentLine >= lines.length) {
      // All lines completed, wait a bit then call onComplete
      setTimeout(() => {
        onComplete();
      }, 2000);
      return;
    }

    const currentText = lines[currentLine].text;
    let charIndex = 0;
    setDisplayedText('');
    setIsTyping(true);
    setIsExiting(false);

    const typingInterval = setInterval(() => {
      if (charIndex < currentText.length) {
        setDisplayedText(currentText.substring(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        
        // Wait before exiting
        setTimeout(() => {
          setIsExiting(true);
          // Move to next line after exit animation
          setTimeout(() => {
            setCurrentLine(prev => prev + 1);
          }, 800); // Time for exit animation
        }, lines[currentLine].delay);
      }
    }, 60); // Typing speed

    return () => clearInterval(typingInterval);
  }, [currentLine, onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Background particles or effects */}
        <div className="absolute inset-0">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
          
          {/* Animated background elements */}
          <div className="absolute inset-0">
            {mounted && [...Array(50)].map((_, i) => {
              // Generate stable positions based on index
              const x1 = ((i * 37) % 100) + "%";
              const y1 = ((i * 43) % 100) + "%";
              const x2 = (((i * 37 + 50) % 100)) + "%";
              const y2 = (((i * 43 + 50) % 100)) + "%";
              const duration = 15 + (i % 10) * 2;
              
              return (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/10 rounded-full"
                  style={{ left: x1, top: y1 }}
                  animate={{
                    left: [x1, x2, x1],
                    top: [y1, y2, y1]
                  }}
                  transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Text content */}
        <div className="relative z-10 max-w-4xl mx-auto px-8 h-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            {currentLine < lines.length && (
              <motion.div
                key={currentLine}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ 
                  opacity: isExiting ? 0 : 1, 
                  scale: isExiting ? 1.1 : 1, 
                  y: isExiting ? -50 : 0 
                }}
                exit={{ opacity: 0, scale: 0.8, y: -50 }}
                transition={{ 
                  duration: 0.8,
                  ease: [0.43, 0.13, 0.23, 0.96]
                }}
                className={`text-white font-mono text-center ${
                  currentLine === 0 ? 'text-5xl md:text-7xl font-bold' : 
                  currentLine <= 3 ? 'text-3xl md:text-5xl font-semibold' : 
                  'text-2xl md:text-3xl'
                }`}
              >
                <motion.div
                  initial={{ filter: "blur(10px)" }}
                  animate={{ filter: "blur(0px)" }}
                  transition={{ duration: 0.5 }}
                >
                  {displayedText}
                  {showCursor && !isExiting && (
                    <motion.span 
                      className="inline-block w-[4px] h-[1.2em] bg-white ml-2 align-middle"
                      animate={{ opacity: showCursor ? 1 : 0 }}
                      transition={{ duration: 0.1 }}
                    />
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Skip button (appears after first line) */}
        {currentLine > 0 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={onComplete}
            className="absolute bottom-8 right-8 text-white/50 hover:text-white transition-colors text-sm font-mono"
          >
            Skip Intro →
          </motion.button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
