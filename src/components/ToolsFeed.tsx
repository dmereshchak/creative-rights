"use client";

import { useState } from "react";
import { Music, Palette, Video, FileText, ArrowUpRight } from "lucide-react";

const filters = [
  { label: "Музыка", icon: Music },
  { label: "Дизайн и графика", icon: Palette },
  { label: "Производство шоу / Видео", icon: Video },
  { label: "Тексты", icon: FileText },
];

const cards = [
  {
    tag: "Музыка",
    title: "Изменение лицензирования сэмплов для артистов",
    description:
      "С 1 марта 2026 г. вступают в силу новые правила использования музыкальных фрагментов длительностью до 15 секунд. Узнайте, что изменилось.",
    risk: "yellow" as const,
    date: "12 марта 2026",
  },
  {
    tag: "Производство шоу / Видео",
    title: "Обязательная clearance для шоу-форматов",
    description:
      "Правообладатели TV-форматов усиливают контроль. Теперь для адаптации формата требуется письменное согласие.",
    risk: "red" as const,
    date: "8 марта 2026",
  },
  {
    tag: "Дизайн и графика",
    title: "AI-генерация и авторские права: свежая судебная практика",
    description:
      "Суд подтвердил: изображения, созданные нейросетью без участия человека, не подлежат охране авторским правом.",
    risk: "green" as const,
    date: "5 марта 2026",
  },
];

const riskBadge = {
  red: "bg-red/10 text-red",
  yellow: "bg-yellow/10 text-yellow",
  green: "bg-green/10 text-green",
};

export default function ToolsFeed() {
  const [active, setActive] = useState<string | null>(null);

  const filtered = active ? cards.filter((c) => c.tag === active) : cards;

  return (
    <section id="tools" className="bg-gray-light py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
          Инструменты: Фильтры и Лента
        </h2>
        <p className="mt-3 text-foreground/60 max-w-xl">
          Отслеживайте изменения в правовом поле для вашей индустрии.
        </p>

        {/* Filters */}
        <div className="mt-8 flex flex-wrap gap-3">
          {filters.map((f) => {
            const Icon = f.icon;
            const isActive = active === f.label;
            return (
              <button
                key={f.label}
                onClick={() => setActive(isActive ? null : f.label)}
                className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? "border-accent bg-accent text-white"
                    : "border-gray-mid bg-white text-foreground/70 hover:border-accent hover:text-accent"
                }`}
              >
                <Icon size={16} />
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Feed */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((card, i) => (
            <article
              key={i}
              className="group rounded-2xl border border-gray-mid bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${riskBadge[card.risk]}`}>
                  {card.risk === "red" ? "Высокий риск" : card.risk === "yellow" ? "Внимание" : "Информация"}
                </span>
                <span className="text-xs text-gray-text">{card.date}</span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                {card.title}
              </h3>
              <p className="mt-2 text-sm text-foreground/60 leading-relaxed">
                {card.description}
              </p>
              <a
                href="#"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
              >
                Подробнее <ArrowUpRight size={14} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
