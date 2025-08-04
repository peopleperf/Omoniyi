Personal Portfolio Planning for Omoniyi Ipaye

🌟 Objective:

Build a personal portfolio that positions Omoniyi Ipaye as a People Operations Manager who drives global HR compliance and process excellence, while showcasing a unique edge in AI-driven HR automation and tooling. This site will reflect the dual professional identity:

People Operations & Compliance Leadership — Demonstrated through managing global HR operations across US, EMEA, and APAC, partnering with legal, infosec, and tech teams, and implementing frameworks that support compliant, scalable growth.

HR Tech & AI Innovation — Delivering process transformation by embedding automation and AI into workflows using tools like Zapier, Google Apps Script, and n8n to build scalable systems.

The portfolio will balance credibility as a People Operations leader with your innovation and builder mindset.

🧰 Key Highlights from CV

9+ years in global HR Operations leadership across US, EMEA, and APAC

Expert in tools like Workday, Deel, Velocity, Zapier, Looker, n8n, Apps Script

Designed a global employment verification system (CESV)

Automated workflows handling 400+ HR cases

Strong experience in HR analytics, remote workforce management, and global compliance

Technical skills include Python (basic), JavaScript (professional)

🌈 Website Design – Granular Layout (MVP)

🏠 Homepage ("/" route)

UX Storytelling Strategy:

The homepage will feel like a conversation — where Omoniyi introduces himself as both a thoughtful People Operations Leader and a modern HR Technologist. The experience will simulate meeting Omoniyi in person — not just reading a CV.

Each section will unfold like a chapter in his story:

Chapter 1: "Who I Am" — a warm introduction with a clear mission

Chapter 2: "Where I’ve Been" — career timeline with meaningful achievements

Chapter 3: "What I Build" — practical tools and process automation that solve real HR problems

Chapter 4: "How I Think" — insight into values, strategies, and philosophies

Chapter 5: "Let’s Talk" — a genuine invitation to connect and collaborate

Each interaction will use warm, first-person voice. Example:

“I believe HR should empower people, not paperwork. That’s why I build systems that simplify the work — and let people focus on people.”

Hero Section:

Goal: Introduce yourself with warmth and clarity, inviting users into your world.

Text UX:

Heading: "Hi, I’m Omoniyi — I run People Ops like a product."

Subtext: "I help global companies scale compliant HR operations while building automation tools that reduce manual effort and increase accuracy."

CTA Buttons: "See My Projects" (primary), "Let’s Chat" (secondary)

Visual UX:

Split view: Left side (copy), right side (animated illustration or timeline graphic)

Animations to Implement:

Framer Motion stagger animation on text fade-in (tagline, subtext, CTA buttons)

Hero buttons: scale + opacity on hover

Background: subtle looping Lottie animation representing HR workflows (e.g., compliance shield, flowcharts)

Page load animation: fade-down hero section, delay scroll lock removal until full load

Navigation Bar:

Placement: Sticky top nav

Items: Home | Projects | Experience | Code | Blog | Contact

Interactions:

Smooth scroll

Animated underline on hover

Active section highlighting

Experience Section:

Goal: Highlight your growth and global reach with a storytelling lens.

Title: "My Journey Through People Operations"

Text UX:

Intro line: "From EMEA to APAC, I’ve designed and scaled people systems that power growth across borders."

Structure:

Horizontal timeline of company logos: Arla → Monumental → Maersk → Deel → Consensys

Click or tap to expand modal for each role:

Role, time period, region, and 2–3 achievement bullets written narratively

Example (Deel): "At Deel, I designed a scalable compliance framework across 20+ countries, helping accelerate global hiring."

Animations to Implement:

Framer Motion fade + scale entrance for each timeline item

On scroll: horizontal scroll with snap-to-point using scroll-snap CSS

On click: animated modal expansion with spring easing, using AnimatePresence for mounting/unmounting

Add Lottie icons or micro-animations inside modals (e.g., compliance shield, workflow arrows)

👥 About Me ("/about")

UX Content:

Animations to Implement:

Section scroll into view: fade-in + vertical slide

Cards ("Where I've Worked", "Tools I Love"): hover scale-in with icon pulse animation

Philosophy block: draw-on effect for borders + fade text line-by-line

