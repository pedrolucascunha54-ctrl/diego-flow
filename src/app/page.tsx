import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Portfolio } from "@/components/sections/portfolio";
import { Specialties } from "@/components/sections/specialties";
import { Process } from "@/components/sections/process";
import { FinalCta } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Portfolio />
        <Specialties />
        <Process />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
