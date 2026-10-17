import { Send, ScanSearch, FileCheck2 } from "lucide-react";

const steps = [
  {
    icon: Send,
    title: "Оставь заявку",
    text: "Коротко опиши ситуацию. Мы ответим в течение дня, назовём срок и цену, пришлём, куда отправить договор.",
  },
  {
    icon: ScanSearch,
    title: "ИИ размечает, юрист проверяет",
    text: "ИИ находит рискованные пункты, юрист проверяет разметку, дописывает правки и объяснения. Без юриста разбор не уходит.",
  },
  {
    icon: FileCheck2,
    title: "Получи разбор за 24 часа",
    text: "Что в договоре опасно, что нормально и какие правки предложить другой стороне. Можно задать уточняющие вопросы.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground text-center">Как это работает</h2>

        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="relative rounded-2xl border border-gray-mid bg-white p-8">
              <span className="absolute -top-4 left-8 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                {i + 1}
              </span>
              <Icon size={28} className="text-accent" />
              <h3 className="mt-4 text-xl font-bold text-foreground">{title}</h3>
              <p className="mt-2 text-sm text-foreground/60 leading-relaxed">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
