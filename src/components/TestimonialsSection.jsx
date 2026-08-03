import React from 'react';
import { Star, MessageSquareQuote, ExternalLink, CheckCircle } from 'lucide-react';
import { translations } from '../utils/translations';

export default function TestimonialsSection({ currentLang }) {
  const t = translations[currentLang]?.testimonials || translations.RU.testimonials;

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="bg-orb bg-orb-1" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border-purple-500/30 text-purple-400 text-xs font-mono tracking-widest uppercase mb-3">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-syne text-white">
            {t.title1}
            <span className="gradient-text-pink">{t.titleHighlight}</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-3 font-light">
            {t.sub}
          </p>
        </div>

        {/* Testimonials 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.items.map((review, idx) => (
            <div
              key={idx}
              className="glass-card glass-card-hover p-8 relative flex flex-col justify-between border-white/10"
            >
              <div className="space-y-6">
                {/* 5 Star Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <div className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    <CheckCircle className="w-3 h-3" />
                    <span>Verified Project</span>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-slate-200 text-sm leading-relaxed font-light italic">
                  "{review.text}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between mt-6">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white font-syne">{review.name}</span>
                  <span className="text-xs text-pink-400 mt-0.5">{review.role}</span>
                </div>

                <a
                  href={`https://${review.project}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500/40 text-slate-400 hover:text-white transition-colors"
                  title="Посмотреть проект"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
