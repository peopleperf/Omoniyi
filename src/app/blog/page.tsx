"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { createClient } from '@/lib/supabase';
import { 
  ExternalLink, 
  Calendar, 
  Clock, 
  Filter,
  Search,
  BookOpen,
  TrendingUp,
  Users,
  MessageSquare,
  Share2,
  Linkedin,
  Zap,
  BarChart3
} from 'lucide-react';

interface BlogArticle {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  author: string;
  category: string;
  tags: string[];
  created_at: string;
  published_at: string | null;
  linkedin_url: string | null;
  preview_text: string | null;
  is_published: boolean;
}

export default function Blog() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [blogArticles, setBlogArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  
  const supabase = createClient();
  
  const filters = [
    { id: 'all', label: 'All Articles' },
    { id: 'hr-tech', label: 'HR Tech' },
    { id: 'automation', label: 'Automation' },
    { id: 'compliance', label: 'Compliance' },
    { id: 'leadership', label: 'Leadership' },
    { id: 'global-hr', label: 'Global HR' }
  ];

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('blog_articles')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false });

    if (data) {
      setBlogArticles(data);
    }
    setLoading(false);
  };


  const filteredArticles = blogArticles.filter(article => {
    const matchesFilter = activeFilter === 'all' || article.category === activeFilter;
    const matchesSearch = searchTerm === '' || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (article.excerpt || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const featuredArticles = blogArticles.filter((article: any) => article.is_published).slice(0, 2);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Insights & Articles</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Thoughts on People Operations, HR technology, automation, and the future of work. 
              All articles are published on LinkedIn and reflect my experiences and learnings.
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">8+</div>
                <p className="text-sm text-muted-foreground">Articles Published</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">1.2K+</div>
                <p className="text-sm text-muted-foreground">Total Reads</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">150+</div>
                <p className="text-sm text-muted-foreground">Comments</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">90+</div>
                <p className="text-sm text-muted-foreground">Shares</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Featured Articles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-8 flex items-center">
              <TrendingUp className="w-6 h-6 text-primary mr-3" />
              Featured Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden">
                    <div className="relative h-48 bg-gradient-to-br from-primary/10 to-primary/5">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <BookOpen className="w-8 h-8 text-primary" />
                          </div>
                          <Badge variant="secondary">Featured</Badge>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl font-bold line-clamp-2">{article.title}</h3>
                      </div>
                      <p className="text-muted-foreground mb-4 line-clamp-3">{article.excerpt || article.preview_text}</p>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(article.published_at || article.created_at)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>5 min read</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        {article.linkedin_url && (
                          <Button 
                            size="sm" 
                            onClick={() => article.linkedin_url && window.open(article.linkedin_url, '_blank')}
                            className="text-xs"
                          >
                            <Linkedin className="w-3 h-3 mr-1" />
                            Read on LinkedIn
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Search and Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Filter:</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full sm:w-64 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
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

          {/* Articles Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-sm font-bold line-clamp-3">{article.title}</h3>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-4 line-clamp-3">{article.excerpt || article.preview_text}</p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(article.published_at || article.created_at)}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>5 min read</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {article.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {article.linkedin_url && (
                      <div className="flex items-center justify-end">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-xs p-0 h-6"
                          onClick={() => article.linkedin_url && window.open(article.linkedin_url, '_blank')}
                        >
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filteredArticles.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-12"
            >
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Stay Updated</h2>
            <p className="text-xl text-muted-foreground">
              Follow me on LinkedIn to get the latest insights on People Operations, HR technology, and automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={() => window.open('https://linkedin.com/in/omoniyi-ipaye', '_blank')}>
                <Linkedin className="w-5 h-5 mr-2" />
                Follow on LinkedIn
              </Button>
              <Button variant="outline" size="lg">
                <MessageSquare className="w-5 h-5 mr-2" />
                Get in Touch
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Topics I Write About</h2>
            <p className="text-xl text-muted-foreground">
              Exploring the intersection of People Operations, technology, and the future of work
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "HR Technology",
                description: "AI, automation, and digital transformation in HR",
                icon: BookOpen,
                color: "text-blue-600"
              },
              {
                title: "Global Compliance",
                description: "Cross-border employment and international HR laws",
                icon: Users,
                color: "text-green-600"
              },
              {
                title: "Process Automation",
                description: "Streamlining HR workflows with technology",
                icon: Zap,
                color: "text-purple-600"
              },
              {
                title: "Leadership",
                description: "Leading teams and building organizational culture",
                icon: TrendingUp,
                color: "text-orange-600"
              },
              {
                title: "Remote Work",
                description: "Managing distributed teams and virtual workplaces",
                icon: Calendar,
                color: "text-red-600"
              },
              {
                title: "Data & Analytics",
                description: "Using data to drive HR decisions and strategy",
                icon: BarChart3,
                color: "text-indigo-600"
              }
            ].map((topic, index) => (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <topic.icon className={`w-12 h-12 mx-auto mb-4 ${topic.color}`} />
                    <h3 className="text-lg font-semibold mb-2">{topic.title}</h3>
                    <p className="text-sm text-muted-foreground">{topic.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}