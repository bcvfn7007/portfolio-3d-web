import os
import re
import sqlite3
import asyncio
import logging
from datetime import datetime
from dotenv import load_dotenv
import aiohttp
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
    ReplyKeyboardRemove,
    WebAppInfo
)

# Load environment variables
load_dotenv()

BOT_TOKEN = os.getenv("BOT_TOKEN", "7790495377:AAEAQCqq3Qr9hOQHXqPRFyc2zNNsCa4SltQ").strip()
ADMIN_CHAT_ID = os.getenv("ADMIN_CHAT_ID", "8726413176").strip()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "").strip()
WEB_APP_URL = "https://developer-studio.onrender.com/"
RENDER_EXTERNAL_URL = os.getenv("RENDER_EXTERNAL_URL", "https://portfolio-3d-web.onrender.com/health").strip()

DB_PATH = os.path.join(os.path.dirname(__file__), "leads.db")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

# --- Database Setup & Helper Functions ---
def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Table for leads
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS leads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            contact TEXT,
            service TEXT,
            description TEXT,
            source TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    # Table for registered bot users for broadcast messaging
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS bot_users (
            user_id INTEGER PRIMARY KEY,
            username TEXT,
            full_name TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    # Table for bot settings
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS settings (
            key TEXT PRIMARY KEY,
            value TEXT
        )
    """)
    
    conn.commit()
    conn.close()
    logger.info("SQLite database initialized successfully.")

def set_setting(key: str, value: str):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)", (key, value))
    conn.commit()
    conn.close()

def get_setting(key: str, default: str = "") -> str:
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT value FROM settings WHERE key = ?", (key,))
    row = cursor.fetchone()
    conn.close()
    return row[0] if row else default

def register_user(user_id: int, username: str, full_name: str):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        INSERT OR REPLACE INTO bot_users (user_id, username, full_name)
        VALUES (?, ?, ?)
    """, (user_id, username or "", full_name or ""))
    conn.commit()
    conn.close()

def save_lead(name: str, contact: str, service: str, description: str, source: str):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO leads (name, contact, service, description, source)
        VALUES (?, ?, ?, ?, ?)
    """, (name, contact, service, description, source))
    conn.commit()
    conn.close()

def get_stats():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM leads")
    total_leads = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(*) FROM leads WHERE source = 'site'")
    site_leads = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(*) FROM leads WHERE source = 'bot'")
    bot_leads = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(*) FROM bot_users")
    total_users = cursor.fetchone()[0]
    
    conn.close()
    return total_leads, site_leads, bot_leads, total_users

def get_recent_leads(limit=10):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        SELECT name, contact, service, source, created_at
        FROM leads ORDER BY id DESC LIMIT ?
    """, (limit,))
    rows = cursor.fetchall()
    conn.close()
    return rows

def get_all_user_ids():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT user_id FROM bot_users")
    user_ids = [row[0] for row in cursor.fetchall()]
    conn.close()
    return user_ids

def clean_channel_input(raw: str) -> str:
    s = raw.strip()
    if "t.me/" in s:
        s = s.split("t.me/")[-1].strip("/")
    s = s.lstrip("@")
    if not s.startswith("-100"):
        return f"@{s}"
    return s

def is_valid_contact(contact_str: str) -> bool:
    clean = contact_str.strip().replace(" ", "").replace("-", "").replace("(", "").replace(")", "")
    if clean.startswith("@") and len(clean) >= 5:
        return True
    digits = re.sub(r"[^\d]", "", clean)
    return len(digits) >= 7 and len(digits) <= 15

