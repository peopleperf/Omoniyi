-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  technologies TEXT[], -- Array of technologies used
  image_url TEXT,
  demo_url TEXT,
  github_url TEXT,
  case_study_url TEXT,
  client VARCHAR(255),
  duration VARCHAR(100), -- e.g., "3 months", "Ongoing"
  status VARCHAR(50) DEFAULT 'completed', -- completed, in-progress, planned
  impact TEXT, -- Impact/results of the project
  featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create index on status and featured for faster queries
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_featured ON projects(featured);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Everyone can view published projects
CREATE POLICY "Anyone can view published projects" ON projects
  FOR SELECT USING (status = 'completed');

-- Only authenticated users can manage projects
CREATE POLICY "Authenticated users can manage projects" ON projects
  FOR ALL USING (auth.role() = 'authenticated');

-- Insert some sample projects
INSERT INTO projects (title, description, category, technologies, client, duration, status, impact, featured) VALUES
('Global HR Compliance Platform', 'Built a comprehensive compliance management system supporting 20+ countries with automated regulatory updates and reporting.', 'HR Technology', ARRAY['React', 'Node.js', 'PostgreSQL', 'AWS'], 'Multinational Corporation', '6 months', 'completed', 'Reduced compliance violations by 95% and saved 200+ hours monthly on regulatory reporting.', true),
('AI-Powered HR Case Routing', 'Developed an intelligent case routing system using NLP to automatically categorize and assign HR inquiries to the right team members.', 'Automation', ARRAY['Python', 'TensorFlow', 'FastAPI', 'Redis'], 'Tech Startup', '3 months', 'completed', 'Decreased average response time from 48 hours to 2 hours, improved employee satisfaction by 40%.', true),
('Employment Verification Automation', 'Created an automated employment verification system integrating with multiple HRIS platforms and government databases.', 'Automation', ARRAY['Zapier', 'n8n', 'APIs', 'PostgreSQL'], 'Financial Services', '2 months', 'completed', 'Processed 10,000+ verifications monthly with 99.9% accuracy, eliminated manual processing entirely.', false),
('People Analytics Dashboard', 'Designed and implemented a real-time analytics dashboard providing insights on workforce metrics, retention, and performance.', 'Analytics', ARRAY['React', 'D3.js', 'Python', 'Tableau'], 'E-commerce Company', '4 months', 'completed', 'Enabled data-driven decisions that reduced turnover by 25% and improved hiring efficiency by 30%.', false);
