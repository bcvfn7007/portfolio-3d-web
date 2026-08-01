import React, { useState } from 'react';
import { User, CheckCircle } from 'lucide-react';
import { translations } from '../utils/translations';

export default function AboutSection({ currentLang }) {
  const [activeTab, setActiveTab] = useState('whoami');
  const t = translations[currentLang]?.about || translations.RU.about;

  const terminalData = {
    whoami: `// Developer Profile
const developer = {
  bio: "${t.subtitle}",
  telegram: "@o_o_developer",
  status: "Available for new projects"
};`,
    tech_stack: `// Technology Stack Breakdown
const stack = {
  frontend: ["React.js", "Vite", "Three.js (WebGL)", "GSAP Animations", "Lenis Smooth Scroll", "TailwindCSS"],
  backend: ["Python (aiogram / pyrogram)", "PostgreSQL", "REST APIs"],
  tools: ["Telegram Mini Apps API", "Docker", "Git", "Figma Design"]
};`,
    philosophy: `// Core Principles
const approach = [
  "100% honesty on timelines and scope",
  "Clean architecture without junk code",
  "Fully responsive across all devices",
  "Support and free warranty after delivery"
];`
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border-purple-500/30 text-purple-400 text-xs font-mono tracking-widest uppercase mb-3">
            <User className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-syne text-white leading-tight">
            {t.title1}
            <span className="gradient-text-pink">{t.titleHighlight}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Telegram Profile Avatar & Bio */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-80 transition duration-500" />
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl overflow-hidden glass-card border-white/20 shadow-2xl">
                <img
                  src="/assets/avatar.png"
                  alt="Telegram Developer Profile Avatar"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold font-syne text-white leading-snug">
                {t.subtitle}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                {t.desc}
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-2">
                <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-300 glass-card px-3.5 py-2 border-white/10">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t.badge1}</span>
                </div>
                <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-300 glass-card px-3.5 py-2 border-white/10">
                  <CheckCircle className="w-4 h-4 text-pink-400 shrink-0" />
                  <span>{t.badge2}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Developer Terminal */}
          <div className="lg:col-span-7">
            <div className="glass-card overflow-hidden border-white/15 shadow-2xl">
              {/* Terminal Window Top Header Bar */}
              <div className="bg-black/60 px-5 py-3.5 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-slate-400 ml-2">developer_spec.ts</span>
                </div>

                {/* Tab Switchers */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('whoami')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                      activeTab === 'whoami'
                        ? 'bg-pink-500/25 text-pink-300 border border-pink-500/40 font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {t.terminalTab1}
                  </button>
                  <button
                    onClick={() => setActiveTab('tech_stack')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                      activeTab === 'tech_stack'
                        ? 'bg-purple-500/25 text-purple-300 border border-purple-500/40 font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {t.terminalTab2}
                  </button>
                  <button
                    onClick={() => setActiveTab('philosophy')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                      activeTab === 'philosophy'
                        ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {t.terminalTab3}
                  </button>
                </div>
              </div>

              {/* Terminal Content Box */}
              <div className="p-6 font-mono text-xs sm:text-sm bg-black/70 min-h-[300px] overflow-x-auto text-emerald-400 leading-relaxed">
                <pre>{terminalData[activeTab]}</pre>
                <div className="mt-4 flex items-center gap-2 text-slate-400">
                  <span className="text-pink-500 font-bold">&gt;</span>
                  <span className="w-2 h-4 bg-pink-500 animate-pulse" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
