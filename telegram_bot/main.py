import os
import asyncio
import logging
from dotenv import load_dotenv
from aiohttp import web

from aiogram import Bot, Dispatcher, F, types
from aiogram.filters import CommandStart
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup
from aiogram.types import (
    InlineKeyboardMarkup,
    InlineKeyboardButton,
    ReplyKeyboardMarkup,
    KeyboardButton,
    ReplyKeyboardRemove,
    WebAppInfo
)

# Load environment variables
load_dotenv()

BOT_TOKEN = os.getenv("BOT_TOKEN", "7790495377:AAEAQCqq3Qr9hOQHXqPRFyc2zNNsCa4SltQ").strip()
ADMIN_CHAT_ID = os.getenv("ADMIN_CHAT_ID", "8726413176").strip()
WEB_APP_URL = "https://developer-studio.onrender.com/"

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

# FSM States for Interactive Dialog Wizard
class ServiceWizard(StatesGroup):
    selected_service = State()
    task_description = State()
    contact_info = State()

# Main Keyboard supporting both Order Intake, Portfolio Showcase, & Telegram Mini App (TMA)
def get_main_menu_keyboard():
    return ReplyKeyboardMarkup(
        keyboard=[
            [KeyboardButton(text="📱 Открыть Web App (TMA)", web_app=WebAppInfo(url=WEB_APP_URL))],
            [KeyboardButton(text="🚀 Заказать разработку")],
            [KeyboardButton(text="💼 Мои проекты"), KeyboardButton(text="💰 Узнать цены")],
            [KeyboardButton(text="💬 Прямая связь")]
        ],
        resize_keyboard=True
    )

def get_service_choice_keyboard():
    return ReplyKeyboardMarkup(
        keyboard=[
            [KeyboardButton(text="🌐 Хочу сайт"), KeyboardButton(text="🤖 Хочу Telegram-бота")],
            [KeyboardButton(text="📱 Telegram Mini App (TMA)")],
            [KeyboardButton(text="❌ Отмена")]
        ],
        resize_keyboard=True
    )

def get_contact_keyboard():
    return ReplyKeyboardMarkup(
        keyboard=[
            [KeyboardButton(text="📱 Поделиться контактом", request_contact=True)],
            [KeyboardButton(text="❌ Отмена")]
        ],
        resize_keyboard=True,
        one_time_keyboard=True
    )

dp = Dispatcher()

# /start command handler
@dp.message(CommandStart())
async def cmd_start(message: types.Message, state: FSMContext):
    await state.clear()
    welcome_text = (
        f"👋 <b>Здравствуйте, {message.from_user.first_name}!</b>\n\n"
        "Я официальный бот веб-разработчика <b>Alex (Dev.Studio)</b>.\n\n"
        "Чем я могу помочь?\n"
        "• 📱 <b>Открыть Web App (TMA)</b> — запустить сайт прямо в Telegram!\n"
        "• 🚀 <b>Заказать разработку</b> — оформить заявку на сайт или бота за 1 минуту\n"
        "• 💼 <b>Мои проекты</b> — посмотреть примеры реальных работающих сайтов\n"
        "• 💰 <b>Узнать цены</b> — ознакомиться с тарифами\n"
        "• 💬 <b>Прямая связь</b> — написать мне напрямую"
    )

    inline_kb = InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text="📱 Запустить 3D Портфолио в Telegram", web_app=WebAppInfo(url=WEB_APP_URL))],
            [InlineKeyboardButton(text="🚀 Заказать разработку", callback_data="wizard_site")]
        ]
    )
    await message.answer(welcome_text, parse_mode="HTML", reply_markup=get_main_menu_keyboard())

# "🚀 Заказать разработку" button handler
@dp.message(F.text == "🚀 Заказать разработку")
async def cmd_order_start(message: types.Message, state: FSMContext):
    await state.clear()
    text = (
        "🎯 <b>Какая услуга вас интересует?</b>\n\n"
        "Выберите вариант ниже:"
    )
    await message.answer(text, parse_mode="HTML", reply_markup=get_service_choice_keyboard())

