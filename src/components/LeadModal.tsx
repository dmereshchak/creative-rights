"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X, CheckCircle2, Loader2 } from "lucide-react";
import { GOOGLE_FORM, CONTACT_EMAIL, LAUNCH_DISCOUNT_SLOTS, TELEGRAM_CONTACT_URL } from "@/lib/config";
import { getUtm, reachGoal } from "@/lib/analytics";
import { offerLabels, segments, type OfferId } from "@/lib/offers";

type OpenLead = (offer: OfferId, source: string) => void;

const LeadContext = createContext<OpenLead>(() => {});

export function useLead() {
  return useContext(LeadContext);
}

type Status = "idle" | "sending" | "sent" | "error";

export function LeadProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [offer, setOffer] = useState<OfferId>("consult");
  const [source, setSource] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const firstField = useRef<HTMLInputElement>(null);

  const openLead = useCallback<OpenLead>((nextOffer, nextSource) => {
    setOffer(nextOffer);
    setSource(nextSource);
    setStatus("idle");
    setOpen(true);
  }, []);

  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    firstField.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    if (!GOOGLE_FORM.action) {
      setStatus("error");
      return;
    }

    const values: Record<keyof typeof GOOGLE_FORM.fields, string> = {
      contact: String(form.get("contact") ?? ""),
      name: String(form.get("name") ?? ""),
      segment: String(form.get("segment") ?? ""),
      offer: offerLabels[form.get("offer") as OfferId] ?? "",
      message: String(form.get("message") ?? ""),
      source,
      utm: getUtm(),
    };
    const body = new FormData();
    for (const [key, entry] of Object.entries(GOOGLE_FORM.fields)) {
      if (entry) body.append(entry, values[key as keyof typeof values]);
    }

    setStatus("sending");
    try {
      // Google Forms не отдаёт CORS-заголовки: ответ не прочитать, но запись сохраняется.
      await fetch(GOOGLE_FORM.action, { method: "POST", mode: "no-cors", body });
      reachGoal("lead_sent", { offer: String(form.get("offer")), source });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <LeadContext.Provider value={openLead}>
      {children}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-foreground/60 backdrop-blur-sm p-0 sm:p-6"
          onClick={close}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-title"
            className="relative w-full sm:max-w-lg max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-white p-6 sm:p-8 shadow-2xl animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={close}
              className="absolute right-4 top-4 text-foreground/40 hover:text-foreground cursor-pointer"
              aria-label="Закрыть"
            >
              <X size={22} />
            </button>

            {status === "sent" ? (
              <div className="py-6 text-center">
                <CheckCircle2 size={48} className="mx-auto text-accent" />
                <h2 id="lead-title" className="mt-4 text-2xl font-extrabold text-foreground">
                  Заявка у нас
                </h2>
                <p className="mt-3 text-foreground/60 leading-relaxed">
                  Напишем в течение дня: уточним детали, назовём срок и пришлём, куда отправить
                  договор. Оплата — только после этого.
                </p>
                <button
                  onClick={close}
                  className="mt-8 rounded-xl bg-accent px-8 py-3 text-sm font-semibold text-white hover:bg-accent-hover cursor-pointer"
                >
                  Хорошо
                </button>
              </div>
            ) : (
              <form onSubmit={submit}>
                <h2 id="lead-title" className="pr-8 text-2xl font-extrabold text-foreground">
                  Запросить консультацию
                </h2>
                <p className="mt-2 text-sm text-foreground/60 leading-relaxed">
                  Мы только запустились: первые {LAUNCH_DISCOUNT_SLOTS} заказов — со скидкой 50%.
                  Оплата после того, как юрист посмотрит запрос и подтвердит срок.
                </p>

                <div className="mt-6 space-y-4">
                  <Field label="Telegram или email *">
                    <input
                      ref={firstField}
                      name="contact"
                      required
                      maxLength={120}
                      placeholder="@nickname"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Как к вам обращаться">
                    <input name="name" maxLength={80} placeholder="Имя или артистический псевдоним" className={inputClass} />
                  </Field>
                  <Field label="Что нужно">
                    <select
                      name="offer"
                      value={offer}
                      onChange={(e) => setOffer(e.target.value as OfferId)}
                      className={inputClass}
                    >
                      {(Object.keys(offerLabels) as OfferId[]).map((id) => (
                        <option key={id} value={id}>
                          {offerLabels[id]}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Кто вы">
                    <select name="segment" defaultValue={segments[0]} className={inputClass}>
                      {segments.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Коротко о ситуации">
                    <textarea
                      name="message"
                      rows={3}
                      maxLength={1000}
                      placeholder="Например: лейбл прислал договор, хочу понять, что я отдаю"
                      className={`${inputClass} resize-none`}
                    />
                  </Field>
                  <p className="text-xs text-foreground/50">
                    Сам договор сюда не прикладывайте — попросим прислать его после ответа.
                  </p>

                  <label className="flex items-start gap-3 text-xs text-foreground/60 leading-relaxed cursor-pointer">
                    <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 accent-accent shrink-0" />
                    <span>
                      Даю согласие на обработку персональных данных по{" "}
                      <Link href="/privacy" target="_blank" className="text-accent underline">
                        политике
                      </Link>
                    </span>
                  </label>
                </div>

                {status === "error" && (
                  <p className="mt-4 rounded-lg bg-red/10 px-4 py-3 text-sm text-red">
                    Не получилось отправить. Напишите нам напрямую:{" "}
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

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-sm font-semibold text-white hover:bg-accent-hover disabled:opacity-60 cursor-pointer"
                >
                  {status === "sending" && <Loader2 size={16} className="animate-spin" />}
                  Отправить заявку
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </LeadContext.Provider>
  );
}

const inputClass =
  "w-full rounded-xl border border-gray-mid bg-white px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-foreground/70">{label}</span>
      {children}
    </label>
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
