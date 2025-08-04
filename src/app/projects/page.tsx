"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { createClient } from '@/lib/supabase';
import { 
  ExternalLink, 
  Github, 
  Calendar, 
  Users, 
  Zap,
  Filter,
  Search,
  ArrowRight,
  Loader2,
  FileText,
  Download,
  Building2,
  Clock,
  Target,
  Code2,
  Briefcase
} from 'lucide-react';

interface HRTemplate {
  id: string;
  title: string;
  category: string;
  description: string | null;
  template_content: string;
  is_public: boolean;
  download_count: number;
  created_at: string;
  created_by: string | null;
}

interface Project {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  technologies: string[];
  image_url: string | null;
  demo_url: string | null;
  github_url: string | null;
  case_study_url: string | null;
  client: string | null;
  duration: string | null;
  status: string;
  impact: string | null;
  featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export default function Projects() {
  const [templates, setTemplates] = useState<HRTemplate[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeTab, setActiveTab] = useState<'projects' | 'templates'>('projects');
  
  const supabase = createClient();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    
    // Fetch projects
    const { data: projectsData } = await supabase
      .from('projects')
      .select('*')
      .eq('status', 'completed')
      .order('featured', { ascending: false })
      .order('display_order');
    
    // Fetch templates
    const { data: templatesData } = await supabase
      .from('hr_templates')
      .select('*')
      .eq('is_public', true)
      .order('created_at', { ascending: false });
    
    if (projectsData) {
      setProjects(projectsData);
    }
    if (templatesData) {
      setTemplates(templatesData);
    }
    
    setLoading(false);
  };

  const handleDownload = async (templateId: string) => {
    // Increment download count
    const template = templates.find(t => t.id === templateId);
    if (template) {
      await supabase
        .from('hr_templates')
        .update({ download_count: template.download_count + 1 })
        .eq('id', templateId);
      
      // Update local state
      setTemplates(prev => prev.map(t => 
        t.id === templateId 
          ? { ...t, download_count: t.download_count + 1 }
          : t
      ));
    }
  };
  