# "💼 Мои проекты" button handler
@dp.message(F.text == "💼 Мои проекты")
async def cmd_portfolio(message: types.Message):
    text = (
        "💼 <b>Реализованные проекты:</b>\n\n"
        "1️⃣ <b>Stanford School</b> — Языковая онлайн-школа\n"
        "• Обучающий веб-портал с личным кабинетом студентов.\n"
        "👉 https://stanfordschool.onrender.com/\n\n"
        "2️⃣ <b>Yoshlar Qalqoni AI Platform</b> — ИИ-платформа\n"
        "• Анализ городской безопасности и научно-диагностический мониторинг.\n"
        "👉 https://yoshlar-yetakchisi.onrender.com/\n\n"
        "3️⃣ <b>SARUNO | Mira Miller</b> — Мукомольный завод\n"
        "• Высокотехнологичный веб-сайт завода (Зарбдар, Джизак).\n"
        "👉 https://sarunomiramiller.netlify.app/\n\n"
        "🌐 <b>Портфолио-сайт:</b> https://developer-studio.onrender.com/"
    )
    inline_kb = InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text="📱 Открыть Web App портфолио", web_app=WebAppInfo(url=WEB_APP_URL))],
            [InlineKeyboardButton(text="🚀 Заказать подобный проект", callback_data="wizard_site")]
        ]
    )
    await message.answer(text, parse_mode="HTML", reply_markup=inline_kb)

# "💬 Прямая связь" button handler
@dp.message(F.text == "💬 Прямая связь")
async def cmd_direct_contact(message: types.Message):
    text = (
        "💬 <b>Прямая связь с разработчиком:</b>\n\n"
        "👤 <b>Telegram:</b> @o_o_developer\n"
        "📸 <b>Instagram:</b> @dev__man23\n"
        "💼 <b>Kwork:</b> kwork.ru/user/bcvfn23\n\n"
        "Вы можете написать мне лично в Telegram в любое время!"
    )
    inline_kb = InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text="💬 Написать @o_o_developer", url="https://t.me/o_o_developer")]
        ]
    )
    await message.answer(text, parse_mode="HTML", reply_markup=inline_kb)

# "💰 Узнать цены" button handler
@dp.message(F.text == "💰 Узнать цены")
async def cmd_pricing(message: types.Message):
    pricing_text = (
        "💰 <b>Прайс-лист на разработку:</b>\n\n"
        "🔥 <b>Спец-предложение «Сайт + Бот»:</b> $30 (экономия $10!)\n\n"
        "🌐 <b>Сайты и Лендинги:</b> от $20\n"
        "- Эконом ($20-25), Стандарт ($35-40), Бизнес ($60-70).\n"
        "- <i>Сроки: от 3 до 5 дней</i>\n\n"
        "🤖 <b>Telegram-боты:</b> от $15\n"
        "- Простой ($15-20), С БД ($30-35), Интеграции/CRM ($45-50).\n"
        "- <i>Сроки: от 3 до 7 дней</i>\n\n"
        "📱 <b>Telegram Mini Apps (TMA):</b> от $60\n"
        "- Полноценные веб-приложения внутри Telegram.\n"
        "- <i>Сроки: от 5 до 7 дней</i>\n\n"
        "💡 <i>Все проекты включают чистый код, адаптивность и гарантию работы!</i>"
    )
    
    inline_kb = InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text="🌐 Хочу сайт", callback_data="wizard_site")],
            [InlineKeyboardButton(text="🤖 Хочу Telegram-бота", callback_data="wizard_bot")]
        ]
    )
    await message.answer(pricing_text, parse_mode="HTML", reply_markup=inline_kb)

# Handle Service Wizard Choices
@dp.message(F.text.in_({"🌐 Хочу сайт", "🤖 Хочу Telegram-бота", "📱 Telegram Mini App (TMA)"}))
async def start_service_wizard(message: types.Message, state: FSMContext):
    service = message.text
    await state.update_data(selected_service=service)
    await state.set_state(ServiceWizard.task_description)

    await message.answer(
        f"✅ <b>Выбрано:</b> {service}\n\n"
        "📝 <b>Шаг 1 из 2:</b> Кратко опишите вашу задачу (что нужно сделать, пожелания по проекту):",
        parse_mode="HTML",
        reply_markup=ReplyKeyboardRemove()
    )

@dp.callback_query(F.data.in_({"wizard_site", "wizard_bot"}))
async def callback_service_wizard(callback: types.CallbackQuery, state: FSMContext):
    service = "Сайт / Лендинг (от $20)" if callback.data == "wizard_site" else "Telegram-бот (от $15)"
    await state.update_data(selected_service=service)
    await state.set_state(ServiceWizard.task_description)

    await callback.message.answer(
        f"✅ <b>Выбрано:</b> {service}\n\n"
        "📝 <b>Шаг 1 из 2:</b> Кратко опишите вашу задачу (что нужно сделать, пожелания по проекту):",
        parse_mode="HTML"
    )
    await callback.answer()

