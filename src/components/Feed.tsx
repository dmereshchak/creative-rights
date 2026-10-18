import { ArrowUpRight } from "lucide-react";
import feed from "../../content/feed.json";

// Лента правовых изменений для музыкантов. Пункты попадают сюда только после одобрения
// команды (см. README, раздел «Лента»). Пустая лента — блок не показывается.
type FeedItem = {
  date: string; // ГГГГ-ММ-ДД
  title: string;
  summary: string;
  source: string;
  url: string;
};

const items = (feed as FeedItem[])
  .slice()
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 10);

const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });

export default function Feed() {
  if (items.length === 0) return null;
  return (
    <section id="feed" className="bg-surface py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Что меняется для музыкантов</h2>
        <p className="mt-3 text-foreground/60 max-w-xl">
          Законы, суды и правила площадок — коротко и со ссылкой на источник.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article key={item.url + item.title} className="flex flex-col rounded-2xl border border-gray-mid bg-surface p-6 shadow-sm">
              <span className="text-xs text-gray-text">{formatDate(item.date)}</span>
              <h3 className="mt-3 text-lg font-bold text-foreground">{item.title}</h3>
              <p className="mt-2 flex-1 text-sm text-foreground/60 leading-relaxed">{item.summary}</p>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
              >
                {item.source} <ArrowUpRight size={14} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