# --- Google Gemini AI Integration ---
SYSTEM_PROMPT = """
Ты — вежливый, умный и профессиональный ИИ-ассистент студии веб-разработки Alex Dev.Studio.
Твоя задача — отвечать на вопросы клиентов про разработку сайтов, Telegram-ботов и веб-приложений (TMA), консультировать по ценам и помогать оформить заказ.

НАШИ ТАРИФЫ И ЦЕНЫ:
- Лендинги и Сайты: от $20 (Эконом $20-25, Стандарт $35-40, Бизнес $60-70). Сроки: от 3 до 5 дней.
- Telegram-боты: от $15 (Простой $15-20, С БД $30-35, CRM $45-50). Сроки: от 3 до 7 дней.
- Telegram Mini Apps (TMA): от $60. Сроки: от 5 до 7 дней.
- 🔥 Спец-акция "Сайт + Бот": $30 за весь комплект (экономия $10).
- Предоплата: 50% перед стартом разработки, 50% после сдачи готового проекта.
- Портфолио-сайт: https://developer-studio.onrender.com/
- Прямой контакт разработчика Alex: @o_o_developer

ПРАВИЛА ОТВЕТА:
1. Отвечай вежливо, кратко (2-4 предложения) с приятными эмодзи.
2. Подстраивайся под язык пользователя (русский, узбекский или английский).
3. В конце ответа всегда предложи нажать кнопку '🚀 Заказать разработку' или написать напрямую разработчику @o_o_developer.
"""

async def ask_gemini_ai(user_message: str, user_name: str) -> str:
    api_key = get_setting("gemini_api_key", GEMINI_API_KEY)
    
    if not api_key:
        # Intelligent fallback consultation if API key not set yet
        return (
            f"👋 Здравствуйте, {user_name}!\n\n"
            "Я ИИ-консультант студии **Dev.Studio**. Разрабатываем современные сайты от **$20** и Telegram-ботов от **$15** (готовность от 3 дней).\n\n"
            "🔥 У нас действует **Спец-комплект: Сайт + Бот за $30**!\n"
            "Нажмите кнопку **🚀 Заказать разработку** ниже или напишите разработчику в личку: @o_o_developer"
        )

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
    payload = {
        "contents": [
            {
                "role": "user",
                "parts": [
                    {"text": f"{SYSTEM_PROMPT}\n\nИмя клиента: {user_name}\nВопрос клиента: {user_message}"}
                ]
            }
        ]
    }

    try:
        async with aiohttp.ClientSession() as session:
            async with session.post(url, json=payload, timeout=12) as response:
                if response.status == 200:
                    data = await response.json()
                    ai_reply = data['candidates'][0]['content']['parts'][0]['text']
                    return ai_reply.strip()
                else:
                    logger.error(f"Gemini API Error {response.status}")
    except Exception as e:
        logger.error(f"Failed to query Gemini AI: {e}")

    return (
        f"👋 Здравствуйте, {user_name}!\n\n"
        "Мы создаём стильные сайты от $20 и Telegram-ботов от $15 с гарантией качества за 3 дня.\n"
        "Для быстрого заказа нажмите **🚀 Заказать разработку** или напишите напрямую разработчику: @o_o_developer"
    )

# --- FSM States ---
class ServiceWizard(StatesGroup):
    selected_service = State()
    task_description = State()
    contact_info = State()

class AdminStates(StatesGroup):
    waiting_broadcast_message = State()
    waiting_channel_post = State()
    waiting_channel_username = State()
    waiting_gemini_key = State()

# Developer Availability Status State
dev_status = {"available": True}

# --- Keyboards ---
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

def get_admin_keyboard():
    status_text = "🟢 Статус: Открыт к заказам" if dev_status["available"] else "🔴 Статус: Занят"
    ai_status = "🤖 Gemini AI: ВКЛ" if get_setting("ai_enabled", "true") == "true" else "🤖 Gemini AI: ВЫКЛ"
    return ReplyKeyboardMarkup(
        keyboard=[
            [KeyboardButton(text="📊 Статистика"), KeyboardButton(text="📋 Последние заявки")],
            [KeyboardButton(text="📝 Пост в Канал"), KeyboardButton(text="📢 Массовая рассылка")],
            [KeyboardButton(text=ai_status), KeyboardButton(text="🔑 Ввести Gemini API Key")],
            [KeyboardButton(text=status_text), KeyboardButton(text="⚙️ Настройки Канала")],
            [KeyboardButton(text="🚪 Выйти из админки")]
        ],
        resize_keyboard=True
    )

def get_channel_post_inline_keyboard():
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text="📱 3D Портфолио (TMA)", web_app=WebAppInfo(url=WEB_APP_URL))],
            [
                InlineKeyboardButton(text="🚀 Заказать разработку ↗️", url="https://t.me/zakaz_priyom_bot?start=channel"),
                InlineKeyboardButton(text="💬 Написать разработчику ↗️", url="https://t.me/o_o_developer")
            ]
        ]
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