  // Generate filters from actual data
  const categories = ['All', ...Array.from(new Set(templates.map(t => t.category)))];
  const filters = categories.map(cat => ({
    id: cat.toLowerCase(),
    label: cat === 'All' ? 'All Templates' : cat
  }));

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Onboarding': return '👋';
      case 'Performance Management': return '📊';
      case 'Offboarding': return '👋';
      case 'Compliance': return '⚖️';
      case 'Automation': return '⚡';
      case 'Analytics': return '📈';
      default: return '📁';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Onboarding': return 'from-green-500 to-emerald-500';
      case 'Performance Management': return 'from-blue-500 to-cyan-500';
      case 'Offboarding': return 'from-orange-500 to-red-500';
      case 'Compliance': return 'from-purple-500 to-pink-500';
      case 'Automation': return 'from-yellow-500 to-orange-500';
      case 'Analytics': return 'from-indigo-500 to-purple-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = searchTerm === '' || 
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeFilter === 'all' || 
      template.category.toLowerCase() === activeFilter;
    return matchesSearch && matchesCategory;
  });

  const filteredProjects = projects.filter(project => {
    const matchesSearch = searchTerm === '' || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading templates...</p>
        </div>
      </div>
    );
  }

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
            <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-6 py-3 mb-6">
              <motion.div
                className="w-2 h-2 bg-primary rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="font-medium text-primary">HR Templates & Tools</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Projects & Resources</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real-world projects that transformed People Operations and practical HR templates 
              built from years of experience managing global teams.
            </p>
          </motion.div>

          {/* Tab Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mb-12"
          >
            <div className="inline-flex items-center p-1 bg-muted rounded-lg">
              <Button
                variant={activeTab === 'projects' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('projects')}
                className="rounded-md"
              >
                Case Studies
              </Button>
              <Button
                variant={activeTab === 'templates' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('templates')}
                className="rounded-md"
              >
                HR Templates
              </Button>
            </div>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-md mx-auto mb-12"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={`Search ${activeTab === 'projects' ? 'projects' : 'templates'}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </motion.div>

          {/* Projects Section */}
          {activeTab === 'projects' && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold mb-8">Featured Projects</h2>
                
                {filteredProjects.length === 0 ? (
                  <div className="text-center py-16">
                    <Briefcase className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No projects found</h3>
                    <p className="text-muted-foreground">
                      {searchTerm ? 'Try adjusting your search criteria.' : 'Projects are being loaded.'}
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-8">
                    {filteredProjects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                          <CardContent className="p-0">
                            <div className="grid md:grid-cols-2 gap-0">
                              {/* Project Image/Gradient */}
                              <div className="h-64 md:h-auto bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                                <div className="text-center p-8">
                                  <Code2 className="w-16 h-16 text-primary mx-auto mb-4" />
                                  {project.featured && (
                                    <Badge className="mb-4">Featured</Badge>
                                  )}
                                </div>
                              </div>
                              
                              {/* Project Details */}
                              <div className="p-8">
                                <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                                
                                <p className="text-muted-foreground mb-6">
                                  {project.description}
                                </p>
                                
                                {/* Project Meta */}
                                <div className="space-y-4 mb-6">
                                  {project.client && (
                                    <div className="flex items-center text-sm">
                                      <Building2 className="w-4 h-4 mr-2 text-muted-foreground" />
                                      <span className="text-muted-foreground">Client:</span>
                                      <span className="ml-2 font-medium">{project.client}</span>
                                    </div>
                                  )}
                                  
                                  {project.duration && (
                                    <div className="flex items-center text-sm">
                                      <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                                      <span className="text-muted-foreground">Duration:</span>
                                      <span className="ml-2 font-medium">{project.duration}</span>
                                    </div>
                                  )}
                                  
                                  {project.impact && (
                                    <div className="flex items-start text-sm">
                                      <Target className="w-4 h-4 mr-2 text-muted-foreground mt-0.5" />
                                      <div>
                                        <span className="text-muted-foreground">Impact:</span>
                                        <p className="font-medium mt-1">{project.impact}</p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                                
                                {/* Technologies */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                  {project.technologies.map((tech) => (
                                    <Badge key={tech} variant="secondary">
                                      {tech}
                                    </Badge>
                                  ))}
                                </div>
                                
                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                  {project.case_study_url && (
                                    <Button 
                                      onClick={() => project.case_study_url && window.open(project.case_study_url, '_blank')}
                                    >
                                      Read Case Study
                                      <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                  )}
                                  {project.demo_url && (
                                    <Button 
                                      variant="outline"
                                      onClick={() => project.demo_url && window.open(project.demo_url, '_blank')}
                                    >
                                      <ExternalLink className="w-4 h-4 mr-2" />
                                      Live Demo
                                    </Button>
                                  )}
                                  {project.github_url && (
                                    <Button 
                                      variant="outline"
                                      onClick={() => project.github_url && window.open(project.github_url, '_blank')}
                                    >
                                      <Github className="w-4 h-4" />
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </>
          )}

          {/* Templates Section */}
          {activeTab === 'templates' && (
            <>
              {/* Filter Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">HR Templates</h2>
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Filter:</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {filters.map((filter) => (
                    <Button
                      key={filter.id}
                      variant={activeFilter === filter.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveFilter(filter.id)}
                      className="text-sm"
                    >
                      {filter.label}
                    </Button>
                  ))}
                </div>
              </motion.div>

              {/* Templates Grid */}
              {filteredTemplates.length === 0 ? (
            <div className="text-center py-16">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No templates found</h3>
              <p className="text-muted-foreground">
                {searchTerm || activeFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Templates are being added. Check back soon!'}
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredTemplates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <Card className="h-full hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-2 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(template.category)} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    
                    <CardContent className="p-6 relative h-full flex flex-col">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getCategoryColor(template.category)} flex items-center justify-center text-white text-xl flex-shrink-0`}>
                          {getCategoryIcon(template.category)}
                        </div>
                        <Badge variant="outline" className="ml-4">
                          {template.category}
                        </Badge>
                      </div>

                      {/* Title and Description */}
                      <div className="flex-1 mb-4">
                        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                          {template.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {template.description || 'Professional HR template ready for use.'}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                        <div className="flex items-center">
                          <Download className="w-3 h-3 mr-1" />
                          {template.download_count} downloads
                        </div>
                        <div>
                          {new Date(template.created_at).toLocaleDateString()}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleDownload(template.id)}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            // TODO: Open preview modal
                          }}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              </motion.div>
              )}
            </>
          )}

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">6+</div>
                <p className="text-sm text-muted-foreground">Projects Completed</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">400+</div>
                <p className="text-sm text-muted-foreground">Hours Saved Monthly</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">20+</div>
                <p className="text-sm text-muted-foreground">Countries Supported</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </CardContent>
            </Card>
          </motion.div>
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
            <h2 className="text-3xl md:text-4xl font-bold">Want to connect with me?</h2>
            <p className="text-xl text-muted-foreground">
              I can help you build tailored HR automation and compliance solutions. 
              Let's discuss how we can transform your People Operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90"
                onClick={() => window.open('https://calendly.com/ipayeniyi/30min', '_blank')}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Schedule a Consultation
              </Button>
              <Button variant="outline" size="lg">
                View Code Templates
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}