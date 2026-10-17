// Офферы из плана теста спроса (Экономика и тест спроса, раздел 3).
// id попадает в заявку и в цели Метрики: offer_<id>.
export type OfferId =
  | "consult"
  | "contract"
  | "release_pack"
  | "sub_producer"
  | "sub_studio"
  | "feed";

export const offerLabels: Record<OfferId, string> = {
  consult: "Консультация — пока не знаю, что выбрать",
  contract: "Проверка договора — 2 990 ₽",
  release_pack: "Пакет договоров для релиза — 1 490 ₽",
  sub_producer: "Подписка «Продюсер» — 990 ₽/мес",
  sub_studio: "Подписка «Студия» — 4 990 ₽/мес",
  feed: "Лента правовых изменений — бесплатно",
};

export const segments = [
  "Артист",
  "Продюсер / битмейкер",
  "Студия / лейбл",
  "Другое",
] as const;