# --- Admin Panel Handlers ---

def is_admin(user_id: int) -> bool:
    return str(user_id) == str(ADMIN_CHAT_ID)

@dp.message(Command("admin"))
async def cmd_admin(message: types.Message, state: FSMContext):
    if not is_admin(message.from_user.id):
        await message.answer("⚠️ Доступ запрещен.", reply_markup=get_main_menu_keyboard())
        return

    await state.clear()
    target_chan = get_setting("channel_username", "Не привязан")
    await message.answer(
        "⚙️ <b>Панель администратора Dev.Studio</b>\n\n"
        f"📢 <b>Привязанный канал:</b> <code>{target_chan}</code>\n"
        f"🤖 <b>Gemini AI API Key:</b> {'Установлен ✅' if get_setting('gemini_api_key', GEMINI_API_KEY) else 'Не задан ⚠️'}\n\n"
        "Выберите действие на клавиатуре ниже:",
        parse_mode="HTML",
        reply_markup=get_admin_keyboard()
    )

@dp.message(F.text.startswith("🤖 Gemini AI:"))
async def admin_toggle_ai(message: types.Message):
    if not is_admin(message.from_user.id):
        return

    current = get_setting("ai_enabled", "true")
    new_val = "false" if current == "true" else "true"
    set_setting("ai_enabled", new_val)
    
    status_msg = "🟢 <b>Gemini AI Включен</b> — бот будет автоматически консультировать клиентов 24/7!" if new_val == "true" else "🔴 <b>Gemini AI Отключен</b>"
    await message.answer(status_msg, parse_mode="HTML", reply_markup=get_admin_keyboard())

@dp.message(F.text == "🔑 Ввести Gemini API Key")
async def admin_set_gemini_key(message: types.Message, state: FSMContext):
    if not is_admin(message.from_user.id):
        return

    await state.set_state(AdminStates.waiting_gemini_key)
    cancel_kb = ReplyKeyboardMarkup(keyboard=[[KeyboardButton(text="❌ Отмена")]], resize_keyboard=True)
    await message.answer(
        "🔑 <b>НАСТРОЙКА GOOGLE GEMINI API KEY:</b>\n\n"
        "Отправьте ваш бесплатный API Ключ от Google Gemini (получить бесплатно на <code>aistudio.google.com</code>):",
        parse_mode="HTML",
        reply_markup=cancel_kb
    )

@dp.message(AdminStates.waiting_gemini_key)
async def process_save_gemini_key(message: types.Message, state: FSMContext):
    if not is_admin(message.from_user.id):
        return

    if message.text == "❌ Отмена":
        await state.clear()
        await message.answer("Отменено.", reply_markup=get_admin_keyboard())
        return

    key_input = message.text.strip()
    set_setting("gemini_api_key", key_input)
    set_setting("ai_enabled", "true")
    await state.clear()
    
    await message.answer(
        "✅ <b>Google Gemini API Key успешно сохранен!</b>\n\n"
        "Теперь ИИ-Консультант автоматически отвечает клиентам 24/7!",
        parse_mode="HTML",
        reply_markup=get_admin_keyboard()
    )

@dp.message(F.text == "📊 Статистика")
async def admin_stats(message: types.Message):
    if not is_admin(message.from_user.id):
        return

    total_leads, site_leads, bot_leads, total_users = get_stats()
    status_str = "🟢 Открыт к заказам 24/7" if dev_status["available"] else "🔴 Занят на проекте"
    target_chan = get_setting("channel_username", "Не привязан")
    ai_str = "ВКЛ 🤖" if get_setting("ai_enabled", "true") == "true" else "ВЫКЛ"

    stats_text = (
        "📊 <b>СТАТИСТИКА БОТА И ЗАЯВОК:</b>\n\n"
        f"🎯 <b>Всего заявок:</b> {total_leads}\n"
        f"🌐 <b>Заявок с сайта:</b> {site_leads}\n"
        f"🤖 <b>Заявок из Telegram-бота:</b> {bot_leads}\n"
        f"👥 <b>Всего пользователей в базе:</b> {total_users}\n"
        f"📢 <b>Привязанный канал:</b> <code>{target_chan}</code>\n"
        f"🧠 <b>Gemini AI Консультант:</b> {ai_str}\n"
        f"⚡ <b>Текущий статус разработчика:</b> {status_str}"
    )
    await message.answer(stats_text, parse_mode="HTML", reply_markup=get_admin_keyboard())

