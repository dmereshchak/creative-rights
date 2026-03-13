"use client";

import { useState } from "react";
import { Download, CheckSquare, Square } from "lucide-react";

const items = [
  "Проверить пункт об исключительном праве",
  "Подписать акт приема-передачи",
  "Задепонировать master copy / исходники",
  "Проверить территорию действия лицензии",
  "Убедиться в наличии раздела о royalty",
];

export default function Checklist() {
  const [checked, setChecked] = useState<boolean[]>(new Array(items.length).fill(false));

  const toggle = (index: number) => {
    setChecked((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const completedCount = checked.filter(Boolean).length;

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground text-center">
            Чек-лист действий
          </h2>
          <p className="mt-3 text-foreground/60 text-center">
            Пошаговый алгоритм для защиты ваших прав при заключении договора.
          </p>

          {/* Progress */}
          <div className="mt-8 flex items-center gap-3">
            <div className="flex-1 h-2 rounded-full bg-gray-light overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all duration-500"
                style={{ width: `${(completedCount / items.length) * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium text-foreground/60">
              {completedCount}/{items.length}
            </span>
          </div>

          {/* List */}
          <ul className="mt-6 space-y-3">
            {items.map((item, i) => (
              <li key={i}>
                <button
                  onClick={() => toggle(i)}
                  className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all cursor-pointer ${
                    checked[i]
                      ? "border-accent/30 bg-accent/5"
                      : "border-gray-mid bg-white hover:border-accent/40"
                  }`}
                >
                  {checked[i] ? (
                    <CheckSquare size={22} className="text-accent shrink-0" />
                  ) : (
                    <Square size={22} className="text-foreground/30 shrink-0" />
                  )}
                  <span
                    className={`text-sm font-medium transition-colors ${
                      checked[i] ? "text-foreground/50 line-through" : "text-foreground"
                    }`}
                  >
                    {item}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="mt-8 text-center">
            <button className="inline-flex items-center gap-2 rounded-xl border border-accent text-accent px-6 py-3 text-sm font-semibold hover:bg-accent hover:text-white transition-all cursor-pointer">
              <Download size={18} />
              Скачать шаблон безопасного договора
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
