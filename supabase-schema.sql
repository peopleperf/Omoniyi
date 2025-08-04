-- Portfolio Website Database Schema for Omoniyi Ipaye
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog articles table
CREATE TABLE IF NOT EXISTS blog_articles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    published BOOLEAN DEFAULT FALSE,
    featured_image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    author_id UUID REFERENCES users(id)
);

-- Create HR templates table
CREATE TABLE IF NOT EXISTS hr_templates (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    template_content TEXT NOT NULL,
    is_public BOOLEAN DEFAULT TRUE,
    download_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES users(id)
);

-- Create contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_read BOOLEAN DEFAULT FALSE
);

-- Create analytics table for tracking interactions
CREATE TABLE IF NOT EXISTS analytics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    event_type TEXT NOT NULL,
    event_data JSONB,
    user_agent TEXT,
    ip_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE hr_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can view their own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON users
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Blog articles policies
CREATE POLICY "Public can view published articles" ON blog_articles
    FOR SELECT USING (published = TRUE);

CREATE POLICY "Authors can view their own articles" ON blog_articles
    FOR SELECT USING (auth.uid() = author_id);

CREATE POLICY "Authors can create articles" ON blog_articles
    FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their own articles" ON blog_articles
    FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Authors can delete their own articles" ON blog_articles
    FOR DELETE USING (auth.uid() = author_id);

-- HR templates policies
CREATE POLICY "Public can view public templates" ON hr_templates
    FOR SELECT USING (is_public = TRUE);

CREATE POLICY "Creators can view their own templates" ON hr_templates
    FOR SELECT USING (auth.uid() = created_by);

CREATE POLICY "Creators can create templates" ON hr_templates
    FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Creators can update their own templates" ON hr_templates
    FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Creators can delete their own templates" ON hr_templates
    FOR DELETE USING (auth.uid() = created_by);

-- Contact messages policies
CREATE POLICY "Anyone can submit contact messages" ON contact_messages
    FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Admins can view contact messages" ON contact_messages
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can update contact messages" ON contact_messages
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Analytics policies
CREATE POLICY "Anyone can insert analytics" ON analytics
    FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Admins can view analytics" ON analytics
    FOR SELECT USING (auth.role() = 'authenticated');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_articles_published ON blog_articles(published) WHERE published = TRUE;