@dp.message(F.text == "📋 Последние заявки")
async def admin_recent_leads(message: types.Message):
    if not is_admin(message.from_user.id):
        return

    leads = get_recent_leads(10)
    if not leads:
        await message.answer("📋 Заявок пока нет в базе данных.", reply_markup=get_admin_keyboard())
        return

    text = "📋 <b>ПОСЛЕДНИЕ 10 ЗАЯВОК:</b>\n\n"
    for idx, (name, contact, service, source, created_at) in enumerate(leads, 1):
        icon = "🌐 Сайт" if source == "site" else "🤖 Бот"
        text += (
            f"<b>{idx}. {name}</b> ({icon})\n"
            f"📞 Контакт: <code>{contact}</code>\n"
            f"📌 Услуга: {service}\n"
            f"⏱ Дата: {created_at}\n\n"
        )

    await message.answer(text, parse_mode="HTML", reply_markup=get_admin_keyboard())

@dp.message(F.text == "⚙️ Настройки Канала")
async def admin_channel_settings(message: types.Message, state: FSMContext):
    if not is_admin(message.from_user.id):
        return

    await state.set_state(AdminStates.waiting_channel_username)
    current_chan = get_setting("channel_username", "Не привязан")
    
    cancel_kb = ReplyKeyboardMarkup(
        keyboard=[[KeyboardButton(text="❌ Отмена")]],
        resize_keyboard=True
    )

    await message.answer(
        "⚙️ <b>НАСТРОЙКА КАНАЛА ДЛЯ ПУБЛИКАЦИИ:</b>\n\n"
        f"Текущий канал: <code>{current_chan}</code>\n\n"
        "Отправьте юзернейм или ссылку на канал (например: <code>@dev_0_studio</code> или <code>https://t.me/dev_0_studio</code>):",
        parse_mode="HTML",
        reply_markup=cancel_kb
    )

@dp.message(AdminStates.waiting_channel_username)
async def process_set_channel_username(message: types.Message, state: FSMContext):
    if not is_admin(message.from_user.id):
        return

    if message.text == "❌ Отмена":
        await state.clear()
        await message.answer("Настройка канала отменена.", reply_markup=get_admin_keyboard())
        return

    cleaned_channel = clean_channel_input(message.text)
    set_setting("channel_username", cleaned_channel)
    await state.clear()
    
    await message.answer(
        f"✅ Канал успешно привязан: <code>{cleaned_channel}</code>",
        parse_mode="HTML",
        reply_markup=get_admin_keyboard()
    )

@dp.message(F.text == "📝 Пост в Канал")
async def admin_start_channel_post(message: types.Message, state: FSMContext):
    if not is_admin(message.from_user.id):
        return

    target_chan = get_setting("channel_username", "")
    if not target_chan:
        await state.set_state(AdminStates.waiting_channel_username)
        cancel_kb = ReplyKeyboardMarkup(keyboard=[[KeyboardButton(text="❌ Отмена")]], resize_keyboard=True)
        await message.answer(
            "⚠️ <b>Канал ещё не привязан!</b>\n\n"
            "Пожалуйста, отправьте ссылку или юзернейм вашего канала (например: <code>@dev_0_studio</code>):",
            parse_mode="HTML",
            reply_markup=cancel_kb
        )
        return

    await state.set_state(AdminStates.waiting_channel_post)
    cancel_kb = ReplyKeyboardMarkup(keyboard=[[KeyboardButton(text="❌ Отмена")]], resize_keyboard=True)
    
    await message.answer(
        f"📝 <b>СОЗДАНИЕ ПОСТА ДЛЯ КАНАЛА ({target_chan}):</b>\n\n"
        "Отправьте текст или картинку с описанием поста.\n"
        "Бот автоматически прикрепит к посту интерактивные кнопки!",
        parse_mode="HTML",
        reply_markup=cancel_kb
    )

