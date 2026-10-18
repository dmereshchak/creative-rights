import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Согласие на обработку персональных данных — CreativeRights",
};

export default function Consent() {
  return <LegalPage file="consent.md" />;
}
