import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { WhoItsFor } from "@/components/sections/WhoItsFor";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Faq } from "@/components/sections/Faq";
import { ClosingCta } from "@/components/sections/ClosingCta";

export default function Home() {
  return (
    <>
      <div className="relative">
        <Header />
        <main>
          <Hero />
          <WhoItsFor />
          <Features />
          <HowItWorks />
          <Faq />
          <ClosingCta />
        </main>
      </div>
      <Footer />
    </>
  );
}
