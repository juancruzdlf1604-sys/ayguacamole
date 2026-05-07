"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { GOOGLE_FORM_URL, AMBIENTE_IMAGES } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function SobreNosotros() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(textRef.current, {
          opacity: 0,
          x: -50,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });

        gsap.from(gridRef.current, {
          opacity: 0,
          x: 50,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="nosotros"
      ref={sectionRef}
      className="bg-[#F5F0E8] py-24 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Texto */}
        <div ref={textRef}>
          <p className="font-nunito font-bold text-verde uppercase tracking-[0.2em] text-xs mb-4">
            Sobre Nosotros
          </p>
          <h2 className="font-lilita text-negro text-4xl sm:text-5xl uppercase leading-tight mb-6">
            Mexicanos de corazón,
            <br />
            porteños de actitud
          </h2>
          <p className="font-nunito text-negro/70 text-base leading-relaxed mb-8">
            Ayguacamole nació con una misión simple: traer la verdadera
            gastronomía mexicana Tex-Mex a Buenos Aires. Con dos locales en
            Villa Crespo y Belgrano, y una comunidad de más de 66.000 personas
            que nos eligen todos los días, seguimos cocinando con la misma
            pasión del primer día.
          </p>
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-verde text-white font-nunito font-bold text-sm uppercase tracking-wider px-7 py-3.5 rounded-full hover:bg-verde-oscuro transition-colors"
          >
            Reservar mesa
          </a>
        </div>

        {/* Grid de imágenes 2×3 */}
        <div
          ref={gridRef}
          className="grid grid-cols-3 grid-rows-2 gap-3"
        >
          {AMBIENTE_IMAGES.map((src, i) => (
            <div
              key={i}
              className="relative aspect-square rounded-lg overflow-hidden group"
            >
              <Image
                src={src}
                alt={`Ambiente Ayguacamole ${i + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
