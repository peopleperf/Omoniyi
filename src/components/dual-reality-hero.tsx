"use client";

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Float, MeshDistortMaterial, Environment, Stars, PerspectiveCamera, useScroll } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { 
  ArrowRight, 
  Calendar, 
  Linkedin, 
  Github, 
  Mail, 
  ChevronDown,
  Terminal,
  Users,
  Code,
  Brain,
  Sparkles,
  Zap
} from 'lucide-react';

// Terminal text animation component
function TerminalText({ text, isActive }: { text: string; isActive: boolean }) {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (!isActive) {
      setDisplayText('');
      return;
    }

    let index = 0;
    const interval = setInterval(() => {
      setDisplayText(text.substring(0, index));
      index++;
      if (index > text.length) {
        clearInterval(interval);
      }
    }, 50);

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(cursorInterval);
    };
  }, [text, isActive]);

  return (
    <div className="font-mono text-emerald-700 dark:text-green-400">
      {displayText}
      {showCursor && <span className="animate-pulse">_</span>}
    </div>
  );
}

// Tech particles that respond to mouse
function TechParticles({ mouseX, isLight }: { mouseX: number; isLight: boolean }) {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 1000;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
      
      // Respond to mouse position
      const targetX = (mouseX - 0.5) * 2;
      particlesRef.current.position.x += (targetX - particlesRef.current.position.x) * 0.02;
    }
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={isLight ? "#059669" : "#00ff00"}
        transparent
        opacity={isLight ? 0.3 : 0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// HR/People visualization
function PeopleNetwork({ mouseX, isLight }: { mouseX: number; isLight: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.01;
      const targetX = (mouseX - 0.5) * -1;
      groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.02;
      groupRef.current.position.z = -3; // Push back in space
    }
  });

  return (
    <group ref={groupRef} scale={0.7}>
      {/* Central node - smaller and more subtle */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[0, 0, -2]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial 
            color={isLight ? "#1e40af" : "#3b82f6"} 
            emissive={isLight ? "#1e40af" : "#3b82f6"} 
            emissiveIntensity={isLight ? 0.1 : 0.3}
            transparent
            opacity={0.8}
          />
        </mesh>
      </Float>
      
      {/* Connected nodes representing people */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x = Math.cos(angle) * 2.5;
        const z = Math.sin(angle) * 2.5;
        return (
          <group key={i}>
            <Float speed={1.5 + i * 0.1} rotationIntensity={0.3} floatIntensity={0.8}>
              <mesh position={[x * 0.8, 0, z * 0.8 - 1]}>
                <sphereGeometry args={[0.2, 32, 32]} />
                <meshStandardMaterial 
                  color={isLight ? "#059669" : "#22c55e"} 
                  emissive={isLight ? "#059669" : "#22c55e"} 
                  emissiveIntensity={isLight ? 0.1 : 0.2}
                  transparent
                  opacity={0.6}
                />
              </mesh>
            </Float>
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([0, 0, 0, x, 0, z])}
                  itemSize={3}
                  args={[new Float32Array([0, 0, 0, x, 0, z]), 3]}
                />
              </bufferGeometry>
              <lineBasicMaterial color={isLight ? "#1e40af" : "#3b82f6"} opacity={isLight ? 0.25 : 0.3} transparent />
            </line>
          </group>
        );
      })}
    </group>
  );
}

