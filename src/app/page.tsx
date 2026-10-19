import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Situations from "@/components/Situations";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Team from "@/components/Team";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import { LeadProvider } from "@/components/LeadModal";
import { SITE_URL, CONTACT_EMAIL } from "@/lib/config";

// Разметка для поисковиков: кто мы и как нас называют (в том числе раздельно — «Creative Rights»).
const organization = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "CreativeRights",
  alternateName: ["Creative Rights", "Криэйтив Райтс"],
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/og.png`,
  email: CONTACT_EMAIL,
  areaServed: "RU",
  description: "Юридическая помощь музыкантам: проверка и составление договоров, пакет договоров для релиза, юрист по подписке.",
};

export default function Home() {
  return (
    <LeadProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      <Header />
      <main>
        <Hero />
        <Situations />
        <HowItWorks />
        <Pricing />
        <Team />
        <Faq />
      </main>
      <Footer />
    </LeadProvider>
  );
}
