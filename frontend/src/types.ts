export interface Project {
  id: string;
  title: string;
  category: 'Full-Stack' | 'E-Commerce' | 'SaaS' | 'Landing Page';
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  features: string[];
  startingPrice: string;
  popular?: boolean;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  projectDelivered: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Process' | 'Pricing' | 'Technology' | 'Support';
}

export interface QuoteOption {
  id: string;
  label: string;
  description: string;
  basePrice: number;
  deliveryDays: number;
}

export interface AddonOption {
  id: string;
  label: string;
  price: number;
  description: string;
}
