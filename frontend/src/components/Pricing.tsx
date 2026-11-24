import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

interface PricingProps {
  onSelectTier: (tierName: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectTier }) => {
  const tiers = [
    {
      name: 'Launchpad',
      subtitle: 'Best for new businesses & product launches',
      price: '$1,499',
      timeline: '7-10 Days',
      popular: false,
      features: [
        'High-Converting Single or Multi-Page Site',
        'Custom Tailored Design (Mobile Responsive)',
        'Basic SEO & Schema Markup',
        'Fast Load Speeds (< 1.5s Core Web Vitals)',
        'Contact Form with Email Notifications',
        '30-Day Post-Launch Bug Warranty'
      ]
    },
    {
      name: 'Growth Business',
      subtitle: 'Most popular for established companies scaling up',
      price: '$2,899',
      timeline: '2-3 Weeks',
      popular: true,
      features: [
        'Up to 8 Custom Designed Pages',
        'Headless CMS for effortless content updates',
        'Advanced Technical SEO & Social OpenGraph',
        'Interactive Animations & Dynamic Filters',
        'Lead Capture & CRM / Zapier integration',
        'Google Analytics 4 & Meta Pixel setup',
        'Priority Slack/Email Support & 60-Day Warranty'
      ]
    },
    {
      name: 'Full-Stack Enterprise',
      subtitle: 'For SaaS products, custom portals & e-commerce',
      price: '$4,999+',
      timeline: '4-6 Weeks',
      popular: false,
      features: [
        'Complete Full-Stack Application (React + Node.js)',
        'Authentication (OAuth, JWT, Roles)',
        'Stripe / PayPal Subscription Payments',
        'Custom Admin Dashboard & Reporting',
        'Relational / NoSQL Database Architecture',
        'Automated CI/CD Pipeline & Cloud Deployment',
        'Dedicated 90-Day Engineering Warranty'
      ]
    }
  ];

  return (
    <section id="pricing" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold tracking-wider uppercase text-brand-400 mb-2">
            Predictable Packages
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Transparent, Fixed-Price Web Packages
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            No surprise invoices. Milestone-based contracts with 50% deposit and 50% upon final sign-off.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`glass-panel p-8 rounded-2xl relative flex flex-col justify-between ${
                tier.popular
                  ? 'border-brand-500 shadow-glow ring-2 ring-brand-500/30'
                  : 'border-white/10'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-brand-600 to-indigo-600 text-white rounded-full text-xs font-bold shadow-lg">
                  Most Popular Choice
                </div>
              )}

              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <p className="text-xs text-slate-400 mb-6">{tier.subtitle}</p>

                <div className="mb-6 pb-6 border-b border-white/10">
                  <div className="text-4xl font-extrabold text-white tracking-tight font-mono">
                    {tier.price}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">Typical delivery: {tier.timeline}</div>
                </div>

                <div className="space-y-3 mb-8">
                  {tier.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3">
                      <div className="mt-1 rounded-full p-0.5 bg-brand-500/20 text-brand-400 shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs sm:text-sm text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onSelectTier(tier.name)}
                className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 group ${
                  tier.popular
                    ? 'bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-600/30'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                <span>Select {tier.name}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
