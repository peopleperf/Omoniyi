"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Float, MeshDistortMaterial, Environment, Stars, Cloud } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Calendar, 
  Linkedin, 
  Github, 
  Mail, 
  ChevronDown,
  Play,
  Volume2,
  VolumeX
} from 'lucide-react';

// Cinematic text effect
function CinematicText({ children, delay = 0 }: { children: string; delay?: number }) {
  return (
    <motion.span
      className="inline-block"
      initial={{ opacity: 0, y: 50, rotateX: -90 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 1.2,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {children.split(' ').map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: delay + i * 0.1,
            ease: "easeOut"
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Cinematic particles
function CinematicParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 3000;
  
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    
    colors[i * 3] = 0.5 + Math.random() * 0.5;
    colors[i * 3 + 1] = 0.8 + Math.random() * 0.2;
    colors[i * 3 + 2] = 1;
  }
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Cinematic camera movement
function CinematicCamera() {
  const { camera } = useThree();
  
  useFrame((state) => {
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.5;
    camera.position.y = Math.cos(state.clock.elapsedTime * 0.1) * 0.5;
    camera.lookAt(0, 0, 0);
  });
  
  return null;
}

// Main cinematic hero component
export default function CinematicHero({ onScrollToProjects }: { onScrollToProjects: () => void }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPlaying(true);
      setShowContent(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Cinematic bars */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[10vh] bg-black z-20"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isPlaying ? 1 : 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        style={{ transformOrigin: "top" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[10vh] bg-black z-20"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isPlaying ? 1 : 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        style={{ transformOrigin: "bottom" }}
      />

      {/* 3D Background Scene */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <CinematicCamera />
          <CinematicParticles />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          {/* Floating geometric shapes */}
          <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
            <mesh position={[3, 0, 0]}>
              <dodecahedronGeometry args={[1, 1]} />
              <MeshDistortMaterial
                color="#0891B2"
                speed={2}
                distort={0.3}
                radius={1}
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>
          </Float>
          
          <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
            <mesh position={[-3, -1, -2]}>
              <octahedronGeometry args={[0.8, 0]} />
              <MeshDistortMaterial
                color="#22c55e"
                speed={3}
                distort={0.4}
                radius={1}
                roughness={0.1}
                metalness={0.9}
              />
            </mesh>
          </Float>
          
          <Environment preset="night" />
          <fog attach="fog" args={['#000000', 5, 25]} />
        </Canvas>
      </div>

      {/* Terminal overlay effect */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(34, 197, 94, 0.03) 2px,
            rgba(34, 197, 94, 0.03) 4px
          )`
        }}
      />

      {/* Main content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="relative z-10 min-h-screen flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            <div className="max-w-7xl mx-auto w-full">
              <div className="text-center space-y-8">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="inline-block"
                >
                  <Badge className="px-6 py-2 text-lg bg-primary/20 text-primary border-primary/30 backdrop-blur-sm">
                    People Operations Leader
                  </Badge>
                </motion.div>

                {/* Main title with cinematic effect */}
                <div className="space-y-4">
                  <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold">
                    <CinematicText delay={1.2}>Hi, I'm</CinematicText>
                    <br />
                    <motion.span
                      className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-green-400"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1, delay: 2 }}
                    >
                      Omoniyi
                    </motion.span>
                  </h1>
                  
                  <motion.p
                    className="text-2xl sm:text-3xl md:text-4xl text-gray-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 2.5 }}
                  >
                    I run People Ops like a product
                  </motion.p>
                </div>

                {/* Description with typewriter effect */}
                <motion.p
                  className="text-lg sm:text-xl max-w-3xl mx-auto text-gray-400 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 3 }}
                >
                  I help global companies scale compliant HR operations while building 
                  automation tools that reduce manual effort and increase accuracy.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 3.5 }}
                >
                  <Button 
                    size="lg" 
                    onClick={onScrollToProjects}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground group px-8 py-6 text-lg"
                  >
                    View My Projects
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => window.open('https://calendly.com/ipayeniyi/30min', '_blank')}
                    className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-6 text-lg"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule a Call
                  </Button>
                </motion.div>

                {/* Social links */}
                <motion.div
                  className="flex items-center justify-center space-x-6 pt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 4 }}
                >
                  <a 
                    href="https://www.linkedin.com/in/omoniyiipaye" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-400 hover:text-primary transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                    <span>LinkedIn</span>
                  </a>
                  <a 
                    href="https://github.com/peopleperf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-400 hover:text-primary transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    <span>GitHub</span>
                  </a>
                  <a 
                    href="mailto:omoniyi@tuta.io"
                    className="flex items-center space-x-2 text-gray-400 hover:text-primary transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Email</span>
                  </a>
                </motion.div>
              </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
              className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
              animate={{ opacity: [0.5, 1, 0.5], y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex flex-col items-center text-gray-400">
                <span className="text-sm mb-2">Scroll to explore</span>
                <ChevronDown className="w-6 h-6" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sound toggle */}
      <motion.button
        className="absolute top-8 right-8 z-30 p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
        onClick={() => setSoundEnabled(!soundEnabled)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        {soundEnabled ? (
          <Volume2 className="w-5 h-5 text-white" />
        ) : (
          <VolumeX className="w-5 h-5 text-white" />
        )}
      </motion.button>
    </section>
  );
}
