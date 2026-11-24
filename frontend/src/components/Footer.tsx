import React from 'react';
import { Github, Twitter, Linkedin, Mail, Trash2 } from 'lucide-react';

interface FooterProps {
  onOpenContact: () => void;
  onNavigate?: (page: 'home' | 'services' | 'work' | 'register', sectionId?: string) => void;
  onDeleteUsers?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact, onNavigate, onDeleteUsers }) => {
  return (
    <footer className="border-t border-white/10 bg-dark-900/90 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Pre-Footer Banner */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-brand-500/30 text-center mb-16 relative overflow-hidden shadow-glow">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Ready to elevate your online business?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base mb-6">
              Let's schedule a free 20-minute discovery call to discuss your project scope, timeline, and strategy.
            </p>
            <button
              onClick={onOpenContact}
              className="px-8 py-3.5 rounded-xl text-white font-bold bg-brand-600 hover:bg-brand-500 shadow-lg shadow-brand-600/40 transition-all duration-200"
            >
              Start Free Consultation
            </button>
          </div>
        </div>

        {/* Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              {/* Empty image space for company logo */}
              <div className="w-8 h-8 rounded-lg border border-dashed border-white/30 bg-white/5 flex items-center justify-center overflow-hidden">
                <img
                  src="/logo.png"
                  alt="Lance Company Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Lance
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm max-w-sm mb-4 leading-relaxed">
              Bespoke freelance web engineering for forward-thinking brands, startups, and agencies. Engineered for high conversion, search visibility, and maximum speed.
            </p>
            <div className="flex items-center gap-3 text-slate-400">
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="mailto:hello@lance.com" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Services</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate?.('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  Custom Web Apps
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  E-Commerce Stores
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  Performance Optimization
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  Full-Stack SaaS
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Explore</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate?.('work')}
                  className="hover:text-white transition-colors text-left"
                >
                  Case Studies
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('home', 'calculator')}
                  className="hover:text-white transition-colors text-left"
                >
                  Cost Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('home', 'process')}
                  className="hover:text-white transition-colors text-left"
                >
                  Our Process
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('home', 'pricing')}
                  className="hover:text-white transition-colors text-left"
                >
                  Pricing Guide
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} Lance. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            {onDeleteUsers && (
              <button
                onClick={onDeleteUsers}
                className="text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md bg-white/5 hover:bg-rose-500/10 border border-white/10 hover:border-rose-500/20"
                title="Delete all registered users from the system"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Registered Users</span>
              </button>
            )}
            <span>Built with precision using React, Vite & Node.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