@dp.message(AdminStates.waiting_channel_post)
async def process_channel_post_draft(message: types.Message, state: FSMContext, bot: Bot):
    if not is_admin(message.from_user.id):
        return

    if message.text == "❌ Отмена":
        await state.clear()
        await message.answer("Отменено.", reply_markup=get_admin_keyboard())
        return

    target_chan = get_setting("channel_username", "")
    await state.clear()

    await message.answer("⏳ <b>Предпросмотр поста с кнопками:</b>", parse_mode="HTML", reply_markup=get_admin_keyboard())

    try:
        if message.photo:
            photo_file_id = message.photo[-1].file_id
            caption_text = message.caption or ""
            preview_msg = await bot.send_photo(
                chat_id=message.chat.id,
                photo=photo_file_id,
                caption=caption_text,
                reply_markup=get_channel_post_inline_keyboard()
            )
        else:
            preview_msg = await bot.send_message(
                chat_id=message.chat.id,
                text=message.text,
                reply_markup=get_channel_post_inline_keyboard()
            )

        confirm_inline_kb = InlineKeyboardMarkup(
            inline_keyboard=[
                [InlineKeyboardButton(text="✅ Опубликовать в Канал", callback_data=f"publish_post_{preview_msg.message_id}")],
                [InlineKeyboardButton(text="❌ Отменить", callback_data="cancel_post")]
            ]
        )

        await message.answer(
            f"👆 Выше показан предпросмотр.\nОпубликовать в канал <code>{target_chan}</code>?",
            parse_mode="HTML",
            reply_markup=confirm_inline_kb
        )
    except Exception as e:
        logger.error(f"Failed to generate channel post preview: {e}")
        await message.answer(f"❌ Ошибка генерации поста: {e}", reply_markup=get_admin_keyboard())

@dp.callback_query(F.data.startswith("publish_post_"))
async def callback_publish_channel_post(callback: types.CallbackQuery, bot: Bot):
    if not is_admin(callback.from_user.id):
        await callback.answer("⚠️ Отказано в доступе.", show_alert=True)
        return

    target_chan = get_setting("channel_username", "")
    if not target_chan:
        await callback.answer("⚠️ Канал не привязан! Перейдите в Настройки Канала.", show_alert=True)
        return

    preview_msg_id = int(callback.data.split("_")[2])

    try:
        await bot.copy_message(
            chat_id=target_chan,
            from_chat_id=callback.message.chat.id,
            message_id=preview_msg_id,
            reply_markup=get_channel_post_inline_keyboard()
        )
        await callback.message.edit_text(f"🎉 <b>ПОСТ УСПЕШНО ОПУБЛИКОВАН В КАНАЛ {target_chan}!</b>", parse_mode="HTML")
        await callback.answer("Опубликовано!")
    except Exception as e:
        logger.error(f"Failed to publish post to channel {target_chan}: {e}")
        await callback.message.edit_text(
            f"❌ <b>Ошибка публикации в {target_chan}:</b>\n<code>{e}</code>\n\n"
            "Убедитесь, что бот добавлен в Администраторы канала с правом публикации!",
            parse_mode="HTML"
        )
        await callback.answer("Ошибка публикации!", show_alert=True)

@dp.callback_query(F.data == "cancel_post")
async def callback_cancel_channel_post(callback: types.CallbackQuery):
    await callback.message.edit_text("Публикация поста отменена.")
    await callback.answer()

@dp.message(F.text.startswith("🟢 Статус:") | F.text.startswith("🔴 Статус:"))
async def admin_toggle_status(message: types.Message):
    if not is_admin(message.from_user.id):
        return

    dev_status["available"] = not dev_status["available"]
    new_status = "🟢 Открыт к заказам 24/7" if dev_status["available"] else "🔴 Занят на проекте"
    
    await message.answer(
        f"✅ Статус успешно изменён на: <b>{new_status}</b>",
        parse_mode="HTML",
        reply_markup=get_admin_keyboard()
    )

