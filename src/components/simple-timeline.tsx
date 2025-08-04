"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Briefcase, 
  MapPin, 
  TrendingUp, 
  ArrowRight,
  ArrowLeft,
  X
} from 'lucide-react';

const experienceData = [
  {
    company: 'Arla',
    period: '2017-2021',
    region: 'Africa',
    role: 'HR Operations',
    story: "I started my journey here, supporting HR Operations from Daily operations to HRIS and reporting.",
    impact: "Reduced compliance processing time by 60%",
    color: "from-blue-500 to-indigo-600",
    technologies: ['Excel', 'SAP SuccessFactors', 'PowerBI'],
  },
  {
    company: 'Monumental',
    period: 'December 2021',
    region: 'Africa',
    role: 'HR Consultant',
    story: "Designed and implemented innovative HR frameworks, significantly improving employee engagement.",
    impact: "I laid a groundwork for the HR function to scale and grow.",
    color: "from-green-500 to-emerald-600",
    technologies: ['Looker', 'Zapier', 'BambooHR'],
  },
  {
    company: 'Maersk',
    period: '2021-2022',
    region: 'EMEA',
    role: 'People Advisor',
    story: "Supported major HR transformations across Africa and Europe, contributing to policy harmonization and Workday implementation.",
    impact: "served a key player in the HR transformation of Maersk",
    color: "from-cyan-500 to-blue-600",
    technologies: ['Workday', 'Velocity', 'Power Automate'],
  },
  {
    company: 'Deel',
    period: '2022-2024',
    region: 'Global',
    role: 'HR Operations Manager',
    story: "On the front lines of remote work revolution, designing compliance frameworks.",
    impact: "Enabled global hiring for 100+ companies with 100% compliance",
    color: "from-purple-500 to-pink-600",
    technologies: ['Deel', 'Workday', 'Zapier', 'Python', 'Product Contributor'],
  },
  {
    company: 'Consensys',
    period: '2024-Present',
    region: 'EMEA',
    role: 'People Operations Manager',
    story: "Building new models for people operations in the Web3 world.",
    impact: "Creating people operations for decentralized work",
    color: "from-orange-500 to-red-600",
    technologies: ['AI/ML', 'Web3 Tools', 'Smart Contracts'],
  }
];

export default function SimpleTimeline() {
  const [selectedExperience, setSelectedExperience] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(timelineRef);
  
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"]
  });

  const progressX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    if (!isAutoPlaying || selectedExperience !== null) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % experienceData.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, selectedExperience]);

  const handleExperienceClick = (index: number) => {
    setSelectedExperience(index);
    setIsAutoPlaying(false);
  };

  const closeModal = () => {
    setSelectedExperience(null);
    setIsAutoPlaying(true);
  };

  return (
    <section 
      ref={timelineRef}
      className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">Where I've Been</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From EMEA to APAC, I've designed and scaled people systems that power growth across borders.
          </p>
        </motion.div>

        {/* Timeline Progress Bar */}
        <div className="relative mb-12">
          <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-cyan-500 rounded-full"
              style={{ width: progressX }}
            />
          </div>
          
          {/* Timeline dots */}
          <div className="absolute top-0 w-full flex justify-between items-center -mt-2">
            {experienceData.map((exp, index) => (
              <motion.button
                key={exp.company}
                className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                  currentIndex >= index 
                    ? 'bg-primary border-primary shadow-lg shadow-primary/25' 
                    : 'bg-background border-muted-foreground/30 hover:border-primary/50'
                }`}
                onClick={() => {
                  setCurrentIndex(index);
                  handleExperienceClick(index);
                }}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </div>
        </div>

        {/* Timeline Cards */}
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex space-x-6"
              animate={{
                x: `calc(-${currentIndex * (100 / experienceData.length)}% - ${currentIndex * 1.5}rem)`
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ width: `${experienceData.length * 100}%` }}
            >
              {experienceData.map((exp, index) => (
                <motion.div
                  key={exp.company}
                  className="flex-shrink-0 w-full max-w-md"
                  style={{ width: `calc(${100 / experienceData.length}% - 1.5rem)` }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ 
                    opacity: isInView ? 1 : 0, 
                    y: isInView ? 0 : 50,
                    scale: currentIndex === index ? 1.05 : 1
                  }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Card 
                    className={`h-full cursor-pointer transition-all duration-500 hover:shadow-2xl group ${
                      currentIndex === index ? 'ring-2 ring-primary shadow-xl shadow-primary/10' : ''
                    }`}
                    onClick={() => handleExperienceClick(index)}
                  >
                    <CardContent className="p-8">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${exp.color} flex items-center justify-center`}>
                          <Briefcase className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <Badge variant="outline" className="text-xs mb-1">
                            {exp.period}
                          </Badge>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3 mr-1" />
                            {exp.region}
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h3 className="text-2xl font-bold mb-2">{exp.company}</h3>
                        <p className="text-muted-foreground font-medium">{exp.role}</p>
                      </div>

                      <p className="text-sm leading-relaxed mb-6">{exp.story}</p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {exp.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="text-xs font-medium text-green-800 dark:text-green-400">
                            Key Impact
                          </span>
                        </div>
                        <p className="text-sm text-green-700 dark:text-green-300">
                          {exp.impact}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex justify-center items-center space-x-4 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
              disabled={currentIndex === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <div className="flex space-x-2">
              {experienceData.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentIndex === index ? 'bg-primary w-8' : 'bg-muted-foreground/30'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentIndex(Math.min(experienceData.length - 1, currentIndex + 1))}
              disabled={currentIndex === experienceData.length - 1}
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Simple Modal */}
      <AnimatePresence>
        {selectedExperience !== null && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="w-full max-w-2xl bg-background rounded-2xl shadow-2xl p-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold">{experienceData[selectedExperience].company}</h2>
                  <p className="text-muted-foreground">{experienceData[selectedExperience].role}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={closeModal}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <p className="text-lg mb-6">{experienceData[selectedExperience].story}</p>
              
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <p className="text-green-700 dark:text-green-300 font-medium">
                  {experienceData[selectedExperience].impact}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}