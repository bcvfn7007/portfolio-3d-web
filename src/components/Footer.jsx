import React, { useState, useEffect } from 'react';
import { ArrowUp, Clock, Code2, Heart } from 'lucide-react';

export default function Footer() {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Tashkent',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setTimeStr(now.toLocaleTimeString('ru-RU', options));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 relative border-t border-white/10 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold">
            <Code2 className="w-4 h-4" />
          </div>
          <span className="font-syne font-bold text-sm text-white">
            Dev<span className="text-pink-500">.Studio</span> © {new Date().getFullYear()}
          </span>
        </div>

        {/* Center Live Tashkent Time */}
        <div className="flex items-center gap-2 glass-card px-4 py-1.5 border-white/10 text-xs font-mono text-slate-300">
          <Clock className="w-3.5 h-3.5 text-pink-400" />
          <span>Ташкент (UTC+5): {timeStr || '14:10:00'}</span>
        </div>

        {/* Right Scroll to Top */}
        <button
          onClick={scrollToTop}
          className="magnetic-btn px-4 py-2 rounded-xl glass-card text-xs font-mono text-slate-300 hover:text-white hover:border-pink-500/40 transition-colors flex items-center gap-2"
          data-cursor="TOP"
        >
          <span>Наверх</span>
          <ArrowUp className="w-3.5 h-3.5 text-pink-400" />
        </button>

      </div>
    </footer>
  );
}
