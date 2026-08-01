import React, { useState } from 'react';
import { Globe, Bot, Zap, Cpu, Check, Calculator, ArrowRight, Sparkles, DollarSign, Clock } from 'lucide-react';

export default function ServicesSection({ onOpenContactWithSummary }) {
  // Cost Calculator State
  const [projectType, setProjectType] = useState('landing');
  const [selectedExtras, setSelectedExtras] = useState(['mobile', 'seo']);

  const typeOptions = {
    landing: { name: 'Лендинг / Промо-сайт', basePrice: 250, baseDays: 3 },
    webapp: { name: 'Многостраничный сайт / Web App', basePrice: 450, baseDays: 7 },
    tgbot: { name: 'Telegram-бот (продажи/автоматизация)', basePrice: 200, baseDays: 3 },
    tgminiapp: { name: 'Telegram Mini App (TMA)', basePrice: 400, baseDays: 6 }
  };

  const extraOptions = [
    { id: 'mobile', name: 'Полная адаптивность под смартфоны', price: 0, days: 0 },
    { id: 'seo', name: 'Базовое SEO и мета-теги', price: 0, days: 0 },
    { id: 'three3d', name: '3D элементы и Three.js эффекты', price: 100, days: 2 },
    { id: 'admin', name: 'Панель администратора (CMS)', price: 120, days: 3 },
    { id: 'payments', name: 'Подключение онлайн-оплаты (Payme/Click/Stripe)', price: 90, days: 2 },
    { id: 'ai', name: 'Интеграция ИИ (OpenAI / ChatGPT)', price: 110, days: 2 }
  ];

  const toggleExtra = (id) => {
    if (id === 'mobile' || id === 'seo') return; // default included
    if (selectedExtras.includes(id)) {
      setSelectedExtras(selectedExtras.filter((item) => item !== id));
    } else {
      setSelectedExtras([...selectedExtras, id]);
    }
  };

  // Calculate totals
  const currentBase = typeOptions[projectType];
  const extrasTotal = selectedExtras.reduce((sum, extraId) => {
    const extraObj = extraOptions.find((opt) => opt.id === extraId);
    return sum + (extraObj ? extraObj.price : 0);
  }, 0);

  const daysTotal = selectedExtras.reduce((sum, extraId) => {
    const extraObj = extraOptions.find((opt) => opt.id === extraId);
    return sum + (extraObj ? extraObj.days : 0);
  }, currentBase.baseDays);

  const calculatedPrice = currentBase.basePrice + extrasTotal;

  const handleOrderCalculation = () => {
    const extrasNames = selectedExtras
      .map((id) => extraOptions.find((o) => o.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const summary = `Расчёт стоимости: ${currentBase.name}\nДоп. опции: ${extrasNames}\nОриентир бюджета: ~$${calculatedPrice}\nСрок: ~${daysTotal} дн.`;
    onOpenContactWithSummary(summary);
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="bg-orb bg-orb-2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border-purple-500/30 text-purple-400 text-xs font-mono tracking-widest uppercase mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Услуги и Стоимость</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-syne text-white">
            Решения для вашего <span className="gradient-text-pink">бизнеса</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-3 font-light">
            Прозрачное ценообразование, фиксированные сроки и индивидуальный подход.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="bento-grid gap-8 mb-16">
          
          {/* Tile 1: Websites & Landings (8 cols) */}
          <div className="bento-span-8 glass-card glass-card-hover p-8 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl -z-10" />

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-pink-500/30">
                  <Globe className="w-7 h-7" />
                </div>
                <span className="px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 font-syne font-bold text-sm">
                  от $250
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold font-syne text-white">
                  Сайты и Лендинги
                </h3>
                <p className="text-slate-300 text-sm sm:text-base mt-2 font-light leading-relaxed">
                  Разработка стильных, высококонверсионных веб-сайтов под ключ. От лаконичных промо-страниц 
                  до сложных многостраничных порталов с 3D-графикой и онлайн-оплатой.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  'Промо-лендинги с высокой конверсией',
                  'Корпоративные многостраничные сайты',
                  'Интернет-магазины & Web-приложения',
                  'Интерактивная 3D-графика (Three.js)',
                  'Адаптированность под смартфоны & SEO',
                  'Быстрый запуск (от 3-5 дней)'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-slate-300 text-xs sm:text-sm">
                    <Check className="w-4 h-4 text-pink-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between mt-6">
              <span className="text-xs text-slate-400 font-mono">Срок: от 3 до 10 дней</span>
              <button
                onClick={() => onOpenContactWithSummary('Интересует разработка сайта / лендинга')}
                className="text-xs font-bold text-pink-400 hover:text-pink-300 flex items-center gap-1 transition-colors"
              >
                <span>Обсудить сайт</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tile 2: Telegram Bots (4 cols) */}
          <div className="bento-span-4 glass-card glass-card-hover p-8 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10" />

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
                  <Bot className="w-7 h-7" />
                </div>
                <span className="px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 font-syne font-bold text-sm">
                  от $200
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold font-syne text-white">
                  Telegram-боты
                </h3>
                <p className="text-slate-300 text-sm mt-2 font-light leading-relaxed">
                  Автоматизация продаж, прием заявок, интеграции с CRM и полноценные Web Apps внутри Telegram (TMA).
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                {[
                  'Боты для приёма заказов и оплаты',
                  'Telegram Mini Apps (TMA web-приложения)',
                  'Уведомления и авто-воронки',
                  'Интеграция с OpenAI / ChatGPT'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-slate-300 text-xs sm:text-sm">
                    <Check className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between mt-6">
              <span className="text-xs text-slate-400 font-mono">Срок: от 3 до 7 дней</span>
              <button
                onClick={() => onOpenContactWithSummary('Интересует разработка Telegram-бота')}
                className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
              >
                <span>Обсудить бота</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tile 3: Speed & Performance (6 cols) */}
          <div className="bento-span-6 glass-card glass-card-hover p-6 flex items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold font-syne text-white">Максимальная скорость (100/100)</h4>
              <p className="text-slate-300 text-xs mt-1 font-light">
                Оптимизация кода без тормозов. Мгновенная загрузка страниц и плавные анимации даже на слабых устройствах.
              </p>
            </div>
          </div>

          {/* Tile 4: AI & API Integration (6 cols) */}
          <div className="bento-span-6 glass-card glass-card-hover p-6 flex items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/30">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold font-syne text-white">Умные ИИ-интеграции</h4>
              <p className="text-slate-300 text-xs mt-1 font-light">
                Подключение нейросетей OpenAI/Claude, сторонних API, платежных шлюзов и автоматическая аналитика данных.
              </p>
            </div>
          </div>

        </div>

        {/* Interactive Cost Estimator Widget */}
        <div className="glass-card p-8 sm:p-10 border-pink-500/30 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-syne text-white">
                  Калькулятор бюджета
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm font-light">
                  Рассчитайте примерную стоимость и срок разработки в пару кликов
                </p>
              </div>
            </div>

            {/* Live Result Display */}
            <div className="flex items-center gap-6 glass-card px-6 py-3 border-pink-500/40 bg-pink-500/5">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-mono text-slate-400">Ориентир стоимости:</span>
                <span className="text-2xl font-extrabold font-syne text-pink-400 flex items-center">
                  ~${calculatedPrice}
                </span>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-mono text-slate-400">Срок разработки:</span>
                <span className="text-lg font-bold font-syne text-purple-300 flex items-center gap-1">
                  <Clock className="w-4 h-4 text-purple-400" />
                  ~{daysTotal} дн.
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
            
            {/* Step 1: Select Type */}
            <div className="lg:col-span-5 space-y-4">
              <label className="text-xs font-mono uppercase tracking-wider text-pink-400 font-bold block">
                1. Выберите тип проекта:
              </label>
              <div className="space-y-2.5">
                {Object.entries(typeOptions).map(([key, item]) => (
                  <button
                    key={key}
                    onClick={() => setProjectType(key)}
                    className={`w-full text-left p-3.5 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-between border ${
                      projectType === key
                        ? 'pricing-pill-active border-pink-500'
                        : 'glass-card border-white/10 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <span>{item.name}</span>
                    <span className="font-mono text-xs opacity-80">от ${item.basePrice}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Extra Features */}
            <div className="lg:col-span-7 space-y-4">
              <label className="text-xs font-mono uppercase tracking-wider text-pink-400 font-bold block">
                2. Дополнительные опции:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {extraOptions.map((opt) => {
                  const isSelected = selectedExtras.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      onClick={() => toggleExtra(opt.id)}
                      className={`text-left p-3 rounded-xl text-xs transition-all flex items-center justify-between border ${
                        isSelected
                          ? 'bg-purple-500/20 border-purple-500 text-white'
                          : 'glass-card border-white/10 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 pr-2">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] ${
                            isSelected
                              ? 'bg-purple-500 border-purple-400 text-white'
                              : 'border-white/20'
                          }`}
                        >
                          {isSelected && '✓'}
                        </div>
                        <span>{opt.name}</span>
                      </div>
                      {opt.price > 0 ? (
                        <span className="font-mono text-[11px] text-pink-400 shrink-0">+${opt.price}</span>
                      ) : (
                        <span className="font-mono text-[10px] text-emerald-400 shrink-0">Включено</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Action Button */}
              <div className="pt-4 flex justify-end">
                <button
                  onClick={handleOrderCalculation}
                  className="magnetic-btn px-6 py-3.5 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-pink-600 text-white font-bold text-sm shadow-lg shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                  data-cursor="CALC"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Заказать с этим расчётом</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
