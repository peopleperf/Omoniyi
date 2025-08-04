-- Admin Setup Script for Omoniyi's Portfolio
-- This script sets up a single admin user and disables public registration

-- 1. First, manually create your admin user in Supabase Dashboard:
--    Go to Authentication > Users > Invite User
--    Enter your email and a secure password
--    After creating the user, copy the user ID

-- 2. Replace 'YOUR_USER_ID' below with your actual user ID from step 1
-- 3. Replace 'your-email@example.com' with your actual email

-- Update the users table to set admin role (if table exists)
UPDATE auth.users 
SET raw_user_meta_data = jsonb_set(
    COALESCE(raw_user_meta_data, '{}'::jsonb),
    '{role}',
    '"admin"'
)
WHERE email = 'your-email@example.com';

-- Create a secure admin check function
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update RLS policies to restrict admin access
-- Drop existing policies that might allow public access to admin features
DROP POLICY IF EXISTS "Authors can create articles" ON blog_articles;
DROP POLICY IF EXISTS "Authors can update their own articles" ON blog_articles;
DROP POLICY IF EXISTS "Authors can delete their own articles" ON blog_articles;
DROP POLICY IF EXISTS "Creators can create templates" ON hr_templates;
DROP POLICY IF EXISTS "Creators can update their own templates" ON hr_templates;
DROP POLICY IF EXISTS "Creators can delete their own templates" ON hr_templates;

-- Create admin-only policies for blog articles
CREATE POLICY "Only admin can create articles" ON blog_articles
    FOR INSERT WITH CHECK (is_admin());

CREATE POLICY "Only admin can update articles" ON blog_articles
    FOR UPDATE USING (is_admin());

CREATE POLICY "Only admin can delete articles" ON blog_articles
    FOR DELETE USING (is_admin());

-- Create admin-only policies for HR templates
CREATE POLICY "Only admin can create templates" ON hr_templates
    FOR INSERT WITH CHECK (is_admin());

CREATE POLICY "Only admin can update templates" ON hr_templates
    FOR UPDATE USING (is_admin());

CREATE POLICY "Only admin can delete templates" ON hr_templates
    FOR DELETE USING (is_admin());

-- Create admin-only policies for knowledge base
DROP POLICY IF EXISTS "Authenticated users can insert knowledge" ON knowledge_base;
DROP POLICY IF EXISTS "Authenticated users can update knowledge" ON knowledge_base;
DROP POLICY IF EXISTS "Authenticated users can delete knowledge" ON knowledge_base;
DROP POLICY IF EXISTS "Authenticated users can view all knowledge" ON knowledge_base;

CREATE POLICY "Only admin can insert knowledge" ON knowledge_base
    FOR INSERT WITH CHECK (is_admin());

CREATE POLICY "Only admin can update knowledge" ON knowledge_base
    FOR UPDATE USING (is_admin());

CREATE POLICY "Only admin can delete knowledge" ON knowledge_base
    FOR DELETE USING (is_admin());

CREATE POLICY "Only admin can view all knowledge" ON knowledge_base
    FOR SELECT USING (is_admin() OR active = TRUE);

-- IMPORTANT: After running this script, go to your Supabase Dashboard:
-- 1. Authentication > Policies > Disable "Enable new user signups"
-- 2. This will prevent anyone else from registering
