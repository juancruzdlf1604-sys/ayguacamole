import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import LocalesSection from "@/components/home/LocalesSection";
import MarquesinaPlatos from "@/components/home/MarquesinaPlatos";
import SobreNosotros from "@/components/home/SobreNosotros";
import SumateSection from "@/components/home/SumateSection";
import CTAFinal from "@/components/home/CTAFinal";

export const metadata: Metadata = {
  title: "Ayguacamole · Gastronomía Mexicana Tex-Mex en Buenos Aires",
  description:
    "Tacos, burritos, nachos y cocina mexicana Tex-Mex en Villa Crespo y Belgrano. Abiertos todos los días. Reservá tu mesa o pedí delivery.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero con scrub de video */}
        <Hero />

        {/* Nuestros Locales */}
        <LocalesSection />

        {/* Marquesina de platos */}
        <MarquesinaPlatos />

        {/* Sobre Nosotros */}
        <SobreNosotros />

        {/* Sumate al equipo */}
        <SumateSection />

        {/* CTA final */}
        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}
