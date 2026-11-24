import React from 'react';
import { PROJECTS } from '../data/mockData';
import { ExternalLink, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';

interface WorkPageProps {
  onSelectProjectInquiry: (projectName: string) => void;
  onOpenEstimator?: () => void;
}

export const WorkPage: React.FC<WorkPageProps> = ({
  onSelectProjectInquiry,
  onOpenEstimator,
}) => {
  return (
    <div className="pt-28 pb-24 relative mesh-grid min-h-screen">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Proven Client Results</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
            Featured Work & Case Studies
          </h1>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Explore my curated showcase of custom web applications and scalable digital platforms engineered for businesses.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
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
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">
                    {project.title}
                  </h2>
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

        {/* Bottom CTA Banner */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-brand-500/30 text-center relative overflow-hidden shadow-glow">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Ready to launch your next project?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base mb-8">
              Let's create a high-performance web experience tailored specifically to your business goals.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onSelectProjectInquiry('General Case Studies Inquiry')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-white font-bold bg-brand-600 hover:bg-brand-500 shadow-lg shadow-brand-600/30 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Start Free Proposal</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              {onOpenEstimator && (
                <button
                  onClick={onOpenEstimator}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-semibold transition-all"
                >
                  Estimate Price & Timeline
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
