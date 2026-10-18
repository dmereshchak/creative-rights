"use client";

import { Moon, Sun } from "lucide-react";
import { THEME_STORAGE_KEY } from "@/lib/theme";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Сменить тему"
      title="Светлая / тёмная тема"
      className={`flex h-9 w-9 items-center justify-center rounded-lg border border-gray-mid text-foreground/70 hover:border-accent hover:text-accent transition-colors cursor-pointer ${className}`}
    >
      {/* Иконка зависит от темы через CSS, без перерисовки React */}
      <Moon size={18} className="theme-icon-light" />
      <Sun size={18} className="theme-icon-dark" />
    </button>
  );
}
