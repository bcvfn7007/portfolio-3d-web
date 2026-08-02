import React, { useState, useEffect } from 'react';
import { Send, MessageSquare, CheckCircle2, Copy, ExternalLink, Briefcase, Instagram, AlertCircle, Bot } from 'lucide-react';
import confetti from 'canvas-confetti';
import { translations } from '../utils/translations';

export default function ContactSection({ prefilledSummary, currentLang }) {
  const t = translations[currentLang]?.contact || translations.RU.contact;

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const BOT_TOKEN = '7790495377:AAEAQCqq3Qr9hOQHXqPRFyc2zNNsCa4SltQ';
  const ADMIN_CHAT_ID = '8726413176';

  useEffect(() => {
    if (prefilledSummary) {
      setFormData((prev) => ({
        ...prev,
        message: prefilledSummary
      }));
    }
  }, [prefilledSummary]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.contact) return;

    setIsSubmitting(true);
    setErrorMsg('');

    // Format rich HTML Telegram notification for developer
    const telegramMessage = `🚀 <b>НОВАЯ ЗАЯВКА С ПОРТФОЛИО-САЙТА!</b>\n\n` +
      `👤 <b>Имя клиента:</b> ${formData.name}\n` +
      `📞 <b>Контакт:</b> ${formData.contact}\n` +
      `🌐 <b>Язык:</b> ${currentLang || 'RU'}\n` +
      `📝 <b>Детали проекта / Расчёт:</b>\n${formData.message || 'Без комментария'}`;

    try {
      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: ADMIN_CHAT_ID,
          text: telegramMessage,
          parse_mode: 'HTML'
        })
      });

      const result = await response.json();

      if (result.ok) {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#ff2a85', '#9d4edd', '#00f5d4']
        });

        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({ name: '', contact: '', message: '' });
        }, 7000);
      } else {
        console.error('Telegram API error:', result);
        setErrorMsg('Ошибка отправки. Напишите напрямую в Telegram.');
      }
    } catch (err) {
      console.error('Error sending lead to Telegram:', err);
      setErrorMsg('Ошибка сети. Напишите напрямую в Telegram.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="bg-orb bg-orb-1" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border-pink-500/30 text-pink-400 text-xs font-mono tracking-widest uppercase mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            {t.title1}
            <span className="gradient-text-pink">{t.titleHighlight}</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-3 font-light">
            {t.sub}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Magnetic Contact Buttons */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="glass-card p-8 space-y-6">
              <h3 className="text-2xl font-bold text-white">
                {t.directTitle}
              </h3>
              <p className="text-slate-300 text-sm font-light leading-relaxed">
                {t.directSub}
              </p>

              <div className="space-y-3 pt-2">
                {/* Telegram Personal Direct Magnetic Button */}
                <a
                  href="https://t.me/o_o_developer"
                  target="_blank"
                  rel="noreferrer"
                  className="magnetic-btn w-full p-4 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-pink-600 text-white font-bold text-sm shadow-lg shadow-pink-500/30 hover:scale-[1.02] transition-all flex items-center justify-between group cursor-pointer"
                  data-cursor="TG"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                      <Send className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-xs opacity-80 font-mono">Telegram Username:</span>
                      <span className="text-sm font-bold">@o_o_developer</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </a>

                {/* Telegram Order Bot Button */}
                <a
                  href="https://t.me/zakaz_priyom_bot"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full p-4 rounded-2xl glass-card border-pink-500/30 hover:border-pink-500/60 text-white font-medium text-sm transition-all flex items-center justify-between group cursor-pointer bg-pink-500/10"
                  data-cursor="BOT"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-xs opacity-80 font-mono text-pink-300">Order Bot:</span>
                      <span className="text-sm font-bold text-white">@zakaz_priyom_bot</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-pink-400 group-hover:translate-x-0.5 transition-transform" />
                </a>

                {/* Instagram Direct Link */}
                <a
                  href="https://instagram.com/dev__man23/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full p-4 rounded-2xl glass-card border-white/10 hover:border-purple-500/40 text-white font-medium text-sm transition-all flex items-center justify-between group cursor-pointer"
                  data-cursor="INSTA"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-xs opacity-60 font-mono">Instagram Direct:</span>
                      <span className="text-sm font-mono text-slate-200">@dev__man23</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                </a>

                {/* Kwork Profile Direct Link */}
                <a
                  href="https://kwork.ru/user/bcvfn23"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full p-4 rounded-2xl glass-card border-white/10 hover:border-purple-500/40 text-white font-medium text-sm transition-all flex items-center justify-between group cursor-pointer"
                  data-cursor="KWORK"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-xs opacity-60 font-mono">Kwork Profile:</span>
                      <span className="text-sm font-mono text-slate-200">kwork.ru/user/bcvfn23</span>
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
                Available for new projects. Fast response and project estimation.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Web Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-8 sm:p-10 border-white/15 relative overflow-hidden">
              {submitted ? (
                <div className="py-12 flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-white">
                    Заявка успешно отправлена!
                  </h4>
                  <p className="text-slate-300 text-sm max-w-md">
                    Спасибо! Сообщение отправлено в Telegram. Ответ поступит вам в ближайшее время.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-2xl font-bold text-white">
                    {t.btnSend}
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-mono uppercase text-slate-400 block mb-1.5">
                        {t.nameLabel}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={t.namePlaceholder || "Введите ваше имя"}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl glass-card bg-black/50 border-white/15 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-pink-500 transition-colors normal-case font-sans tracking-normal"
                        style={{ textTransform: 'none', fontFamily: 'var(--font-jakarta)' }}
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-slate-400 block mb-1.5">
                        {t.contactLabel}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={t.contactPlaceholder || "@username / телефон"}
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl glass-card bg-black/50 border-white/15 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-pink-500 transition-colors normal-case font-sans tracking-normal"
                        style={{ textTransform: 'none', fontFamily: 'var(--font-jakarta)' }}
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-slate-400 block mb-1.5">
                        {t.descLabel}
                      </label>
                      <textarea
                        rows={4}
                        placeholder={t.descPlaceholder || "Описание проекта..."}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl glass-card bg-black/50 border-white/15 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-pink-500 transition-colors resize-none normal-case font-sans tracking-normal"
                        style={{ textTransform: 'none', fontFamily: 'var(--font-jakarta)' }}
                      />
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="flex items-center gap-2 text-rose-400 text-xs bg-rose-500/10 p-3 rounded-xl border border-rose-500/20">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="magnetic-btn w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-pink-600 text-white font-bold text-base shadow-lg shadow-pink-500/30 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
                    data-cursor="SEND"
                  >
                    <span>{isSubmitting ? t.submitting : t.btnSend}</span>
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
