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
            Напишите мне напрямую или заполните форму ниже — отвечу на все вопросы и помогу с ТЗ.
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
                Я лично отвечу на все вопросы по разработке сайтов и ботов.
              </p>

              <div className="space-y-3 pt-2">
                {/* Telegram Magnetic Button */}
                <a
                  href="https://t.me"
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
                      <span className="text-xs opacity-80 font-mono">Мессенджер:</span>
                      <span className="text-sm font-bold">Написать в Telegram</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </a>

                {/* Email Direct Button */}
                <a
                  href="mailto:contact@developer.me"
                  className="w-full p-4 rounded-2xl glass-card border-white/10 hover:border-pink-500/40 text-white font-medium text-sm transition-all flex items-center justify-between group"
                  data-cursor="EMAIL"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-xs opacity-60 font-mono">Электронная почта:</span>
                      <span className="text-sm font-mono text-slate-200">Отправить письмо (Email)</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>

            {/* Honest Availability Box (Removed arbitrary '2' projects limit) */}
            <div className="glass-card p-6 border-emerald-500/30 bg-emerald-500/5 flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <p className="text-xs text-emerald-300 font-medium">
                Открыт к новым проектам. Быстрый отклик, обсуждение задач и согласование ТЗ в день обращения.
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
                    Сообщение отправлено!
                  </h4>
                  <p className="text-slate-300 text-sm max-w-md">
                    Спасибо за обращение. Я получил ваше сообщение и отвечу вам в ближайшее время.
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
                        placeholder="Имя"
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
                        placeholder="@username или ваш контакт"
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
                    className="magnetic-btn w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-pink-600 text-white font-bold text-base shadow-lg shadow-pink-500/30 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 group cursor-pointer"
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
