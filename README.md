# 🚀 Freelance Website Development Business Platform

A modern, production-ready, full-stack website tailored for a high-converting freelance web development & engineering agency.

---

## 📁 Project Architecture & Structure

```
c:\Y J\Businesses' Websites\Freelance\Free\
├── backend/
│   ├── data/
│   │   ├── inquiries.json      # Storage for submitted client proposals & leads
│   │   ├── projects.json       # Case studies & portfolio data
│   │   ├── services.json       # Web engineering services & pricing
│   │   └── testimonials.json   # Verified client reviews
│   ├── .env                    # Environment variables (port, client URL)
│   ├── .env.example            # Example configuration template (SMTP, etc.)
│   ├── package.json            # Express, Cors, Helmet, Morgan, Nodemailer
│   └── server.js               # REST API server & inquiry rate limiter
│
├── frontend/
│   ├── public/                 # Static public assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx           # Sticky nav with live availability badge & CTAs
│   │   │   ├── Hero.tsx             # High-impact value proposition & trust metrics
│   │   │   ├── TechStack.tsx        # Production-grade technologies marquee
│   │   │   ├── Services.tsx         # Detailed service cards with feature lists
│   │   │   ├── Portfolio.tsx        # Filterable project case studies with metrics
│   │   │   ├── QuoteCalculator.tsx  # Interactive project pricing & timeline estimator
│   │   │   ├── Process.tsx          # 5-step transparent delivery roadmap
│   │   │   ├── Pricing.tsx          # Fixed-price packages with guarantees
│   │   │   ├── Testimonials.tsx     # Client reviews & star ratings
│   │   │   ├── FAQ.tsx              # Expandable accordion for common questions
│   │   │   ├── ContactModal.tsx     # Multi-step proposal inquiry form with confetti
│   │   │   └── Footer.tsx           # Social links, consultation banner & copyright
│   │   ├── data/
│   │   │   └── mockData.ts          # Default data fallback & type models
│   │   ├── types.ts                 # Full TypeScript definitions
│   │   ├── App.tsx                  # Main application container
│   │   ├── index.css                # Tailwind base, dark mode & glow styling
│   │   └── main.tsx                 # React DOM mount point
│   ├── index.html                   # SEO metadata & Google Fonts
│   ├── package.json                 # React 18, Vite, Lucide Icons, Tailwind
│   ├── tailwind.config.js           # Custom theme colors, glows & keyframes
│   ├── tsconfig.json                # TypeScript strict configuration
│   └── vite.config.ts               # Vite bundler & reverse proxy setup
│
├── package.json                     # Monorepo root scripts with concurrently
└── README.md                        # Documentation & quick start guide
```

---

## ⚡ Quick Start

### 1. Install All Dependencies (Backend + Frontend)
Run this from the project root:
```bash
npm run install:all
```
Or individually:
```bash
# In backend/
cd backend && npm install

# In frontend/
cd ../frontend && npm install
```

### 2. Run Both Frontend and Backend Concurrently
From the root folder:
```bash
npm run dev
```
- **Frontend App**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`

---

## 🌟 Key Features

1. **Interactive Project Cost Calculator**: Prospective clients can choose their project scope (Landing page, Business site, E-commerce, SaaS) and select optional add-ons (SEO, CMS, Animations, Rush Delivery). It automatically calculates transparent pricing and estimated turnaround days, then populates the proposal form with 1 click.
2. **Filterable Portfolio Showcase**: Categorized case studies (SaaS, E-Commerce, Full-Stack, Landing Page) displaying quantifiable business outcomes (+142% conversion lift, sub-second load times, etc.).
3. **Lead & Inquiry Management API**: Backend saves inquiries to `backend/data/inquiries.json` and supports optional SMTP email notifications so you never miss a prospective client.
4. **Production Polish**: Built with Tailwind CSS, Lucide icons, dark-mode-first aesthetic, responsive mobile drawer, and confetti celebratory submission interactions.
