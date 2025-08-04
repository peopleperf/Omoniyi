# Admin Panel Setup Guide

## Prerequisites
- Supabase project with tables created (blog_articles, hr_templates, knowledge_base)
- Environment variables configured in `.env.local`

## Step 1: Create Admin User

### Option A: Using Supabase Dashboard (Recommended)
1. Go to your Supabase project dashboard
2. Navigate to Authentication → Users
3. Click "Invite user" or "Create user"
4. Enter your email (e.g., `omoniyi@tuta.io`)
5. Set a secure password
6. Make sure to confirm the email

### Option B: Using the Script
1. First, edit `scripts/create-admin-user.js` and change:
   - `email`: Your admin email
   - `password`: A secure password

2. Run the script:
```bash
node scripts/create-admin-user.js
```

## Step 2: Access the Admin Panel

1. Start your development server:
```bash
npm run dev
```

2. Navigate to: http://localhost:3000/admin

3. Log in with your admin credentials

## Admin Panel Features

### Dashboard
- Overview of your content
- Quick stats on articles, templates, and knowledge base entries

### Blog Management
- Create, edit, and delete blog articles
- Toggle article visibility (published/draft)
- Manage featured images
- SEO-friendly slug generation

### HR Templates
- Upload and manage HR document templates
- Categorize templates
- Control public/private visibility
- Track download counts

### Knowledge Base
- Add Q&A entries for the AI chat
- Categorize knowledge entries
- Add keywords for better AI responses
- Enable/disable specific entries

## Security Notes

1. **Change Default Password**: If using the script, change the password after first login
2. **Row Level Security**: The current setup uses Supabase Auth for access control
3. **Service Role Key**: Keep your service role key secure and never expose it client-side

## Adding More Admins

To add additional admin users:
1. Have them sign up through the admin panel
2. Or create them via Supabase dashboard
3. All authenticated users can access the admin panel (modify this in the code if needed)

## Troubleshooting

### "Table not found" errors
- Make sure you've run the SQL to create tables in Supabase
- Check that your Supabase URL and keys are correct

### Authentication errors
- Verify your email is confirmed in Supabase
- Check that cookies are enabled in your browser
- Try clearing browser cache and cookies

### Data not showing
- Check browser console for errors
- Verify Row Level Security (RLS) policies in Supabase
- Ensure your user has proper permissions

## Next Steps

1. Customize the admin panel UI to match your needs
2. Add role-based access control if needed
3. Implement additional features like:
   - Media upload for blog images
   - Analytics dashboard
   - User management
   - Backup/export functionality