@dp.message(F.text == "📢 Массовая рассылка")
async def admin_start_broadcast(message: types.Message, state: FSMContext):
    if not is_admin(message.from_user.id):
        return

    await state.set_state(AdminStates.waiting_broadcast_message)
    cancel_kb = ReplyKeyboardMarkup(
        keyboard=[[KeyboardButton(text="❌ Отменить рассылку")]],
        resize_keyboard=True
    )
    await message.answer(
        "📢 <b>Режим массовой рассылки клиентам</b>\n\n"
        "Отправьте текст или сообщение, которое увидят все зарегистрированные пользователи бота.\n"
        "Для отмены нажмите кнопку ниже:",
        parse_mode="HTML",
        reply_markup=cancel_kb
    )

@dp.message(F.text == "❌ Отменить рассылку", AdminStates.waiting_broadcast_message)
async def admin_cancel_broadcast(message: types.Message, state: FSMContext):
    await state.clear()
    await message.answer("Рассылка отменена.", reply_markup=get_admin_keyboard())

@dp.message(AdminStates.waiting_broadcast_message)
async def admin_process_broadcast(message: types.Message, state: FSMContext, bot: Bot):
    if not is_admin(message.from_user.id):
        return

    await state.clear()
    user_ids = get_all_user_ids()
    if not user_ids:
        await message.answer("⚠️ В базе данных пока нет пользователей для рассылки.", reply_markup=get_admin_keyboard())
        return

    await message.answer(f"⏳ Запуск рассылки на {len(user_ids)} пользователей...", reply_markup=get_admin_keyboard())

    success_count = 0
    fail_count = 0

    for u_id in user_ids:
        try:
            await bot.copy_message(
                chat_id=u_id,
                from_chat_id=message.chat.id,
                message_id=message.message_id
            )
            success_count += 1
            await asyncio.sleep(0.05)
        except Exception as e:
            fail_count += 1
            logger.warning(f"Broadcast failed for user {u_id}: {e}")

    report = (
        "✅ <b>РАССЫЛКА УСПЕШНО ЗАВЕРШЕНА!</b>\n\n"
        f"📊 Успешно доставлено: <b>{success_count}</b>\n"
        f"❌ Ошибок / Заблокировали бота: <b>{fail_count}</b>"
    )
    await message.answer(report, parse_mode="HTML", reply_markup=get_admin_keyboard())

@dp.message(F.text == "🚪 Выйти из админки")
async def admin_exit(message: types.Message, state: FSMContext):
    await state.clear()
    await message.answer("Вы вышли из админ-панели.", reply_markup=get_main_menu_keyboard())

# --- Client Facing Bot Handlers ---

@dp.message(CommandStart())
async def cmd_start(message: types.Message, state: FSMContext):
    await state.clear()
    user = message.from_user
    register_user(user.id, user.username, user.full_name)

    welcome_text = (
        f"👋 <b>Здравствуйте, {user.first_name}!</b>\n\n"
        "Я официальный ИИ-ассистент студии веб-разработки <b>Alex (Dev.Studio)</b>.\n\n"
        "Чем я могу помочь?\n"
        "• 📱 <b>Открыть Web App (TMA)</b> — запустить сайт прямо в Telegram!\n"
        "• 🚀 <b>Заказать разработку</b> — оформить заявку на сайт или бота за 1 минуту\n"
        "• 💼 <b>Мои проекты</b> — посмотреть примеры реальных работающих сайтов\n"
        "• 💰 <b>Узнать цены</b> — ознакомиться с тарифами\n"
        "• 💬 <b>Прямая связь</b> — написать мне напрямую\n\n"
        "💡 <i>Вы также можете задать мне любой вопрос про разработку в свободной форме!</i>"
    )
    await message.answer(welcome_text, parse_mode="HTML", reply_markup=get_main_menu_keyboard())

@dp.message(F.text == "🚀 Заказать разработку")
async def cmd_order_start(message: types.Message, state: FSMContext):
    await state.clear()
    user = message.from_user
    register_user(user.id, user.username, user.full_name)

    text = (
        "🎯 <b>Какая услуга вас интересует?</b>\n\n"
        "Выберите вариант ниже:"
    )
    await message.answer(text, parse_mode="HTML", reply_markup=get_service_choice_keyboard())

@dp.message(F.text == "💼 Мои проекты")
async def cmd_portfolio(message: types.Message):
    user = message.from_user
    register_user(user.id, user.username, user.full_name)

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

