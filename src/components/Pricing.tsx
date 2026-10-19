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
    audience: "Проверка или составление",
    price: "1 990 ₽",
    features: ["Лейбл, дистрибьютор, бит", "Разбор рисков и правки", "Договор под вашу ситуацию", "Срок — 24 часа"],
    highlighted: true,
    buttons: [
      { offer: "contract_review", label: "Проверить договор" },
      { offer: "contract_draft", label: "Составить договор" },
    ],
  },
  {
    name: "Пакет для релиза",
    audience: "Договоры под ваш релиз",
    price: "4 490 ₽",
    features: ["Доли между соавторами", "Договор с аранжировщиком", "Договор с сессионщиком", "Лицензия на бит"],
    buttons: [{ offer: "release_pack", label: "Получить пакет" }],
  },
  {
    name: "Полное ведение релиза",
    audience: "От записи до выхода трека",
    price: "По запросу",
    features: ["Договоры с участниками", "Проверка договора с лейблом", "Права на бит, обложку, клип", "Юрист на связи до релиза"],
    buttons: [{ offer: "release_full", label: "Обсудить релиз" }],
  },
  {
    name: "Подписка",
    audience: "Если договоры каждый месяц",
    price: "от 1 490 ₽",
    period: "/мес",
    features: [
      "Вопросы юристу в переписке",
      "Личная — 1 договор в месяц",
      "Студия — до 4 договоров",
      "Студия — ответ за 12 часов",
    ],
    buttons: [
      { offer: "sub_personal", label: "Личная — 1 490 ₽" },
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

        {/* Subgrid: строки «название / описание / цена / список / кнопки» общие для всех карточек,
            поэтому цены и кнопки стоят на одной линии при любой длине текста */}
        <div className="mx-auto mt-12 grid max-w-3xl gap-x-6 gap-y-6 md:grid-cols-2 xl:max-w-none xl:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative row-span-5 grid grid-rows-subgrid gap-y-0 rounded-2xl border p-6 ${
                plan.highlighted ? "border-accent bg-surface shadow-xl" : "border-gray-mid bg-surface shadow-sm"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-4 py-1 text-xs font-bold text-on-accent uppercase tracking-wide">
                  Чаще всего
                </div>
              )}

              <h3 className="text-lg font-bold leading-snug text-foreground">{plan.name}</h3>
              <p className="mt-1 text-sm text-foreground/60">{plan.audience}</p>

              {/* Одна высота цены во всех карточках, включая «По запросу» */}
              <div className="mt-4 flex items-baseline whitespace-nowrap">
                <span className="text-3xl font-extrabold leading-none tracking-tight text-foreground">{plan.price}</span>
                {plan.period && <span className="ml-1 text-sm text-foreground/60">{plan.period}</span>}
              </div>

              <ul className="mt-4 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check size={16} className="text-accent-strong mt-0.5 shrink-0" />
                    <span className="text-sm text-foreground/70">{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 space-y-2 self-start">
                {plan.buttons.map((b, i) => (
                  <LeadButton
                    key={b.offer}
                    offer={b.offer}
                    source="pricing"
                    goal={`offer_${b.offer}`}
                    className={`w-full rounded-xl py-2.5 text-sm font-semibold transition-all cursor-pointer ${
                      i === 0
                        ? "bg-accent text-on-accent hover:bg-accent-hover shadow-md"
                        : "border border-accent-strong text-accent-strong hover:bg-accent hover:text-on-accent"
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
