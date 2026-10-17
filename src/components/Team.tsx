import { Mic2, Scale } from "lucide-react";

const people = [
  {
    icon: Mic2,
    name: "Дмитрий Мерещак",
    role: "Юрист и артист DMERS",
    text: "Действующий артист и продюсер. Знает музыкальные договоры не только по учебнику, но и по своим релизам.",
  },
  {
    icon: Scale,
    name: "Артём",
    role: "Юрист, договоры и права",
    text: "Проверяет каждый разбор перед отправкой и отвечает на вопросы по правам на музыку.",
  },
];

export default function Team() {
  return (
    <section id="team" className="bg-gray-light py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground text-center">Кто мы</h2>
        <p className="mt-3 text-foreground/60 text-center max-w-xl mx-auto">
          Два юриста, один из которых — действующий музыкант. Мы говорим на языке артистов, а не на
          языке канцелярии.
        </p>

        <div className="mt-12 mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {people.map(({ icon: Icon, name, role, text }) => (
            <article key={name} className="rounded-2xl border border-gray-mid bg-white p-8 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                  <Icon size={26} className="text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">{name}</h3>
                  <p className="text-sm text-accent font-medium">{role}</p>
                </div>
              </div>
              <p className="mt-5 text-sm text-foreground/60 leading-relaxed">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
