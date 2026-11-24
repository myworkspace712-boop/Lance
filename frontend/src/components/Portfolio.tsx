import React from 'react';
import { PROJECTS } from '../data/mockData';
import { ExternalLink, TrendingUp } from 'lucide-react';

interface PortfolioProps {
  onSelectProjectInquiry: (projectName: string) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onSelectProjectInquiry }) => {
  return (
    <section id="portfolio" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-brand-400 mb-2">
              Featured Case Studies
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Selected Client Work
            </h2>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="glass-panel rounded-2xl overflow-hidden border border-white/10 hover:border-brand-500/40 transition-all duration-300 group flex flex-col justify-between"
            >
              {/* Image Banner */}
              <div className="relative aspect-video overflow-hidden bg-slate-900">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-80" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-md text-xs font-semibold bg-dark-900/80 backdrop-blur-md text-brand-300 border border-white/10">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Impact Metrics */}
                  <div className="grid grid-cols-3 gap-2 py-4 mb-6 border-y border-white/10 bg-white/[0.02] rounded-xl px-4">
                    {project.metrics.map((m, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-base sm:text-lg font-bold text-white flex items-center justify-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{m.value}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-xs text-slate-400">Want similar results?</span>
                  <button
                    onClick={() => onSelectProjectInquiry(project.title)}
                    className="text-xs font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1 group/btn"
                  >
                    <span>Request Similar Project</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
