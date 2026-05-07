import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import LocalHero from "@/components/locales/LocalHero";
import LocalInfo from "@/components/locales/LocalInfo";
import MarquesinaPlatos from "@/components/home/MarquesinaPlatos";
import { LOCALES, GOOGLE_FORM_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Ayguacamole Belgrano · Gastronomía Mexicana Tex-Mex en Belgrano",
  description:
    "Ayguacamole en Belgrano: tacos, burritos y cocina mexicana Tex-Mex en Av. Juramento 2628. Abiertos todos los días desde las 12:00.",
  alternates: {
    canonical: "/belgrano",
  },
};

const local = LOCALES.belgrano;

export default function BelgranoPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero del local */}
        <LocalHero
          nombre="Belgrano"
          direccion={local.direccion}
          imagenSrc="/assets/ambiente/d.jpg"
        />

        {/* Info del local */}
        <LocalInfo
          nombre={local.nombre}
          direccion={local.direccion}
          telefono={local.telefono}
          email={local.email}
          horario={local.horario}
          menuUrl={local.menuUrl}
          mapsEmbed={local.mapsEmbed}
        />

        {/* Marquesina de platos */}
        <MarquesinaPlatos />

        {/* CTA */}
        <section className="bg-verde py-20 px-4 sm:px-6 text-center">
          <h2 className="font-lilita text-white text-4xl sm:text-5xl uppercase mb-8">
            ¿Listo para comer?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amarillo text-negro font-nunito font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-full hover:bg-yellow-400 transition-colors"
            >
              Reservar mesa
            </a>
            <a
              href={local.menuUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white font-nunito font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-full hover:bg-white hover:text-negro transition-colors"
            >
              Pedí ahora
            </a>
          </div>
        </section>

        {/* Schema.org FoodEstablishment */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FoodEstablishment",
              name: "Ayguacamole Belgrano",
              description:
                "Restaurante de gastronomía mexicana Tex-Mex en Belgrano, Buenos Aires.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Av. Juramento 2628",
                addressLocality: "Belgrano",
                addressRegion: "Buenos Aires",
                addressCountry: "AR",
              },
              telephone: local.telefono,
              email: local.email,
              openingHours: "Mo-Su 12:00-23:30",
              servesCuisine: "Mexican",
              priceRange: "$$",
              url: "https://ayguacamole.com/belgrano",
            }),
          }}
        />
      </main>
      <Footer />
      <WhatsAppButton
        numero="5491173579068"
        mensaje="Hola Ayguacamole Belgrano! 🌮 Quiero hacer una consulta."
      />
    </>
  );
}
