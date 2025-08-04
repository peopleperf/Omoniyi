# Omoniyi Ipaye - Personal Website & Portfolio

A modern, full-stack personal website built with Next.js, React, TypeScript, and Supabase. Features an AI-powered chat assistant, blog, HR templates library, and an admin dashboard.

## 🚀 Features

- **Interactive 3D Hero Section**: Engaging Three.js animations and particle effects
- **AI Chat Assistant**: Powered by Kimi AI for intelligent conversations about my expertise
- **Blog Platform**: Full-featured blog with admin management
- **HR Templates Library**: Downloadable HR document templates
- **Timeline Component**: Visual representation of work experience
- **Admin Dashboard**: Content management system for blog, templates, and knowledge base
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Mode Support**: Seamless theme switching

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Framer Motion, shadcn/ui
- **3D Graphics**: Three.js, React Three Fiber
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **AI Integration**: Kimi AI (Moonshot AI)
- **Deployment**: Vercel-ready

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account
- Kimi AI API key (optional, for AI chat)

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/peopleperf/Omoniyi.git
cd Omoniyi
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your credentials:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Kimi AI API Key (optional)
KIMI_API_KEY=your_kimi_api_key
```

## 📊 Database Setup

1. Create a new Supabase project

2. Run the SQL migrations in your Supabase SQL editor:
   - Execute `supabase/create-tables.sql`
   - Execute `supabase/rls-policies.sql`

3. Create an admin user:
   - Copy `scripts/create-admin-user.example.js` to `scripts/create-admin-user.js`
   - Update the email and password
   - Run: `node scripts/create-admin-user.js`

## 🚀 Development

Start the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` to see the website.

## 📱 Key Pages

- `/` - Home page with 3D hero section
- `/about` - About me and my experience
- `/projects` - Portfolio projects
- `/blog` - Blog articles
- `/contact` - Contact form and information
- `/admin` - Admin dashboard (requires authentication)

## 🔍 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🎨 Customization

### Updating Personal Information

1. Edit `src/app/page.tsx` for homepage content
2. Update `src/components/enhanced-timeline.tsx` with your work experience
3. Modify `src/app/about/page.tsx` for about page content

### Styling

- Global styles: `src/app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Component themes: Using shadcn/ui components

## 🔐 Admin Panel

Access the admin panel at `/admin` after creating an admin user. Features include:

- **Blog Management**: Create, edit, and publish articles
- **HR Templates**: Upload and manage document templates
- **Knowledge Base**: Manage AI chat responses

## 📦 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

Build the project:
```bash
npm run build
```

The output will be in the `.next` directory.

## 🤝 Contributing

Feel free to open issues or submit pull requests if you find any bugs or have suggestions for improvements.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Omoniyi Ipaye**
- LinkedIn: [omoniyiipaye](https://www.linkedin.com/in/omoniyiipaye)
- GitHub: [peopleperf](https://github.com/peopleperf)
- Email: omoniyi@tuta.io

---

Built with ❤️ by Omoniyi Ipaye
