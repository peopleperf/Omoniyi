"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
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
  ExternalLink,
  Star,
  Globe2
} from 'lucide-react';

const experienceData = [
  {
    company: 'Consensys',
    period: 'Aug 2024 - Present',
    region: 'Global',
    country: '🌍 Remote (EMEA, APAC, US)',
    role: 'People Operations Manager',
    story: "Currently managing The People Operations at a Web3 pioneer. I partner with senior leadership to drive data-informed talent decisions while building automated systems that have transformed our global operations.",
    achievements: [
      'Designed and implemented global automated employment verification system, reducing processing time by 60%',
      'Managed global expansion initiatives, setting up new legal entities in EMEA and LATAM',
      'Optimized HRIS and automated workflows, significantly enhancing data integrity',
      'Managing global EOR providers, achieving compliance improvements',
      'Developed global SOP that transformed People Operations framework, improving efficiency by 50%'
    ],
    impact: "Transformed People Operations framework improving efficiency by 50% while enabling streamlined global hiring",
    color: "from-purple-500 to-pink-600",
    technologies: ['Workday', 'Deel', 'Google Looker', 'Zapier'],
    logo: "🦊",
    metrics: [
      { label: "Efficiency Gain", value: "50%" },
      { label: "Processing Time", value: "-60%" },
      { label: "Global Reach", value: "3 Regions" }
    ]
  },
  {
    company: 'Deel Inc.',
    period: 'Jun 2022 - Aug 2024',
    region: 'Global',
    country: '🇺🇸 Remote (US)',
    role: 'HR Operations Manager (EMEA & APAC)',
    story: "At Deel, I witnessed the future of global employment firsthand. Starting as a Global Employee Experience Specialist, I rapidly progressed through roles, ultimately managing HR operations across EMEA and APAC while influencing product development for global HR solutions.",
    achievements: [
      'Provided strategic HR partnership to Product and Engineering teams, influencing global HR software solutions',
      'Automated critical HR workflows, resolving 400+ complex cases rapidly',
      'Developed scalable HR compliance frameworks across 20+ jurisdictions',
      'Enhanced onboarding and dismissal processes with empathy and compliance',
      'Led global employee recognition programs, significantly improving engagement'
    ],
    impact: "Automated 400+ HR workflows while enabling rapid and compliant global expansion across 20+ jurisdictions",
    color: "from-blue-500 to-indigo-600",
    technologies: ['Deel HR', 'Workday', 'n8n', 'Python', 'Slack API', 'Zapier'],
    logo: "🌐",
    metrics: [
      { label: "Cases/Month", value: "400+" },
      { label: "Jurisdictions", value: "20+" },
      { label: "Efficiency", value: "+80%" }
    ]
  },
  {
    company: 'Maersk Ltd',
    period: 'Dec 2021 - Jun 2022',
    region: 'EMEA',
    country: '🌍 EMEA',
    role: 'People Advisor',
    story: "At Maersk, I supported major HR transformations across Africa and Europe. This role deepened my understanding of large-scale organizational change and the importance of data-driven workforce planning.",
    achievements: [
      'Supported major HR transformations across Africa and Europe',
      'Contributed to policy harmonization and Workday implementation',
      'Conducted HR data analysis to enhance strategic workforce planning',
      'Improved onboarding effectiveness through data-driven insights'
    ],
    impact: "Enhanced strategic workforce planning and onboarding effectiveness across multiple regions",
    color: "from-cyan-500 to-blue-600",
    technologies: ['Workday', 'Excel', 'Data Analytics'],
    logo: "🚢",
    metrics: [
      { label: "Regions", value: "2" },
      { label: "Transformation", value: "Major" },
      { label: "Focus", value: "Data-Driven" }
    ]
  },
  {
    company: 'Monumental Holdings',
    period: 'Nov 2021 - Dec 2021',
    region: 'Africa',
    country: '🌍 Africa',
    role: 'HR Consultant',
    story: "In this project-based role, I had the opportunity to design innovative HR frameworks from scratch. Despite the short duration, the impact was significant in improving employee engagement.",
    achievements: [
      'Designed and implemented innovative HR frameworks',
      'Significantly improved employee engagement metrics',
      'Delivered project within tight timeline',
      'Created sustainable HR processes for long-term success'
    ],
    impact: "Designed innovative HR frameworks that significantly improved employee engagement",
    color: "from-green-500 to-emerald-600",
    technologies: ['HR Framework Design', 'Process Optimization'],
    logo: "🏢",
    metrics: [
      { label: "Duration", value: "1 Month" },
      { label: "Impact", value: "High" },
      { label: "Type", value: "Project" }
    ]
  },
  {
    company: 'Arla Foods Ltd',
    period: 'Dec 2017 - Nov 2021',
    region: 'EMEA',
    country: '🌍 EMEA',
    role: 'People Operations',
    story: "My foundational years at Arla shaped my approach to People Operations. Managing onboarding for 500+ employees annually taught me the importance of scalable processes and the power of a great first impression.",
    achievements: [
      'Streamlined onboarding processes for 500+ employees annually',
      'Improved productivity through efficient onboarding systems',
      'Enhanced employee experience from day one',
      'Built foundation for scalable HR operations'
    ],
    impact: "Streamlined onboarding for 500+ employees annually, improving productivity and experience",
    color: "from-blue-500 to-indigo-600",
    technologies: ['SuccessFactors', 'Process Design', 'Employee Experience'],
    logo: "🥛",
    metrics: [
      { label: "Employees/Year", value: "500+" },
      { label: "Duration", value: "4 Years" },
      { label: "Process", value: "Streamlined" }
    ]
  }
];

