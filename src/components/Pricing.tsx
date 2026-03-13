import { Check } from "lucide-react";

const plans = [
  {
    name: "Базовый",
    price: "Бесплатно",
    period: "",
    audience: "Фрилансеры, инди-авторы",
    features: [
      "5 проверок документов в месяц",
      "Базовые чек-листы",
      "Лента правовых изменений",
    ],
    highlighted: false,
    cta: "Начать бесплатно",
  },
  {
    name: "Профи",
    price: "1 490 ₽",
    period: "/мес",
    audience: "Продюсеры, менеджеры",
    features: [
      "Безлимитные проверки",
      "Светофор риска — полный анализ",
      "Приоритетная поддержка",
      "Шаблоны договоров",
    ],
    highlighted: true,
    cta: "Выбрать Профи",
  },
  {
    name: "Студия",
    price: "4 990 ₽",
    period: "/мес",
    audience: "Лейблы, агентства",
    features: [
      "Всё из тарифа Профи",
      "API-доступ для интеграций",
      "Консультации юриста",
      "Мультипользовательский доступ",
    ],
    highlighted: false,
    cta: "Выбрать Студию",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-gray-light py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground text-center">
          Тарифы
        </h2>
        <p className="mt-3 text-foreground/60 text-center max-w-xl mx-auto">
          Выберите план, который подходит под масштаб вашей деятельности.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-8 flex flex-col ${
                plan.highlighted
                  ? "border-accent bg-white shadow-xl scale-[1.03]"
                  : "border-gray-mid bg-white shadow-sm"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-bold text-white uppercase tracking-wide">
                  Популярный
                </div>
              )}

              <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
              <p className="mt-1 text-sm text-foreground/50">{plan.audience}</p>

              <div className="mt-6">
                <span className="text-4xl font-extrabold text-foreground">{plan.price}</span>
                {plan.period && (
                  <span className="text-base text-foreground/50">{plan.period}</span>
                )}
              </div>

              <ul className="mt-8 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check size={18} className="text-accent mt-0.5 shrink-0" />
                    <span className="text-sm text-foreground/70">{f}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`mt-8 w-full rounded-xl py-3.5 text-sm font-semibold transition-all cursor-pointer ${
                  plan.highlighted
                    ? "bg-accent text-white hover:bg-accent-hover shadow-lg"
                    : "border border-accent text-accent hover:bg-accent hover:text-white"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
