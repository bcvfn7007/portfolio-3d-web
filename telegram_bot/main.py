import os
import asyncio
import logging
from dotenv import load_dotenv
from aiohttp import web

from aiogram import Bot, Dispatcher, F, types
from aiogram.filters import CommandStart, Command
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup
from aiogram.types import (
    InlineKeyboardMarkup,
    InlineKeyboardButton,
    ReplyKeyboardMarkup,
    KeyboardButton,
    ReplyKeyboardRemove
)

# Load environment variables
load_dotenv()

BOT_TOKEN = os.getenv("BOT_TOKEN", "")
ADMIN_CHAT_ID = os.getenv("ADMIN_CHAT_ID", "")
PORT = int(os.getenv("PORT", 8080))

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# FSM States for Interactive Order Wizard
class OrderForm(StatesGroup):
    project_type = State()
    timeline = State()
    budget = State()
    description = State()
    contact = State()

# Keyboards
def get_main_menu_keyboard():
    return ReplyKeyboardMarkup(
        keyboard=[
            [KeyboardButton(text="🚀 Заказать разработку")],
            [KeyboardButton(text="💼 Мои проекты"), KeyboardButton(text="💬 Прямая связь")]
        ],
        resize_keyboard=True
    )

def get_project_types_keyboard():
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text="🌐 Лендинг / Промо-сайт", callback_data="type_landing")],
            [InlineKeyboardButton(text="🖥 Многостраничный Web App", callback_data="type_webapp")],
            [InlineKeyboardButton(text="🤖 Telegram-бот (продажи/авто)", callback_data="type_bot")],
            [InlineKeyboardButton(text="📱 Telegram Mini App (TMA)", callback_data="type_tma")]
        ]
    )

def get_timeline_keyboard():
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text="⚡ Срочно (2-3 дня)", callback_data="time_urgent")],
            [InlineKeyboardButton(text="📅 Стандартно (5-7 дней)", callback_data="time_normal")],
            [InlineKeyboardButton(text="🤝 Не горит / Обсудим", callback_data="time_flexible")]
        ]
    )

# Bot & Dispatcher setup
dp = Dispatcher()

@dp.message(CommandStart())
async def cmd_start(message: types.Message):
    welcome_text = (
        f"👋 <b>Здравствуйте, {message.from_user.first_name}!</b>\n\n"
        "Я официальный бот для приёма заказов на разработку сайтов, "
        "веб-сервисов и Telegram-ботов.\n\n"
        "Вы можете рассчитать стоимость или сразу оставить заявку на разработку."
    )
    await message.answer(welcome_text, parse_mode="HTML", reply_markup=get_main_menu_keyboard())

@dp.message(F.text == "💬 Прямая связь")
async def cmd_direct_contact(message: types.Message):
    await message.answer(
        "💬 <b>Прямая связь с разработчиком:</b>\n\n"
        "Telegram: @o_o_developer\n"
        "Instagram: https://instagram.com/dev__man23/\n"
        "Kwork: https://kwork.ru/user/bcvfn23",
        parse_mode="HTML",
        disable_web_page_preview=True
    )

@dp.message(F.text == "💼 Мои проекты")
async def cmd_portfolio(message: types.Message):
    text = (
        "💼 <b>Реализованные проекты:</b>\n\n"
        "1️⃣ <b>Stanford School</b> — Обучающая платформа языковой школы\n"
        "🔗 https://stanfordschool.onrender.com/\n\n"
        "2️⃣ <b>Yoshlar Qalqoni AI Platform</b> — Научно-диагностическая платформа ИИ\n"
        "🔗 https://yoshlar-yetakchisi.onrender.com/"
    )
    await message.answer(text, parse_mode="HTML", disable_web_page_preview=True)

# Order Wizard Handler
@dp.message(F.text == "🚀 Заказать разработку")
async def start_order_wizard(message: types.Message, state: FSMContext):
    await state.set_state(OrderForm.project_type)
    await message.answer(
        "📌 <b>Шаг 1 из 5:</b> Выберите тип проекта, который вам нужен:",
        parse_mode="HTML",
        reply_markup=get_project_types_keyboard()
    )

@dp.callback_query(OrderForm.project_type, F.data.startswith("type_"))
async def process_project_type(callback: types.CallbackQuery, state: FSMContext):
    type_map = {
        "type_landing": "Лендинг / Промо-сайт",
        "type_webapp": "Многостраничный Web App",
        "type_bot": "Telegram-бот (продажи/автоматизация)",
        "type_tma": "Telegram Mini App (TMA)"
    }
    selected = type_map.get(callback.data, "Разработка")
    await state.update_data(project_type=selected)
    await state.set_state(OrderForm.timeline)

    await callback.message.edit_text(
        f"✅ <b>Тип проекта:</b> {selected}\n\n"
        "⏱ <b>Шаг 2 из 5:</b> Укажите желаемые сроки:",
        parse_mode="HTML",
        reply_markup=get_timeline_keyboard()
    )

