import React from 'react';
import { Compass, Palette, Terminal, Rocket, HeartHandshake } from 'lucide-react';

export const Process: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Discovery & Scope Alignment',
      desc: 'We clarify your business goals, target audience, technical specifications, and key performance indicators (KPIs) to blueprint the exact solution.',
      icon: <Compass className="w-6 h-6 text-brand-400" />
    },
    {
      num: '02',
      title: 'Bespoke UI/UX Wireframing',
      desc: 'Interactive Figma design mockups focused on clean conversions, mobile responsiveness, and intuitive navigation before touching a line of code.',
      icon: <Palette className="w-6 h-6 text-indigo-400" />
    },
    {
      num: '03',
      title: 'Clean Modular Development',
      desc: 'Engineered with React, TypeScript, and modern APIs. You get a private live staging URL with weekly progress updates to preview real-time builds.',
      icon: <Terminal className="w-6 h-6 text-emerald-400" />
    },
    {
      num: '04',
      title: 'Speed, SEO & QA Polish',
      desc: 'Rigorous cross-device testing, Core Web Vitals optimization, accessibility verification, and schema tags to ensure maximum search visibility.',
      icon: <Rocket className="w-6 h-6 text-amber-400" />
    },
    {
      num: '05',
      title: 'Launch & 30-Day Warranty',
      desc: 'Seamless domain DNS cutover, automated SSL setup, comprehensive video handoff walkthrough, and 30 days of complimentary support.',
      icon: <HeartHandshake className="w-6 h-6 text-rose-400" />
    }
  ];

  return (
    <section id="process" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold tracking-wider uppercase text-brand-400 mb-2">
            Predictable & Transparent
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            How We Bring Your Vision To Life
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            No messy handoffs, ghosting, or missed deadlines. A proven 5-stage engineering pipeline designed for peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 rounded-2xl relative flex flex-col justify-between hover:border-brand-500/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="text-2xl font-black text-slate-700 font-mono">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5">
                <span className="text-[11px] text-brand-400 font-medium">Stage {step.num} Verified</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
