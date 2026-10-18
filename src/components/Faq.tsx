import { ArrowRight } from "lucide-react";
import { LeadButton } from "./LeadModal";

const faq = [
  {
    q: "Кто готовит разбор договора?",
    a: "Первичную разметку рисков выполняет ИИ. Каждый разбор проверяет и дополняет юрист команды; без его проверки разбор клиенту не направляется.",
  },
  {
    q: "Как происходит оплата?",
    a: "После получения заявки мы связываемся с вами, уточняем задачу, согласовываем стоимость и срок. Оплата производится переводом после согласования; вы получаете чек.",
  },
  {
    q: "Кто получит доступ к моему договору?",
    a: "Только наша команда. Договор и сведения о нём не публикуются и не передаются третьим лицам. По вашему запросу заключим соглашение о конфиденциальности.",
  },
  {
    q: "Работаете ли вы с договорами на английском языке?",
    a: "Да. Укажите это в заявке: срок подготовки может быть увеличен.",
  },
  {
    q: "Договор уже подписан. Можно ли обратиться?",
    a: "Да. Мы разъясним ваши права и обязанности по действующему договору и возможные дальнейшие действия.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="bg-surface py-20">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground text-center">Вопросы</h2>

        <div className="mt-10 divide-y divide-gray-mid rounded-2xl border border-gray-mid">
          {faq.map(({ q, a }) => (
            <details key={q} className="group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-foreground">
                {q}
                <span className="text-accent text-xl transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm text-foreground/60 leading-relaxed">{a}</p>
            </details>
          ))}
        </div>

        <div className="mt-12 text-center">
          <LeadButton
            offer="consult"
            source="faq"
            goal="cta_faq"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-accent-hover transition-all cursor-pointer"
          >
            Запросить консультацию
            <ArrowRight size={20} />
          </LeadButton>
        </div>
      </div>
    </section>
  );
}
