import React from 'react';
import { Send } from 'lucide-react';

export default function FloatingChatWidget() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Online badge tooltip */}
      <div className="hidden sm:flex items-center gap-2 glass-card px-3.5 py-1.5 rounded-full border-emerald-500/30 text-emerald-400 text-xs font-mono shadow-lg backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
        <span>Онлайн 24/7</span>
      </div>

      {/* Floating Telegram Action Button */}
      <a
        href="https://t.me/o_o_developer"
        target="_blank"
        rel="noreferrer"
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-pink-600 text-white font-bold text-xs sm:text-sm shadow-2xl shadow-pink-500/40 hover:scale-110 active:scale-95 transition-all duration-300 border border-white/20"
        title="Написать разработчику в Telegram"
        data-cursor="CHAT"
      >
        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
          <Send className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 transition-transform" />
        </div>
        <span className="font-syne hidden sm:inline">Задать вопрос</span>
      </a>
    </div>
  );
}
