-- Enable Row Level Security on all tables
ALTER TABLE blog_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE hr_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;

-- Blog Articles Policies
-- Allow anyone to read published articles
CREATE POLICY "Public users can view published articles" ON blog_articles
FOR SELECT USING (published = true);

-- Allow authenticated users to manage all articles
CREATE POLICY "Authenticated users can insert articles" ON blog_articles
FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update articles" ON blog_articles
FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete articles" ON blog_articles
FOR DELETE TO authenticated USING (true);

-- Allow authenticated users to view all articles (including drafts)
CREATE POLICY "Authenticated users can view all articles" ON blog_articles
FOR SELECT TO authenticated USING (true);

-- HR Templates Policies
-- Allow anyone to read public templates
CREATE POLICY "Public users can view public templates" ON hr_templates
FOR SELECT USING (is_public = true);

-- Allow authenticated users to manage all templates
CREATE POLICY "Authenticated users can insert templates" ON hr_templates
FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update templates" ON hr_templates
FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete templates" ON hr_templates
FOR DELETE TO authenticated USING (true);

-- Allow authenticated users to view all templates
CREATE POLICY "Authenticated users can view all templates" ON hr_templates
FOR SELECT TO authenticated USING (true);

-- Knowledge Base Policies
-- Allow anyone to read active knowledge base entries
CREATE POLICY "Public users can view active knowledge" ON knowledge_base
FOR SELECT USING (active = true);

-- Allow authenticated users to manage all knowledge base entries
CREATE POLICY "Authenticated users can insert knowledge" ON knowledge_base
FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update knowledge" ON knowledge_base
FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete knowledge" ON knowledge_base
FOR DELETE TO authenticated USING (true);

-- Allow authenticated users to view all knowledge entries
CREATE POLICY "Authenticated users can view all knowledge" ON knowledge_base
FOR SELECT TO authenticated USING (true);
