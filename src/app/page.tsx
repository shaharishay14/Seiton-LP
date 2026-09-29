import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { WhoItsFor } from "@/components/sections/WhoItsFor";
import { Features } from "@/components/sections/Features";

export default function Home() {
  return (
    <>
      <div className="relative">
        <Header />
        <main>
          <Hero />
          <WhoItsFor />
          <Features />
        </main>
      </div>
      <Footer />
    </>
  );
}
