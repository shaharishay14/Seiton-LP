import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <div className="relative overflow-x-clip">
        <Header />
        <main id="top" className="min-h-[1180px]" />
      </div>
      <Footer />
    </>
  );
}
