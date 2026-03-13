"use client";

import { useState, useEffect } from "react";
import { Upload, FileSearch, CircleAlert, AlertTriangle, ShieldCheck } from "lucide-react";

const demoResults = [
  {
    icon: CircleAlert,
    color: "red" as const,
    label: "Высокий риск",
    clause: "п. 3.1 — Отчуждение прав в полном объеме",
    detail: "Риск потери контроля над произведением",
  },
  {
    icon: AlertTriangle,
    color: "yellow" as const,
    label: "Внимание",
    clause: "п. 5.2 — Территория не ограничена",
    detail: "Требует уточнения территории действия лицензии",
  },
  {
    icon: ShieldCheck,
    color: "green" as const,
    label: "Безопасно",
    clause: "п. 7.4 — Раздел выплаты royalty",
    detail: "Условия выплат определены корректно",
  },
];

const colorMap = {
  red: { bg: "bg-red/10", border: "border-red/30", text: "text-red" },
  yellow: { bg: "bg-yellow/10", border: "border-yellow/30", text: "text-yellow" },
  green: { bg: "bg-green/10", border: "border-green/30", text: "text-green" },
};

export default function RiskTrafficLight() {
  const [scanning, setScanning] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const startDemo = () => {
    setShowResults(false);
    setScanning(true);
  };

  useEffect(() => {
    if (scanning) {
      const timer = setTimeout(() => {
        setScanning(false);
        setShowResults(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [scanning]);

  return (
    <section className="bg-gray-light py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
            Загрузи документ — мы подсветим риски
          </h2>
          <p className="mt-3 text-foreground/60 max-w-xl mx-auto">
            Наша система автоматически анализирует договоры и выделяет потенциально опасные пункты.
          </p>
        </div>

        <div className="mt-12 mx-auto max-w-2xl">
          {/* Drop zone */}
          <div
            onClick={startDemo}
            className="flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-gray-mid bg-white p-12 cursor-pointer hover:border-accent transition-colors group"
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors">
              <Upload size={28} className="text-accent" />
            </div>
            <p className="text-base font-medium text-foreground/60">
              Перетащите файл или <span className="text-accent font-semibold">нажмите для загрузки</span>
            </p>
            <p className="text-xs text-gray-text">PDF, DOC, DOCX — до 10 МБ</p>
          </div>

          {/* Demo animation */}
          {scanning && (
            <div className="mt-8 rounded-2xl border border-gray-mid bg-white p-6 overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <FileSearch size={20} className="text-accent animate-pulse" />
                <span className="text-sm font-medium text-foreground">
                  Анализ <span className="text-accent">contract_release.pdf</span>...
                </span>
              </div>
              <div className="relative h-2 rounded-full bg-gray-mid overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-accent rounded-full transition-all duration-2500"
                  style={{ animation: "grow 2.5s ease-in-out forwards" }}
                />
              </div>
              <style>{`@keyframes grow { from { width: 0% } to { width: 100% } }`}</style>
            </div>
          )}

          {/* Results */}
          {showResults && (
            <div className="mt-8 space-y-4 animate-fade-in-up">
              <div className="flex items-center gap-2 mb-2">
                <FileSearch size={18} className="text-accent" />
                <span className="text-sm font-semibold text-foreground">
                  contract_release.pdf — Результат проверки
                </span>
              </div>
              {demoResults.map((item, i) => {
                const Icon = item.icon;
                const c = colorMap[item.color];
                return (
                  <div
                    key={i}
                    className={`flex items-start gap-4 rounded-xl border p-5 ${c.bg} ${c.border}`}
                    style={{ animationDelay: `${i * 0.15}s` }}
                  >
                    <Icon size={20} className={`${c.text} mt-0.5 shrink-0`} />
                    <div>
                      <p className={`text-xs font-bold uppercase tracking-wide ${c.text}`}>{item.label}</p>
                      <p className="mt-1 text-sm font-semibold text-foreground">{item.clause}</p>
                      <p className="mt-0.5 text-sm text-foreground/60">{item.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
