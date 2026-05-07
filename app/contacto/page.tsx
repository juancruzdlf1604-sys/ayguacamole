import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactoCards from "@/components/contacto/ContactoCards";

export const metadata: Metadata = {
  title: "Contacto · Ayguacamole",
  description:
    "Encontranos en Villa Crespo (Juan Ramírez de Velasco 966) y Belgrano (Av. Juramento 2628). Abiertos todos los días de 12:00 a 23:45.",
  alternates: {
    canonical: "/contacto",
  },
};

export default function ContactoPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <Image
            src="/assets/ambiente/f.jpg"
            alt="Ambiente Ayguacamole"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay verde 70% */}
          <div
            className="absolute inset-0"
            style={{ background: "rgba(30,122,60,0.70)" }}
            aria-hidden="true"
          />

          {/* Contenido */}
          <div className="relative z-10 text-center px-4">
            <h1 className="font-lilita text-white text-7xl sm:text-8xl md:text-9xl uppercase leading-none mb-4">
              Contacto
            </h1>
            <p className="font-nunito font-bold text-amarillo uppercase tracking-[0.25em] text-sm sm:text-base">
              Dos locales. Una sola pasión.
            </p>
          </div>
        </section>

        {/* Cards de locales */}
        <ContactoCards />
      </main>
      <Footer />
    </>
  );
}