# Cancel handler
@dp.message(F.text == "❌ Отмена")
async def cancel_wizard(message: types.Message, state: FSMContext):
    await state.clear()
    await message.answer("Действие отменено.", reply_markup=get_main_menu_keyboard())

# Step 1: Collect Task Description
@dp.message(ServiceWizard.task_description)
async def process_task_description(message: types.Message, state: FSMContext):
    if message.text == "❌ Отмена":
        await state.clear()
        await message.answer("Отменено.", reply_markup=get_main_menu_keyboard())
        return

    await state.update_data(task_description=message.text)
    await state.set_state(ServiceWizard.contact_info)

    await message.answer(
        "📞 <b>Шаг 2 из 2:</b> Укажите ваш контакт для связи.\n"
        "Вы можете нажать кнопку ниже, чтобы поделиться телефоном, или введите ваш Telegram / номер вручную:",
        parse_mode="HTML",
        reply_markup=get_contact_keyboard()
    )

# Step 2: Collect Contact & Send Lead
@dp.message(ServiceWizard.contact_info)
async def process_contact_info(message: types.Message, state: FSMContext, bot: Bot):
    if message.text == "❌ Отмена":
        await state.clear()
        await message.answer("Отменено.", reply_markup=get_main_menu_keyboard())
        return

    data = await state.get_data()
    service = data.get("selected_service", "Разработка")
    task_desc = data.get("task_description", "Не указано")

    user = message.from_user
    client_name = user.full_name or user.first_name or "Клиент"
    
    if message.contact:
        contact_text = f"📱 {message.contact.phone_number}"
    else:
        contact_text = message.text

    user_username = f"@{user.username}" if user.username else f"ID: {user.id}"

    await state.clear()
    await message.answer(
        "Спасибо! Я свяжусь с вами в ближайшее время.",
        reply_markup=get_main_menu_keyboard()
    )

    if ADMIN_CHAT_ID:
        admin_card = (
            "🚨 <b>НОВАЯ ЗАЯВКА ИЗ TELEGRAM-БОТА!</b>\n\n"
            f"👤 <b>Имя клиента:</b> {client_name}\n"
            f"💬 <b>Telegram:</b> {user_username}\n"
            f"📞 <b>Контакт:</b> {contact_text}\n"
            f"📌 <b>Выбранная услуга:</b> {service}\n"
            f"📝 <b>Описание задачи:</b>\n{task_desc}"
        )

        admin_keyboard = InlineKeyboardMarkup(
            inline_keyboard=[
                [InlineKeyboardButton(
                    text="💬 Написать клиенту",
                    url=f"https://t.me/{user.username}" if user.username else f"tg://user?id={user.id}"
                )]
            ]
        )

        try:
            await bot.send_message(
                chat_id=ADMIN_CHAT_ID,
                text=admin_card,
                parse_mode="HTML",
                reply_markup=admin_keyboard
            )
        except Exception as e:
            logger.error(f"Failed to send admin lead notification: {e}")

# Catch-all handler for unhandled messages
@dp.message()
async def fallback_handler(message: types.Message, state: FSMContext):
    current_state = await state.get_state()
    if current_state is None:
        await message.answer(
            "Воспользуйтесь кнопками меню ниже для заказа или просмотра проектов 👇",
            reply_markup=get_main_menu_keyboard()
        )

# Render Health Check Route Handler
async def handle_health_check(request):
    return web.Response(text="Render Health Check OK - Telegram Bot 24/7 Active!", status=200)

async def main():
    if not BOT_TOKEN:
        logger.error("⚠️ BOT_TOKEN is missing!")
        return

    logger.info("Starting Telegram Bot with Aiogram Long Polling & Render Health Check Listener...")
    bot = Bot(token=BOT_TOKEN)
    
    await bot.delete_webhook(drop_pending_updates=True)

    app = web.Application()
    app.router.add_get('/', handle_health_check)
    app.router.add_get('/health', handle_health_check)

    runner = web.AppRunner(app)
    await runner.setup()
    port = int(os.getenv("PORT", 8080))
    site = web.TCPSite(runner, '0.0.0.0', port)
    await site.start()
    logger.info(f"Render Port Listener successfully bound on port {port}")

    logger.info("🚀 Telegram Order Intake & Portfolio Bot (TMA Enabled) is live 24/7!")
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