@dp.message(F.text == "💬 Прямая связь")
async def cmd_direct_contact(message: types.Message):
    user = message.from_user
    register_user(user.id, user.username, user.full_name)

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

@dp.message(F.text == "💰 Узнать цены")
async def cmd_pricing(message: types.Message):
    user = message.from_user
    register_user(user.id, user.username, user.full_name)

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

@dp.message(F.text == "❌ Отмена")
async def cancel_wizard(message: types.Message, state: FSMContext):
    await state.clear()
    await message.answer("Действие отменено.", reply_markup=get_main_menu_keyboard())

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

@dp.message(ServiceWizard.contact_info)
async def process_contact_info(message: types.Message, state: FSMContext, bot: Bot):
    if message.text == "❌ Отмена":
        await state.clear()
        await message.answer("Отменено.", reply_markup=get_main_menu_keyboard())
        return

    user = message.from_user

    if message.contact:
        contact_text = f"📱 {message.contact.phone_number}"
    else:
        contact_text = message.text.strip()
        if not is_valid_contact(contact_text):
            await message.answer(
                "⚠️ <b>Пожалуйста, введите корректный номер телефона</b> (напр. <code>+998901234567</code>) или ваш Telegram <code>@username</code>:\n"
                "или нажмите кнопку <b>«📱 Поделиться контактом»</b> ниже 👇",
                parse_mode="HTML",
                reply_markup=get_contact_keyboard()
            )
            return

    data = await state.get_data()
    service = data.get("selected_service", "Разработка")
    task_desc = data.get("task_description", "Не указано")

    client_name = user.full_name or user.first_name or "Клиент"
    user_username = f"@{user.username}" if user.username else f"ID: {user.id}"

    save_lead(client_name, contact_text, service, task_desc, "bot")

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

# Fallback AI Assistant Handler for Free-Form Client Questions
@dp.message()
async def fallback_gemini_ai_handler(message: types.Message, state: FSMContext):
    user = message.from_user
    register_user(user.id, user.username, user.full_name)

    current_state = await state.get_state()
    if current_state is not None:
        return

    # Check if AI Assistant is enabled in settings
    if get_setting("ai_enabled", "true") == "true":
        await message.bot.send_chat_action(chat_id=message.chat.id, action="typing")
        client_name = user.first_name or user.full_name or "Клиент"
        ai_response = await ask_gemini_ai(message.text, client_name)
        
        inline_kb = InlineKeyboardMarkup(
            inline_keyboard=[
                [InlineKeyboardButton(text="🚀 Заказать разработку", callback_data="wizard_site")],
                [InlineKeyboardButton(text="💬 Написать Alex в личку", url="https://t.me/o_o_developer")]
            ]
        )
        await message.answer(ai_response, parse_mode="Markdown", reply_markup=inline_kb)
    else:
        await message.answer(
            "Воспользуйтесь кнопками меню ниже для заказа или просмотра проектов 👇",
            reply_markup=get_main_menu_keyboard()
        )

# Render Health Check Route Handler
async def handle_health_check(request):
    return web.Response(text="Render Health Check OK - Telegram Bot, Gemini AI & Admin 24/7 Active!", status=200)

# 24/7 Self-Ping Keep-Alive Task (Prevents Render Free Inactivity Sleep)
async def self_ping_loop():
    await asyncio.sleep(15)
    logger.info(f"Starting 24/7 Self-Ping Keep-Alive Task for: {RENDER_EXTERNAL_URL}")
    
    async with aiohttp.ClientSession() as session:
        while True:
            try:
                async with session.get(RENDER_EXTERNAL_URL, timeout=10) as resp:
                    logger.info(f"Self-ping keep-alive success! Status code: {resp.status}")
            except Exception as e:
                logger.warning(f"Self-ping keep-alive ping error: {e}")
            
            await asyncio.sleep(240)

async def main():
    if not BOT_TOKEN:
        logger.error("⚠️ BOT_TOKEN is missing!")
        return

    init_db()

    logger.info("Starting Telegram Bot with Aiogram Long Polling, Gemini AI & Channel Poster...")
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

    asyncio.create_task(self_ping_loop())

    logger.info("🚀 Telegram Order Intake, Portfolio, Gemini AI & Admin Panel Bot is live 24/7!")
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
