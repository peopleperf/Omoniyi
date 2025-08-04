"use client";

import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Line, OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Award, TrendingUp, Users, Code, Globe, Brain } from 'lucide-react';

const skillsData = [
  {
    id: 'hr-automation',
    name: 'HR Automation',
    value: 95,
    icon: Code,
    color: '#0891B2',
    details: {
      title: 'HR Automation Expert',
      description: 'Transforming manual processes into intelligent automated workflows',
      achievements: [
        '400+ workflows automated across multiple platforms',
        'Reduced processing time by 60% company-wide',
        'Built custom integrations for 10+ HR systems',
        'Saved 2000+ hours annually through automation'
      ],
      tools: ['Zapier', 'n8n', 'Python', 'Google Apps Script', 'Power Automate'],
      projects: [
        'Employment Verification System',
        'HR Case Routing Bot',
        'Onboarding Automation Pipeline'
      ],
      experience: '8+ years'
    }
  },
  {
    id: 'compliance',
    name: 'Compliance',
    value: 90,
    icon: Globe,
    color: '#22c55e',
    details: {
      title: 'Global Compliance Specialist',
      description: 'Ensuring regulatory compliance across multiple jurisdictions',
      achievements: [
        'Managed compliance for 30+ countries',
        '100% audit pass rate for 5 consecutive years',
        'Designed multi-jurisdiction compliance framework',
        'Led GDPR implementation across EMEA'
      ],
      tools: ['Workday', 'Deel', 'Local compliance platforms', 'Legal databases'],
      projects: [
        'Global Compliance Dashboard',
        'Multi-country Policy Framework',
        'Automated Compliance Monitoring'
      ],
      experience: '10+ years'
    }
  },
  {
    id: 'analytics',
    name: 'Data Analytics',
    value: 85,
    icon: TrendingUp,
    color: '#9333ea',
    details: {
      title: 'People Analytics Professional',
      description: 'Turning HR data into actionable business insights',
      achievements: [
        'Built 50+ HR dashboards and reports',
        'Improved decision-making speed by 40%',
        'Created predictive models for turnover',
        'Established data-driven HR culture'
      ],
      tools: ['Looker', 'Tableau', 'Python', 'SQL', 'PowerBI'],
      projects: [
        'HR Analytics Engine',
        'Predictive Turnover Model',
        'Real-time Metrics Dashboard'
      ],
      experience: '6+ years'
    }
  },
  {
    id: 'process-design',
    name: 'Process Design',
    value: 92,
    icon: Brain,
    color: '#f59e0b',
    details: {
      title: 'Process Optimization Leader',
      description: 'Designing efficient, scalable people operations processes',
      achievements: [
        'Redesigned 20+ core HR processes',
        'Achieved 60% efficiency improvement',
        'Scaled processes from 50 to 5000+ employees',
        'Implemented lean methodologies in HR'
      ],
      tools: ['Miro', 'Lucidchart', 'Process Street', 'Lean Six Sigma'],
      projects: [
        'Global Onboarding Redesign',
        'Performance Management Overhaul',
        'Leave Management Optimization'
      ],
      experience: '9+ years'
    }
  },
  {
    id: 'leadership',
    name: 'Team Leadership',
    value: 88,
    icon: Users,
    color: '#ef4444',
    details: {
      title: 'People Operations Leader',
      description: 'Leading cross-functional teams to deliver exceptional results',
      achievements: [
        'Managed teams across 6 time zones',
        'Led 15+ cross-functional projects',
        'Mentored 20+ HR professionals',
        'Built high-performing global teams'
      ],
      tools: ['Slack', 'Asana', 'Monday.com', 'Leadership frameworks'],
      projects: [
        'HR Transformation Initiative',
        'Global Team Integration',
        'Culture Change Program'
      ],
      experience: '7+ years'
    }
  },
  {
    id: 'tech-integration',
    name: 'Tech Integration',
    value: 87,
    icon: Award,
    color: '#6366f1',
    details: {
      title: 'HR Tech Integration Specialist',
      description: 'Connecting disparate systems into cohesive HR tech ecosystems',
      achievements: [
        'Integrated 10+ HR platforms',
        'Reduced data silos by 80%',
        'Built custom APIs and webhooks',
        'Improved data accuracy to 99.9%'
      ],
      tools: ['APIs', 'Webhooks', 'iPaaS platforms', 'Custom scripts'],
      projects: [
        'HRIS Integration Hub',
        'Unified Employee Database',
        'Real-time Data Sync System'
      ],
      experience: '5+ years'
    }
  }
];

