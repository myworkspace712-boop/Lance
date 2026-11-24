import React from 'react';

export const TechStack: React.FC = () => {
  const technologies = [
    { name: 'React', category: 'Frontend' },
    { name: 'TypeScript', category: 'Languages' },
    { name: 'Next.js', category: 'Frameworks' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Tailwind CSS', category: 'Styling' },
    { name: 'Express', category: 'API' },
    { name: 'PostgreSQL', category: 'Databases' },
    { name: 'MongoDB', category: 'Databases' },
    { name: 'Stripe', category: 'Payments' },
    { name: 'Vercel / AWS', category: 'DevOps' },
  ];

  return (
    <section className="py-16 border-y border-white/5 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-500 mb-8">
          Built With Modern, Production-Tested Technologies
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {technologies.map((tech, idx) => (
            <div
              key={idx}
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm font-semibold flex items-center gap-2 hover:border-brand-500/40 hover:text-white transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-brand-400"></span>
              <span>{tech.name}</span>
              <span className="text-[10px] text-slate-500 font-mono">({tech.category})</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
