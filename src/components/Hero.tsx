"use client";

import { ArrowRight, ShieldCheck, AlertTriangle, CircleAlert } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 flex flex-col lg:flex-row items-center gap-16">
        {/* Left — Text */}
        <div className="flex-1 max-w-2xl animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-foreground">
            Понятный legal-комплаенс
            <br />
            <span className="text-accent">для креативных индустрий</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-foreground/60 leading-relaxed max-w-xl">
            Автоматический перевод законов в визуальные индикаторы и чек-листы.
            Защити проект до наступления инцидентов.
          </p>
          <button className="mt-8 inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-accent-hover transition-all animate-pulse-glow cursor-pointer">
            Оценить риски бесплатно
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Right — Mock Interface */}
        <div className="flex-1 w-full max-w-lg animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="rounded-2xl border border-gray-mid bg-white shadow-xl overflow-hidden">
            {/* Window bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-light border-b border-gray-mid">
              <span className="h-3 w-3 rounded-full bg-red" />
              <span className="h-3 w-3 rounded-full bg-yellow" />
              <span className="h-3 w-3 rounded-full bg-green" />
              <span className="ml-4 text-xs text-gray-text font-medium">contract_release.pdf — Проверка</span>
            </div>

            {/* Scan area */}
            <div className="relative p-6 space-y-4">
              {/* Scan line animation */}
              <div className="absolute left-0 w-full h-0.5 bg-accent/40 animate-scan-line pointer-events-none" />

              <RiskRow
                icon={<CircleAlert size={18} className="text-red" />}
                color="red"
                label="Высокий риск"
                text="Отчуждение прав в полном объеме"
              />
              <RiskRow
                icon={<AlertTriangle size={18} className="text-yellow" />}
                color="yellow"
                label="Внимание"
                text="Территория использования не ограничена"
              />
              <RiskRow
                icon={<ShieldCheck size={18} className="text-green" />}
                color="green"
                label="Безопасно"
                text="Раздел выплаты royalty заполнен"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RiskRow({
  icon,
  color,
  label,
  text,
}: {
  icon: React.ReactNode;
  color: "red" | "yellow" | "green";
  label: string;
  text: string;
}) {
  const bgMap = {
    red: "bg-red/10 border-red/30",
    yellow: "bg-yellow/10 border-yellow/30",
    green: "bg-green/10 border-green/30",
  };

  return (
    <div className={`flex items-start gap-3 rounded-xl border p-4 ${bgMap[color]}`}>
      <div className="mt-0.5">{icon}</div>
      <div>
        <p className="text-xs font-bold uppercase tracking-wide opacity-70">{label}</p>
        <p className="text-sm font-medium text-foreground">{text}</p>
      </div>
    </div>
  );
}
