import React, { useState } from 'react';
import { ExternalLink, Eye, Layers, Shield, GraduationCap, CheckCircle } from 'lucide-react';

export default function PortfolioSection({ onSelectProject }) {
  const projects = [
    {
      id: 'stanford',
      title: 'Stanford School',
      category: 'Языковая онлайн-школа',
      badge: 'EdTech & Web Platform',
      description:
        'Обучающий веб-портал языковой школы Stanford с личным кабинетом студента, записью на курсы английского языка и интерактивной системой тестирования.',
      image: '/assets/stanford.png',
      tags: ['React', 'Node.js', 'PostgreSQL', 'TailwindCSS', 'GSAP'],
      stats: {
        speed: '99/100 Lighthouse',
        ux: 'Адаптивный UI',
        security: 'SSL & Auth'
      },
      icon: GraduationCap,
      color: 'from-pink-500 to-purple-600',
      demoUrl: 'https://stanfordschool.onrender.com/',
      details: {
        client: 'Stanford School Learning Center',
        deliverables: [
          'Каталог языковых курсов и программ подготовки',
          'Личные кабинеты студентов и онлайн-запись',
          'Интеграция тестирования уровня знаний',
          'Быстрый отклик и адаптивность под все устройства'
        ]
      }
    },
    {
      id: 'yoshlar',
      title: 'Yoshlar Qalqoni AI Platform',
      category: 'Научно-диагностическая платформа',
      badge: 'Государственная ИИ-система',
      description:
        'Интеллектуальный анализ городской безопасности и научно-диагностическая платформа для мониторинга, профилактики правонарушений и поддержки молодежи Сырдарьинской области.',
      image: '/assets/yoshlar.png',
      tags: ['React', 'AI Analytics', 'Node.js', 'API Integration', 'Dark Theme UI'],
      stats: {
        speed: 'Real-time AI',
        ux: 'Multilingual (UZ/RU)',
        security: 'Gov Standard'
      },
      icon: Shield,
      color: 'from-cyan-500 to-blue-600',
      demoUrl: 'https://yoshlar-yetakchisi.onrender.com/',
      details: {
        client: 'Yoshlar Qalqoni Science & AI Center',
        deliverables: [
          'Интеллектуальный анализ городской безопасности (Shahar Xavfsizligining Intellektual Tahlili)',
          'Мониторинг 10 махаллинских структур Сырдарьинской области',
          'Интеграция выгрузки данных и документов (API Hujjatlari)',
          'Мультиязычный интерфейс (Узбекский UZ / Русский RU)'
        ]
      }
    }
  ];

  return (
    <section id="portfolio" className="py-24 relative overflow-hidden">
      <div className="bg-orb bg-orb-3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border-pink-500/30 text-pink-400 text-xs font-mono tracking-widest uppercase mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Реальные кейсы</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-syne text-white">
            Реализованные <span className="gradient-text-pink">проекты</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-3 font-light">
            Настоящие веб-платформы, запущенные на Render.com с реальной бизнес-логикой.
          </p>
        </div>

        {/* 2 Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {projects.map((project) => {
            const Icon = project.icon;

            return (
              <div
                key={project.id}
                className="glass-card glass-card-hover group relative rounded-3xl overflow-hidden border-white/10 flex flex-col justify-between"
                data-cursor="PROJECT"
              >
                {/* Top Image Box with Hover Zoom & Action Overlay */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-75 group-hover:opacity-50 transition-opacity" />

                  {/* Badge */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-white text-xs font-medium shadow-lg">
                    <Icon className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                    <span>{project.badge}</span>
                  </div>

                  {/* Hover Overlay Button */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/50 backdrop-blur-sm">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-sm shadow-xl shadow-pink-500/40 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 inline-flex items-center gap-2 cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Детали кейса</span>
                    </button>
                  </div>
                </div>

                {/* Bottom Content Info */}
                <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="text-xs font-mono text-pink-400 uppercase tracking-widest">
                      {project.category}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold font-syne text-white group-hover:text-pink-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                      {project.description}
                    </p>
                  </div>

                  {/* Key Tech Badges */}
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Stats strip */}
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center">
                      <div className="flex flex-col">
                        <span className="text-[11px] text-slate-400">Скорость</span>
                        <span className="text-xs font-bold text-emerald-400">{project.stats.speed}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] text-slate-400">Язык / UI</span>
                        <span className="text-xs font-bold text-pink-400">{project.stats.ux}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] text-slate-400">Стандарт</span>
                        <span className="text-xs font-bold text-purple-400">{project.stats.security}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="text-xs font-bold text-pink-400 hover:text-pink-300 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Подробнее</span>
                      <Eye className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500/40 inline-flex items-center justify-center text-white hover:text-pink-400 transition-colors"
                      title="Открыть сайт на Render.com"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
