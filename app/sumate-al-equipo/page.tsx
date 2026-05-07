import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SumateForm from "@/components/sumate/SumateForm";

export const metadata: Metadata = {
  title: "Sumate al Equipo · Ayguacamole",
  description:
    "Buscamos personas con energía, actitud y amor por la comida. Postulate para trabajar en Ayguacamole, Villa Crespo o Belgrano.",
  alternates: {
    canonical: "/sumate-al-equipo",
  },
};

export default function SumatePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative bg-verde min-h-[50vh] flex items-center justify-center overflow-hidden">
          {/* Patrón azteca */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.05]"
            aria-hidden="true"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <div className="relative z-10 text-center px-4 py-24">
            <h1 className="font-lilita text-white text-6xl sm:text-7xl md:text-8xl uppercase leading-none mb-4">
              Sumate al equipo
            </h1>
            <p className="font-nunito text-white/80 text-base sm:text-lg max-w-xl mx-auto">
              Buscamos personas con energía, actitud y amor por la comida. Si
              eso te suena, queremos conocerte.
            </p>
          </div>
        </section>

        {/* Formulario */}
        <SumateForm />
      </main>
      <Footer />
    </>
  );
}
