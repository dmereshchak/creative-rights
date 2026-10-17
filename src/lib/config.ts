// Настройки, которые команда заполняет сама. Инструкция — в README.md.

// Яндекс Метрика: номер счётчика (только цифры). Пусто — Метрика не грузится.
export const YM_ID = "";

// Google-форма, куда падают заявки (ответы видно в Google-таблице).
// action: ссылка вида https://docs.google.com/forms/d/e/<ID>/formResponse
// fields: имена полей вида entry.123456789 — по одному на каждый вопрос формы.
export const GOOGLE_FORM = {
  action: "",
  fields: {
    contact: "",
    name: "",
    segment: "",
    offer: "",
    message: "",
    source: "",
    utm: "",
  },
};

// Контакты на сайте.
export const CONTACT_EMAIL = "hello@creativerights.ru";
export const TELEGRAM_CONTACT_URL = ""; // https://t.me/<ник>, куда писать напрямую
export const TELEGRAM_FEED_URL = ""; // https://t.me/<канал> с лентой правовых изменений

// Сколько заказов идут со скидкой на старте (из плана теста спроса).
export const LAUNCH_DISCOUNT_SLOTS = 20;
