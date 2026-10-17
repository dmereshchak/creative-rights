import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Политика обработки персональных данных — CreativeRights",
};

// ЧЕРНОВИК. Текст проверяет и утверждает Артём; до этого форму не публикуем.
// [ОПЕРАТОР] — ФИО самозанятого, который принимает заявки и оплату.
export default function Privacy() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/" className="text-sm font-medium text-accent hover:underline">
        ← На главную
      </Link>
      <h1 className="mt-6 text-3xl md:text-4xl font-extrabold text-foreground">
        Политика обработки персональных данных
      </h1>

      <div className="mt-8 space-y-6 text-sm text-foreground/70 leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-foreground">1. Кто обрабатывает данные</h2>
          <p className="mt-2">
            Оператор — [ОПЕРАТОР] (далее — «мы»). Связаться: {CONTACT_EMAIL}.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-foreground">2. Какие данные</h2>
          <p className="mt-2">
            Из формы заявки: ник в Telegram или email, имя или псевдоним (если указали), кто вы
            (артист, продюсер, студия), выбранная услуга и описание ситуации. Технически: метки
            рекламной кампании (UTM) и данные Яндекс Метрики о посещении сайта.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-foreground">3. Зачем</h2>
          <p className="mt-2">
            Чтобы связаться с вами по заявке, оказать выбранную услугу и понять, какие разделы сайта
            и каналы работают.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-foreground">4. Где хранятся и кому передаются</h2>
          <p className="mt-2">
            Заявки хранятся в Google-таблице, доступ к которой есть только у команды. Статистика
            посещений — в Яндекс Метрике. Третьим лицам для их целей данные не передаём.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-foreground">5. Сколько храним</h2>
          <p className="mt-2">
            До достижения целей обработки, но не дольше 1 года с последнего контакта, или до отзыва
            согласия.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-foreground">6. Ваши права</h2>
          <p className="mt-2">
            Вы можете узнать, какие данные у нас есть, попросить исправить или удалить их и отозвать
            согласие, написав на {CONTACT_EMAIL}. Ответим в течение 10 рабочих дней.
          </p>
        </section>
      </div>
    </main>
  );
}
