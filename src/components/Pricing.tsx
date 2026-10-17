import { Check, Send } from "lucide-react";
import { LeadButton } from "./LeadModal";
import FeedButton from "./FeedButton";
import { LAUNCH_DISCOUNT_SLOTS } from "@/lib/config";
import type { OfferId } from "@/lib/offers";

// Четыре карточки из плана теста спроса. У каждой кнопки своя цель: offer_<id>.
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
    name: "Проверка договора",
    audience: "Лейбл, дистрибьютор, продюсер",
    price: "2 990 ₽",
    features: [
      "Разбор рисков по каждому пункту",
      "Правки, которые можно отправить другой стороне",
      "Ответ за 24 часа",
      "Уточняющие вопросы юристу",
    ],
    highlighted: true,
    buttons: [{ offer: "contract", label: "Заказать проверку" }],
  },
  {
    name: "Пакет для релиза",
    audience: "Всё, что нужно подписать до выпуска трека",
    price: "1 490 ₽",
    features: [
      "Сплит-шит для соавторов",
      "Договор с аранжировщиком",
      "Договор с сессионным музыкантом",
      "Лицензия на бит",
    ],
    buttons: [{ offer: "release_pack", label: "Получить пакет" }],
  },
  {
    name: "Подписка",
    audience: "Продюсерам и студиям, у кого договоры каждый месяц",
    price: "от 990 ₽",
    period: "/мес",
    features: [
      "Безлимит шаблонов",
      "Проверки договоров",
      "«Продюсер» — 990 ₽/мес",
      "«Студия» — 4 990 ₽/мес, несколько пользователей",
    ],
    buttons: [
      { offer: "sub_producer", label: "Продюсер — 990 ₽" },
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
          Мы только запустились: первые {LAUNCH_DISCOUNT_SLOTS} заказов — со скидкой 50%. Платите после
          того, как юрист посмотрит запрос.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-7 flex flex-col ${
                plan.highlighted ? "border-accent bg-white shadow-xl lg:scale-[1.03]" : "border-gray-mid bg-white shadow-sm"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-4 py-1 text-xs font-bold text-white uppercase tracking-wide">
                  Чаще всего
                </div>
              )}

              <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
              <p className="mt-1 text-sm text-foreground/50">{plan.audience}</p>

              <div className="mt-6">
                <span className="text-4xl font-extrabold text-foreground">{plan.price}</span>
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
                      plan.highlighted || i === 0
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

          {/* Лента — бесплатный вход (Г-8) */}
          <div className="rounded-2xl border border-gray-mid bg-white p-7 flex flex-col shadow-sm">
            <h3 className="text-xl font-bold text-foreground">Лента изменений</h3>
            <p className="mt-1 text-sm text-foreground/50">Что меняется в законах для музыкантов</p>
            <div className="mt-6">
              <span className="text-4xl font-extrabold text-foreground">0 ₽</span>
            </div>
            <ul className="mt-6 flex-1 space-y-3">
              {["Коротко и без юридического языка", "Только то, что касается музыки", "В Telegram"].map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check size={18} className="text-accent mt-0.5 shrink-0" />
                  <span className="text-sm text-foreground/70">{f}</span>
                </li>
              ))}
            </ul>
            <FeedButton className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-accent py-3.5 text-sm font-semibold text-accent hover:bg-accent hover:text-white transition-all cursor-pointer">
              <Send size={16} />
              Подписаться
            </FeedButton>
          </div>
        </div>
      </div>
    </section>
  );
}
