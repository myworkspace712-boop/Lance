import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenContact: (defaultInterest?: string) => void;
  onOpenEstimator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact, onOpenEstimator }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden mesh-grid">
      {/* Background radial glow lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-indigo-500/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 animate-pulse-subtle">
            <Sparkles className="w-4 h-4 text-brand-400" />
            <span className="text-xs sm:text-sm font-medium text-slate-300">
              Full-Stack Web Developer Custom Web Apps
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
            I build websites that <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-brand-400 via-indigo-300 to-sky-300 bg-clip-text text-transparent">
              scale your revenue & brand
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop losing leads to slow, clunky websites. Get high-performance web development with a modern touch and 100% tailored to your business goals.
          </p>

          {/* Call to actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={() => onOpenContact()}
              className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-brand-600 via-blue-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 rounded-xl shadow-xl shadow-brand-600/30 hover:shadow-brand-500/50 hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              <span>Get Free Proposal & Quote</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onOpenEstimator}
              className="w-full sm:w-auto px-7 py-4 text-base font-semibold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>Interactive Cost Estimator</span>
            </button>
          </div>

          {/* Social Proof Stats Banner */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-8 border-t border-white/10 max-w-lg mx-auto">
            <div className="glass-panel p-4 rounded-xl text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">50+</div>
              <div className="text-xs text-slate-400 font-medium">Websites Launched</div>
            </div>
            <div className="glass-panel p-4 rounded-xl text-center">
              <div className="text-2xl sm:text-3xl font-bold text-indigo-400 mb-1">100%</div>
              <div className="text-xs text-slate-400 font-medium">On-Time Delivery</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
