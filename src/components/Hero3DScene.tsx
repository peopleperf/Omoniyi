"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function FloatingShape({ position, color, scale = 1 }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const time = useRef(0);
  
  useFrame((state, delta) => {
    time.current += delta;
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(time.current) * 0.1;
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <dodecahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={color}
          speed={2}
          distort={0.3}
          radius={1}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const particlesCount = 500;
  const positions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#0891B2"
        sizeAttenuation
        transparent
        opacity={0.6}
      />
    </points>
  );
}

function Hero3DScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0891B2" />
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
        
        {/* Floating geometric shapes */}
        <FloatingShape position={[2, 0, 0]} color="#0891B2" scale={0.8} />
        <FloatingShape position={[-2, 1, -1]} color="#22c55e" scale={0.6} />
        <FloatingShape position={[0, -1, 1]} color="#9333ea" scale={0.7} />
        
        {/* Particle field background */}
        <ParticleField />
        
        {/* Fog for depth */}
        <fog attach="fog" args={['#000000', 5, 15]} />
      </Canvas>
    </div>
  );
}

export default Hero3DScene;
