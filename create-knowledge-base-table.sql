-- Create knowledge_base table for AI chat assistant
CREATE TABLE IF NOT EXISTS knowledge_base (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    category TEXT NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    keywords TEXT[] DEFAULT '{}',
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow anyone to read active knowledge entries
CREATE POLICY "Anyone can view active knowledge entries" ON knowledge_base
    FOR SELECT USING (active = TRUE);

-- Allow authenticated users to manage knowledge entries
CREATE POLICY "Authenticated users can insert knowledge" ON knowledge_base
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update knowledge" ON knowledge_base
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete knowledge" ON knowledge_base
    FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view all knowledge" ON knowledge_base
    FOR SELECT USING (auth.role() = 'authenticated');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_knowledge_base_active ON knowledge_base(active) WHERE active = TRUE;
CREATE INDEX IF NOT EXISTS idx_knowledge_base_category ON knowledge_base(category);
CREATE INDEX IF NOT EXISTS idx_knowledge_base_keywords ON knowledge_base USING GIN(keywords);

-- Create trigger for updated_at
CREATE TRIGGER update_knowledge_base_updated_at BEFORE UPDATE ON knowledge_base
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some initial knowledge base entries
INSERT INTO knowledge_base (category, question, answer, keywords, active) VALUES
('expertise', 'What is Omoniyi''s expertise?', 'Omoniyi Ipaye is a People Operations expert with over 10 years of experience specializing in HR automation, global compliance frameworks, and building custom HR tools. He combines deep HR knowledge with technical skills in React, Next.js, TypeScript, and Python.', ARRAY['expertise', 'skills', 'experience', 'technical'], TRUE),

('services', 'What services does Omoniyi offer?', 'Omoniyi offers comprehensive People Operations consulting including: HR Automation Strategy to identify and implement automation opportunities, Global Compliance Frameworks for multi-country operations, Custom HR Tools development, and Process Optimization to streamline workflows and improve efficiency.', ARRAY['services', 'consulting', 'offerings', 'help'], TRUE),

('experience', 'What is Omoniyi''s professional background?', 'Omoniyi has over 10 years of experience in People Operations, managing teams across 20+ countries. He has built compliance frameworks for global operations, developed custom HR automation tools, and helped organizations reduce manual HR work by up to 80% through strategic automation.', ARRAY['background', 'experience', 'history', 'career'], TRUE),

('technical', 'What technical skills does Omoniyi have?', 'Omoniyi is proficient in React, Next.js, TypeScript, and Python for building custom HR applications. He also specializes in automation platforms like Zapier and n8n, and has experience with various HRIS systems, data analytics tools, and API integrations.', ARRAY['technical', 'programming', 'coding', 'development'], TRUE),

('projects', 'What notable projects has Omoniyi worked on?', 'Notable projects include: Employment Verification System automating verification across 30+ countries, HR Case Routing Bot reducing response time by 80%, Global Onboarding Automation enabling zero-touch onboarding for distributed teams, and a Compliance Dashboard for real-time monitoring of global HR metrics.', ARRAY['projects', 'portfolio', 'work', 'achievements'], TRUE),

('contact', 'How can I contact Omoniyi?', 'You can reach Omoniyi through: Email at omoniyi@tuta.io, LinkedIn at linkedin.com/in/omoniyiipaye, or schedule a consultation at calendly.com/ipayeniyi/30min. He typically responds within 24 hours.', ARRAY['contact', 'email', 'reach', 'connect', 'linkedin'], TRUE),

('about', 'Who is Omoniyi Ipaye?', 'Omoniyi Ipaye is a globally-minded People Operations leader who transforms HR through technology. With expertise spanning 20+ countries, he specializes in building scalable HR systems that blend compliance, automation, and human-centered design to create exceptional employee experiences.', ARRAY['about', 'who', 'introduction', 'bio'], TRUE);
