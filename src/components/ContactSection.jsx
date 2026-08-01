import React, { useState, useEffect } from 'react';
import { Send, Mail, MessageSquare, Instagram, CheckCircle2, Sparkles, Copy, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactSection({ prefilledSummary }) {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (prefilledSummary) {
      setFormData((prev) => ({
        ...prev,
        message: prefilledSummary
      }));
    }
  }, [prefilledSummary]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.contact) return;

    // Trigger celebratory confetti animation
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff2a85', '#9d4edd', '#00f5d4']
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', contact: '', message: '' });
    }, 6000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('alex.dev.pro@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="bg-orb bg-orb-1" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border-pink-500/30 text-pink-400 text-xs font-mono tracking-widest uppercase mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Связаться со мной</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-syne text-white">
            Начнём ваш <span className="gradient-text-pink">проект</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-3 font-light">
            Напишите мне напрямую в мессенджер или заполните форму — отвечу в течение 15 минут.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Magnetic Contact Buttons */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="glass-card p-8 space-y-6">
              <h3 className="text-2xl font-bold font-syne text-white">
                Прямая связь
              </h3>
              <p className="text-slate-300 text-sm font-light leading-relaxed">
                Самый быстрый способ обсудить задачу — написать в Telegram. 
                Я лично отвечаю на все обращения без менеджеров.
              </p>

              <div className="space-y-3 pt-2">
                {/* Telegram Magnetic Button */}
                <a
                  href="https://t.me/dev_pro"
                  target="_blank"
                  rel="noreferrer"
                  className="magnetic-btn w-full p-4 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-pink-600 text-white font-bold text-sm shadow-lg shadow-pink-500/30 hover:scale-[1.02] transition-all flex items-center justify-between group"
                  data-cursor="TG"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                      <Send className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-xs opacity-80 font-mono">Telegram:</span>
                      <span className="text-sm font-bold">@dev_pro</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </a>

                {/* Email Copy Card */}
                <button
                  onClick={copyEmail}
                  className="w-full p-4 rounded-2xl glass-card border-white/10 hover:border-pink-500/40 text-white font-medium text-sm transition-all flex items-center justify-between group"
                  data-cursor="COPY"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-xs opacity-60 font-mono">Email:</span>
                      <span className="text-sm font-mono text-slate-200">alex.dev.pro@gmail.com</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-pink-400 flex items-center gap-1">
                    {copied ? (
                      <span className="text-emerald-400 font-bold">Скопировано!</span>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Копия</span>
                      </>
                    )}
                  </span>
                </button>

                {/* Instagram Direct */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full p-4 rounded-2xl glass-card border-white/10 hover:border-pink-500/40 text-white font-medium text-sm transition-all flex items-center justify-between group"
                  data-cursor="INSTA"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-xs opacity-60 font-mono">Instagram:</span>
                      <span className="text-sm font-mono text-slate-200">@dev_portfolio</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>

            {/* Availability Box */}
            <div className="glass-card p-6 border-emerald-500/30 bg-emerald-500/5 flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <p className="text-xs text-emerald-300 font-medium">
                Сейчас открыт к приёму 2 новых проектов. Средний срок старта — 1 рабочий день после согласования ТЗ.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-8 sm:p-10 border-white/15 relative overflow-hidden">
              {submitted ? (
                <div className="py-12 flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold font-syne text-white">
                    Сообщение успешно отправлено!
                  </h4>
                  <p className="text-slate-300 text-sm max-w-md">
                    Спасибо за обращение. Я уже получил ваше сообщение и свяжусь с вами в ближайшие 15 минут.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-2xl font-bold font-syne text-white">
                    Написать сообщение
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-mono uppercase text-slate-400 block mb-1.5">
                        Ваше имя *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Алексей"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl glass-card bg-black/40 border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-pink-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-slate-400 block mb-1.5">
                        Telegram / Телефон / Email *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="@username или +7 (999) 000-00-00"
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl glass-card bg-black/40 border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-pink-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-slate-400 block mb-1.5">
                        Описание проекта или задача
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Расскажите о вашей задаче (тип сайта, бот, пожелания)..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl glass-card bg-black/40 border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-pink-500 transition-colors resize-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="magnetic-btn w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-pink-600 text-white font-bold text-base shadow-lg shadow-pink-500/30 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 group"
                    data-cursor="SEND"
                  >
                    <span>Отправить сообщение</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
