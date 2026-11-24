import React from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 relative bg-dark-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold tracking-wider uppercase text-brand-400 mb-2">
            Social Proof & Trust
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Trusted by Founders & Product Leaders
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            See what our previous partners have to say about working with us on critical web applications and redesigns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="glass-panel p-8 rounded-2xl relative flex flex-col justify-between hover:border-brand-500/30 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-600" />
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
                  "{t.content}"
                </p>
              </div>

              <div>
                <div className="text-xs text-brand-400 font-semibold mb-3">
                  Project: {t.projectDelivered}
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <img
                    src={t.avatar}
                    alt={t.clientName}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-500/30"
                  />
                  <div>
                    <div className="text-sm font-bold text-white">{t.clientName}</div>
                    <div className="text-xs text-slate-400">
                      {t.clientRole}, <span className="text-slate-300">{t.company}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