@dp.callback_query(OrderForm.timeline, F.data.startswith("time_"))
async def process_timeline(callback: types.CallbackQuery, state: FSMContext):
    time_map = {
        "time_urgent": "Срочно (2-3 дня)",
        "time_normal": "Стандартно (5-7 дней)",
        "time_flexible": "Гибкие сроки"
    }
    selected = time_map.get(callback.data, "Стандартно")
    await state.update_data(timeline=selected)
    await state.set_state(OrderForm.budget)

    await callback.message.edit_text(
        f"✅ <b>Сроки:</b> {selected}\n\n"
        "💰 <b>Шаг 3 из 5:</b> Укажите примерный бюджет (например: $250 - $400):",
        parse_mode="HTML"
    )

@dp.message(OrderForm.budget)
async def process_budget(message: types.Message, state: FSMContext):
    await state.update_data(budget=message.text)
    await state.set_state(OrderForm.description)
    await message.answer(
        "📝 <b>Шаг 4 из 5:</b> Напишите краткое описание задачи или ваши пожелания (или отправьте '-'):",
        parse_mode="HTML"
    )

@dp.message(OrderForm.description)
async def process_description(message: types.Message, state: FSMContext):
    await state.update_data(description=message.text)
    await state.set_state(OrderForm.contact)
    await message.answer(
        "📞 <b>Шаг 5 из 5:</b> Укажите ваш контакт для связи (Telegram / Телефон):",
        parse_mode="HTML"
    )

@dp.message(OrderForm.contact)
async def process_contact(message: types.Message, state: FSMContext, bot: Bot):
    data = await state.get_data()
    user_contact = message.text
    user = message.from_user

    # Finish FSM state
    await state.clear()

    await message.answer(
        "🎉 <b>Спасибо! Заявка успешно принята.</b>\n\n"
        "Я уже получил ваше обращение и отвечу вам в ближайшее время!",
        parse_mode="HTML",
        reply_markup=get_main_menu_keyboard()
    )

    # Format notification for Admin
    if ADMIN_CHAT_ID:
        client_handle = f"@{user.username}" if user.username else f"ID: {user.id}"
        admin_card = (
            "🚨 <b>НОВАЯ ЗАЯВКА ИЗ TELEGRAM-БОТА!</b>\n\n"
            f"👤 <b>Клиент:</b> {user.full_name} ({client_handle})\n"
            f"📞 <b>Контакт:</b> {user_contact}\n"
            f"📌 <b>Тип проекта:</b> {data.get('project_type')}\n"
            f"⏱ <b>Сроки:</b> {data.get('timeline')}\n"
            f"💰 <b>Бюджет:</b> {data.get('budget')}\n"
            f"📝 <b>Описание:</b> {data.get('description')}\n"
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
            logger.error(f"Failed to send admin notification: {e}")

# HTTP Webhook Endpoint for Website Lead Submissions
async def handle_web_lead(request):
    try:
        data = await request.json()
        name = data.get("name", "Аноним")
        contact = data.get("contact", "Не указан")
        message = data.get("message", "")

        bot = request.app['bot']
        if ADMIN_CHAT_ID:
            admin_card = (
                "🌐 <b>НОВАЯ ЗАЯВКА С ПОРТФОЛИО-САЙТА!</b>\n\n"
                f"👤 <b>Имя:</b> {name}\n"
                f"📞 <b>Контакт:</b> {contact}\n"
                f"📝 <b>Сообщение / Расчёт:</b>\n{message}\n"
            )
            await bot.send_message(chat_id=ADMIN_CHAT_ID, text=admin_card, parse_mode="HTML")
            return web.json_response({"status": "success"})
        return web.json_response({"status": "error", "reason": "No ADMIN_CHAT_ID"}, status=400)
    except Exception as e:
        logger.error(f"Web lead error: {e}")
        return web.json_response({"status": "error", "message": str(e)}, status=500)

async def main():
    if not BOT_TOKEN:
        print("⚠️ ERROR: BOT_TOKEN is missing in environment variables or .env file!")
        print("Please edit telegram_bot/.env and set your BOT_TOKEN from @BotFather.")
        return

    bot = Bot(token=BOT_TOKEN)
    
    # Setup HTTP Web Server for website lead integrations
    app = web.Application()
    app['bot'] = bot
    app.router.add_post('/api/order', handle_web_lead)

    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(runner, '0.0.0.0', PORT)
    await site.start()
    logger.info(f"HTTP Server listening for Web Leads on port {PORT}")

    print("🚀 Telegram Order Intake Bot started successfully!")
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
