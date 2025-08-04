"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Briefcase, 
  MapPin, 
  TrendingUp, 
  Calendar,
  Award,
  Zap,
  ArrowRight,
  ArrowLeft,
  X,
  ExternalLink,
  Star
} from 'lucide-react';

interface ExperienceData {
  company: string;
  period: string;
  region: string;
  role: string;
  story: string;
  achievements: string[];
  impact: string;
  color: string;
  technologies: string[];
  metrics: {
    label: string;
    value: string;
  }[];
}

const experienceData: ExperienceData[] = [
  {
    company: 'Arla',
    period: '2015-2017',
    region: 'EMEA',
    role: 'HR Operations Specialist',
    story: "I started my journey in the heart of Europe, managing HR operations across 15+ countries. There, I learned that compliance isn't about restrictions — it's about creating frameworks that enable growth while protecting everyone involved.",
    achievements: [
      'Managed HR operations across 15+ European countries',
      'Implemented regional compliance frameworks',
      'Led cross-functional HR transformation initiatives',
      'Reduced processing time by 60% through automation'
    ],
    impact: "Reduced compliance processing time by 60% while improving accuracy",
    color: "from-blue-500 to-indigo-600",
    technologies: ['Excel', 'SAP SuccessFactors', 'PowerBI'],
    metrics: [
      { label: "Countries", value: "15+" },
      { label: "Time Saved", value: "60%" },
      { label: "Team Size", value: "8" }
    ]
  },
  {
    company: 'Monumental',
    period: '2017-2019',
    region: 'US',
    role: 'HR Operations Manager',
    story: "Scaling from 50 to 500+ employees taught me that processes designed for startups don't always scale. I rebuilt our HR infrastructure from the ground up, treating it like a product that needed to serve our growing 'users' — our employees.",
    achievements: [
      'Scaled HR operations from 50 to 500+ employees',
      'Built automated onboarding and offboarding systems',
      'Developed HR analytics dashboard using Looker',
      'Created self-service employee portal'
    ],
    impact: "Created systems that supported 10x growth without adding HR headcount",
    color: "from-green-500 to-emerald-600",
    technologies: ['Looker', 'Zapier', 'BambooHR', 'Google Apps Script'],
    metrics: [
      { label: "Growth", value: "10x" },
      { label: "Automation", value: "85%" },
      { label: "Satisfaction", value: "4.8/5" }
    ]
  },
  {
    company: 'Maersk',
    period: '2019-2021',
    region: 'Global',
    role: 'Senior HR Operations Lead',
    story: "At a global logistics giant, I discovered that HR challenges are universal, but solutions must be local. I designed mobility programs that respected local cultures while maintaining global standards — a delicate balance that taught me the true meaning of inclusive HR.",
    achievements: [
      'Designed global mobility programs for 30+ countries',
      'Led digital transformation of HR processes',
      'Managed vendor relationships for HR tech stack',
      'Implemented AI-powered document processing'
    ],
    impact: "Supported global workforce across 6 continents with consistent yet localized HR services",
    color: "from-cyan-500 to-blue-600",
    technologies: ['Workday', 'Velocity', 'Power Automate', 'Azure AI'],
    metrics: [
      { label: "Countries", value: "30+" },
      { label: "Continents", value: "6" },
      { label: "Employees", value: "15K+" }
    ]
  },
  {
    company: 'Deel',
    period: '2021-2023',
    region: 'Global',
    role: 'People Operations Manager',
    story: "Working at Deel was like being in the future of HR. I was on the front lines of the remote work revolution, designing compliance frameworks that made it possible for companies to hire talent anywhere, while ensuring everyone was protected and treated fairly.",
    achievements: [
      'Designed scalable compliance framework across 20+ countries',
      'Automated workflows handling 400+ HR cases monthly',
      'Built integration between Workday and Deel platforms',
      'Created real-time compliance monitoring system'
    ],
    impact: "Enabled global hiring for 100+ companies while maintaining 100% compliance",
    color: "from-purple-500 to-pink-600",
    technologies: ['Deel', 'Workday', 'n8n', 'Python', 'Slack API'],
    metrics: [
      { label: "Cases/Month", value: "400+" },
      { label: "Compliance", value: "100%" },
      { label: "Companies", value: "100+" }
    ]
  },
  {
    company: 'Consensys',
    period: '2023-Present',
    region: 'Global',
    role: 'Senior People Operations Manager',
    story: "Now I'm helping shape the future of work in Web3. In this decentralized world, traditional HR doesn't always apply. I'm building new models for people operations that match the innovation of the technology itself.",
    achievements: [
      'Leading People Operations for Web3 organization',
      'Implementing AI-driven HR automation tools',
      'Building global compliance framework for remote workforce',
      'Developing crypto compensation structures'
    ],
    impact: "Creating people operations models for the decentralized future of work",
    color: "from-orange-500 to-red-600",
    technologies: ['AI/ML', 'Web3 Tools', 'Smart Contracts', 'DeFi Protocols'],
    metrics: [
      { label: "Innovation", value: "Web3" },
      { label: "Remote", value: "100%" },
      { label: "Future", value: "Now" }
    ]
  }
];

