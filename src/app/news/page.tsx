import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import { CONTACT_EMAIL } from "@/lib/config";
import { activeNews, CATEGORIES, formatDate } from "@/lib/news";

// Страница для клиентов: ссылку отправляем после заявки. С лендинга не ведёт, от поиска закрыта.
export const metadata: Metadata = {
  title: "Лента для клиентов",
  robots: { index: false, follow: false },
};

export default function News() {
  const items = activeNews();
  const groups = CATEGORIES.map((c) => ({ ...c, items: items.filter((i) => i.category === c.id) })).filter(
    (g) => g.items.length > 0,
  );
  const updated = items.reduce((max, i) => (i.added > max ? i.added : max), "");

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gray-mid/50 bg-surface">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-foreground" aria-label="CreativeRights — на главную">
            <Logo className="h-8 w-auto" />
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-14">
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground">Что меняется для музыкантов</h1>
        <p className="mt-3 max-w-2xl text-foreground/70">
          Законы, суды, правила площадок и деньги — коротко, со ссылкой на источник и с выводом, что это значит
          для вас. Устаревшее мы убираем.
        </p>
        {updated && <p className="mt-2 text-sm text-gray-text">Обновлено {formatDate(updated)}</p>}

        {groups.length > 1 && (
          <nav className="mt-8 flex flex-wrap gap-2" aria-label="Разделы">
            {groups.map((g) => (
              <a
                key={g.id}
                href={`#${g.id}`}
                className="rounded-full border border-gray-mid px-4 py-1.5 text-sm font-medium text-foreground/80 hover:border-accent-strong hover:text-accent-strong transition-colors"
              >
                {g.label} <span className="text-gray-text">{g.items.length}</span>
              </a>
            ))}
          </nav>
        )}

        {groups.length === 0 && (
          <p className="mt-12 rounded-2xl border border-gray-mid bg-muted p-8 text-foreground/70">
            Сейчас актуальных материалов нет — новые появятся здесь, как только мы их проверим.
          </p>
        )}

        {groups.map((g) => (
          <section key={g.id} id={g.id} className="mt-14 scroll-mt-24">
            <h2 className="text-2xl font-extrabold text-foreground">{g.label}</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {g.items.map((item) => (
                <article key={item.id} className="flex flex-col overflow-hidden rounded-2xl border border-gray-mid bg-surface shadow-sm">
                  {item.image && (
                    <figure>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image.file} alt="" loading="lazy" draggable={false} className="aspect-[16/9] w-full object-cover" />
                      <figcaption className="px-6 pt-2 text-xs text-gray-text">
                        Фото:{" "}
                        <a href={item.image.source} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          {item.image.author}
                        </a>
                        ,{" "}
                        {item.image.licenseUrl ? (
                          <a href={item.image.licenseUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            {item.image.license}
                          </a>
                        ) : (
                          item.image.license
                        )}
                        , Wikimedia Commons
                      </figcaption>
                    </figure>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                  <time dateTime={item.date} className="text-xs text-gray-text">
                    {formatDate(item.date)}
                  </time>
                  <h3 className="mt-2 text-lg font-bold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70">{item.summary}</p>
                  <p className="mt-4 flex-1 border-l-2 border-accent pl-3 text-sm leading-relaxed text-foreground">
                    <span className="font-semibold">Что это значит для вас: </span>
                    {item.forYou}
                  </p>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-strong hover:underline"
                  >
                    {item.source} <ArrowUpRight size={14} />
                  </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}

        <div className="mt-16 rounded-2xl bg-muted p-6 text-sm leading-relaxed text-foreground/70">
          Материалы ленты — справочные и не заменяют консультацию по вашей ситуации. Вопрос по своему договору
          напишите нам:{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-1 font-medium text-accent-strong hover:underline">
            <Mail size={14} />
            {CONTACT_EMAIL}
          </a>
        </div>
      </main>
    </>
  );
}
