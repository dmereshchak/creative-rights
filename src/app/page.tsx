import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Situations from "@/components/Situations";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Feed from "@/components/Feed";
import Team from "@/components/Team";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import { LeadProvider } from "@/components/LeadModal";

export default function Home() {
  return (
    <LeadProvider>
      <Header />
      <main>
        <Hero />
        <Situations />
        <HowItWorks />
        <Pricing />
        <Feed />
        <Team />
        <Faq />
      </main>
      <Footer />
    </LeadProvider>
  );
}
