// Офферы на сайте. id попадает в заявку и в цели Метрики: offer_<id>.
export type OfferId =
  | "consult"
  | "contract_review"
  | "contract_draft"
  | "release_pack"
  | "release_full"
  | "sub_personal"
  | "sub_studio";

export const offerLabels: Record<OfferId, string> = {
  consult: "Консультация",
  contract_review: "Проверка договора — 2 990 ₽",
  contract_draft: "Составление договора — 2 990 ₽",
  release_pack: "Пакет договоров для релиза — 1 490 ₽",
  release_full: "Полное ведение релиза — по запросу",
  sub_personal: "Подписка «Личная» — 990 ₽/мес",
  sub_studio: "Подписка «Студия» — 4 990 ₽/мес",
};
