import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ToolsFeed from "@/components/ToolsFeed";
import BeforeAfter from "@/components/BeforeAfter";
import RiskTrafficLight from "@/components/RiskTrafficLight";
import Checklist from "@/components/Checklist";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ToolsFeed />
        <BeforeAfter />
        <RiskTrafficLight />
        <Checklist />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
