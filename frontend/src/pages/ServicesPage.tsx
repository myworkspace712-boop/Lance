import React from 'react';
import { SERVICES } from '../data/mockData';
import { Code2, Layers, ShoppingBag, Zap, Check, ArrowRight, Sparkles, ShieldCheck, Clock } from 'lucide-react';

interface ServicesPageProps {
  onSelectService: (serviceName: string) => void;
  onBackToHome?: () => void;
  onOpenEstimator?: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onSelectService,
  onOpenEstimator,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-6 h-6 text-brand-400" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-indigo-400" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-6 h-6 text-emerald-400" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-amber-400" />;
      default:
        return <Code2 className="w-6 h-6 text-brand-400" />;
    }
  };

  return (
    <div className="pt-28 pb-24 relative mesh-grid min-h-screen">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Full-Lifecycle Engineering</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
            Services & Technical Capabilities
          </h1>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Every business has unique technical demands. From high-conversion marketing sites to complex full-stack SaaS architectures and e-commerce platforms, I engineer solutions built to perform and scale.
          </p>
        </div>

        {/* All Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className={`glass-panel glass-panel-hover p-8 sm:p-10 rounded-2xl relative flex flex-col justify-between ${
                service.popular ? 'border-brand-500/40 ring-1 ring-brand-500/20' : ''
              }`}
            >
              {service.popular && (
                <div className="absolute top-5 right-5 px-3 py-1 bg-brand-500/20 border border-brand-400/40 rounded-full text-brand-300 text-xs font-semibold">
                  Most Requested
                </div>
              )}

              <div>
                <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner">
                  {getIcon(service.icon)}
                </div>

                <div className="text-xs font-semibold text-brand-400 uppercase tracking-wider mb-1">
                  {service.tagline}
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">
                  {service.title}
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-1 rounded-full p-0.5 bg-brand-500/20 text-brand-400 shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Starting from</span>
                  <span className="text-2xl font-bold text-white font-mono">{service.startingPrice}</span>
                </div>
                <button
                  onClick={() => onSelectService(service.title)}
                  className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 shadow-md shadow-brand-500/25 transition-all flex items-center gap-1.5 group"
                >
                  <span>Book This Service</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Value Guarantees Banner */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1">30-Day Free Warranty</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Every project includes complimentary post-launch support and bug fixes for total peace of mind.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center shrink-0 text-brand-400">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1">Milestone-Based Timeline</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Clear weekly sprints with private live staging URLs so you always see real progress.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 text-indigo-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1">100% Code Ownership</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  You own all source code, assets, and design files with zero proprietary lock-in.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-brand-500/30 text-center relative overflow-hidden shadow-glow">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Need a custom scope or have specific requirements?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base mb-8">
              We can tailor a project plan specifically for your technical stack, timeline, and budget.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onSelectService('Custom Scope / Advisory')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-white font-bold bg-brand-600 hover:bg-brand-500 shadow-lg shadow-brand-600/30 transition-all"
              >
                Request Custom Proposal
              </button>
              {onOpenEstimator && (
                <button
                  onClick={onOpenEstimator}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-semibold transition-all"
                >
                  Use Price Calculator
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