// 3D Scene with dual reality
function DualRealityScene({ mouseX, activeSection, isLight }: { mouseX: number; activeSection: 'tech' | 'hr' | 'both'; isLight: boolean }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
      <ambientLight intensity={isLight ? 0.6 : 0.4} />
      <pointLight position={[10, 10, 10]} intensity={isLight ? 0.8 : 0.6} />
      <pointLight position={[-10, -10, -10]} intensity={isLight ? 0.6 : 0.5} color={isLight ? "#2563eb" : "#3b82f6"} />
      
      {/* Tech side elements */}
      <group visible={activeSection !== 'hr'}>
        <TechParticles mouseX={mouseX} isLight={isLight} />
        <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
          <mesh position={[-3, 0, -2]}>
            <octahedronGeometry args={[0.7, 0]} />
            <meshStandardMaterial 
              color={isLight ? "#047857" : "#00ff00"} 
              wireframe 
              emissive={isLight ? "#047857" : "#00ff00"} 
              emissiveIntensity={isLight ? 0.08 : 0.15}
              transparent
              opacity={0.7}
            />
          </mesh>
        </Float>
      </group>
      
      {/* HR side elements */}
      <group visible={activeSection !== 'tech'}>
        <PeopleNetwork mouseX={mouseX} isLight={isLight} />
      <Stars 
        radius={50} 
        depth={50} 
        count={isLight ? 1000 : 2000} 
        factor={isLight ? 1 : 2} 
        saturation={0} 
        fade 
        speed={0.5} 
      />
      </group>
      
      <Environment preset={isLight ? "apartment" : "night"} />
      <fog attach="fog" args={[isLight ? '#fafafa' : '#000000', 10, 30]} />
    </>
  );
}

