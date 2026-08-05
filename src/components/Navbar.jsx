import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { translations } from '../utils/translations';

export default function Navbar({ onOpenContact, currentLang, onChangeLang }) {
  const [scrolled, setScrolled] = useState(false);
  const t = translations[currentLang]?.nav || translations.RU.nav;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-nav py-3 shadow-xl' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo with Custom 3D Emblem */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('hero');
          }}
          className="inline-flex items-center gap-3 group"
          data-cursor="HOME"
        >
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-pink-500 to-purple-600 p-0.5 shadow-lg shadow-pink-500/25 group-hover:scale-105 transition-transform shrink-0 border border-white/20">
            <img src="/assets/logo.png" alt="Dev Studio Logo" className="w-full h-full object-cover rounded-[10px]" />
          </div>
          <div className="flex flex-col">
            <span className="font-syne font-bold text-lg text-white tracking-wide flex items-center gap-1 leading-none">
              Dev<span className="text-pink-500">.Studio</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase mt-1">
              Web & Telegram
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 glass-card px-7 py-2.5 rounded-full border-white/10">
          <button
            onClick={() => scrollToSection('about')}
            className="text-sm font-medium text-slate-300 hover:text-pink-400 transition-colors"
            data-cursor="GO"
          >
            {t.about}
          </button>
          <button
            onClick={() => scrollToSection('portfolio')}
            className="text-sm font-medium text-slate-300 hover:text-pink-400 transition-colors"
            data-cursor="GO"
          >
            {t.portfolio}
          </button>
          <button
            onClick={() => scrollToSection('testimonials')}
            className="text-sm font-medium text-slate-300 hover:text-pink-400 transition-colors"
            data-cursor="GO"
          >
            {t.testimonials || 'Отзывы'}
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className="text-sm font-medium text-slate-300 hover:text-pink-400 transition-colors"
            data-cursor="GO"
          >
            {t.services}
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="text-sm font-medium text-slate-300 hover:text-pink-400 transition-colors"
            data-cursor="GO"
          >
            {t.faq || 'FAQ'}
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-sm font-medium text-slate-300 hover:text-pink-400 transition-colors"
            data-cursor="GO"
          >
            {t.contact}
          </button>
        </nav>

        {/* Right Action: Language Switcher + Status Badge + Contact Button */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Interactive Language Switcher Pill (RU | UZ | EN) */}
          <div className="flex items-center glass-card p-1 rounded-xl border-white/15 text-xs font-mono">
            {['RU', 'UZ', 'EN'].map((lang) => (
              <button
                key={lang}
                onClick={() => onChangeLang(lang)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  currentLang === lang
                    ? 'bg-pink-500 text-white shadow-md shadow-pink-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Status Badge */}
          <div className="hidden lg:inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <span>24/7</span>
          </div>

          {/* Magnetic CTA Button */}
          <button
            onClick={onOpenContact}
            className="magnetic-btn inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-pink-600 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-105 active:scale-95 transition-all overflow-hidden"
            data-cursor="WRITE"
          >
            <span>{t.write}</span>
            <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
          </button>
        </div>
      </div>
    </header>
  );
}
