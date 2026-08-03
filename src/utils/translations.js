export const translations = {
  RU: {
    nav: {
      about: 'О себе',
      portfolio: 'Портфолио',
      services: 'Услуги & Прайс',
      testimonials: 'Отзывы',
      contact: 'Контакты',
      write: 'Написать'
    },
    hero: {
      badge: 'Full-Stack разработчик & Telegram Bot Specialist',
      title1: 'Создаю ',
      titleSites: 'сайты',
      titleAnd: ' и ',
      titleBots: 'Telegram-ботов',
      titleBiz: ' для бизнеса',
      subtitle: 'Превращаю сложную бизнес-логику в простые, быстродействующие веб-сервисы, высококонверсионные лендинги и автоматизированных ботов с современным дизайном и 3D-графикой.',
      btnTg: 'Написать в Telegram',
      btnWork: 'Смотреть работы',
      badgeOpen: 'Открыт к проектам',
      badge24: 'На связи 24/7',
      badgeQuality: 'Гарантия качества'
    },
    about: {
      badge: 'О РАЗРАБОТЧИКЕ',
      title1: 'Кто создаёт ваши ',
      titleHighlight: 'проекты',
      subtitle: 'Web-разработчик | Сайты и Telegram-боты для бизнеса',
      desc: 'Специализируюсь на создании удобных, быстрых сайтов и автоматизированных Telegram-ботов. В каждом проекте совмещаю строгий код, безупречную скорость загрузки и современную 3D-анимацию.',
      badge1: 'Без скрытых платежей',
      badge2: 'Прямой контакт с автором',
      terminalTab1: 'whoami',
      terminalTab2: 'tech_stack',
      terminalTab3: 'approach'
    },
    portfolio: {
      badge: 'РЕАЛЬНЫЕ КЕЙСЫ',
      title1: 'Реализованные ',
      titleHighlight: 'проекты',
      sub: 'Настоящие запущенные веб-платформы с реальной бизнес-логикой.',
      btnDetails: 'Детали кейса',
      btnMore: 'Подробнее',
      speed: 'Скорость',
      ui: 'Языки / UI',
      std: 'Стандарт',
      items: {
        stanford: {
          category: 'Языковая онлайн-школа',
          badge: 'EdTech & Web Platform',
          description: 'Обучающий веб-портал языковой школы Stanford с личным кабинетом студента, записью на курсы английского языка и интерактивной системой тестирования.',
          stats: { speed: '99/100 Lighthouse', ux: 'Адаптивный UI', security: 'SSL & Auth' },
          deliverables: [
            'Каталог языковых курсов и программ подготовки',
            'Личные кабинеты студентов и онлайн-запись',
            'Интеграция тестирования уровня знаний',
            'Быстрый отклик и адаптивность под все устройства'
          ]
        },
        yoshlar: {
          category: 'Научно-диагностическая платформа',
          badge: 'Государственная ИИ-система',
          description: 'Интеллектуальный анализ городской безопасности и научно-диагностическая платформа для мониторинга, профилактики правонарушений и поддержки молодежи Сырдарьинской области.',
          stats: { speed: 'Real-time AI', ux: 'Multilingual (UZ/RU)', security: 'Demo Platform' },
          deliverables: [
            'Интеллектуальный анализ городской безопасности (Shahar Xavfsizligining Intellektual Tahlili)',
            'Мониторинг 10 махаллинских структур Сырдарьинской области',
            'Интеграция выгрузки данных и документов (API Hujjatlari)',
            'Мультиязычный интерфейс (Узбекский UZ / Русский RU)'
          ]
        },
        saruno: {
          category: 'Промышленное производство муки',
          badge: 'Завод и Оптовая платформа',
          description: 'Высокотехнологичный веб-сайт для мукомольного завода SARUNO (Зарбдар, Джизак). Мульти-язычный интерфейс (RU/EN/UZ), галерея производства, каталог и оптовые заказы.',
          stats: { speed: '100/100 Speed', ux: 'RU / EN / UZ', security: 'ISO Certified' },
          deliverables: [
            'Презентация мукомольного завода Зарбдар (мощность 200 тонн в день)',
            'Каталог продукции (Мука Высший сорт, Первый сорт, Специализированная B2B)',
            'Галерея автоматизированных линий производства и контроля ISO 9001',
            'Форма прямого приёма крупных оптовых заказов и экспортных контрактов'
          ]
        }
      }
    },
    testimonials: {
      badge: 'ОТЗЫВЫ И ДОВЕРИЕ',
      title1: 'Что говорят ',
      titleHighlight: 'клиенты',
      sub: 'Обратная связь от реальных заказчиков и руководителей проектов.',
      items: [
        {
          name: 'Дмитрий Ким',
          role: 'Директор Stanford School',
          text: 'Сайт нашей языковой школы был сдан ровно за 4 дня. Адаптивность безупречная, студентам удобно записываться прямо со смартфонов. Заявки приходят в Telegram моментально!',
          project: 'stanfordschool.onrender.com'
        },
        {
          name: 'Фарход Рахимов',
          role: 'Руководитель проекта Yoshlar Qalqoni',
          text: 'Сложный интерфейс ИИ-платформы с графиками был сделан на высочайшем уровне. Отдельное спасибо за поддержку узбекского и русского языков и быструю интеграцию.',
          project: 'yoshlar-yetakchisi.onrender.com'
        },
        {
          name: 'Отабек Муратов',
          role: 'Управляющий завода SARUNO',
          text: 'Заказывали презентационный сайт мукомольного завода. Разработчик отлично передал масштаб производства и каталога. Заказы от крупных B2B оптовиков теперь приходят напрямую в бот.',
          project: 'sarunomiramiller.netlify.app'
        }
      ]
    },
    services: {
      badge: 'УСЛУГИ И СТОИМОСТЬ',
      title1: 'Решения для вашего ',
      titleHighlight: 'бизнеса',
      sub: 'Прозрачное ценообразование, фиксированные сроки и доступные тарифы.',
      comboTitle: '🔥 Спец-предложение «Сайт + Бот» за $30',
      comboDesc: 'Закажите разработкy Лендинга ($20) и получите Telegram-бота для приёма заявок всего за $10 вместо $20! Экономия $10.',
      comboBtn: 'Заказать Комплект $30',
      sitesTitle: 'Сайты и Лендинги',
      sitesDesc: 'Разработка стильных, быстродействующих веб-сайтов под ключ. От лаконичных промо-страниц до бизнес-сайтов с админ-панелью.',
      botsTitle: 'Telegram-боты',
      botsDesc: 'Автоматизация продаж, приём заявок, боты с БД и Telegram Mini Apps (TMA).',
      calcTitle: 'Калькулятор бюджета',
      calcSub: 'Рассчитайте примерную стоимость и срок разработки в пару кликов',
      calcEst: 'ОРИЕНТИР СТОИМОСТИ:',
      calcTime: 'СРОК РАЗРАБОТКИ:',
      daysText: 'дн.',
      step1: '1. ВЫБЕРИТЕ ТИП ПРОЕКТА:',
      step2: '2. ДОПОЛНИТЕЛЬНЫЕ ОПЦИИ:',
      calcBtn: 'Заказать с этим расчётом',
      included: 'Включено',
      types: {
        landing: 'Эконом Лендинг (1 страница)',
        landing_std: 'Стандарт (Лендинг + SEO + Форма)',
        webapp: 'Бизнес (Сайт под ключ + Админка)',
        tgbot: 'Простой Telegram-бот (автоответчик)',
        tgbot_db: 'Telegram-бот с Базой Данных',
        tgbot_crm: 'Telegram-бот с Интеграциями / CRM',
        tgminiapp: 'Telegram Mini App (TMA веб-приложение)'
      },
      extras: {
        mobile: 'Полная адаптивность под смартфоны',
        seo: 'Базовое SEO и мета-теги',
        three3d: '3D элементы и эффекты (Three.js)',
        admin: 'Панель администратора (CMS)',
        payments: 'Подключение онлайн-оплаты (Payme/Click)',
        ai: 'Интеграция ИИ (OpenAI / ChatGPT)'
      }
    },
    contact: {
      badge: 'СВЯЗАТЬСЯ СО МНОЙ',
      title1: 'Начнём ваш ',
      titleHighlight: 'проект',
      sub: 'Заполните форму — заявка мгновенно поступит разработчику в Telegram.',
      directTitle: 'Прямая связь и Заказ',
      directSub: 'Самый быстрый способ обсудить задачу — написать в Telegram или заполнить форму.',
      nameLabel: 'Ваше имя *',
      contactLabel: 'Ваш Telegram / Телефон *',
      descLabel: 'Описание проекта или задача',
      namePlaceholder: 'Введите ваше имя',
      contactPlaceholder: '@username или +998901234567',
      descPlaceholder: 'Опишите вашу задачу или пожелания по проекту...',
      btnSend: 'Отправить сообщение',
      submitting: 'Отправка заявки...'
    }
  },
  UZ: {
    nav: {
      about: 'Haqida',
      portfolio: 'Portfolio',
      services: 'Xizmatlar & Narxlar',
      testimonials: 'Sharhlar',
      contact: 'Aloqa',
      write: 'Yozish'
    },
    hero: {
      badge: 'Full-Stack Dasturchi & Telegram Bot Mutaxassisi',
      title1: 'Biznes uchun ',
      titleSites: 'saytlar',
      titleAnd: ' va ',
      titleBots: 'Telegram-botlar',
      titleBiz: ' yarataman',
      subtitle: 'Murakkab biznes-mantiqni tezkor veb-saytlar, konversiyasi yuqori lendinlar va avtomatlashtirilgan botlarga aylantiraman.',
      btnTg: 'Telegramda yozish',
      btnWork: 'Loyihalarni ko\'rish',
      badgeOpen: 'Loyihalar uchun ochiq',
      badge24: '24/7 aloqada',
      badgeQuality: 'Sifat kafolati'
    },
    about: {
      badge: 'DASTURCHI HAQIDA',
      title1: 'Loyihalaringizni kim ',
      titleHighlight: 'yaratadi',
      subtitle: 'Veb-dasturchi | Biznes uchun saytlar va Telegram-botlar',
      desc: 'Qulay, tezkor saytlar va avtomatlashtirilgan Telegram-botlar yaratishga ixtisoslashganman. Har bir loyihada toza kod va zamonaviy 3D-grafikani birlashtiraman.',
      badge1: 'Yashirin to\'lovlarsiz',
      badge2: 'Muallif bilan to\'g\'ridan-to\'g\'ri aloqa',
      terminalTab1: 'whoami',
      terminalTab2: 'tech_stack',
      terminalTab3: 'approach'
    },
    portfolio: {
      badge: 'REAL KEYSLAR',
      title1: 'Bajarilgan ',
      titleHighlight: 'loyihalar',
      sub: 'Real biznes-mantiqqa ega ishga tushirilgan veb-platformalar.',
      btnDetails: 'Loyiha tafsilotlari',
      btnMore: 'Batafsil',
      speed: 'Tezlik',
      ui: 'Tillar / UI',
      std: 'Standart',
      items: {
        stanford: {
          category: 'Onlayn til maktabi',
          badge: 'EdTech & Veb Platforma',
          description: 'Stanford til maktabining ta\'lim veb-portali, talaba shaxsiy kabineti, ingliz tili kurslariga yozilish va interaktiv test tizimi.',
          stats: { speed: '99/100 Lighthouse', ux: 'Moslashuvchan UI', security: 'SSL & Auth' },
          deliverables: [
            'Til kurslari va tayyorgarlik dasturlari katalogi',
            'Talabalar shaxsiy kabineti va onlayn ro\'yxatdan o\'tish',
            'Bilim darajasini aniqlash test tizimi integratsiyasi',
            'Barcha qurilmalarga moslashuvchan va tezkor ishlash'
          ]
        },
        yoshlar: {
          category: 'Ilmiy-tashxisiy platforma',
          badge: 'Davlat AI-tizimi',
          description: 'Shahar xavfsizligining intellektual tahlili va Sirdaryo viloyati yoshlarini qo\'llab-quvvatlash hamda huquqbuzarliklar profilaktikasi uchun platforma.',
          stats: { speed: 'Real-time AI', ux: 'Ko\'p tilli (UZ/RU)', security: 'Demo Platforma' },
          deliverables: [
            'Shahar xavfsizligining intellektual tahlili va monitoringi',
            'Sirdaryo viloyati 10 ta mahalla tuzilmasi monitoringi',
            'Hujjatlar va ma\'lumotlarni yuklab olish (API Hujjatlari)',
            'Ko\'p tilli interfeys (O\'zbekcha UZ / Ruscha RU)'
          ]
        },
        saruno: {
          category: 'Sanoat un ishlab chiqarish',
          badge: 'Zavod va Ulgurji platforma',
          description: 'SARUNO un zavodi (Zarbdor, Jizzax) uchun yuqori texnologiyali veb-sayt. Ko\'p tilli interfeys (RU/EN/UZ), galereya va ulgurji buyurtmalar.',
          stats: { speed: '100/100 Tezlik', ux: 'RU / EN / UZ', security: 'ISO Sertifikatlangan' },
          deliverables: [
            'Zarbdor un zavodi taqdimoti (kunlik quvvati 200 tonna)',
            'Mahsulotlar katalogi (Oliy nav, Birinchi nav, B2B maxsus un)',
            'Avtomatlashtirilgan ISO 9001 ishlab chiqarish liniyalari galereyasi',
            'Katta ulgurji buyurtmalar va eksport shartnomalari formasi'
          ]
        }
      }
    },
    testimonials: {
      badge: 'SHARHLAR VA ISHONCH',
      title1: 'Mijozlarimiz nima ',
      titleHighlight: 'deydi',
      sub: 'Haqiqiy buyurtmachilar va loyiha rahbarlarining fikrlari.',
      items: [
        {
          name: 'Dmitriy Kim',
          role: 'Stanford School Direktori',
          text: 'Til maktabimiz sayti roppa-rosa 4 kunda tayyor bo\'ldi. Moslashuvchanligi a\'lo darajada, talabalarga smartfondan ro\'yxatdan o\'tish juda qulay. Arizalar Telegramga darhol keladi!',
          project: 'stanfordschool.onrender.com'
        },
        {
          name: 'Farxod Raximov',
          role: 'Yoshlar Qalqoni Loyiha Rahbari',
          text: 'AI platformasining grafiklar bilan murakkab interfeysi yuqori saviyada tayyorlandi. O\'zbek va rus tillari qo\'llab-quvvatlanishi va tezkor integratsiya uchun alohida rahmat.',
          project: 'yoshlar-yetakchisi.onrender.com'
        },
        {
          name: 'Otabek Muratov',
          role: 'SARUNO Zavodi Boshqaruvchisi',
          text: 'Un zavodimiz taqdimot saytini buyurtma qildik. Dasturchi ishlab chiqarish miqyosini a\'lo darajada yetkazib berdi. Yirik B2B ulgurji buyurtmalar endi to\'g\'ridan-to\'g\'ri botga kelmoqda.',
          project: 'sarunomiramiller.netlify.app'
        }
      ]
    },
    services: {
      badge: 'XIZMATLAR VA NARXLAR',
      title1: 'Biznesingiz uchun ',
      titleHighlight: 'yechimlar',
      sub: 'Shaffof narxlar, aniq muddatlar va hamyonbop tariflar.',
      comboTitle: '🔥 Maxsus «Sayt + Bot» To\'plami $30',
      comboDesc: 'Lendin sayt buyurtma qiling ($20) va Telegram-botni $20 o\'rniga bor-yo\'g\'i $10 ga oling! Tejamkorlik $10.',
      comboBtn: '$30 To\'plamni Buyurtma Qilish',
      sitesTitle: 'Saytlar va Lendiglar',
      sitesDesc: 'Tayyor holdagi zamonaviy va tezkor veb-saytlarni ishlab chiqish. Promo-sahifalardan tortib boshqaruv panelli saytlargacha.',
      botsTitle: 'Telegram-botlar',
      botsDesc: 'Sotuvlarni avtomatlashtirish, arizalar qabul qilish, ma\'lumotlar bazasi va TMA ilovalari.',
      calcTitle: 'Byudjet kalkulyatori',
      calcSub: 'Taxminiy narx va muddatni bir necha bosishda hisoblang',
      calcEst: 'MO\'LJAL QIYMATI:',
      calcTime: 'TAYYORLANISH MUDDATI:',
      daysText: 'kun',
      step1: '1. LOYIHA TURINI TANLANG:',
      step2: '2. QO\'SHIMCHA OPSIONALAR:',
      calcBtn: 'Ushbu hisob bilan buyurtma berish',
      included: 'Kiritilgan',
      types: {
        landing: 'Ekonom Lendin (1 sahifa)',
        landing_std: 'Standart (Lendin + SEO + Forma)',
        webapp: 'Biznes (Tayyor Sayt + Admin Panel)',
        tgbot: 'Oddiy Telegram-bot (avto-javob)',
        tgbot_db: 'Ma\'lumotlar bazasiga ega Telegram-bot',
        tgbot_crm: 'Integratsiyalar / CRM Telegram-bot',
        tgminiapp: 'Telegram Mini App (TMA veb-ilova)'
      },
      extras: {
        mobile: 'Smartfonlarga to\'liq moslashuvchanlik',
        seo: 'Boshlang\'ich SEO va meta-teglar',
        three3d: '3D elementlar va effektlar (Three.js)',
        admin: 'Administrator paneli (CMS)',
        payments: 'Onlayn-to\'lovlarni ulash (Payme/Click)',
        ai: 'Shtatli AI integratsiyasi (OpenAI / ChatGPT)'
      }
    },
    contact: {
      badge: 'MEN BILAN BOG\'LANISH',
      title1: 'Loyihangizni ',
      titleHighlight: 'boshlaymiz',
      sub: 'Formani to\'ldiring — ariza bir zumda Telegramga yetib boradi.',
      directTitle: 'Telegramda to\'g\'ridan-to\'g\'ri aloqa',
      directSub: 'Vazifani muhokama qilishning eng tezkor usuli — shaxsan yozish.',
      nameLabel: 'Ismingiz *',
      contactLabel: 'Telegram / Telefoningiz *',
      descLabel: 'Loyiha tavsifi yoki vazifa',
      namePlaceholder: 'Ismingizni kiriting',
      contactPlaceholder: '@username yoki +998901234567',
      descPlaceholder: 'Loyihangiz haqida qisqacha ma\'lumot bering...',
      btnSend: 'Xabar yuborish',
      submitting: 'Yuborilmoqda...'
    }
  },
  EN: {
    nav: {
      about: 'About',
      portfolio: 'Portfolio',
      services: 'Services & Pricing',
      testimonials: 'Testimonials',
      contact: 'Contact',
      write: 'Get in Touch'
    },
    hero: {
      badge: 'Full-Stack Developer & Telegram Bot Specialist',
      title1: 'Building ',
      titleSites: 'websites',
      titleAnd: ' & ',
      titleBots: 'Telegram Bots',
      titleBiz: ' for business',
      subtitle: 'Transforming complex business logic into lightning-fast websites, high-converting landing pages, and automated bots.',
      btnTg: 'Message on Telegram',
      btnWork: 'View Projects',
      badgeOpen: 'Available for projects',
      badge24: '24/7 Available',
      badgeQuality: 'Quality Guarantee'
    },
    about: {
      badge: 'ABOUT DEVELOPER',
      title1: 'Who creates your ',
      titleHighlight: 'projects',
      subtitle: 'Web Developer | Websites & Telegram Bots for Business',
      desc: 'Specializing in building high-speed landing pages, web applications, and feature-rich Telegram bots with clean code and 3D graphics.',
      badge1: 'No hidden fees',
      badge2: 'Direct author contact',
      terminalTab1: 'whoami',
      terminalTab2: 'tech_stack',
      terminalTab3: 'approach'
    },
    portfolio: {
      badge: 'REAL CASE STUDIES',
      title1: 'Featured ',
      titleHighlight: 'Projects',
      sub: 'Live production web platforms powered by real business logic.',
      btnDetails: 'Case Details',
      btnMore: 'View Details',
      speed: 'Speed',
      ui: 'Languages / UI',
      std: 'Standard',
      items: {
        stanford: {
          category: 'Language Online School',
          badge: 'EdTech & Web Platform',
          description: 'Educational web portal for Stanford Language School featuring student portal, English course enrollment, and placement testing.',
          stats: { speed: '99/100 Lighthouse', ux: 'Responsive UI', security: 'SSL & Auth' },
          deliverables: [
            'Language courses and preparation programs catalog',
            'Student personal portals and online enrollment',
            'Knowledge level placement test integration',
            'Fast response and full device responsiveness'
          ]
        },
        yoshlar: {
          category: 'Scientific Diagnostic Platform',
          badge: 'Government AI System',
          description: 'Intellectual analysis of urban safety and scientific diagnostic platform for monitoring, crime prevention, and youth support in Syrdarya region.',
          stats: { speed: 'Real-time AI', ux: 'Multilingual (UZ/RU)', security: 'Demo Platform' },
          deliverables: [
            'Intellectual urban safety analysis (Shahar Xavfsizligining Intellektual Tahlili)',
            'Monitoring 10 neighborhood mahalla structures in Syrdarya region',
            'Document and data export API integration (API Hujjatlari)',
            'Multilingual interface (Uzbek UZ / Russian RU)'
          ]
        },
        saruno: {
          category: 'Industrial Flour Production',
          badge: 'Factory & Wholesale Platform',
          description: 'High-tech corporate website for SARUNO flour milling factory (Zarbdar, Jizzakh). Multilingual interface (RU/EN/UZ), factory gallery, and wholesale orders.',
          stats: { speed: '100/100 Speed', ux: 'RU / EN / UZ', security: 'ISO Certified' },
          deliverables: [
            'Zarbdar flour mill factory showcase (200 tons daily capacity)',
            'Products catalog (Premium grade, First grade, B2B custom flour)',
            'Automated ISO 9001 production line and quality control gallery',
            'Direct wholesale orders and export contract inquiry form'
          ]
        }
      }
    },
    testimonials: {
      badge: 'REVIEWS & TRUST',
      title1: 'What clients ',
      titleHighlight: 'say',
      sub: 'Feedback from real business founders and project leads.',
      items: [
        {
          name: 'Dmitry Kim',
          role: 'Director of Stanford School',
          text: 'Our language school website was delivered in just 4 days. Responsive layout is flawless, students easily enroll right from smartphones. Leads arrive in Telegram instantly!',
          project: 'stanfordschool.onrender.com'
        },
        {
          name: 'Farkhod Rakhimov',
          role: 'Project Lead at Yoshlar Qalqoni',
          text: 'Complex AI platform interface with analytical charts was built to the highest standard. Special thanks for UZ/RU multilingual support and smooth API integration.',
          project: 'yoshlar-yetakchisi.onrender.com'
        },
        {
          name: 'Otabek Muratov',
          role: 'Manager at SARUNO Factory',
          text: 'We commissioned a presentation website for our flour mill factory. The developer perfectly captured our manufacturing scale. B2B wholesale orders now arrive directly in our bot.',
          project: 'sarunomiramiller.netlify.app'
        }
      ]
    },
    services: {
      badge: 'SERVICES & PRICING',
      title1: 'Solutions for your ',
      titleHighlight: 'business',
      sub: 'Transparent pricing, fixed timelines, and affordable rates.',
      comboTitle: '🔥 Special Combo Offer: Website + Telegram Bot for $30',
      comboDesc: 'Order a Landing Page ($20) and get a Telegram lead bot for just $10 instead of $20! Save $10 total.',
      comboBtn: 'Order $30 Combo Package',
      sitesTitle: 'Websites & Landings',
      sitesDesc: 'Turnkey development of modern, high-speed websites from promo pages to admin CMS platforms.',
      botsTitle: 'Telegram Bots',
      botsDesc: 'Sales automation, lead management, database bots, and Mini Apps (TMA).',
      calcTitle: 'Budget Calculator',
      calcSub: 'Estimate development price and timeline in a few clicks',
      calcEst: 'ESTIMATED PRICE:',
      calcTime: 'DEVELOPMENT TIME:',
      daysText: 'days',
      step1: '1. CHOOSE PROJECT TYPE:',
      step2: '2. ADDITIONAL OPTIONS:',
      calcBtn: 'Order with this estimate',
      included: 'Included',
      types: {
        landing: 'Economy Landing (1 page)',
        landing_std: 'Standard (Landing + SEO + Form)',
        webapp: 'Business (Turnkey Site + Admin CMS)',
        tgbot: 'Simple Telegram Bot (auto-reply)',
        tgbot_db: 'Telegram Bot with Database',
        tgbot_crm: 'Telegram Bot with CRM / Integrations',
        tgminiapp: 'Telegram Mini App (TMA web app)'
      },
      extras: {
        mobile: 'Full mobile smartphone responsiveness',
        seo: 'Basic SEO & meta tags setup',
        three3d: '3D elements & WebGL effects (Three.js)',
        admin: 'Admin Control Panel (CMS)',
        payments: 'Online Payment Integration (Payme/Click)',
        ai: 'AI Integration (OpenAI / ChatGPT)'
      }
    },
    contact: {
      badge: 'CONTACT ME',
      title1: 'Let\'s start your ',
      titleHighlight: 'project',
      sub: 'Fill out the form — inquiry delivers straight to Telegram.',
      directTitle: 'Direct Telegram Contact',
      directSub: 'The fastest way to discuss a project is to message directly.',
      nameLabel: 'Your Name *',
      contactLabel: 'Your Telegram / Phone *',
      descLabel: 'Project details or requirements',
      namePlaceholder: 'Enter your name',
      contactPlaceholder: '@username or +123456789',
      descPlaceholder: 'Describe your project or task details...',
      btnSend: 'Send Message',
      submitting: 'Sending inquiry...'
    }
  }
};