export default function InteractiveTimeline() {
  const [selectedExperience, setSelectedExperience] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(timelineRef);
  
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"]
  });

  const progressX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Auto-advance timeline
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

  const navigateExperience = (direction: 'prev' | 'next') => {
    if (selectedExperience === null) return;
    
    const newIndex = direction === 'next' 
      ? (selectedExperience + 1) % experienceData.length
      : (selectedExperience - 1 + experienceData.length) % experienceData.length;
    
    setSelectedExperience(newIndex);
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
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-6 py-3 mb-6">
            <motion.div
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="font-medium text-primary">My Professional Journey</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Where I've Been
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From EMEA to APAC, I've designed and scaled people systems that power growth across borders. 
            Each role taught me something new about building inclusive, compliant, and human-centered HR operations.
          </p>
        </motion.div>

        {/* Timeline Progress Bar */}
        <div className="relative mb-12">
          <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-cyan-500 rounded-full"
              style={{ width: progressX }}
              transition={{ type: "spring", stiffness: 100, damping: 30 }}
            />
          </div>
          
          {/* Timeline dots */}
          <div className="absolute top-0 w-full flex justify-between items-center -mt-2">
            {experienceData.map((exp, index) => (
              <motion.div key={exp.company} className="relative">
                <motion.button
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-300 relative group ${
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
                >
                  {/* Pulsing ring animation */}
                  {currentIndex === index && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-primary"
                      initial={{ scale: 1, opacity: 1 }}
                      animate={{ 
                        scale: [1, 2, 2.5], 
                        opacity: [1, 0.5, 0] 
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut"
                      }}
                    />
                  )}
                  
                  {/* Tooltip */}
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-foreground text-background text-xs px-3 py-1.5 rounded-lg whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                    {exp.company} ({exp.period})
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-foreground" />
                  </div>
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interactive Timeline Cards */}
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
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                >
                  <Card 
                    className={`h-full cursor-pointer transition-all duration-500 hover:shadow-2xl group relative overflow-hidden ${
                      currentIndex === index ? 'ring-2 ring-primary shadow-xl shadow-primary/10' : ''
                    }`}
                    onClick={() => handleExperienceClick(index)}
                  >
                    {/* Card gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    
                    <CardContent className="p-8 relative z-10">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <motion.div
                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${exp.color} flex items-center justify-center`}
                            whileHover={{ rotate: 5, scale: 1.1 }}
                          >
                            <Briefcase className="w-6 h-6 text-white" />
                          </motion.div>
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
                        
                        <motion.div
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          whileHover={{ scale: 1.1 }}
                        >
                          <ExternalLink className="w-4 h-4 text-muted-foreground" />
                        </motion.div>
                      </div>

                      {/* Company and Role */}
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {exp.company}
                        </h3>
                        <p className="text-muted-foreground font-medium">
                          {exp.role}
                        </p>
                      </div>

                      {/* Story Preview */}
                      <p className="text-sm leading-relaxed mb-6 line-clamp-3">
                        {exp.story}
                      </p>

                      {/* Key Metrics */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {exp.metrics.map((metric, i) => (
                          <motion.div
                            key={metric.label}
                            className="text-center"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                          >
                            <div className="text-lg font-bold text-primary">{metric.value}</div>
                            <div className="text-xs text-muted-foreground">{metric.label}</div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {exp.technologies.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {exp.technologies.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{exp.technologies.length - 3} more
                          </Badge>
                        )}
                      </div>

                      {/* Impact */}
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

                      {/* Read More Button */}
                      <motion.div
                        className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        whileHover={{ y: -2 }}
                      >
                        <Button size="sm" variant="ghost" className="w-full">
                          Read Full Story
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </motion.div>
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
              className="group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
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
              className="group"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Auto-play toggle */}
          <div className="flex justify-center mt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-xs"
            >
              {isAutoPlaying ? 'Pause Auto-play' : 'Resume Auto-play'}
            </Button>
          </div>
        </div>
      </div>

      {/* Experience Modal */}
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
              className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-background rounded-2xl shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const exp = experienceData[selectedExperience];
                return (
                  <div className="relative">
                    {/* Header */}
                    <div className={`bg-gradient-to-br ${exp.color} p-8 text-white relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                              <Briefcase className="w-8 h-8" />
                            </div>
                            <div>
                              <h2 className="text-3xl font-bold">{exp.company}</h2>
                              <p className="text-white/90">{exp.role}</p>
                              <div className="flex items-center space-x-4 mt-2 text-sm text-white/80">
                                <div className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  {exp.period}
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  {exp.region}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={closeModal}
                            className="text-white hover:bg-white/20"
                          >
                            <X className="w-5 h-5" />
                          </Button>
                        </div>

                        {/* Key Metrics */}
                        <div className="grid grid-cols-3 gap-6">
                          {exp.metrics.map((metric, index) => (
                            <motion.div
                              key={metric.label}
                              className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <div className="text-2xl font-bold">{metric.value}</div>
                              <div className="text-sm text-white/80">{metric.label}</div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      {/* Story */}
                      <div className="mb-8">
                        <h3 className="text-xl font-bold mb-4 flex items-center">
                          <Star className="w-5 h-5 mr-2 text-primary" />
                          My Story
                        </h3>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                          {exp.story}
                        </p>
                      </div>

                      {/* Achievements */}
                      <div className="mb-8">
                        <h3 className="text-xl font-bold mb-4 flex items-center">
                          <Award className="w-5 h-5 mr-2 text-primary" />
                          Key Achievements
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {exp.achievements.map((achievement, index) => (
                            <motion.div
                              key={index}
                              className="flex items-start space-x-3 bg-muted/50 rounded-lg p-4"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm">{achievement}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="mb-8">
                        <h3 className="text-xl font-bold mb-4 flex items-center">
                          <Zap className="w-5 h-5 mr-2 text-primary" />
                          Technologies & Tools
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {exp.technologies.map((tech, index) => (
                            <motion.div
                              key={tech}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <Badge variant="secondary" className="text-sm py-2 px-4">
                                {tech}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Impact */}
                      <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
                        <h3 className="text-lg font-bold mb-3 flex items-center text-green-800 dark:text-green-400">
                          <TrendingUp className="w-5 h-5 mr-2" />
                          Key Impact
                        </h3>
                        <p className="text-green-700 dark:text-green-300 text-lg">
                          {exp.impact}
                        </p>
                      </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between items-center p-8 border-t">
                      <Button
                        variant="outline"
                        onClick={() => navigateExperience('prev')}
                        disabled={selectedExperience === 0}
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Previous Role
                      </Button>
                      
                      <span className="text-sm text-muted-foreground">
                        {selectedExperience + 1} of {experienceData.length}
                      </span>
                      
                      <Button
                        variant="outline"
                        onClick={() => navigateExperience('next')}
                        disabled={selectedExperience === experienceData.length - 1}
                      >
                        Next Role
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}