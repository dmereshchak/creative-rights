"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import Script from "next/script";
import { X } from "lucide-react";
import { CONTACT_EMAIL, FORM_ENABLED, TELEGRAM_CONTACT_URL, YANDEX_FORM } from "@/lib/config";
import { getUtm, reachGoal } from "@/lib/analytics";
import { offerLabels, type OfferId } from "@/lib/offers";

type OpenLead = (offer: OfferId, source: string) => void;

const LeadContext = createContext<OpenLead>(() => {});

export function useLead() {
  return useContext(LeadContext);
}

// Заявка — Яндекс Форма во всплывающем окне. Согласия на обработку данных — внутри формы.
// Сайт передаёт в скрытые вопросы выбранную услугу, кнопку и UTM.
function formUrl(offer: OfferId, source: string) {
  const params = new URLSearchParams({ iframe: "1" });
  params.set(YANDEX_FORM.params.offer, offerLabels[offer]);
  params.set(YANDEX_FORM.params.source, source);
  const utm = getUtm();
  if (utm) params.set(YANDEX_FORM.params.utm, utm);
  return `https://forms.yandex.ru/u/${YANDEX_FORM.id}/?${params}`;
}

export function LeadProvider({ children }: { children: React.ReactNode }) {
  const [lead, setLead] = useState<{ offer: OfferId; source: string } | null>(null);

  const openLead = useCallback<OpenLead>((offer, source) => setLead({ offer, source }), []);
  const close = () => setLead(null);

  useEffect(() => {
    if (!lead) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLead(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lead]);

  return (
    <LeadContext.Provider value={openLead}>
      {children}
      {FORM_ENABLED && YANDEX_FORM.id && <Script src="https://forms.yandex.ru/_static/embed.js" strategy="lazyOnload" />}
      {lead && (
        <div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-ink/70 backdrop-blur-sm p-0 sm:p-6"
          onClick={close}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-title"
            className="relative w-full sm:max-w-xl max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-surface p-6 sm:p-8 shadow-2xl animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={close}
              className="absolute right-4 top-4 text-foreground/40 hover:text-foreground cursor-pointer"
              aria-label="Закрыть"
            >
              <X size={22} />
            </button>

            <h2 id="lead-title" className="pr-8 text-2xl font-extrabold text-foreground">
              Запросить консультацию
            </h2>
            <p className="mt-2 text-sm text-foreground/60 leading-relaxed">
              {offerLabels[lead.offer]}. Ответим в течение рабочего дня. Оплата — после того, как юрист
              посмотрит запрос и подтвердит срок.
            </p>

            {!FORM_ENABLED ? (
              <div className="mt-6 rounded-xl border border-accent/30 bg-accent/5 p-5 text-sm text-foreground/80 leading-relaxed">
                <p className="font-semibold text-foreground">Приём заявок через сайт откроется в ближайшие дни.</p>
                <p className="mt-2">
                  Пока можно написать нам на{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent-strong underline">
                    {CONTACT_EMAIL}
                  </a>{" "}
                  — укажите, какая услуга нужна, и коротко опишите ситуацию. Договор сразу не прикладывайте.
                </p>
              </div>
            ) : YANDEX_FORM.id ? (
              <iframe
                key={`${lead.offer}-${lead.source}`}
                src={formUrl(lead.offer, lead.source)}
                name={`ya-form-${YANDEX_FORM.id}`}
                title="Форма заявки"
                className="mt-4 w-full min-h-[640px] rounded-xl border-0 bg-white"
              />
            ) : (
              <p className="mt-6 rounded-lg bg-red/10 px-4 py-3 text-sm text-red">
                Форма временно недоступна. Напишите нам:{" "}
                {TELEGRAM_CONTACT_URL ? (
                  <a href={TELEGRAM_CONTACT_URL} className="underline">
                    Telegram
                  </a>
                ) : (
                  <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
                    {CONTACT_EMAIL}
                  </a>
                )}
              </p>
            )}
          </div>
        </div>
      )}
    </LeadContext.Provider>
  );
}

// Кнопка, которая открывает форму и отмечает цель в Метрике.
export function LeadButton({
  offer,
  source,
  goal,
  className,
  children,
}: {
  offer: OfferId;
  source: string;
  goal: string;
  className?: string;
  children: React.ReactNode;
}) {
  const openLead = useLead();
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        reachGoal(goal, { offer, source });
        openLead(offer, source);
      }}
    >
      {children}
    </button>
  );
}
