import { Check } from "lucide-react";
import { LeadButton } from "./LeadModal";
import type { OfferId } from "@/lib/offers";

// У каждой кнопки своя цель в Метрике: offer_<id>.
type Plan = {
  name: string;
  audience: string;
  price: string;
  period?: string;
  features: string[];
  highlighted?: boolean;
  buttons: { offer: OfferId; label: string }[];
};

const plans: Plan[] = [
  {
    name: "Договор",
    audience: "Проверка или составление — на выбор",
    price: "2 990 ₽",
    features: [
      "Договор с лейблом, дистрибьютором, продюсером, битмейкером",
      "Проверка: разбор рисков и правки для другой стороны",
      "Составление: договор под вашу ситуацию",
      "Срок — 24 часа",
    ],
    highlighted: true,
    buttons: [
      { offer: "contract_review", label: "Проверить договор" },
      { offer: "contract_draft", label: "Составить договор" },
    ],
  },
  {
    name: "Пакет для релиза",
    audience: "Документы, которые нужно подписать до выпуска трека",
    price: "1 490 ₽",
    features: [
      "Соглашение о долях между соавторами",
      "Договор с аранжировщиком",
      "Договор с сессионным музыкантом",
      "Лицензия на бит",
    ],
    buttons: [{ offer: "release_pack", label: "Получить пакет" }],
  },
  {
    name: "Полное ведение релиза",
    audience: "Юридическое сопровождение от записи до выхода трека",
    price: "По запросу",
    features: [
      "Договоры со всеми участниками релиза",
      "Проверка договора с дистрибьютором или лейблом",
      "Права на бит, обложку и клип",
      "Юрист на связи до выхода трека",
    ],
    buttons: [{ offer: "release_full", label: "Обсудить релиз" }],
  },
  {
    name: "Подписка",
    audience: "Для тех, у кого договоры каждый месяц",
    price: "от 990 ₽",
    period: "/мес",
    features: [
      "Безлимит шаблонов договоров",
      "Проверка договоров",
      "«Личная» — 990 ₽/мес: артисту или продюсеру",
      "«Студия» — 4 990 ₽/мес: студии или лейблу, несколько пользователей",
    ],
    buttons: [
      { offer: "sub_personal", label: "Личная — 990 ₽" },
      { offer: "sub_studio", label: "Студия — 4 990 ₽" },
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-gray-light py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground text-center">Услуги и цены</h2>
        <p className="mt-3 text-foreground/60 text-center max-w-xl mx-auto">
          Оплата — после того, как юрист посмотрит запрос и подтвердит срок.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-7 flex flex-col ${
                plan.highlighted ? "border-accent bg-surface shadow-xl lg:scale-[1.03]" : "border-gray-mid bg-surface shadow-sm"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-4 py-1 text-xs font-bold text-white uppercase tracking-wide">
                  Чаще всего
                </div>
              )}

              {/* Фиксированная высота шапки, чтобы цены и списки во всех карточках стояли на одной линии */}
              <div className="lg:min-h-[7.5rem]">
                <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                <p className="mt-1 text-sm text-foreground/50">{plan.audience}</p>
              </div>

              <div className="mt-6 flex h-11 items-end">
                <span
                  className={`font-extrabold text-foreground ${/\d/.test(plan.price) ? "text-4xl" : "text-3xl"}`}
                >
                  {plan.price}
                </span>
                {plan.period && <span className="text-base text-foreground/50">{plan.period}</span>}
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check size={18} className="text-accent mt-0.5 shrink-0" />
                    <span className="text-sm text-foreground/70">{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 space-y-2">
                {plan.buttons.map((b, i) => (
                  <LeadButton
                    key={b.offer}
                    offer={b.offer}
                    source="pricing"
                    goal={`offer_${b.offer}`}
                    className={`w-full rounded-xl py-3.5 text-sm font-semibold transition-all cursor-pointer ${
                      i === 0
                        ? "bg-accent text-white hover:bg-accent-hover shadow-md"
                        : "border border-accent text-accent hover:bg-accent hover:text-white"
                    }`}
                  >
                    {b.label}
                  </LeadButton>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
