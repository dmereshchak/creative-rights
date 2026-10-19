"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { LeadButton } from "./LeadModal";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";

const navLinks = [
  { label: "Как это работает", href: "#how" },
  { label: "Услуги и цены", href: "#pricing" },
  { label: "Кто мы", href: "#team" },
  { label: "Вопросы", href: "#faq" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur-md border-b border-gray-mid/50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#" className="flex items-center select-none text-foreground" aria-label="CreativeRights — наверх">
          <Logo className="h-8 w-auto md:h-9" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/70 hover:text-accent-strong transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <LeadButton
            offer="consult"
            source="header"
            goal="cta_header"
            className="rounded-lg bg-accent px-5 py-2 text-sm font-semibold text-on-accent hover:bg-accent-hover transition-colors cursor-pointer"
          >
            Запросить консультацию
          </LeadButton>
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-3">
        <ThemeToggle />
        <button
          className="text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Меню"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-gray-mid/50 bg-surface px-6 pb-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-3 text-sm font-medium text-foreground/70 hover:text-accent-strong transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <LeadButton
            offer="consult"
            source="header_mobile"
            goal="cta_header"
            className="mt-2 w-full rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent"
          >
            Запросить консультацию
          </LeadButton>
        </nav>
      )}
    </header>
  );
}
