import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Политика обработки персональных данных — CreativeRights",
};

export default function Privacy() {
  return <LegalPage file="privacy.md" />;
}
