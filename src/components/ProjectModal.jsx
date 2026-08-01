import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle, Shield, Zap, Sparkles } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Glass Backdrop Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-fadeIn"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl max-h-[90vh] glass-card overflow-y-auto border-pink-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl z-10 space-y-8 animate-scaleUp">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-colors"
          data-cursor="CLOSE"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-mono">
            <span>{project.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-syne text-white">
            {project.title}
          </h2>
          <p className="text-slate-300 text-base font-light max-w-2xl">
            {project.description}
          </p>
        </div>

        {/* High-res Screenshot */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-slate-900">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-auto object-cover max-h-[400px]"
          />
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Deliverables */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold font-syne text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span>Что было сделано:</span>
            </h4>
            <div className="space-y-2.5">
              {project.details.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-slate-300 text-xs sm:text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Specs & Demo CTA */}
          <div className="space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h4 className="text-lg font-bold font-syne text-white">Использованный стек:</h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-slate-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10">
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-sm shadow-lg shadow-pink-500/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                <span>Перейти к интерактивному демо</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl glass-card text-slate-300 font-medium text-xs hover:text-white transition-colors"
              >
                Закрыть окно
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
