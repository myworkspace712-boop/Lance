import React from 'react';
import { SERVICES } from '../data/mockData';
import { Code2, Layers, ShoppingBag, Zap, Check, ArrowRight } from 'lucide-react';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
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
    <section id="services" className="py-24 relative bg-dark-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold tracking-wider uppercase text-brand-400 mb-2">
            What We Do
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Specialized Web Engineering Services
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Every business has unique technical demands. From high-conversion marketing sites to complex full-stack SaaS architectures and e-commerce platforms, I engineer solutions built to perform and scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className={`glass-panel glass-panel-hover p-8 rounded-2xl relative flex flex-col justify-between ${
                service.popular ? 'border-brand-500/40 ring-1 ring-brand-500/20' : ''
              }`}
            >
              {service.popular && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-brand-500/20 border border-brand-400/40 rounded-full text-brand-300 text-xs font-semibold">
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
                <h3 className="text-2xl font-bold text-white mb-3">
                  {service.title}
                </h3>
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
                  <span className="text-xl font-bold text-white">{service.startingPrice}</span>
                </div>
                <button
                  onClick={() => onSelectService(service.title)}
                  className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-white/10 hover:bg-brand-600 transition-colors flex items-center gap-1.5 group"
                >
                  <span>Book Service</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
