-- Schema Updates to Match PRD Requirements

-- 1. Update blog_articles table to match PRD specification
ALTER TABLE blog_articles 
ADD COLUMN IF NOT EXISTS linkedin_url TEXT,
ADD COLUMN IF NOT EXISTS preview_text TEXT,
ADD COLUMN IF NOT EXISTS cover_image TEXT,
ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT FALSE;

-- Migrate existing data
UPDATE blog_articles 
SET is_published = published 
WHERE is_published IS NULL;

-- Drop old columns
ALTER TABLE blog_articles 
DROP COLUMN IF EXISTS published,
DROP COLUMN IF EXISTS content,
DROP COLUMN IF EXISTS excerpt,
DROP COLUMN IF EXISTS featured_image;

-- 2. Update hr_templates table to match PRD specification
ALTER TABLE hr_templates 
ADD COLUMN IF NOT EXISTS platform TEXT,
ADD COLUMN IF NOT EXISTS github_url TEXT,
ADD COLUMN IF NOT EXISTS icon_url TEXT,
ADD COLUMN IF NOT EXISTS tags TEXT[],
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS use_case_description TEXT;

-- Migrate existing data
UPDATE hr_templates 
SET platform = category,
    use_case_description = description,
    github_url = '#' -- Placeholder, update with actual URLs
WHERE platform IS NULL;

-- Drop old columns
ALTER TABLE hr_templates 
DROP COLUMN IF EXISTS template_content;

-- 3. Add role field to users table as specified in PRD
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';

-- Update admin user (replace with actual admin email)
UPDATE users 
SET role = 'admin' 
WHERE email = 'admin@example.com';

-- 4. Update RLS policies for new schema
-- Drop existing policies
DROP POLICY IF EXISTS "Public can view published articles" ON blog_articles;
DROP POLICY IF EXISTS "Public can view public templates" ON hr_templates;

-- Create new policies for blog_articles
CREATE POLICY "Public can view published articles" ON blog_articles
    FOR SELECT USING (is_published = TRUE);

-- Create new policies for hr_templates  
CREATE POLICY "Public can view public templates" ON hr_templates
    FOR SELECT USING (is_public = TRUE);

-- Note: Run these migrations in your Supabase SQL Editor
-- Make sure to backup your data before running migrations