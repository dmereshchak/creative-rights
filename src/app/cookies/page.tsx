import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Согласие на cookie и Яндекс Метрику",
};

export default function Cookies() {
  return <LegalPage file="cookies.md" />;
}
