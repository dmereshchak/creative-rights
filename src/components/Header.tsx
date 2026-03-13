"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Инструменты", href: "#tools" },
  { label: "База знаний", href: "#knowledge" },
  { label: "Тарифы", href: "#pricing" },
  { label: "Партнеры", href: "#partners" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-mid/50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 select-none">
          <span className="text-2xl font-extrabold tracking-tight text-foreground">
            Creative<span className="text-accent">Rights</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/70 hover:text-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Auth button */}
        <div className="hidden md:block">
          <button className="rounded-lg border border-foreground/20 px-5 py-2 text-sm font-medium text-foreground hover:border-accent hover:text-accent transition-colors cursor-pointer">
            Войти
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Меню"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-gray-mid/50 bg-white px-6 pb-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-3 text-sm font-medium text-foreground/70 hover:text-accent transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <button className="mt-2 w-full rounded-lg border border-foreground/20 px-5 py-2 text-sm font-medium text-foreground hover:border-accent hover:text-accent transition-colors">
            Войти
          </button>
        </nav>
      )}
    </header>
  );
}
