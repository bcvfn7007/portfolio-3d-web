import React, { useState, useEffect } from 'react';
import { Flame, X } from 'lucide-react';

const mockLeads = [
  { city: 'Ташкент', service: 'Лендинг для языковой школы', time: '2 мин назад' },
  { city: 'Самарканд', service: 'Telegram-бот с Базой Данных', time: '5 мин назад' },
  { city: 'Джизак', service: 'Сайт завода SARUNO', time: '8 мин назад' },
  { city: 'Ташкент', service: 'Telegram Mini App (TMA)', time: '12 мин назад' },
  { city: 'Наманган', service: 'Комплект «Сайт + Бот» $30', time: '15 мин назад' }
];

export default function LiveLeadsTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % mockLeads.length);
        setVisible(true);
      }, 500);
    }, 12000);

    return () => clearInterval(interval);
  }, [dismissed]);

  if (dismissed) return null;

  const currentLead = mockLeads[currentIndex];

  return (
    <div
      className={`fixed bottom-6 left-6 z-40 max-w-xs transition-all duration-500 transform ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
      }`}
    >
      <div className="glass-card p-3.5 pr-8 rounded-2xl border-pink-500/30 bg-slate-950/80 shadow-2xl backdrop-blur-xl relative flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-md">
          <Flame className="w-5 h-5 text-amber-300 animate-pulse" />
        </div>

        <div className="flex flex-col text-xs">
          <span className="font-bold text-white font-syne line-clamp-1">
            🔥 Новая заявка: {currentLead.service}
          </span>
          <span className="text-[11px] text-slate-400 font-mono mt-0.5">
            📍 {currentLead.city} • {currentLead.time}
          </span>
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="absolute top-2 right-2 text-slate-500 hover:text-slate-300 transition-colors p-1"
          title="Закрыть"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
