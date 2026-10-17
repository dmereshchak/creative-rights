import { ArrowRight } from "lucide-react";
import { LeadButton } from "./LeadModal";

const faq = [
  {
    q: "Это бот или живой юрист?",
    a: "И то и другое. ИИ делает первую разметку договора, а юрист проверяет её, дописывает правки и объяснения. Без проверки юриста разбор не отправляется.",
  },
  {
    q: "Как платить?",
    a: "После заявки мы пишем вам, уточняем задачу и называем срок. Платите переводом, получаете чек. Предоплаты за непонятно что не будет.",
  },
  {
    q: "Кто увидит мой договор?",
    a: "Только мы двое. Договор не публикуем и никому не передаём. Если нужно, подпишем соглашение о конфиденциальности.",
  },
  {
    q: "Договор на английском — разберёте?",
    a: "Да. Напишите об этом в заявке, срок может быть чуть больше.",
  },
  {
    q: "А если договор уже подписан?",
    a: "Всё равно присылайте. Расскажем, какие у вас права по нему сейчас и что можно сделать.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="bg-white py-20">
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
