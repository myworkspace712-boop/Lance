import { Project, Service, Testimonial, FAQItem, QuoteOption, AddonOption } from '../types';

export const SERVICES: Service[] = [
  {
    id: 'custom-web-dev',
    title: 'Custom Web Development',
    tagline: 'Tailored digital experiences',
    description: 'Fast, pixel-perfect websites built with modern frameworks (React, Next.js, Node.js). Clean architecture that scales seamlessly.',
    icon: 'Code2',
    startingPrice: '$1,499',
    popular: true,
    features: [
      'Custom UI/UX design (No cookie-cutter templates)',
      '100% Responsive & mobile-ready architecture',
      'SEO optimized',
      'Clean, maintainable code',
      'Interactive components & fluid animations'
    ]
  },
  {
    id: 'fullstack-saas',
    title: 'Full-Stack Web Apps',
    tagline: 'From idea to robust production',
    description: 'End-to-end full-stack applications with secure authentication, relational/NoSQL databases, payment gateways, and custom admin dashboards.',
    icon: 'Layers',
    startingPrice: '$2,999',
    features: [
      'Modern Node.js / Express / Next.js backend APIs',
      'Stripe & PayPal subscription payment integration',
      'User authentication (OAuth, JWT, Role-based access)',
      'Custom Admin CRM & analytics dashboard',
      'Cloud deployment (AWS, Vercel, Supabase, Render)'
    ]
  },
  {
    id: 'ecommerce',
    title: 'High-Converting E-Commerce',
    tagline: 'Turn visitors into customers',
    description: 'Custom online storefronts optimized for friction-free checkout, lightning-fast product filtering, cart management, and inventory synchronization.',
    icon: 'ShoppingBag',
    startingPrice: '$2,199',
    features: [
      'Custom Shopify, WooCommerce, or headless store',
      'Optimized 1-step checkout & payment flows',
      'Inventory management & automated order notifications',
      'Conversion-rate optimized product pages',
      'Customer review and loyalty rewards integrations'
    ]
  },
  {
    id: 'performance-seo',
    title: 'Speed, SEO & Modernization',
    tagline: 'Revamp slow or outdated websites',
    description: 'Comprehensive audit and code refactor. Transform slow, clunky websites into sub-second powerhouses that rank higher on Google search.',
    icon: 'Zap',
    startingPrice: '$799',
    features: [
      'Core Web Vitals remediation (LCP, FID, CLS)',
      'Schema markup & structured metadata setup',
      'Legacy stack migration to modern React / Vite / Next',
      'Asset compression, lazy loading & CDN setup',
      'Mobile usability & accessibility (a11y) fixes'
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'nexus-ai',
    title: 'Nexus AI - Enterprise Intelligence Platform',
    category: 'SaaS',
    description: 'An AI productivity dashboard for enterprise workflow automation featuring real-time data visualizers, dark/light modes, and custom billing.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    tags: ['React', 'TypeScript', 'Node.js', 'TailwindCSS', 'Recharts'],
    metrics: [
      { label: 'Conversion Lift', value: '+142%' },
      { label: 'Avg Page Load', value: '0.42s' },
      { label: 'Active Users', value: '45k+' }
    ],
    demoUrl: 'https://example.com/nexus',
    featured: true
  },
  {
    id: 'velour-botanics',
    title: 'Velour Botanicals - Luxury Organic Skincare',
    category: 'E-Commerce',
    description: 'Headless e-commerce platform with 3D product previews, recurring bundle subscriptions, and instant search filtering.',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80',
    tags: ['Next.js', 'TailwindCSS', 'Stripe', 'Framer Motion'],
    metrics: [
      { label: 'Revenue Growth', value: '+210%' },
      { label: 'Checkout Drop-off', value: '-38%' },
      { label: 'Mobile Sales', value: '68%' }
    ],
    demoUrl: 'https://example.com/velour',
    featured: true
  },
  {
    id: 'strata-fintech',
    title: 'Strata Capital - Wealth Advisory Portal',
    category: 'Full-Stack',
    description: 'B2B client portal featuring interactive portfolio projections, multi-factor authentication, and automated PDF statement generation.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
    tags: ['TypeScript', 'Express', 'PostgreSQL', 'Tailwind'],
    metrics: [
      { label: 'AUM Onboarded', value: '$12M+' },
      { label: 'Client Signups', value: '+85%' },
      { label: 'Security Score', value: '100/100' }
    ],
    demoUrl: 'https://example.com/strata',
    featured: true
  },
  {
    id: 'hypercraft-studios',
    title: 'HyperCraft - 3D Architectural Showcase',
    category: 'Landing Page',
    description: 'High-impact editorial portfolio website for an international architecture firm with smooth parallax transitions and video backgrounds.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    tags: ['Vite', 'React', 'CSS Grid', 'SEO Schema'],
    metrics: [
      { label: 'Lighthouse Score', value: '99/100' },
      { label: 'Inquiry Rate', value: '+3.4x' },
      { label: 'Time on Page', value: '4m 12s' }
    ],
    demoUrl: 'https://example.com/hypercraft',
    featured: false
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    clientName: 'Sarah Jenkins',
    clientRole: 'Founder & CEO',
    company: 'Apex Growth Labs',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    content: 'Hiring this team was the best decision for our rebranding. They took our rough ideas and turned them into a stunning, responsive platform that doubled our inbound client calls within 30 days.',
    rating: 5,
    projectDelivered: 'Custom Web Platform & CMS'
  },
  {
    id: 't2',
    clientName: 'Marcus Vance',
    clientRole: 'VP of Product',
    company: 'FinPulse Systems',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    content: 'Unmatched speed and communication. Our API integration was complex, but they handled everything cleanly with TypeScript and Express. Zero bugs in production and launched right on schedule.',
    rating: 5,
    projectDelivered: 'Full-Stack SaaS Dashboard'
  },
  {
    id: 't3',
    clientName: 'Elena Rostova',
    clientRole: 'Creative Director',
    company: 'Maison Chic Paris',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    content: 'Pixel-perfect execution. They understood the nuances of luxury design and delivered interactive animations that look effortless. Our customers constantly praise our site design.',
    rating: 5,
    projectDelivered: 'E-Commerce Storefront'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'f1',
    category: 'Process',
    question: 'How does the freelance development process work?',
    answer: 'We follow a transparent 5-step roadmap: 1) Initial Discovery & Scope Alignment, 2) Wireframes & Interactive Prototypes, 3) Iterative Development with private staging links, 4) Testing, Performance & SEO polishing, and 5) Launch & 30-day post-launch warranty.'
  },
  {
    id: 'f2',
    category: 'Pricing',
    question: 'How do you charge for projects (fixed vs hourly)?',
    answer: 'We primarily work on flat-rate, milestone-based fixed pricing. You know the exact deliverables, timeline, and cost upfront with zero hidden fees or billing surprises. For ongoing retainer work, we also offer flexible sprint packages.'
  },
  {
    id: 'f3',
    category: 'Technology',
    question: 'What tech stack do you recommend for my website?',
    answer: 'For marketing websites and landing pages, we recommend modern React / Next.js with Tailwind CSS for top-tier Google Lighthouse performance. For complex web apps, we pair React with Node.js/Express, TypeScript, and PostgreSQL/MongoDB.'
  },
  {
    id: 'f4',
    category: 'Process',
    question: 'How long does it typically take to complete a website?',
    answer: 'A high-converting landing page takes 1-2 weeks. A comprehensive multi-page business website takes 2-4 weeks. Full-scale SaaS or complex web applications typically take 4-8 weeks depending on custom feature requirements.'
  },
  {
    id: 'f5',
    category: 'Support',
    question: 'Do you provide maintenance and updates after the website is launched?',
    answer: 'Yes! Every project includes 30 days of complimentary bug fixes and support. We also provide optional monthly care plans covering security updates, content updates, automated backups, and performance monitoring.'
  }
];

export const PROJECT_TYPES: QuoteOption[] = [
  {
    id: 'landing',
    label: 'High-Converting Landing Page',
    description: '1 long-scroll page optimized for product sales, lead gen, or app launch.',
    basePrice: 999,
    deliveryDays: 7
  },
  {
    id: 'business',
    label: 'Full Business Website',
    description: '4-7 pages (Home, About, Services, Case Studies, Contact, Blog) with custom CMS.',
    basePrice: 1999,
    deliveryDays: 14
  },
  {
    id: 'ecommerce',
    label: 'E-Commerce Storefront',
    description: 'Complete store with cart, payment gateway, product filters, and customer accounts.',
    basePrice: 2899,
    deliveryDays: 21
  },
  {
    id: 'saas',
    label: 'Custom Web Application / SaaS',
    description: 'Full-stack application with user authentication, database, APIs, and custom UI.',
    basePrice: 4299,
    deliveryDays: 30
  }
];

export const ADDONS: AddonOption[] = [
  {
    id: 'seo-pro',
    label: 'Advanced SEO & Schema Suite',
    price: 350,
    description: 'Comprehensive keyword optimization, Google Search Console indexing, and rich snippet schemas.'
  },
  {
    id: 'cms',
    label: 'Headless CMS Integration',
    price: 450,
    description: 'Intuitive dashboard for you or your team to publish blog posts and edit copy easily.'
  },
  {
    id: 'animations',
    label: 'Bespoke Micro-Animations & 3D',
    price: 400,
    description: 'Smooth scroll effects, interactive hover micro-states, and high-end visual polish.'
  },
  {
    id: 'priority-delivery',
    label: 'Rush Delivery (Cut timeline by 40%)',
    price: 600,
    description: 'Dedicated priority focus to deliver your project ahead of the standard schedule.'
  }
];
