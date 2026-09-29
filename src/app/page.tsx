import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <>
      <div className="relative">
        <Header />
        <main>
          <Hero />
        </main>
      </div>
      <Footer />
    </>
  );
}
