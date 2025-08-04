"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import AIChat from '@/components/ai-chat';
import { 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Linkedin,
  Github,
  MessageCircle,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: 'omoniyi@tuta.io',
      action: 'mailto:omoniyi@tuta.io',
      description: 'For general inquiries and collaboration opportunities'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Madrid, Spain',
      action: '#',
      description: 'Based in Madrid, serving clients globally'
    }
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/omoniyiipaye',
      description: 'Professional profile and industry insights',
      color: 'hover:text-blue-600'
    },
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/peopleperf',
      description: 'Open source projects and code contributions',
      color: 'hover:text-gray-600'
    },
    {
      name: 'Calendly',
      icon: Calendar,
      url: 'https://calendly.com/ipayeniyi/30min',
      description: 'Schedule a consultation or discovery call',
      color: 'hover:text-green-600'
    }
  ];

  const services = [
    {
      title: 'HR Operations Consulting',
      description: 'Transform your HR operations with scalable processes and automation',
      tags: ['Process Design', 'Automation', 'Compliance']
    },
    {
      title: 'HR Technology Implementation',
      description: 'Select and implement the right HR tech stack for your organization',
      tags: ['HRIS', 'Integration', 'Training']
    },
    {
      title: 'Global Compliance Strategy',
      description: 'Navigate international employment laws and regulations with confidence',
      tags: ['Cross-Border', 'Risk Management', 'Policy Development']
    },
    {
      title: 'Automation Development',
      description: 'Build custom automation solutions for your unique HR workflows',
      tags: ['Zapier', 'Apps Script', 'Custom Development']
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Let's Talk</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              I'm always interested in discussing People Operations, HR technology, and automation opportunities. 
              Whether you're looking to transform your HR operations or need guidance on global compliance — I'm here to help.
            </p>
          </motion.div>

          {/* AI Chat */}
          <AIChat />

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full" id="contact-form">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Save Your Email for Follow-up</h2>
                  
                  {submitStatus === 'success' && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-green-800 font-medium">Message sent successfully!</span>
                      </div>
                      <p className="text-green-700 text-sm mt-1">I'll get back to you within 24 hours.</p>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <span className="text-red-800 font-medium">Something went wrong</span>
                      </div>
                      <p className="text-red-700 text-sm mt-1">Please try again or email me directly.</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="What's this about?"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="mt-1"
                        placeholder="Tell me about your project or inquiry..."
                      />
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-primary hover:bg-primary/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Direct Contact Methods */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                <div className="space-y-4">
                  {contactMethods.map((method, index) => (
                    <Card key={method.label} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <method.icon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold">{method.label}</h3>
                              <a 
                                href={method.action}
                                className="text-sm text-primary hover:underline"
                                onClick={(e) => {
                                  if (method.action === '#') e.preventDefault();
                                }}
                              >
                                {method.label === 'Response Time' ? 'Learn More' : 'Contact'}
                              </a>
                            </div>
                            <p className="text-sm text-muted-foreground">{method.value}</p>
                            <p className="text-xs text-muted-foreground mt-1">{method.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Connect Online</h2>
                <div className="grid grid-cols-1 gap-4">
                  {socialLinks.map((link, index) => (
                    <Card key={link.name} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <link.icon className={`w-5 h-5 ${link.color}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold">{link.name}</h3>
                              <a 
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-primary hover:underline"
                              >
                                Visit
                              </a>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{link.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => window.open('https://calendly.com/ipayeniyi/30min', '_blank')}
                  >
                    <Calendar className="w-4 h-4 mr-3" />
                    Schedule a Consultation
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => window.open('https://linkedin.com/in/omoniyi-ipaye', '_blank')}
                  >
                    <Linkedin className="w-4 h-4 mr-3" />
                    View LinkedIn Profile
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => window.open('https://github.com/omoniyi-ipaye', '_blank')}
                  >
                    <Github className="w-4 h-4 mr-3" />
                    Browse GitHub Projects
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">How I Can Help</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Specialized services to transform your People Operations and drive organizational success
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-3">{service.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Transform Your HR Operations?</h2>
            <p className="text-xl text-muted-foreground">
              Let's discuss how we can work together to build more efficient, compliant, and people-centric HR processes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={() => window.open('https://calendly.com/ipayeniyi/30min', '_blank')}>
                <Calendar className="w-5 h-5 mr-2" />
                Schedule a Call
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.location.href = '#contact-form'}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Send Message
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}