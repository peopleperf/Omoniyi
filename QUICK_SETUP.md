# Quick Setup Guide for Omoniyi's Portfolio

## 🚀 What's Been Done

✅ Portfolio website with interactive components built  
✅ Supabase integration configured  
✅ Environment files created  
✅ Database schema prepared  
✅ Admin dashboard ready  

## 📋 What You Need to Do

### 1. Set Up Supabase (5 minutes)

1. **Create Supabase Project:**
   - Go to [supabase.com](https://supabase.com)
   - Create a new account/project
   - Wait for project creation (2-3 minutes)

2. **Get Your Credentials:**
   - Project URL: Settings → General → Project URL
   - Anon Key: Settings → API → Project API keys → anon public key
   - Service Role Key: Settings → API → Project API keys → service_role secret key

3. **Update .env.local:**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### 2. Set Up Database (2 minutes)

1. **Run SQL Schema:**
   - Go to Supabase Dashboard → SQL Editor
   - Copy contents from `supabase-schema.sql`
   - Run the query

### 3. Test Your Setup

1. **Restart Development Server:**
   ```bash
   npm run dev
   ```

2. **Visit Your Portfolio:**
   - Main site: http://localhost:3000
   - Admin dashboard: http://localhost:3000/admin

## 🎯 Features Ready to Use

- **Interactive Homepage:** Floating automation panel, terminal simulator
- **Chapter-based Navigation:** Storytelling approach to showcase your journey
- **Admin Dashboard:** Manage blog posts, HR templates, view analytics
- **Contact Form:** Collect messages from visitors
- **Responsive Design:** Works on all devices

## 🔧 Troubleshooting

If you see "Invalid URL" error:
- Check your `.env.local` file has correct Supabase URL
- Make sure URL format is: `https://your-project-id.supabase.co`
- Restart development server after making changes

If fonts don't load:
- This is normal in development environment
- Fallback fonts will be used automatically

## 📁 Important Files

- `.env.local` - Your environment variables (NEVER commit to git)
- `supabase-schema.sql` - Database schema for Supabase
- `SETUP.md` - Detailed setup instructions
- `src/app/admin/page.tsx` - Admin dashboard
- `src/app/page.tsx` - Main portfolio page

## 🎨 Customization

To personalize your portfolio:
1. Update content in `src/app/page.tsx`
2. Add your own projects and experiences
3. Customize colors in `src/app/globals.css`
4. Add your own blog posts through the admin dashboard

---

**Need help?** Check the detailed `SETUP.md` file or refer to Supabase documentation.