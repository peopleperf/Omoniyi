"use client";

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Line, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const skills = [
  { name: 'HR Automation', value: 95 },
  { name: 'Compliance', value: 90 },
  { name: 'Data Analytics', value: 85 },
  { name: 'Process Design', value: 92 },
  { name: 'Team Leadership', value: 88 },
  { name: 'Tech Integration', value: 87 }
];

function RadarMesh() {
  const meshRef = useRef<THREE.Group>(null);
  const numSides = skills.length;
  const angleStep = (Math.PI * 2) / numSides;

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  // Create radar points
  const points = skills.map((skill, i) => {
    const angle = i * angleStep;
    const radius = (skill.value / 100) * 2;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      0,
      Math.sin(angle) * radius
    );
  });

  // Close the shape
  points.push(points[0]);

  return (
    <group ref={meshRef}>
      {/* Grid lines */}
      {[0.5, 1, 1.5, 2].map((radius, i) => (
        <Line
          key={i}
          points={Array.from({ length: numSides + 1 }, (_, j) => {
            const angle = (j % numSides) * angleStep;
            return [
              Math.cos(angle) * radius,
              0,
              Math.sin(angle) * radius
            ];
          })}
          color="#0891B2"
          opacity={0.2}
          lineWidth={1}
        />
      ))}

      {/* Skill lines */}
      {skills.map((_, i) => {
        const angle = i * angleStep;
        return (
          <Line
            key={i}
            points={[
              [0, 0, 0],
              [Math.cos(angle) * 2, 0, Math.sin(angle) * 2]
            ]}
            color="#0891B2"
            opacity={0.2}
            lineWidth={1}
          />
        );
      })}

      {/* Skill polygon */}
      <Line
        points={points}
        color="#0891B2"
        opacity={0.8}
        lineWidth={2}
      />

      {/* Skill labels */}
      {skills.map((skill, i) => {
        const angle = i * angleStep;
        const labelRadius = 2.5;
        return (
          <Text
            key={i}
            position={[
              Math.cos(angle) * labelRadius,
              0,
              Math.sin(angle) * labelRadius
            ]}
            fontSize={0.15}
            color="#0891B2"
            anchorX="center"
            anchorY="middle"
          >
            {skill.name}
          </Text>
        );
      })}

      {/* Fill mesh */}
      <mesh>
        <extrudeGeometry
          args={[
            new THREE.Shape(points.map(p => new THREE.Vector2(p.x, p.z))),
            { depth: 0.1, bevelEnabled: false }
          ]}
        />
        <meshBasicMaterial color="#0891B2" opacity={0.2} transparent />
      </mesh>
    </group>
  );
}

export default function SkillsRadar() {
  return (
    <div className="w-full h-[400px]">
      <Canvas camera={{ position: [0, 5, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <RadarMesh />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