Optional interactive background: floating neutral-tone HR icons using motion.div with looping translateY

Section Title: "Why I Do This"

Intro paragraph: "HR has always been about people. But in today’s world, it’s also about systems that support them. My work lives at that intersection — combining process leadership, global compliance, and smart tech to build scalable people ops."

Sub-sections with storytelling cards:

Where I've Worked (logos + flags + story captions)

How I Think (philosophy callout block)

The Tools I Love (grid of logos + short notes on why you like each)

What I'm Learning (paragraph on AI, low-code, and global policy trends)

Layout:

Two-column design

Left: Photo (circle or soft-rounded), optional Lottie animation overlay

Right: Text block with personal background and expertise summary

Content Blocks:

HR Philosophy

Regions worked in (US, EMEA, APAC)

Favorite Tools

Certifications or notable companies (icons or badges)

📈 Projects ("/projects")

Layout:

Grid of cards (2–3 columns depending on screen size)

Each card includes:

Title

Tagline (one-liner problem solved)

Tags (e.g. Zapier, Looker, Deel)

Thumbnail or icon

Hover state: Lift effect + "View More" CTA

Animations to Implement:

Card hover: lift + glow effect using Framer Motion scaleY + drop-shadow

On scroll into view: motion.div fade-up animation with slight delay per card

CTA hover: ripple or pulse animation

On click: transition to detailed project page with AnimatePresence page motion

Individual Project Page:

Cover image or Lottie HR-themed animation

Problem → Solution → Tools Used → Outcome

Code links (GitHub)

Button to see Live Demo (optional)

Option to clone a Zapier workflow or download a Notion template

Animations to Implement:

Page transition: Slide-in from right using Framer Motion shared layout animation

Section reveals: Fade-down and scale-in for each section

Tool badges: Bounce in on load with delay cascade

GitHub / Live Demo buttons: glow on hover + subtle wiggle when scrolled into view

📖 Code & Templates ("/code")

Layout:

List of HR automation tools/snippets with filters (e.g. by platform: Zapier, Apps Script, Notion)

Each entry has:

Use case

One-click copy

GitHub icon to open repo

Integration badge

📖 Blog / Insights ("/blog")

Layout:

Dynamically display a list of embedded LinkedIn Articles

Each article card includes:

LinkedIn thumbnail + title

Date published

Short preview (auto-pulled or manually added)

"Read on LinkedIn" button

Animations to Implement:

Blog card: Hover tilt effect (rotate + shadow pop)

Filter tab change: Fade-out, fade-in transition using key animation

On load: card stack slides up with 100ms stagger per article

“Read on LinkedIn” button: gentle left-to-right underline reveal

Admin Dashboard Design ("/admin")

UX Layout:

Login Page (Supabase Auth):

Email + Password fields

Secure login validation with session persistence

Dashboard Overview

Welcome message with name + logout button

Tabs or left sidebar nav:

"Blog Articles"

"Code & Templates"

"Site Settings" (optional future use)

Blog Articles Tab

Table View of articles:

Title | URL | Date Added | Preview Snippet | Visibility Toggle | Actions (Edit/Delete)

Add New Article:

Fields:

LinkedIn Post URL (Required, auto-fetch metadata)

Override Title (Optional)

Short Preview/Teaser (Optional)

Cover Image (Optional Upload or LinkedIn default)

Visibility toggle (Published/Draft)

Validation:

Must be a valid LinkedIn post URL

Title cannot exceed 120 characters

Code & Templates Tab

Table View of uploaded tools/snippets:

Title | Platform (Zapier, Apps Script, etc.) | Description | GitHub Link | Tags | Actions

Add New Entry:

Fields:

Tool Title (Required)

Platform Type (Select dropdown)

Use Case Description (Max 300 chars)

GitHub Repo Link (Required)

Optional: Upload Icon/Image

