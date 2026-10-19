import news from "../../content/news.json";

// Лента для клиентов (/news/). Пункты добавляет ежедневная задача только после одобрения
// Артёма; она же удаляет устаревшие. Формат — README, раздел «Лента».
export type NewsCategory = "laws" | "courts" | "platforms" | "taxes" | "industry";

export type NewsItem = {
  id: string; // ГГГГ-ММ-ДД-N — день подборки и номер в письме
  date: string; // дата события или публикации источника, ГГГГ-ММ-ДД
  added: string; // когда опубликовано у нас
  expires?: string; // после этой даты пункт снимается; нет — через NEWS_TTL_DAYS от date
  category: NewsCategory;
  title: string;
  summary: string;
  forYou: string; // что это значит для музыканта
  source: string;
  url: string;
};

export const NEWS_TTL_DAYS = 90;

export const CATEGORIES: { id: NewsCategory; label: string }[] = [
  { id: "laws", label: "Законы и правила" },
  { id: "courts", label: "Суды" },
  { id: "platforms", label: "Площадки и стриминги" },
  { id: "taxes", label: "Налоги и деньги" },
  { id: "industry", label: "Индустрия" },
];

const addDays = (iso: string, days: number) => {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
};

export const expiresOn = (item: NewsItem) => item.expires ?? addDays(item.date, NEWS_TTL_DAYS);

export function activeNews(today = new Date().toISOString().slice(0, 10)): NewsItem[] {
  return (news as NewsItem[])
    .filter((item) => expiresOn(item) >= today)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
