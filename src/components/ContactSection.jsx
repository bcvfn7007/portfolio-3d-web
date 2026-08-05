import React, { useState, useEffect } from 'react';
import { Send, Phone, MessageSquare, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import { translations } from '../utils/translations';

export default function ContactSection({ prefilledSummary, currentLang }) {
  const t = translations[currentLang]?.contact || translations.RU.contact;

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    description: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    contact: ''
  });

  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  });

  useEffect(() => {
    if (prefilledSummary) {
      setFormData((prev) => ({
        ...prev,
        description: prefilledSummary
      }));
    }
  }, [prefilledSummary]);

  // Phone & Telegram username validator
  const validateContact = (value) => {
    if (!value || !value.trim()) {
      return 'Укажите контакт для связи';
    }
    const clean = value.trim().replace(/[\s\-\(\)]/g, '');
    
    // Telegram username format: @username (5+ chars)
    if (clean.startsWith('@')) {
      if (/^@[a-zA-Z0-9_]{5,32}$/.test(clean)) {
        return '';
      }
      return 'Некорректный Telegram @username (минимум 5 символов)';
    }

    // Phone number format: +998901234567 or 901234567 (7 to 15 digits)
    if (/^\+?[0-9]{7,15}$/.test(clean)) {
      return '';
    }

    return 'Введите корректный номер телефона (напр. +998901234567) или Telegram @username';
  };

  const validateName = (value) => {
    if (!value || !value.trim()) {
      return 'Введите ваше имя';
    }
    if (value.trim().length < 2) {
      return 'Имя должно содержать не менее 2 символов';
    }
    // Check for letters (Latin / Cyrillic)
    if (!/^[a-zA-Zа-яА-ЯёЁ\s\-\.\']{2,40}$/.test(value.trim())) {
      return 'Имя должно содержать настоящие буквы';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Live error clearing
    if (name === 'name' && errors.name) {
      setErrors((prev) => ({ ...prev, name: validateName(value) }));
    }
    if (name === 'contact' && errors.contact) {
      setErrors((prev) => ({ ...prev, contact: validateContact(value) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameErr = validateName(formData.name);
    const contactErr = validateContact(formData.contact);

    if (nameErr || contactErr) {
      setErrors({ name: nameErr, contact: contactErr });
      return;
    }

    setErrors({ name: '', contact: '' });
    setStatus({ submitting: true, submitted: false, error: null });

    try {
      // Send Lead Payload directly to Telegram Bot API
      const BOT_TOKEN = '7790495377:AAEAQCqq3Qr9hOQHXqPRFyc2zNNsCa4SltQ';
      const CHAT_ID = '8726413176';

      const leadMessage = 
        `🚀 <b>НОВАЯ ЗАЯВКА С ПОРТФОЛИО-САЙТА!</b>\n\n` +
        `👤 <b>Имя клиента:</b> ${formData.name.trim()}\n` +
        `📞 <b>Контакт:</b> <code>${formData.contact.trim()}</code>\n` +
        `🌐 <b>Язык:</b> ${currentLang}\n` +
        `📝 <b>Детали проекта / Расчёт:</b>\n${formData.description.trim() || 'Без комментария'}`;

      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: leadMessage,
          parse_mode: 'HTML'
        })
      });

      if (response.ok) {
        setStatus({ submitting: false, submitted: true, error: null });
        setFormData({ name: '', contact: '', description: '' });
      } else {
        throw new Error('Не удалось отправить заявку.');
      }
    } catch (err) {
      console.error(err);
      setStatus({
        submitting: false,
        submitted: false,
        error: 'Произошла ошибка при отправке. Напишите напрямую в Telegram @o_o_developer'
      });
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="bg-orb bg-orb-1" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border-purple-500/30 text-purple-400 text-xs font-mono tracking-widest uppercase mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Links & Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card p-8 border-pink-500/20 relative overflow-hidden space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
                <Sparkles className="w-6 h-6" />
              </div>
              
              <div>
                <h3 className="text-xl font-bold font-syne text-white">
                  {t.directTitle}
                </h3>
                <p className="text-slate-300 text-sm mt-2 font-light leading-relaxed">
                  {t.directSub}
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <a
                  href="https://t.me/o_o_developer"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl glass-card border-white/10 hover:border-pink-500/40 text-slate-200 hover:text-white transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                    <Send className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-mono block">Telegram</span>
                    <span className="text-sm font-bold font-syne">@o_o_developer</span>
                  </div>
                </a>

                <a
                  href="https://t.me/zakaz_priyom_bot"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl glass-card border-white/10 hover:border-purple-500/40 text-slate-200 hover:text-white transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-mono block">Telegram Бот Заявок</span>
                    <span className="text-sm font-bold font-syne">@zakaz_priyom_bot</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form with Strict Validation */}
          <div className="lg:col-span-7">
            <div className="glass-card p-8 sm:p-10 border-white/10 shadow-2xl relative">
              
              {status.submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-syne text-white">
                    Заявка успешно отправлена!
                  </h3>
                  <p className="text-slate-300 text-sm max-w-md mx-auto font-light">
                    Спасибо за обращение! Я получу сообщение в Telegram и свяжусь с вами в течение 15 минут.
                  </p>
                  <button
                    onClick={() => setStatus({ submitting: false, submitted: false, error: null })}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold font-mono transition-colors cursor-pointer"
                  >
                    Отправить еще одну заявку
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                      {t.nameLabel}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t.namePlaceholder}
                      className={`w-full px-4 py-3.5 rounded-xl glass-card text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all font-sans text-base normal-case ${
                        errors.name ? 'border-red-500/80 focus:ring-red-500/50' : 'border-white/10 focus:ring-pink-500/50'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1 font-sans">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Contact Input (Phone or Telegram) */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                      {t.contactLabel}
                    </label>
                    <input
                      type="text"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      placeholder={t.contactPlaceholder}
                      className={`w-full px-4 py-3.5 rounded-xl glass-card text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all font-sans text-base normal-case ${
                        errors.contact ? 'border-red-500/80 focus:ring-red-500/50' : 'border-white/10 focus:ring-pink-500/50'
                      }`}
                    />
                    {errors.contact ? (
                      <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1 font-sans">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.contact}</span>
                      </p>
                    ) : (
                      <p className="text-[11px] text-slate-400 mt-1 font-sans">
                        Пример: +998901234567 или @username
                      </p>
                    )}
                  </div>

                  {/* Description Input */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                      {t.descLabel}
                    </label>
                    <textarea
                      name="description"
                      rows="4"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder={t.descPlaceholder}
                      className="w-full px-4 py-3.5 rounded-xl glass-card border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all font-sans text-base normal-case resize-none"
                    />
                  </div>

                  {/* Error Alert */}
                  {status.error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{status.error}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status.submitting}
                    className="magnetic-btn w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-pink-600 text-white font-bold text-sm shadow-xl shadow-pink-500/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {status.submitting ? (
                      <span>{t.submitting}</span>
                    ) : (
                      <>
                        <span>{t.btnSend}</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
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
