"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/components/supabase-auth-provider';
import { createClient } from '@/lib/supabase';
import { 
  Settings, 
  FileText, 
  Code, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  EyeOff,
  ExternalLink,
  Calendar,
  Search,
  LogOut,
  BarChart3,
  Users,
  Database,
  Loader2
} from 'lucide-react';

interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  published: boolean;
  featured_image: string | null;
  created_at: string;
  author_id: string | null;
}

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

interface KnowledgeBase {
  id: string;
  category: string;
  question: string;
  answer: string;
  keywords: string[];
  active: boolean;
  created_at: string;
  updated_at: string;
}

export default function Admin() {
  const { user, signIn, signOut } = useAuth();
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [blogArticles, setBlogArticles] = useState<BlogArticle[]>([]);
  const [hrTemplates, setHRTemplates] = useState<HRTemplate[]>([]);
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeBase[]>([]);
  const [showAddArticle, setShowAddArticle] = useState(false);
  const [showAddTemplate, setShowAddTemplate] = useState(false);
  const [showAddKnowledge, setShowAddKnowledge] = useState(false);
  const [newArticle, setNewArticle] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    published: false,
    featured_image: ''
  });
  const [newTemplate, setNewTemplate] = useState({
    title: '',
    category: '',
    description: '',
    template_content: '',
    is_public: true
  });
  const [newKnowledge, setNewKnowledge] = useState({
    category: '',
    question: '',
    answer: '',
    keywords: '',
    active: true
  });

  const supabase = createClient();

  useEffect(() => {
    if (user) {
      fetchBlogArticles();
      fetchHRTemplates();
      fetchKnowledgeBase();
    }
  }, [user]);

  const fetchBlogArticles = async () => {
    const { data, error } = await supabase
      .from('blog_articles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setBlogArticles(data);
  };

  const fetchHRTemplates = async () => {
    const { data, error } = await supabase
      .from('hr_templates')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setHRTemplates(data);
  };

  const fetchKnowledgeBase = async () => {
    const { data, error } = await supabase
      .from('knowledge_base')
      .select('*')
      .order('updated_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching knowledge base:', error);
    }
    if (data) setKnowledgeBase(data);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError(null);
    
    try {
      await signIn(loginForm.email, loginForm.password);
    } catch (error: any) {
      console.error('Login error:', error);
      setLoginError(error.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
  };

  const handleAddArticle = async () => {
    const articleWithAuthor = {
      ...newArticle,
      author_id: user?.id || null
    };
    
    const { data, error } = await supabase
      .from('blog_articles')
      .insert([articleWithAuthor])
      .select();
    
    if (data) {
      setBlogArticles([data[0], ...blogArticles]);
      setShowAddArticle(false);
      setNewArticle({
        title: '',
        slug: '',
        content: '',
        excerpt: '',
        published: false,
        featured_image: ''
      });
    }
  };

  const handleAddTemplate = async () => {
    const templateWithCreator = {
      ...newTemplate,
      created_by: user?.id || null
    };
    
    const { data, error } = await supabase
      .from('hr_templates')
      .insert([templateWithCreator])
      .select();
    
    if (data) {
      setHRTemplates([data[0], ...hrTemplates]);
      setShowAddTemplate(false);
      setNewTemplate({
        title: '',
        category: '',
        description: '',
        template_content: '',
        is_public: true
      });
    }
  };

  const toggleArticlePublish = async (id: string, isPublished: boolean) => {
    const { data, error } = await supabase
      .from('blog_articles')
      .update({ published: !isPublished })
      .eq('id', id);
    
    if (!error) {
      fetchBlogArticles();
    }
  };

  const toggleTemplatePublic = async (id: string, isPublic: boolean) => {
    const { data, error } = await supabase
      .from('hr_templates')
      .update({ is_public: !isPublic })
      .eq('id', id);
    
    if (!error) {
      fetchHRTemplates();
    }
  };

  const handleAddKnowledge = async () => {
    const knowledgeWithTimestamp = {
      category: newKnowledge.category,
      question: newKnowledge.question,
      answer: newKnowledge.answer,
      keywords: newKnowledge.keywords.split(',').map(k => k.trim()),
      active: newKnowledge.active,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from('knowledge_base')
      .insert([knowledgeWithTimestamp])
      .select();
    
    if (data) {
      setKnowledgeBase([data[0], ...knowledgeBase]);
      setShowAddKnowledge(false);
      setNewKnowledge({
        category: '',
        question: '',
        answer: '',
        keywords: '',
        active: true
      });
    }
  };

  const toggleKnowledgeActive = async (id: string, isActive: boolean) => {
    const { data, error } = await supabase
      .from('knowledge_base')
      .update({ active: !isActive, updated_at: new Date().toISOString() })
      .eq('id', id);
    
    if (!error) {
      fetchKnowledgeBase();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Card>
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-2xl font-bold">Admin Login</h1>
                <p className="text-muted-foreground mt-2">Sign in to access the admin dashboard</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                {loginError && (
                  <div className="bg-destructive/15 text-destructive border border-destructive/20 rounded-md p-3 text-sm">
                    {loginError}
                  </div>
                )}
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="admin@example.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="••••••••"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Demo credentials: admin@example.com / password
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Settings className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Welcome, {user.email}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="articles">Blog Articles</TabsTrigger>
            <TabsTrigger value="templates">Code Templates</TabsTrigger>
            <TabsTrigger value="knowledge">AI Knowledge</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Articles</p>
                      <p className="text-2xl font-bold">{blogArticles.length}</p>
                    </div>
                    <FileText className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Templates</p>
                      <p className="text-2xl font-bold">{hrTemplates.length}</p>
                    </div>
                    <Code className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Published Articles</p>
                      <p className="text-2xl font-bold">{blogArticles.filter(a => a.published).length}</p>
                    </div>
                    <Eye className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Public Templates</p>
                      <p className="text-2xl font-bold">{hrTemplates.filter(t => t.is_public).length}</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Articles</h3>
                  <div className="space-y-4">
                    {blogArticles.slice(0, 3).map((article) => (
                      <div key={article.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{article.title || 'Untitled'}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(article.created_at)}</p>
                        </div>
                        <Badge variant={article.published ? "default" : "secondary"}>
                          {article.published ? "Published" : "Draft"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Templates</h3>
                  <div className="space-y-4">
                    {hrTemplates.slice(0, 3).map((template) => (
                      <div key={template.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{template.title}</p>
                          <p className="text-xs text-muted-foreground">{template.category}</p>
                        </div>
                        <Badge variant={template.is_public ? "default" : "secondary"}>
                          {template.is_public ? "Public" : "Private"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="articles" className="mt-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Blog Articles</h2>
                  <Button onClick={() => setShowAddArticle(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Article
                  </Button>
                </div>

                {/* Add Article Form */}
                {showAddArticle && (
                  <Card className="mb-6">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Add New Article</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="title">Title *</Label>
                          <Input
                            id="title"
                            value={newArticle.title}
                            onChange={(e) => setNewArticle(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="Article title"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="slug">Slug *</Label>
                          <Input
                            id="slug"
                            value={newArticle.slug}
                            onChange={(e) => setNewArticle(prev => ({ ...prev, slug: e.target.value }))}
                            placeholder="article-slug-url"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="content">Content *</Label>
                          <Textarea
                            id="content"
                            value={newArticle.content}
                            onChange={(e) => setNewArticle(prev => ({ ...prev, content: e.target.value }))}
                            placeholder="Article content (Markdown supported)"
                            rows={8}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="excerpt">Excerpt</Label>
                          <Textarea
                            id="excerpt"
                            value={newArticle.excerpt}
                            onChange={(e) => setNewArticle(prev => ({ ...prev, excerpt: e.target.value }))}
                            placeholder="Brief excerpt of the article"
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label htmlFor="featured_image">Featured Image URL</Label>
                          <Input
                            id="featured_image"
                            value={newArticle.featured_image}
                            onChange={(e) => setNewArticle(prev => ({ ...prev, featured_image: e.target.value }))}
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="published"
                            checked={newArticle.published}
                            onCheckedChange={(checked) => setNewArticle(prev => ({ ...prev, published: checked }))}
                          />
                          <Label htmlFor="published">Published</Label>
                        </div>
                        <div className="flex space-x-2">
                          <Button onClick={handleAddArticle}>Add Article</Button>
                          <Button variant="outline" onClick={() => setShowAddArticle(false)}>Cancel</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search articles..."
                      className="pl-10"
                    />
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Slug</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {blogArticles.map((article) => (
                      <TableRow key={article.id}>
                        <TableCell className="font-medium">{article.title}</TableCell>
                        <TableCell>
                          <code className="text-xs bg-muted px-2 py-1 rounded">
                            /{article.slug}
                          </code>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Switch 
                              checked={article.published}
                              onCheckedChange={() => toggleArticlePublish(article.id, article.published)}
                            />
                            <Badge variant={article.published ? "default" : "secondary"}>
                              {article.published ? "Published" : "Draft"}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(article.created_at)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="mt-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Code Templates</h2>
                  <Button onClick={() => setShowAddTemplate(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Template
                  </Button>
                </div>

                {/* Add Template Form */}
                {showAddTemplate && (
                  <Card className="mb-6">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Add New Template</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="title">Title *</Label>
                          <Input
                            id="title"
                            value={newTemplate.title}
                            onChange={(e) => setNewTemplate(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="Template title"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="category">Category *</Label>
                          <Select onValueChange={(value) => setNewTemplate(prev => ({ ...prev, category: value }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Onboarding">Onboarding</SelectItem>
                              <SelectItem value="Performance Management">Performance Management</SelectItem>
                              <SelectItem value="Offboarding">Offboarding</SelectItem>
                              <SelectItem value="Compliance">Compliance</SelectItem>
                              <SelectItem value="Automation">Automation</SelectItem>
                              <SelectItem value="Analytics">Analytics</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={newTemplate.description}
                            onChange={(e) => setNewTemplate(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Brief description of the template"
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label htmlFor="template_content">Template Content *</Label>
                          <Textarea
                            id="template_content"
                            value={newTemplate.template_content}
                            onChange={(e) => setNewTemplate(prev => ({ ...prev, template_content: e.target.value }))}
                            placeholder="Template content (Markdown, code, or configuration)"
                            rows={8}
                            required
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="is_public"
                            checked={newTemplate.is_public}
                            onCheckedChange={(checked) => setNewTemplate(prev => ({ ...prev, is_public: checked }))}
                          />
                          <Label htmlFor="is_public">Public</Label>
                        </div>
                        <div className="flex space-x-2">
                          <Button onClick={handleAddTemplate}>Add Template</Button>
                          <Button variant="outline" onClick={() => setShowAddTemplate(false)}>Cancel</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search templates..."
                      className="pl-10"
                    />
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Public</TableHead>
                      <TableHead>Downloads</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {hrTemplates.map((template) => (
                      <TableRow key={template.id}>
                        <TableCell className="font-medium">{template.title}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{template.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Switch 
                              checked={template.is_public}
                              onCheckedChange={() => toggleTemplatePublic(template.id, template.is_public)}
                            />
                            <Badge variant={template.is_public ? "default" : "secondary"}>
                              {template.is_public ? "Public" : "Private"}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>{template.download_count}</TableCell>
                        <TableCell>{formatDate(template.created_at)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="knowledge" className="mt-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">AI Knowledge Base</h2>
                  <Button onClick={() => setShowAddKnowledge(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Knowledge
                  </Button>
                </div>

                {/* Add Knowledge Form */}
                {showAddKnowledge && (
                  <Card className="mb-6">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Add New Knowledge</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="category">Category *</Label>
                          <Select onValueChange={(value) => setNewKnowledge(prev => ({ ...prev, category: value }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="about">About</SelectItem>
                              <SelectItem value="expertise">Expertise</SelectItem>
                              <SelectItem value="technical">Technical Skills</SelectItem>
                              <SelectItem value="services">Services</SelectItem>
                              <SelectItem value="experience">Experience</SelectItem>
                              <SelectItem value="projects">Projects</SelectItem>
                              <SelectItem value="contact">Contact</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="question">Question/Topic *</Label>
                          <Input
                            id="question"
                            value={newKnowledge.question}
                            onChange={(e) => setNewKnowledge(prev => ({ ...prev, question: e.target.value }))}
                            placeholder="What would users ask about this?"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="answer">Answer/Response *</Label>
                          <Textarea
                            id="answer"
                            value={newKnowledge.answer}
                            onChange={(e) => setNewKnowledge(prev => ({ ...prev, answer: e.target.value }))}
                            placeholder="Detailed response the AI should give"
                            rows={6}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                          <Input
                            id="keywords"
                            value={newKnowledge.keywords}
                            onChange={(e) => setNewKnowledge(prev => ({ ...prev, keywords: e.target.value }))}
                            placeholder="hr, automation, compliance, global"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="active"
                            checked={newKnowledge.active}
                            onCheckedChange={(checked) => setNewKnowledge(prev => ({ ...prev, active: checked }))}
                          />
                          <Label htmlFor="active">Active</Label>
                        </div>
                        <div className="flex space-x-2">
                          <Button onClick={handleAddKnowledge}>Add Knowledge</Button>
                          <Button variant="outline" onClick={() => setShowAddKnowledge(false)}>Cancel</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search knowledge base..."
                      className="pl-10"
                    />
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Question</TableHead>
                      <TableHead>Keywords</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Updated</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {knowledgeBase.map((knowledge) => (
                      <TableRow key={knowledge.id}>
                        <TableCell>
                          <Badge variant="outline">{knowledge.category}</Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{knowledge.question}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {knowledge.keywords.slice(0, 3).map((keyword, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {keyword}
                              </Badge>
                            ))}
                            {knowledge.keywords.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{knowledge.keywords.length - 3}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Switch 
                              checked={knowledge.active}
                              onCheckedChange={() => toggleKnowledgeActive(knowledge.id, knowledge.active)}
                            />
                            <Badge variant={knowledge.active ? "default" : "secondary"}>
                              {knowledge.active ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(knowledge.updated_at)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Site Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="site-title">Site Title</Label>
                      <Input id="site-title" defaultValue="Omoniyi Ipaye - People Operations Leader" />
                    </div>
                    <div>
                      <Label htmlFor="site-description">Site Description</Label>
                      <Input id="site-description" defaultValue="People Operations & HR Tech Innovation" />
                    </div>
                    <div>
                      <Label htmlFor="contact-email">Contact Email</Label>
                      <Input id="contact-email" defaultValue="omoniyi.ipaye@example.com" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Social Links</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="linkedin-url">LinkedIn URL</Label>
                      <Input id="linkedin-url" defaultValue="https://linkedin.com/in/omoniyi-ipaye" />
                    </div>
                    <div>
                      <Label htmlFor="github-url">GitHub URL</Label>
                      <Input id="github-url" defaultValue="https://github.com/omoniyi-ipaye" />
                    </div>
                    <div>
                      <Label htmlFor="calendly-url">Calendly URL</Label>
                      <Input id="calendly-url" defaultValue="https://calendly.com/omoniyi-ipaye" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">SEO Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="meta-title">Meta Title</Label>
                      <Input id="meta-title" defaultValue="Omoniyi Ipaye - People Operations & HR Tech Leader" />
                    </div>
                    <div>
                      <Label htmlFor="meta-description">Meta Description</Label>
                      <Input id="meta-description" defaultValue="Global People Operations leader specializing in HR compliance, automation, and technology innovation." />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Analytics</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="google-analytics">Google Analytics ID</Label>
                      <Input id="google-analytics" placeholder="UA-XXXXXXXXX-X" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="enable-analytics" />
                      <Label htmlFor="enable-analytics">Enable Analytics</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 flex justify-end">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Save Settings
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}