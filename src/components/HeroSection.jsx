import React from 'react';
import ThreeHeroCanvas from './ThreeHeroCanvas';
import { ArrowDownRight, Send, Sparkles, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';

export default function HeroSection({ onOpenContact }) {
  const scrollToPortfolio = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen pt-36 pb-20 flex items-center overflow-hidden">
      {/* Ambient background glow floating orbs */}
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-7">
            
            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-card border-pink-500/30 text-pink-400 text-xs sm:text-sm font-medium shadow-lg shadow-pink-500/10">
              <Sparkles className="w-4 h-4 text-pink-400 animate-pulse shrink-0" />
              <span>Full-Stack разработчик & Telegram Bot Specialist</span>
            </div>

            {/* Main 3D Styled Headline */}
            <h1 className="hero-title-3d text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white">
              Создаю <span className="gradient-text-pink">сайты</span> и{' '}
              <span className="gradient-text-cyan">Telegram-ботов</span> для бизнеса
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
              Превращаю сложную бизнес-логику в простые, быстродействующие веб-сервисы, 
              высококонверсионные лендинги и автоматизированных ботов с современным 
              дизайном и 3D-графикой.
            </p>

            {/* Honest Operational Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl pt-2">
              <div className="glass-card p-4 flex items-center gap-3.5 border-emerald-500/25">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">Открыт к проектам</span>
                  <span className="text-[11px] text-slate-400 mt-0.5">Быстрый старт</span>
                </div>
              </div>

              <div className="glass-card p-4 flex items-center gap-3.5 border-purple-500/25">
                <Clock className="w-6 h-6 text-purple-400 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">На связи 24/7</span>
                  <span className="text-[11px] text-slate-400 mt-0.5">Быстрый отклик</span>
                </div>
              </div>

              <div className="glass-card p-4 flex items-center gap-3.5 border-pink-500/25">
                <ShieldCheck className="w-6 h-6 text-pink-400 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">Гарантия качества</span>
                  <span className="text-[11px] text-slate-400 mt-0.5">Чистый код</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onOpenContact}
                className="magnetic-btn inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-pink-600 text-white font-bold text-sm sm:text-base shadow-xl shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-105 active:scale-95 transition-all group"
                data-cursor="WRITE"
              >
                <span>Написать в Telegram</span>
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform shrink-0" />
              </button>

              <button
                onClick={scrollToPortfolio}
                className="magnetic-btn inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl glass-card text-white font-semibold text-sm sm:text-base border-white/15 hover:border-pink-500/50 hover:bg-white/5 active:scale-95 transition-all group"
                data-cursor="VIEW"
              >
                <span>Смотреть работы</span>
                <ArrowDownRight className="w-5 h-5 text-pink-400 group-hover:translate-y-0.5 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>
            </div>

            {/* Floating Tech Stack Pills */}
            <div className="flex flex-wrap items-center gap-2.5 pt-4">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest mr-2">Стек:</span>
              {['React', 'Three.js', 'GSAP', 'Node.js', 'Python', 'Telegram Bot API'].map((tech) => (
                <span
                  key={tech}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-slate-300 hover:border-pink-500/40 hover:text-white transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>

          </div>

          {/* Right 3D Interactive Torus Canvas */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-purple-600/20 rounded-full blur-3xl -z-10" />
              <ThreeHeroCanvas />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
