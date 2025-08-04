# Environment Setup Guide

## Setting up Supabase Environment Variables

To get your portfolio website running with Supabase, you need to configure the following environment variables in your `.env.local` file:

### Step 1: Create a Supabase Project

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Sign in or create an account
3. Click "New Project" and create a new project
4. Wait for the project to be created (this may take a few minutes)

### Step 2: Get Your Supabase Credentials

Once your project is created, you'll need to find these values:

#### 1. Project URL
- Go to your Supabase project dashboard
- Click on "Settings" → "General"
- Under "Project Settings", you'll find your "Project URL"
- Copy this value and paste it in `.env.local` as `NEXT_PUBLIC_SUPABASE_URL`

#### 2. Anon Key
- In the same "General" settings page
- Scroll down to "API" section
- Under "Project API keys", find the "anon" public key
- Copy this value and paste it in `.env.local` as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

#### 3. Service Role Key
- In the same "API" section
- Find the "service_role" secret key
- Copy this value and paste it in `.env.local` as `SUPABASE_SERVICE_ROLE_KEY`

### Step 3: Configure Your .env.local File

Your `.env.local` file should look like this:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Optional: Analytics tracking
NEXT_PUBLIC_GA_ID=

# Optional: Custom domain
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Step 4: Set Up Database Tables

After configuring your environment variables, you need to create the necessary database tables. You can do this by running the SQL setup script in your Supabase SQL Editor:

1. Go to your Supabase project dashboard
2. Click on "SQL Editor" → "New query"
3. Copy and paste the SQL schema from the project documentation
4. Run the query to create all tables

### Step 5: Set Up Row Level Security (RLS)

For security, you'll need to set up Row Level Security policies. These can be added through the Supabase dashboard:

1. Go to "Authentication" → "Policies"
2. Create policies for each table to control access
3. Refer to the project documentation for specific policy configurations

### Step 6: Test Your Configuration

After setting up everything:

1. Make sure your `.env.local` file is in the root directory of your project
2. Restart your development server: `npm run dev`
3. Visit `http://localhost:3000` to see your portfolio
4. Try accessing the admin dashboard at `http://localhost:3000/admin`

### Security Notes

- **NEVER** commit your `.env.local` file to version control
- **NEVER** share your service role key publicly
- Keep your `.env.local` file secure and only share it with trusted team members
- The service role key has admin privileges and should be kept secret

### Troubleshooting

If you encounter issues:

1. **Connection Errors**: Double-check your Supabase URL and keys
2. **Authentication Issues**: Verify your RLS policies are correctly configured
3. **Database Errors**: Ensure all tables are created properly in Supabase
4. **Environment Variables**: Make sure your `.env.local` file is properly formatted and in the correct location

For additional support, refer to the Supabase documentation or the project's README file.