Tag (e.g. #compliance, #workflow, #analytics)

Feature Toggle (Display first or not)

Validation:

GitHub link must match URL pattern

Title + platform are required

Behavior:

Auto-sync with frontend: Supabase realtime or fetch-on-page-load

Responsive UI: Simple two-column layout for desktop, accordion view for mobile

Security: Authenticated routes only; backend rules prevent unauthorized data edits

Tech Notes:

Supabase Auth for login

Supabase Tables:

blog_articles

hr_templates

CRUD API calls (via Supabase client) for managing content

Bonus: Markdown preview (optional) for code snippets

Optional: Enable MDX preview or blog conversion in the future

📞 Contact ("/contact")

Layout:

Left: Message form

Name, Email, Message

Submit button (with loading spinner)

Right: Direct links

LinkedIn

GitHub

Calendly

Optional: Embedded Calendly iframe or QR to connect

Animations to Implement:

Contact form: field focus glow animation (border + label pop)

Submit button: press + success bounce feedback

Section entrance: fade-left with spring easing

Direct links: hover pulse icons with tooltip reveal (e.g. “Let’s connect on LinkedIn”)

🌐 Global Design System

Typography: Inter or Satoshi (Clean, modern)

Primary Color: Teal / Cyan-Blue #0891B2

Color Palette:

Background: #F8FAFC

Text (Primary): #111827

Text (Secondary): #6B7280

Border/Line: #E5E7EB

Button Hover: #047B83

Active States: Scaled-down press with darker teal overlay

Button Styles:

Primary: Teal fill, white text, rounded-lg, subtle drop shadow

Secondary: Transparent with teal border + text

States: Hover glow (box-shadow), active press feedback

Spacing: Grid-based layout with responsive padding

Animation Library: Framer Motion

Icon Library: Lucide or Phosphor

Responsive: Mobile-first, flex/grid based structure

Dark Mode: Optional toggle

Typography: Inter or Satoshi (Clean, modern)

Color Palette: Neutrals (off-white, slate, black) + Accent (HR blue or soft green)

Buttons: Rounded-lg, filled and outlined variants

Spacing: Grid-based layout with responsive padding

Animation Library: Framer Motion

Icon Library: Lucide or Phosphor

Responsive: Mobile-first, flex/grid based structure

Dark Mode: Optional toggle

🎨 Design Originality Principles

To ensure your website is original, personable, and non-templatey, the following creative approaches will be implemented:

✨ Layout & Flow:

Break from standard vertical stacking — use storytelling sections that scroll horizontally or diagonally

Overlap visual blocks and animate text overlays that feel dynamic and unexpected

Custom transitions between sections (fade → slide → grow) via Framer Motion

✋ Personal Interactions:

Use conversational CTAs and hover states with first-person voice

Embed your presence — micro text reveals like “Why I built this” or “The moment this idea sparked”

Sticky floating element: “Ask me what I automate” that expands a personal automation panel

🖼️ Visual Identity:

Custom iconography where possible (via Lucide or Figma-made assets)

Motion-based “terminal-style” interaction simulating HR automations (e.g. typing run buildHRworkflow())

No card templates with standard shadows or border radius

📐 Typography & Rhythm:

Unique spacing and vertical rhythm (not default Tailwind spacing)

Large expressive headlines paired with tightly stacked body copy

🗂️ Supabase Schema & Backend Structure

1. users (for Admin Auth)

Field

Type

Notes

id

UUID (PK)

From Supabase Auth

email

Text

Supabase Auth-managed

role

Text

Optional (e.g., 'admin')

created_at

Timestamp

Auto

2. blog_articles

Field

Type

Notes

id

UUID (PK)

Auto-generated

title

Text

Optional override

linkedin_url

Text

Must be a valid LinkedIn post

preview_text

Text

Optional teaser

cover_image

Text (URL)

Optional; fallback from LinkedIn

is_published

Boolean

Show/hide toggle

created_at

Timestamp

Auto

3. hr_templates

Field

Type

Notes

id

UUID (PK)

Auto-generated

title

Text

Required

platform

Text

e.g. 'Zapier', 'Apps Script'

description

Text

Use case summary (max 300 chars)

github_url

Text

Required

icon_url

Text

Optional upload

tags

Text[]

e.g. ['compliance', 'workflow']

is_featured

Boolean

Pin or not

created_at

Timestamp

Auto

🔐 Supabase Auth & RLS

Email + password login

RLS (Row Level Security):

SELECT: Public access for frontend

INSERT, UPDATE, DELETE: Admin-only

🔁 Frontend Sync

Fetch data from Supabase for /blog and /code

CRUD actions from /admin using Supabase client SDK

Optional: File uploads via Supabase Storage