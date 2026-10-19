// Настройки, которые команда заполняет сама. Инструкция — в README.md.

// Яндекс Метрика: номер счётчика (только цифры). Пусто — Метрика не грузится.
export const YM_ID = "113666741";

// Приём заявок через форму. Выключен до подачи уведомления в Роскомнадзор (ст. 22 152-ФЗ):
// кнопки работают и считаются в Метрике, но вместо формы — предложение написать на почту.
export const FORM_ENABLED = false;

// Яндекс Форма с заявкой (данные хранятся в России — требование ч. 5 ст. 18 152-ФЗ).
// id — из ссылки https://forms.yandex.ru/u/<id>/
// params — идентификаторы скрытых вопросов формы, в которые сайт передаёт значения.
export const YANDEX_FORM = {
  id: "6ad4ec0ec45c07c7a93c7b06",
  params: {
    offer: "offer",
    source: "source",
    utm: "utm",
  },
};

// Контакты на сайте.
export const CONTACT_EMAIL = "creativerights@mail.ru";
export const TELEGRAM_CONTACT_URL = ""; // https://t.me/<ник>, куда писать напрямую

// Адрес сайта — для канонических ссылок, sitemap.xml и разметки для поисковиков.
export const SITE_URL = "https://creativerights.ru";

// Коды подтверждения прав в Яндекс Вебмастере и Google Search Console (мета-тег, только сам код).
export const YANDEX_VERIFICATION = "dd446ff64191196c";
export const GOOGLE_VERIFICATION = "";