function InteractiveRadarMesh({ onSkillClick, activeSkill }) {
  const meshRef = useRef<THREE.Group>(null);
  const numSides = skillsData.length;
  const angleStep = (Math.PI * 2) / numSides;

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  const points = skillsData.map((skill, i) => {
    const angle = i * angleStep;
    const radius = (skill.value / 100) * 2;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      0,
      Math.sin(angle) * radius
    );
  });

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

      {/* Skill lines and interactive points */}
      {skillsData.map((skill, i) => {
        const angle = i * angleStep;
        const radius = (skill.value / 100) * 2;
        const isActive = activeSkill === skill.id;
        
        return (
          <group key={skill.id}>
            <Line
              points={[
                [0, 0, 0],
                [Math.cos(angle) * 2, 0, Math.sin(angle) * 2]
              ]}
              color={skill.color}
              opacity={0.3}
              lineWidth={1}
            />
            
            {/* Interactive skill point */}
            <Float speed={isActive ? 2 : 1} rotationIntensity={isActive ? 2 : 0.5}>
              <mesh
                position={[
                  Math.cos(angle) * radius,
                  0,
                  Math.sin(angle) * radius
                ]}
                onClick={() => onSkillClick(skill.id)}
                onPointerOver={(e) => {
                  e.stopPropagation();
                  document.body.style.cursor = 'pointer';
                }}
                onPointerOut={(e) => {
                  e.stopPropagation();
                  document.body.style.cursor = 'auto';
                }}
              >
                <sphereGeometry args={[isActive ? 0.15 : 0.1, 32, 32]} />
                <meshStandardMaterial
                  color={skill.color}
                  emissive={skill.color}
                  emissiveIntensity={isActive ? 0.8 : 0.3}
                />
              </mesh>
            </Float>
            
            {/* Skill label */}
            <Text
              position={[
                Math.cos(angle) * 2.5,
                0,
                Math.sin(angle) * 2.5
              ]}
              fontSize={0.15}
              color={skill.color}
              anchorX="center"
              anchorY="middle"
            >
              {skill.name}
            </Text>
          </group>
        );
      })}

      {/* Animated skill polygon */}
      <Line
        points={points}
        color="#0891B2"
        opacity={0.6}
        lineWidth={2}
      />

      {/* Fill mesh */}
      <mesh>
        <extrudeGeometry
          args={[
            new THREE.Shape(points.map(p => new THREE.Vector2(p.x, p.z))),
            { depth: 0.05, bevelEnabled: false }
          ]}
        />
        <meshBasicMaterial color="#0891B2" opacity={0.1} transparent />
      </mesh>
    </group>
  );
}

export default function InteractiveSkillsSystem() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const handleSkillClick = (skillId: string) => {
    setActiveSkill(skillId);
    setSelectedSkill(skillId);
  };

  const selectedSkillData = skillsData.find(s => s.id === selectedSkill);

  return (
    <div className="relative">
      {/* 3D Radar */}
      <div className="w-full h-[500px] bg-black/5 dark:bg-white/5 rounded-xl overflow-hidden">
        <Canvas camera={{ position: [0, 5, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <InteractiveRadarMesh 
            onSkillClick={handleSkillClick} 
            activeSkill={activeSkill}
          />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      {/* Skill Cards */}
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        {skillsData.map((skill, index) => {
          const Icon = skill.icon;
          return (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card 
                className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                  activeSkill === skill.id ? 'ring-2 ring-primary shadow-lg' : ''
                }`}
                onClick={() => handleSkillClick(skill.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${skill.color}20` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: skill.color }} />
                    </div>
                    <h3 className="font-semibold">{skill.name}</h3>
                  </div>
                  <span className="text-2xl font-bold" style={{ color: skill.color }}>
                    {skill.value}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mb-3">
                  <motion.div
                    className="h-2 rounded-full"
                    style={{ backgroundColor: skill.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.value}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {skill.details.achievements[0]}
                </p>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Skill Detail Modal */}
      <AnimatePresence>
        {selectedSkillData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="relative overflow-hidden">
                <div 
                  className="absolute inset-0 opacity-10"
                  style={{ backgroundColor: selectedSkillData.color }}
                />
                <CardContent className="relative p-8">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4"
                    onClick={() => setSelectedSkill(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>

                  <div className="flex items-center gap-4 mb-6">
                    <div 
                      className="w-16 h-16 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${selectedSkillData.color}20` }}
                    >
                      <selectedSkillData.icon 
                        className="w-8 h-8" 
                        style={{ color: selectedSkillData.color }} 
                      />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{selectedSkillData.details.title}</h2>
                      <p className="text-muted-foreground">{selectedSkillData.details.experience}</p>
                    </div>
                  </div>

                  <p className="text-lg mb-6">{selectedSkillData.details.description}</p>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3">Key Achievements</h3>
                      <ul className="space-y-2">
                        {selectedSkillData.details.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div 
                              className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                              style={{ backgroundColor: selectedSkillData.color }}
                            />
                            <span className="text-sm">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Tools & Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedSkillData.details.tools.map((tool) => (
                          <Badge key={tool} variant="secondary">{tool}</Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Related Projects</h3>
                      <div className="space-y-2">
                        {selectedSkillData.details.projects.map((project) => (
                          <div 
                            key={project}
                            className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                          >
                            {project}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
