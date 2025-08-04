"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Globe, 
  Code, 
  Zap, 
  Briefcase, 
  Award,
  BookOpen,
  Target,
  Heart,
  Lightbulb
} from 'lucide-react';

export default function About() {
  const toolsData = [
    {
      name: 'Workday',
      description: 'Enterprise HRIS - Led implementation & optimization',
      icon: '🏢'
    },
    {
      name: 'Deel HR',
      description: 'Global EOR platform - Managed 20+ country operations',
      icon: '🌍'
    },
    {
      name: 'Velocity Global',
      description: 'International employment - Transitioned 100+ employees',
      icon: '🚀'
    },
    {
      name: 'Google Looker',
      description: 'Data analytics - Built strategic HR dashboards',
      icon: '📊'
    },
    {
      name: 'Zapier & n8n',
      description: 'Automation platforms - 400+ workflows automated',
      icon: '⚡'
    },
    {
      name: 'SuccessFactors',
      description: 'SAP HRIS - Multi-region implementation',
      icon: '💼'
    },
    {
      name: 'Google Apps Script',
      description: 'Custom automation - Built employment verification system',
      icon: '📝'
    },
    {
      name: 'Python & JavaScript',
      description: 'Programming - Professional-level automation development',
      icon: '💻'
    },
    {
      name: 'ServiceNow & Jira',
      description: 'Service management - HR case routing optimization',
      icon: '🎯'
    }
  ];

  const regionsData = [
    { name: 'United States', flag: '🇺🇸', description: 'Scaled HR operations from 50 to 500+ employees' },
    { name: 'EMEA', flag: '🇪🇺', description: 'Managed compliance across 15+ European countries' },
    { name: 'APAC', flag: '🇦🇺', description: 'Implemented regional HR frameworks and policies' }
  ];

  const learningData = [
    {
      title: 'AI in HR',
      description: 'Exploring how artificial intelligence can transform HR processes, from candidate screening to employee engagement analytics.',
      icon: Lightbulb
    },
    {
      title: 'Low-Code Development',
      description: 'Building custom HR solutions using platforms like Zapier, n8n, and Google Apps Script to automate complex workflows.',
      icon: Code
    },
    {
      title: 'Global Policy Trends',
      description: 'Staying ahead of evolving labor laws, remote work regulations, and compliance requirements across different jurisdictions.',
      icon: BookOpen
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Why I Do This</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              HR has always been about people. But in today's world, it's also about systems that support them. 
              My work lives at that intersection — combining process leadership, global compliance, and smart tech to build scalable people ops.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left Column - Personal Story */}
            <div className="space-y-8">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Heart className="w-6 h-6 text-primary mr-3" />
                  My Story
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  My journey in People Operations began with a simple belief: HR should empower people, not paperwork. 
                  Over the past 9+ years, I've had the privilege of working with amazing companies across the globe, 
                  each presenting unique challenges and opportunities to rethink how we support our people.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  What started as traditional HR operations evolved into a passion for building systems that scale. 
                  I discovered that the most effective HR leaders are also product thinkers — they design processes, 
                  measure outcomes, and continuously improve based on feedback.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Target className="w-5 h-5 text-primary mr-3" />
                  My Philosophy
                </h3>
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">People-First, Systems-Supported</h4>
                      <p className="text-sm text-muted-foreground">
                        Technology should enhance human connections, not replace them. Every system I build 
                        starts with the human experience at its center.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Compliance as a Feature, Not a Bug</h4>
                      <p className="text-sm text-muted-foreground">
                        Global compliance isn't a hurdle — it's an opportunity to build better, more inclusive 
                        systems that work for everyone, everywhere.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Automate the Repetitive, Elevate the Strategic</h4>
                      <p className="text-sm text-muted-foreground">
                        By automating routine tasks, we free up HR professionals to focus on what matters most: 
                        developing talent, building culture, and driving business impact.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Right Column - Visual Elements */}
            <div className="space-y-8">
              <div className="relative">
                <div className="w-full h-80 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Users className="w-16 h-16 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Building Better HR Experiences</h3>
                    <p className="text-muted-foreground">Through technology and empathy</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="text-center">
                  <CardContent className="p-6">
                    <Briefcase className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h4 className="font-semibold mb-1">9+ Years</h4>
                    <p className="text-sm text-muted-foreground">Global HR Experience</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-6">
                    <Globe className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h4 className="font-semibold mb-1">3 Regions</h4>
                    <p className="text-sm text-muted-foreground">US, EMEA, APAC</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-6">
                    <Zap className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h4 className="font-semibold mb-1">400+</h4>
                    <p className="text-sm text-muted-foreground">Automated Cases</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-6">
                    <Award className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h4 className="font-semibold mb-1">20+</h4>
                    <p className="text-sm text-muted-foreground">Countries Served</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Where I've Worked */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Where I've Worked</h2>
            <p className="text-xl text-muted-foreground">
              Building HR excellence across global organizations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {regionsData.map((region, index) => (
              <motion.div
                key={region.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{region.flag}</div>
                    <h3 className="text-lg font-semibold mb-2">{region.name}</h3>
                    <p className="text-sm text-muted-foreground">{region.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Tools I Have Mastered */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Tools I Have Mastered</h2>
            <p className="text-xl text-muted-foreground">
              The technology stack that powers modern People Operations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {toolsData.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="text-3xl group-hover:scale-110 transition-transform">
                        {tool.icon}
                      </div>
                      <h3 className="text-lg font-semibold">{tool.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What I'm Learning */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What I'm Learning</h2>
            <p className="text-xl text-muted-foreground">
              Continuously evolving to stay at the forefront of People Operations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {learningData.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <item.icon className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Let's Build Something Together</h2>
            <p className="text-xl text-muted-foreground">
              Whether you're looking to transform your HR operations, implement automation, 
              or need guidance on global compliance — I'm here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Schedule a Call
              </Button>
              <Button variant="outline" size="lg">
                View My Projects
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}