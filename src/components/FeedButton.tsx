"use client";

import { TELEGRAM_FEED_URL } from "@/lib/config";
import { reachGoal } from "@/lib/analytics";
import { useLead } from "./LeadModal";

// Пока канала нет, подписка на ленту идёт через ту же форму заявки.
export default function FeedButton({ className, children }: { className?: string; children: React.ReactNode }) {
  const openLead = useLead();
  const onClick = () => {
    reachGoal("offer_feed", { offer: "feed", source: "pricing" });
    if (TELEGRAM_FEED_URL) {
      window.open(TELEGRAM_FEED_URL, "_blank", "noopener");
    } else {
      openLead("feed", "pricing");
    }
  };
  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
}
