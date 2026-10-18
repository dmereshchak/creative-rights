import { ArrowRight, ShieldCheck, AlertTriangle, CircleAlert, MessageSquareText } from "lucide-react";
import { LeadButton } from "./LeadModal";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-28 flex flex-col lg:flex-row items-center gap-14">
        {/* Left — Text */}
        <div className="flex-1 max-w-2xl animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-foreground">
            Лейбл прислал договор?
            <br />
            <span className="text-accent">Сначала покажи его нам</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-foreground/60 leading-relaxed max-w-xl">
            ИИ размечает рискованные пункты, юрист проверяет каждый разбор и объясняет простыми
            словами, что ты отдаёшь и что поправить. Ответ за 24 часа.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <LeadButton
              offer="consult"
              source="hero"
              goal="cta_hero"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-accent-hover transition-all animate-pulse-glow cursor-pointer"
            >
              Запросить консультацию
              <ArrowRight size={20} />
            </LeadButton>
            <a
              href="#pricing"
              className="inline-flex items-center justify-center rounded-xl border border-foreground/15 px-8 py-4 text-lg font-semibold text-foreground hover:border-accent hover:text-accent transition-colors"
            >
              Цены
            </a>
          </div>
          <p className="mt-4 text-sm text-foreground/50">
            Проверка или составление договора — 2 990 ₽.
          </p>
        </div>

        {/* Right — пример разбора */}
        <div className="flex-1 w-full max-w-lg animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="rounded-2xl border border-gray-mid bg-surface shadow-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-light border-b border-gray-mid">
              <span className="h-3 w-3 rounded-full bg-red" />
              <span className="h-3 w-3 rounded-full bg-yellow" />
              <span className="h-3 w-3 rounded-full bg-green" />
              <span className="ml-4 text-xs text-gray-text font-medium">
                Пример разбора · договор с лейблом.pdf
              </span>
            </div>

            <div className="relative p-6 space-y-4">
              <div className="absolute left-0 w-full h-0.5 bg-accent/40 animate-scan-line pointer-events-none" />

              <RiskRow
                icon={<CircleAlert size={18} className="text-red" />}
                color="red"
                label="Высокий риск"
                text="Исключительное право на трек переходит лейблу навсегда"
              />
              <RiskRow
                icon={<AlertTriangle size={18} className="text-yellow" />}
                color="yellow"
                label="Внимание"
                text="Роялти 30% — после вычета расходов, которые считает сам лейбл"
              />
              <RiskRow
                icon={<ShieldCheck size={18} className="text-green" />}
                color="green"
                label="Нормально"
                text="Отчёты о прослушиваниях раз в квартал"
              />

              <div className="flex items-start gap-3 rounded-xl border border-accent/30 bg-accent/5 p-4">
                <MessageSquareText size={18} className="mt-0.5 shrink-0 text-accent" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-accent">Комментарий юриста</p>
                  <p className="text-sm font-medium text-foreground">
                    Предложи вместо отчуждения лицензию на 5 лет и закрытый список расходов.
                  </p>
                </div>
              </div>
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
