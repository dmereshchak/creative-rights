import { FileSignature, Disc3, Users, Headphones, Ban, Copy } from "lucide-react";

const situations = [
  {
    icon: FileSignature,
    title: "Договор с лейблом или дистрибьютором",
    text: "Понять, что ты отдаёшь, на какой срок и как потом выйти.",
  },
  {
    icon: Disc3,
    title: "Покупка или продажа бита",
    text: "Лизинг или эксклюзив, что можно делать с треком и где его выпускать.",
  },
  {
    icon: Users,
    title: "Фит и совместный трек",
    text: "Кто автор, кто владеет мастером и как делить доходы — до релиза, а не после.",
  },
  {
    icon: Headphones,
    title: "Продюсер, аранжировщик, сессионщик",
    text: "Оформить права на их вклад, чтобы трек можно было спокойно выпускать.",
  },
  {
    icon: Ban,
    title: "Трек сняли со стриминга",
    text: "Пришла претензия или блокировка — разобраться, кто прав и что ответить.",
  },
  {
    icon: Copy,
    title: "Твой трек используют без спроса",
    text: "Понять, нарушение ли это, и что можно потребовать.",
  },
];

export default function Situations() {
  return (
    <section className="bg-gray-light py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">С чем приходят</h2>
        <p className="mt-3 text-foreground/60 max-w-xl">
          Музыкант встречается с юристом раз-два в год, но именно тогда решается, кому достанется трек.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {situations.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-2xl border border-gray-mid bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10">
                <Icon size={22} className="text-accent" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-foreground">{title}</h3>
              <p className="mt-2 text-sm text-foreground/60 leading-relaxed">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
