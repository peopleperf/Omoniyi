"use client";

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
// Removed FloatingAutomationPanel to avoid conflict with AI chat
import EnhancedTimeline from '@/components/enhanced-timeline';
import SplashScreen from '@/components/splash-screen';
import dynamic from 'next/dynamic';
import {
  ChevronDown, 
  Briefcase, 
  Globe, 
  Code, 
  Users, 
  Zap,
  ArrowRight,
  MessageCircle,
  Sparkles,
  TrendingUp,
  Heart,
  Lightbulb,
  Target,
  Calendar,
  Mail,
  Linkedin,
  Github
} from 'lucide-react';


// Dynamically import components to avoid SSR issues
const DualRealityHero = dynamic(() => import('@/components/dual-reality-hero'), {
  ssr: false,
  loading: () => <div className='min-h-screen bg-black' />
});

const InteractiveSkillsSystem = dynamic(() => import('@/components/interactive-skills-system'), {
  ssr: false,
  loading: () => <div className="h-[400px] flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>
});

export default function Home() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [isSplashComplete, setSplashComplete] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

  const chapters = [
    {
      id: 'who-i-am',
      title: "Who I Am",
      subtitle: "Driving efficient HR operations with strategic automation and analytics",
      content: {
        heading: "Hi, I'm Omoniyi — A People Operations Leader.",
        subheading: "I've led global HR initiatives, optimizing processes across remote-first organizations to boost compliance and efficiency.",
        cta: "Discover my approach",
        icon: Users,
        color: "from-blue-500 to-cyan-500"
      }
    },
    {
      id: 'where-ive-been',
      title: "Where I've Been", 
      subtitle: "Global experience in scaling HR frameworks and ensuring compliance",
      content: {
        heading: "My journey spans continents and technologies.",
        subheading: "I've implemented HR solutions for organizations worldwide, focusing on compliance, automation, and employee engagement.",
        cta: "Explore my path",
        icon: Globe,
        color: "from-green-500 to-emerald-500"
      }
    },
    {
      id: 'what-i-build',
      title: "What I Build",
      subtitle: "Tech-driven HR solutions that enhance employee experiences",
      content: {
        heading: "I develop systems that streamline operations and elevate employee interaction.",
        subheading: "From automation tools to HR analytics dashboards, my projects focus on efficiency and engagement.",
        cta: "See my projects",
        icon: Code,
        color: "from-purple-500 to-pink-500"
      }
    },
    {
      id: 'how-i-think',
      title: "How I Think",
      subtitle: "Empowering people through strategic HR innovation",
      content: {
        heading: "My philosophy blends technology with empathy.",
        subheading: "I champion systems that empower people, ensuring HR processes are both human-centric and technologically advanced.",
        cta: "Understand my approach",
        icon: Lightbulb,
        color: "from-orange-500 to-red-500"
      }
    },
    {
      id: 'lets-talk',
      title: "Let's Talk",
      subtitle: "Ready to transform your People Operations?",
      content: {
        heading: "Let's build something amazing together.",
        subheading: "Whether you need to transform your HR operations or explore automation opportunities — I'm here to help.",
        cta: "Start the conversation",
        icon: MessageCircle,
        color: "from-indigo-500 to-purple-500"
      }
    }
  ];


  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const chapterHeight = window.innerHeight;
      const currentChapterIndex = Math.floor(scrollPosition / chapterHeight);
      setActiveChapter(Math.min(currentChapterIndex, chapters.length - 1));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [chapters.length]);

  const scrollToChapter = (index: number) => {
    const element = document.getElementById(chapters[index].id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {!isSplashComplete && <SplashScreen onComplete={() => setSplashComplete(true)} />}
      <AnimatePresence>
        {isSplashComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-background overflow-x-hidden"
          >
      {/* Dual Reality Hero Section */}
      <DualRealityHero onScrollToProjects={() => {
        const element = document.getElementById('what-i-build');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }} />
      {/* Chapter 2: Where I've Been - Timeline */}
      <EnhancedTimeline />

      {/* Chapter 3: What I Build - Project Cards */}
      <section id="what-i-build" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-6 py-3 mb-6">
              <motion.div
                className="w-2 h-2 bg-primary rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="font-medium text-primary">Practical HR Solutions</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">What I Build</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              I believe HR should empower people, not paperwork. That's why I build systems that simplify the work — 
              and let people focus on people.
            </p>
          </motion.div>

          {/* Project Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {[
              {
                title: "Employment Verification System",
                tagline: "Streamlined global compliance verification in 30+ countries",
                description: "End-to-end system for automating employment verification requests across multiple jurisdictions while maintaining 100% compliance.",
                tags: ["React", "Next.js", "Firebase", "Zapier"],
                icon: "🏢",
                color: "from-blue-500 to-cyan-500",
                link: "/Users/omoniyi/Desktop/project/cesv-employment-verification-main"
              },
              {
                title: "HR Case Routing Bot",
                tagline: "AI-powered case categorization reducing response time by 80%",
                description: "Intelligent system that routes 400+ monthly HR cases to appropriate teams based on content analysis and priority scoring.",
                tags: ["Python", "n8n", "Slack API", "OpenAI"],
                icon: "⚡",
                color: "from-purple-500 to-pink-500",
                link: "#"
              },
              {
                title: "Global Onboarding Automation",
                tagline: "Zero-touch onboarding for distributed teams",
                description: "Complete automation pipeline handling document collection, access provisioning, and compliance checks across 20+ countries.",
                tags: ["Zapier", "Workday", "DocuSign", "Apps Script"],
                icon: "🌍",
                color: "from-green-500 to-emerald-500",
                link: "#"
              },
              {
                title: "Compliance Dashboard",
                tagline: "Real-time monitoring of global HR compliance metrics",
                description: "Analytics dashboard providing instant visibility into compliance status across all regions with automated alerting.",
                tags: ["Looker", "PowerBI", "Python", "Webhook"],
                icon: "📊",
                color: "from-orange-500 to-red-500",
                link: "#"
              },
              {
                title: "Employee Self-Service Portal",
                tagline: "Reduce HR ticket volume by 60% with automated responses",
                description: "Intelligent portal that handles common HR requests through natural language processing and automated workflows.",
                tags: ["React", "Node.js", "MongoDB", "ChatGPT"],
                icon: "🤖",
                color: "from-cyan-500 to-blue-500",
                link: "#"
              },
              {
                title: "HR Analytics Engine",
                tagline: "Data-driven insights for people operations optimization",
                description: "Comprehensive analytics platform providing actionable insights on workforce trends, compliance gaps, and process efficiency.",
                tags: ["Python", "Tableau", "SQL", "Machine Learning"],
                icon: "📈",
                color: "from-indigo-500 to-purple-500",
                link: "#"
              }
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-2">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-lg`} />
                  
                  <CardContent className="p-6 relative">
                    {/* Icon and Title */}
                    <div className="flex items-start space-x-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center text-white text-xl flex-shrink-0`}>
                        {project.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm font-medium text-primary mb-2">
                          {project.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* View More Button */}
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ y: -2 }}
                    >
                      <Button size="sm" variant="ghost" className="w-full">
                        View Project
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>



          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Button 
              size="lg" 
              onClick={() => scrollToChapter(4)}
              className="bg-primary hover:bg-primary/90"
            >
              Understand My Approach
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>


      {/* Skills Section - NEW */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-6 py-3 mb-6">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-medium text-primary">Core Competencies</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">My Skills Matrix</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A visual representation of my expertise across key areas of People Operations
            </p>
          </motion.div>

          <InteractiveSkillsSystem />
        </div>
      </section>

      {/* Chapter 4: How I Think */}
      <section id="how-i-think" className="min-h-screen flex items-center justify-center px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How I Think</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              HR has always been about people. But in today's world, it's also about systems that support them.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "People-First",
                description: "Technology should enhance human connections, not replace them. Every system I build starts with the human experience at its center.",
                icon: Heart,
                color: "from-red-500 to-pink-500"
              },
              {
                title: "Compliance as Innovation",
                description: "Global compliance isn't a hurdle — it's an opportunity to build better, more inclusive systems that work for everyone, everywhere.",
                icon: Target,
                color: "from-blue-500 to-cyan-500"
              },
              {
                title: "Automate the Repetitive",
                description: "By automating routine tasks, we free up HR professionals to focus on what matters most: developing talent and building culture.",
                icon: Zap,
                color: "from-yellow-500 to-orange-500"
              }
            ].map((philosophy, index) => (
              <motion.div
                key={philosophy.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${philosophy.color} flex items-center justify-center`}>
                      <philosophy.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">{philosophy.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{philosophy.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Button 
              size="lg" 
              onClick={() => scrollToChapter(4)}
              className="bg-primary hover:bg-primary/90"
            >
              Start the Conversation
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Chapter 5: Let's Talk */}
      <section id="lets-talk" className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-6 py-3">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-medium text-primary">Ready to collaborate?</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold">
              Want to connect with me for us to build something amazing together?
            </h2>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Whether you need to transform your HR operations, implement automation, or explore the future of People Operations — I'm here to help bring your vision to life.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 group">
                <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Schedule a Call
              </Button>
              <Button variant="outline" size="lg">
                View My Projects
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-16">
              {[
                { label: "LinkedIn", value: "Connect professionally" },
                { label: "GitHub", value: "View my projects" },
                { label: "Email", value: "Get in touch" }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-lg font-semibold mb-2">{item.label}</div>
                  <p className="text-sm text-muted-foreground">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
