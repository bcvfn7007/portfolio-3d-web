import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { translations } from '../utils/translations';

export default function FaqSection({ currentLang }) {
  const t = translations[currentLang]?.faq || translations.RU.faq;
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      <div className="bg-orb bg-orb-3" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border-purple-500/30 text-purple-400 text-xs font-mono tracking-widest uppercase mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
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

        {/* Interactive Accordion Items */}
        <div className="space-y-4">
          {t.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`glass-card transition-all duration-300 overflow-hidden border ${
                  isOpen ? 'border-pink-500/40 bg-white/5 shadow-xl shadow-pink-500/10' : 'border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="text-base sm:text-lg font-bold font-syne text-white">
                    {item.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-pink-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-pink-500/20 text-pink-300' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-0 text-slate-300 text-sm sm:text-base font-light leading-relaxed border-t border-white/5 mt-2">
                    <p className="pt-4">{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