function EnhancedTimeline() {
  const [hoveredExperience, setHoveredExperience] = useState<number | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<number | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(timelineRef);
  
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const closeModal = () => {
    setSelectedExperience(null);
  };

  return (
    <section 
      ref={timelineRef}
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden py-12 sm:py-16 lg:py-20"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-6 py-3 mb-6">
            <motion.div
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="font-medium text-primary">My Professional Journey</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Where I've Been
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From EMEA to APAC, I've designed and scaled people systems that power growth across borders. 
            Each role taught me something new about building inclusive, compliant, and human-centered HR operations.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full">
            {/* Background Line */}
            <div className="w-1 h-full bg-gradient-to-b from-muted via-muted/50 to-transparent rounded-full" />
            
            {/* Progress Line */}
            <motion.div
              className="absolute top-0 left-0 w-1 bg-gradient-to-b from-primary via-cyan-500 to-purple-500 rounded-full origin-top"
              style={{ height: progressHeight }}
              transition={{ type: "spring", stiffness: 100, damping: 30 }}
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-12 lg:space-y-24">
            {experienceData.map((exp, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`relative flex items-center justify-center ${
                    isEven ? 'lg:justify-start' : 'lg:justify-end'
                  }`}
                >
                  {/* Timeline Dot */}
                  <motion.div
                    className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 z-20"
                    whileHover={{ scale: 1.2 }}
                    onHoverStart={() => setHoveredExperience(index)}
                    onHoverEnd={() => setHoveredExperience(null)}
                  >
                    <div className="relative">
                      <motion.div
                        className={`w-16 h-16 rounded-full bg-gradient-to-br ${exp.color} flex items-center justify-center text-white text-2xl font-bold shadow-lg cursor-pointer`}
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        onClick={() => setSelectedExperience(index)}
                      >
                        {exp.logo}
                      </motion.div>
                      
                      {/* Pulsing ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full border-4 border-primary"
                        animate={hoveredExperience === index ? {
                          scale: [1, 1.3, 1.6],
                          opacity: [0.8, 0.4, 0]
                        } : {}}
                        transition={{
                          duration: 1.5,
                          repeat: hoveredExperience === index ? Infinity : 0,
                          ease: "easeOut"
                        }}
                      />
                    </div>
                  </motion.div>

                  {/* Content Card */}
                  <motion.div
                    className={`w-full max-w-lg ${
                      'px-4 sm:px-0 lg:' + (isEven ? 'pr-16' : 'pl-16')
                    }`}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
                    viewport={{ once: true, margin: "-50px" }}
                    whileHover={{ scale: 1.02 }}
                    onHoverStart={() => setHoveredExperience(index)}
                    onHoverEnd={() => setHoveredExperience(null)}
                  >
                    <motion.div
                      className="relative overflow-hidden cursor-pointer group"
                      onClick={() => setSelectedExperience(index)}
                    >
                      <Card className="bg-background border border-border rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:border-primary/50">
                        <CardContent className="p-4 sm:p-6 lg:p-8">
                          {/* Header */}
                          <div className="flex items-center justify-between mb-4 sm:mb-6">
                            <div className="flex items-center space-x-3 sm:space-x-4">
                              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${exp.color} flex items-center justify-center text-white text-sm sm:text-lg`}>
                                <Briefcase className="w-4 h-4 sm:w-6 sm:h-6" />
                              </div>
                              <div>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mb-1">
                                  <Badge variant="outline" className="text-xs mb-1 sm:mb-0">
                                    {exp.period}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">{exp.country}</span>
                                </div>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Globe2 className="w-3 h-3 mr-1" />
                                  {exp.region}
                                </div>
                              </div>
                            </div>
                            
                            <motion.div
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                              whileHover={{ scale: 1.1, rotate: 15 }}
                            >
                              <ExternalLink className="w-4 h-4 text-muted-foreground" />
                            </motion.div>
                          </div>

                          {/* Company and Role */}
                          <div className="mb-3 sm:mb-4">
                            <h3 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-primary transition-colors flex items-center">
                              <span className="text-2xl sm:text-3xl mr-2 sm:mr-3">{exp.logo}</span>
                              {exp.company}
                            </h3>
                            <p className="text-sm sm:text-base text-muted-foreground font-medium">{exp.role}</p>
                          </div>

                          {/* Story Preview */}
                          <p className="text-sm leading-relaxed mb-4 sm:mb-6 line-clamp-3">
                            {exp.story}
                          </p>

                          {/* Key Metrics */}
                          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                            {exp.metrics.map((metric, i) => (
                              <motion.div
                                key={metric.label}
                                className="text-center p-2 sm:p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors"
                                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: index * 0.15 + 0.5 + i * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05 }}
                              >
                                <div className="text-sm sm:text-lg font-bold text-primary">{metric.value}</div>
                                <div className="text-xs text-muted-foreground">{metric.label}</div>
                              </motion.div>
                            ))}
                          </div>

                          {/* Impact */}
                          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
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
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
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
                  </motion.div>

                  {/* Timeline connector line */}
                  <div className={`hidden lg:block absolute top-1/2 transform -translate-y-1/2 w-8 h-0.5 bg-gradient-to-r ${exp.color} ${
                    isEven ? 'left-1/2 ml-8' : 'right-1/2 mr-8'
                  }`} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal */}
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
                          <div className="flex items-center space-x-6">
                            <motion.div
                              className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm text-3xl"
                              whileHover={{ rotate: 5, scale: 1.05 }}
                            >
                              {exp.logo}
                            </motion.div>
                            <div>
                              <h2 className="text-4xl font-bold mb-2">{exp.company}</h2>
                              <p className="text-white/90 text-lg mb-2">{exp.role}</p>
                              <div className="flex items-center space-x-6 text-sm text-white/80">
                                <div className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-2" />
                                  {exp.period}
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="w-4 h-4 mr-2" />
                                  {exp.country}
                                </div>
                                <div className="flex items-center">
                                  <Globe2 className="w-4 h-4 mr-2" />
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
                            ✕
                          </Button>
                        </div>

                        {/* Metrics */}
                        <div className="grid grid-cols-3 gap-6">
                          {exp.metrics.map((metric, index) => (
                            <motion.div
                              key={metric.label}
                              className="text-center bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ scale: 1.05 }}
                            >
                              <div className="text-3xl font-bold mb-1">{metric.value}</div>
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
                        <h3 className="text-2xl font-bold mb-4 flex items-center">
                          <Star className="w-6 h-6 mr-3 text-primary" />
                          My Story
                        </h3>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                          {exp.story}
                        </p>
                      </div>

                      {/* Achievements */}
                      <div className="mb-8">
                        <h3 className="text-2xl font-bold mb-6 flex items-center">
                          <Award className="w-6 h-6 mr-3 text-primary" />
                          Key Achievements
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {exp.achievements.map((achievement, index) => (
                            <motion.div
                              key={index}
                              className="flex items-start space-x-3 bg-muted/50 rounded-xl p-4 hover:bg-muted/70 transition-colors"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ scale: 1.02 }}
                            >
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm leading-relaxed">{achievement}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="mb-8">
                        <h3 className="text-2xl font-bold mb-6 flex items-center">
                          <Zap className="w-6 h-6 mr-3 text-primary" />
                          Technologies & Tools
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {exp.technologies.map((tech, index) => (
                            <motion.div
                              key={tech}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 }}
                              whileHover={{ scale: 1.05 }}
                            >
                              <Badge variant="secondary" className="text-sm py-2 px-4 hover:bg-primary/20 hover:text-primary transition-colors">
                                {tech}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Impact */}
                      <motion.div 
                        className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-800 rounded-xl p-6"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      >
                        <h3 className="text-xl font-bold mb-3 flex items-center text-green-800 dark:text-green-400">
                          <TrendingUp className="w-5 h-5 mr-2" />
                          Key Impact
                        </h3>
                        <p className="text-green-700 dark:text-green-300 text-lg leading-relaxed">
                          {exp.impact}
                        </p>
                      </motion.div>
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

export default EnhancedTimeline;