// Main dual reality hero component
export default function DualRealityHero({ onScrollToProjects }: { onScrollToProjects: () => void }) {
  const [mouseX, setMouseX] = useState(0.5);
  const [activeSection, setActiveSection] = useState<'tech' | 'hr' | 'both'>('both');
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null);
  const mouseXMotion = useMotionValue(0.5);
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isLight = currentTheme === 'light';

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      setMouseX(x);
      mouseXMotion.set(x);
      
      // Smoother transition zones
      if (x < 0.35) {
        setActiveSection('tech');
      } else if (x > 0.65) {
        setActiveSection('hr');
      } else {
        setActiveSection('both');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Set loaded after delay
    setTimeout(() => setIsLoaded(true), 500);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smoother width transitions
  const leftWidth = useTransform(
    mouseXMotion,
    [0, 0.5, 1],
    ['80%', '50%', '20%']
  );

  const rightWidth = useTransform(
    mouseXMotion,
    [0, 0.5, 1],
    ['20%', '50%', '80%']
  );

  // Opacity for blending
  const leftOpacity = useTransform(
    mouseXMotion,
    [0, 0.3, 0.7, 1],
    [1, 0.9, 0.3, 0.2]
  );

  const rightOpacity = useTransform(
    mouseXMotion,
    [0, 0.3, 0.7, 1],
    [0.2, 0.3, 0.9, 1]
  );

  return (
    <section className="relative min-h-screen overflow-hidden bg-black dark:bg-black transition-colors duration-300">
      {/* Background gradient overlay */}
      <div className={`absolute inset-0 transition-opacity duration-300 ${isLight ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50" />
      </div>
      {/* 3D Background */}
      <div className="absolute inset-0">
        <Canvas>
          <DualRealityScene mouseX={mouseX} activeSection={activeSection} isLight={isLight} />
        </Canvas>
      </div>

      {/* Split screen content */}
      <div className="relative z-10 min-h-screen flex">
        {/* Gradient Blend Layer */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isLight
              ? `linear-gradient(to right, 
                  rgba(34, 197, 94, ${activeSection === 'tech' ? 0.08 : 0.02}) 0%, 
                  transparent 40%, 
                  transparent 60%, 
                  rgba(59, 130, 246, ${activeSection === 'hr' ? 0.08 : 0.02}) 100%)`
              : `linear-gradient(to right, 
                  rgba(0, 255, 0, ${activeSection === 'tech' ? 0.1 : 0.02}) 0%, 
                  transparent 40%, 
                  transparent 60%, 
                  rgba(59, 130, 246, ${activeSection === 'hr' ? 0.1 : 0.02}) 100%)`
          }}
        />

        {/* Tech/Developer Side */}
        <motion.div 
          className="relative flex-1 flex items-center justify-center overflow-hidden"
          style={{ 
            width: leftWidth,
            opacity: leftOpacity,
            filter: activeSection === 'hr' ? 'blur(2px)' : 'blur(0px)',
            transition: 'filter 0.5s ease'
          }}
          onMouseEnter={() => setHoveredSide('left')}
          onMouseLeave={() => setHoveredSide(null)}
        >
          {/* Terminal effect overlay with gradient fade */}
          <motion.div 
            className="absolute inset-0" 
            style={{
              background: isLight 
                ? `linear-gradient(to right, 
                    rgba(249, 250, 251, 0.9) 0%, 
                    rgba(249, 250, 251, 0.7) 70%, 
                    rgba(249, 250, 251, 0.3) 90%, 
                    transparent 100%)`
                : `linear-gradient(to right, 
                    rgba(0, 0, 0, 0.7) 0%, 
                    rgba(0, 0, 0, 0.5) 70%, 
                    rgba(0, 0, 0, 0.2) 90%, 
                    transparent 100%)`,
              backdropFilter: 'blur(4px)'
            }}
          />
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: isLight
                ? `repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 2px,
                    rgba(5, 150, 105, 0.02) 2px,
                    rgba(5, 150, 105, 0.02) 4px
                  )`
                : `repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 2px,
                    rgba(0, 255, 0, 0.03) 2px,
                    rgba(0, 255, 0, 0.03) 4px
                  )`,
              maskImage: 'linear-gradient(to right, black 0%, black 80%, transparent 100%)'
            }}
          />

          <AnimatePresence>
            {isLoaded && (
              <motion.div
                className="relative z-10 p-8 max-w-2xl w-full"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <div className="mb-6">
                  <Terminal className="w-12 h-12 text-emerald-600 dark:text-green-400 mb-4" />
                  <h2 className="text-2xl font-mono text-emerald-700 dark:text-green-400 mb-2">Developer Mode</h2>
                  <div className="space-y-2">
                    <TerminalText 
                      text="$ cat skills.json | grep 'technical'" 
                      isActive={hoveredSide === 'left' || activeSection === 'tech'}
                    />
                    <TerminalText 
                      text="→ Full-stack development" 
                      isActive={hoveredSide === 'left' || activeSection === 'tech'}
                    />
                    <TerminalText 
                      text="→ HR automation systems" 
                      isActive={hoveredSide === 'left' || activeSection === 'tech'}
                    />
                    <TerminalText 
                      text="→ API integrations" 
                      isActive={hoveredSide === 'left' || activeSection === 'tech'}
                    />
                  </div>
                </div>

                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredSide === 'left' ? 1 : 0.7 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center space-x-2 text-emerald-700/80 dark:text-green-400/80">
                    <Code className="w-5 h-5" />
                    <span className="font-mono text-sm">Technically expeienced in automating HR processes</span>
                  </div>
                  <div className="flex items-center space-x-2 text-emerald-700/80 dark:text-green-400/80">
                    <Zap className="w-5 h-5" />
                    <span className="font-mono text-sm">50+ automations built</span>
                  </div>
                  <div className="flex items-center space-x-2 text-emerald-700/80 dark:text-green-400/80">
                    <Brain className="w-5 h-5" />
                    <span className="font-mono text-sm">AI Implementations to Internal Tools</span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Central Blend Zone */}
        <motion.div 
          className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 z-20"
          style={{
            opacity: activeSection === 'both' ? 1 : 0.3,
            transition: 'opacity 0.5s ease'
          }}
        >
          <div className="relative h-full">
            {/* Animated gradient line */}
            <motion.div
              className="absolute inset-0 w-full"
              style={{
                background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.5), transparent)',
              }}
              animate={{
                scaleY: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Central orb */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{ 
                scale: activeSection === 'both' ? [1, 1.3, 1] : 0.8,
                opacity: activeSection === 'both' ? 1 : 0.3
              }}
              transition={{ 
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 0.3 }
              }}
            >
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-green-400/30 to-blue-400/30 blur-2xl" />
                <div className="absolute inset-0 w-32 h-32 rounded-full bg-gradient-to-r from-green-400/20 to-blue-400/20 blur-xl animate-pulse" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* HR/People Side */}
        <motion.div 
          className="relative flex-1 flex items-center justify-center overflow-hidden"
          style={{ 
            width: rightWidth,
            opacity: rightOpacity,
            filter: activeSection === 'tech' ? 'blur(2px)' : 'blur(0px)',
            transition: 'filter 0.5s ease'
          }}
          onMouseEnter={() => setHoveredSide('right')}
          onMouseLeave={() => setHoveredSide(null)}
        >
          {/* Gradient overlay with blend */}
          <motion.div 
            className="absolute inset-0" 
            style={{
              background: isLight
                ? `linear-gradient(to left, 
                    rgba(37, 99, 235, 0.1) 0%, 
                    rgba(37, 99, 235, 0.08) 70%, 
                    rgba(37, 99, 235, 0.03) 90%, 
                    transparent 100%)`
                : `linear-gradient(to left, 
                    rgba(59, 130, 246, 0.2) 0%, 
                    rgba(59, 130, 246, 0.15) 70%, 
                    rgba(59, 130, 246, 0.05) 90%, 
                    transparent 100%)`,
              backdropFilter: 'blur(4px)'
            }}
          />

          <AnimatePresence>
            {isLoaded && (
              <motion.div
                className="relative z-10 p-8 max-w-2xl w-full text-center"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <Badge className="px-6 py-2 text-lg bg-primary/10 dark:bg-primary/20 text-primary border-primary/20 dark:border-primary/30 backdrop-blur-sm mb-6">
                    People Operations Leader
                  </Badge>
                </motion.div>

                <h1 className="text-5xl sm:text-6xl font-bold mb-4 text-gray-900 dark:text-white">
                  <motion.span
                    className="inline-block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                  >
                    I'm Omoniyi
                  </motion.span>
                </h1>

                <motion.p
                  className="text-2xl text-gray-700 dark:text-gray-300 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  I run People Ops like a product
                </motion.p>

                <motion.p
                  className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                >
                  Scaling compliant HR operations globally while building 
                  automation tools that transform how teams work
                </motion.p>

                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredSide === 'right' ? 1 : 0.7 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-center space-x-2 text-blue-600 dark:text-blue-400">
                    <Users className="w-5 h-5" />
                    <span className="text-sm">5000+ employees managed</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-purple-600 dark:text-purple-400">
                    <Sparkles className="w-5 h-5" />
                    <span className="text-sm">20+ countries</span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Central CTA section that appears on hover */}
      <AnimatePresence>
        {activeSection === 'both' && (
          <motion.div
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-30"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          >
            <div className="text-center space-y-6">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 blur-xl rounded-full" />
                
                <div className="relative bg-white dark:bg-gray-900/80 backdrop-blur-md rounded-full px-8 py-4 border border-gray-200 dark:border-white/20 shadow-lg dark:shadow-none">
                  <p className="text-gray-900 dark:text-white text-lg font-medium">
                    Bridging the gap between{' '}
                    <span className="text-emerald-600 dark:text-green-400 font-semibold">technology</span>{' '}
                    and{' '}
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">people</span>
                  </p>
                </div>
              </motion.div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg" 
                  onClick={onScrollToProjects}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white group px-8 py-6 text-lg"
                >
                  Explore My Work
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => window.open('https://calendly.com/ipayeniyi/30min', '_blank')}
                  className="border-gray-300 dark:border-white/30 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 px-8 py-6 text-lg"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Let's Connect
                </Button>
              </div>

              {/* Social links */}
              <motion.div
                className="flex items-center justify-center space-x-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <a 
                  href="https://www.linkedin.com/in/omoniyiipaye" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="https://github.com/peopleperf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href="mailto:omoniyi@tuta.io"
                  className="text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ opacity: [0.5, 1, 0.5], y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center text-gray-600 dark:text-white/40">
          <span className="text-sm mb-2">Explore more</span>
          <ChevronDown className="w-6 h-6" />
        </div>
      </motion.div>
    </section>
  );
}
