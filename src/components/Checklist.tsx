"use client";

import { useState } from "react";
import { FileText, CheckSquare, Square } from "lucide-react";
import { LeadButton } from "./LeadModal";

const items = [
  "Сплит-шит подписан всеми авторами музыки и текста",
  "На бит есть лицензия или договор с битмейкером",
  "С аранжировщиком и сессионными музыкантами подписаны договоры",
  "Права на обложку оформлены на тебя",
  "В договоре с дистрибьютором понятны срок, территория и как выйти",
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
    <section id="checklist" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground text-center">
            Чек-лист перед релизом
          </h2>
          <p className="mt-3 text-foreground/60 text-center">
            Отметь, что уже сделано. Каждый пустой пункт — повод для спора, когда трек начнёт приносить деньги.
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
            <LeadButton
              offer="release_pack"
              source="checklist"
              goal="cta_checklist"
              className="inline-flex items-center gap-2 rounded-xl border border-accent text-accent px-6 py-3 text-sm font-semibold hover:bg-accent hover:text-white transition-all cursor-pointer"
            >
              <FileText size={18} />
              Получить договоры для релиза
            </LeadButton>
          </div>
        </div>
      </div>
    </section>
  );
}
