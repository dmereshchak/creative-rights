import Image from "next/image";

const people = [
  {
    photo: "/team/dmitry.png",
    name: "Дмитрий Мерещак",
    role: "Юрист и музыкант",
    text: "Действующий артист и продюсер. Знает музыкальные договоры не только по учебнику, но и по своим релизам.",
  },
  {
    photo: "/team/artyom.png",
    name: "Артём Бабанских",
    role: "Юрист",
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
          {people.map(({ photo, name, role, text }) => (
            <article key={name} className="rounded-2xl border border-gray-mid bg-surface p-8 shadow-sm">
              <div className="flex items-center gap-4">
                <Image
                  src={photo}
                  alt={name}
                  width={160}
                  height={160}
                  draggable={false}
                  className="h-20 w-20 shrink-0 rounded-full object-cover object-top ring-2 ring-accent/20"
                />
                <div>
                  <h3 className="text-lg font-bold text-foreground">{name}</h3>
                  <p className="text-sm text-accent-strong font-medium">{role}</p>
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
