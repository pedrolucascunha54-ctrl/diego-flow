import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Statement } from "@/components/sections/statement";
import { Portfolio } from "@/components/sections/portfolio";
import { Specialties } from "@/components/sections/specialties";
import { FinalCta } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Statement />
        <Specialties />
        <Portfolio />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
