"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { YM_ID } from "@/lib/config";

// Яндекс Метрика грузится только после «Принять» в баннере (согласие 2, consent.md).
// Выбор хранится у посетителя; «Настройки cookie» в подвале открывают баннер снова.
const CHOICE_KEY = "cr_cookie_choice";
const OPEN_COOKIE_SETTINGS = "cr:open-cookie-settings";

type Choice = "accepted" | "declined";

function loadMetrika() {
  if (!YM_ID || document.getElementById("yandex-metrika")) return;
  const w = window as unknown as { ym?: ((...args: unknown[]) => void) & { a?: unknown[]; l?: number } };
  w.ym =
    w.ym ||
    Object.assign((...args: unknown[]) => {
      (w.ym!.a = w.ym!.a || []).push(args);
    }, { l: Date.now() });
  const s = document.createElement("script");
  s.id = "yandex-metrika";
  s.async = true;
  s.src = "https://mc.yandex.ru/metrika/tag.js";
  document.head.appendChild(s);
  w.ym!(Number(YM_ID), "init", { clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: true });
}

export default function Metrika() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let choice: string | null = null;
    try {
      choice = localStorage.getItem(CHOICE_KEY);
    } catch {}
    if (choice === "accepted") loadMetrika();
    // Баннер показываем после гидрации: в статическом HTML его нет
    else if (!choice) requestAnimationFrame(() => setOpen(true));

    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS, reopen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS, reopen);
  }, []);

  const decide = (choice: Choice) => {
    try {
      localStorage.setItem(CHOICE_KEY, choice);
    } catch {}
    setOpen(false);
    if (choice === "accepted") loadMetrika();
    // Отзыв согласия: Метрика перестанет грузиться со следующей страницы
    else if (document.getElementById("yandex-metrika")) location.reload();
  };

  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-label="Файлы cookie"
      className="fixed inset-x-0 bottom-0 z-[90] p-4 sm:p-6"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-gray-mid bg-surface p-5 shadow-2xl sm:flex-row sm:items-center">
        <p className="flex-1 text-sm text-foreground/70 leading-relaxed">
          Мы используем Яндекс Метрику, чтобы понимать, как работает сайт. Она сохраняет файлы cookie и
          записывает действия на страницах. Включим её, только если разрешите.{" "}
          <Link href="/cookies/" className="text-accent underline">
            Подробнее
          </Link>
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="flex-1 rounded-xl border border-accent px-5 py-2.5 text-sm font-semibold text-accent hover:bg-accent hover:text-white transition-colors cursor-pointer"
          >
            Принять
          </button>
          <button
            type="button"
            onClick={() => decide("declined")}
            className="flex-1 rounded-xl border border-accent px-5 py-2.5 text-sm font-semibold text-accent hover:bg-accent hover:text-white transition-colors cursor-pointer"
          >
            Отклонить
          </button>
        </div>
      </div>
    </div>
  );
}

// Ссылка в подвале: снова открыть выбор по cookie.
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS))}>
      Настройки cookie
    </button>
  );
}