CREATE INDEX IF NOT EXISTS idx_blog_articles_created_at ON blog_articles(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_hr_templates_category ON hr_templates(category);
CREATE INDEX IF NOT EXISTS idx_hr_templates_public ON hr_templates(is_public) WHERE is_public = TRUE;
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics(created_at DESC);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_articles_updated_at BEFORE UPDATE ON blog_articles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hr_templates_updated_at BEFORE UPDATE ON hr_templates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data (optional)
-- Sample HR Templates
INSERT INTO hr_templates (title, category, description, template_content, is_public, created_by) VALUES
('Employee Onboarding Checklist', 'Onboarding', 'Comprehensive checklist for new employee onboarding process', '# Employee Onboarding Checklist

## Pre-arrival
- [ ] Send welcome email
- [ ] Prepare workspace
- [ ] Set up email account
- [ ] Create system access

## Day 1
- [ ] Welcome session
- [ ] IT setup
- [ ] Team introductions
- [ ] Office tour

## Week 1
- [ ] Role-specific training
- [ ] Policy review
- [ ] Benefits enrollment
- [ ] First 1:1 with manager', TRUE, NULL),

('Performance Review Template', 'Performance Management', 'Template for conducting employee performance reviews', '# Performance Review Template

## Employee Information
- **Name:** 
- **Position:**
- **Review Period:**
- **Reviewer:**

## Performance Areas
### 1. Job Knowledge & Skills
- Rating: □ Excellent □ Good □ Satisfactory □ Needs Improvement
- Comments:

### 2. Communication Skills
- Rating: □ Excellent □ Good □ Satisfactory □ Needs Improvement
- Comments:

### 3. Teamwork & Collaboration
- Rating: □ Excellent □ Good □ Satisfactory □ Needs Improvement
- Comments:

## Goals & Development
### Strengths
- 

### Areas for Improvement
- 

### Development Goals
- 

## Overall Rating
□ Exceeds Expectations □ Meets Expectations □ Needs Improvement

## Signatures
Employee: ___________________ Date: ___________
Manager: ____________________ Date: ___________', TRUE, NULL),

('Exit Interview Form', 'Offboarding', 'Template for conducting exit interviews with departing employees', '# Exit Interview Form

## Employee Information
- **Name:**
- **Position:**
- **Department:**
- **Last Day:**
- **Reason for Leaving:**

## Interview Questions

### 1. What were the primary factors in your decision to leave?

### 2. What did you enjoy most about working here?

### 3. What could we improve about our company culture?

### 4. How would you rate your relationship with your manager?

### 5. Were your career goals supported during your employment?

### 6. What suggestions do you have for improving our processes?

### 7. Would you consider working here again in the future?

### 8. Any additional comments or feedback?

## Follow-up Actions
- [ ] Document feedback
- [ ] Share relevant insights with management
- [ ] Update processes based on feedback
- [ ] Schedule alumni outreach

**Interviewer:** ___________________ **Date:** ___________', TRUE, NULL);

-- Sample Blog Article
INSERT INTO blog_articles (title, slug, content, excerpt, published, author_id) VALUES
('The Future of HR Technology: AI and Automation', 'future-of-hr-technology', '# The Future of HR Technology: AI and Automation

As a People Operations Manager with a passion for HR technology, I''ve witnessed firsthand how artificial intelligence and automation are transforming the way we manage human resources. In this article, I''ll share my insights on where HR tech is heading and how organizations can prepare for this exciting future.

## The Current State of HR Technology

Today''s HR technology landscape is already quite sophisticated. We have applicant tracking systems, learning management platforms, and employee engagement tools. However, many of these systems still require significant manual intervention and don''t fully leverage the power of AI.

## AI-Powered Recruitment

One of the most exciting developments is in recruitment technology. AI can now:

- Screen resumes more effectively than humans
- Reduce bias in hiring decisions
- Predict candidate success based on historical data
- Automate initial outreach and scheduling

I''ve implemented AI-powered recruitment tools that have reduced time-to-hire by 40% while improving candidate quality. The key is using AI to augment human decision-making, not replace it entirely.

## Automated Employee Onboarding

Onboarding is another area where automation shines. Modern HR tech can:

- Automatically generate personalized onboarding plans
- Schedule training sessions and equipment delivery
- Create customized learning paths
- Track progress and identify at-risk employees

## Predictive Analytics for Employee Retention

Perhaps the most powerful application of AI in HR is predictive analytics. By analyzing patterns in employee data, we can:

- Identify flight risks before employees decide to leave
- Predict which employees are ready for promotion
- Optimize team compositions for better performance
- Forecast future hiring needs

## The Human Element Remains Crucial

While technology is amazing, we must remember that HR is fundamentally about people. The best HR tech solutions enhance human connections rather than replace them. The goal should always be to free up HR professionals to focus on strategic, human-centered work.

## Preparing for the Future

To prepare for this AI-driven future, organizations should:

1. **Invest in data quality** - AI is only as good as the data it''s trained on
2. **Focus on change management** - Help employees adapt to new technologies
3. **Maintain ethical standards** - Ensure AI tools are used responsibly
4. **Upskill HR teams** - Help HR professionals develop tech literacy

## Conclusion

The future of HR technology is incredibly exciting. By embracing AI and automation while maintaining our focus on people, we can create more efficient, effective, and human-centered HR operations. I''m excited to be part of this transformation and look forward to seeing how these technologies continue to evolve.

*What are your thoughts on the future of HR technology? I''d love to hear your experiences and predictions in the comments below.*', 'Exploring how AI and automation are transforming HR operations and what organizations need to know to prepare for the future.', TRUE, NULL);