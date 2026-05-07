"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { GOOGLE_FORM_URL } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function CTAFinal() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* Parallax en la imagen de fondo */
        gsap.to(imageRef.current, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        /* Entrada del contenido */
        gsap.from(contentRef.current, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
    >
      {/* Imagen de fondo con parallax */}
      <div
        ref={imageRef}
        className="absolute inset-0 scale-110"
        aria-hidden="true"
      >
        <Image
          src="/assets/ambiente/c.jpg"
          alt=""
          fill
          className="object-cover"
          loading="lazy"
        />
      </div>

      {/* Overlay verde */}
      <div
        className="absolute inset-0 bg-verde/75"
        aria-hidden="true"
      />

      {/* Contenido */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-4 sm:px-6"
      >
        <p className="font-nunito font-bold text-white/70 uppercase tracking-[0.3em] text-xs mb-4">
          Abiertos todos los días
        </p>
        <h2 className="font-lilita text-white text-5xl sm:text-6xl md:text-7xl uppercase leading-tight mb-10 max-w-3xl mx-auto">
          El único problema es elegir qué pedir.
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-amarillo text-negro font-nunito font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-full hover:bg-yellow-400 transition-colors"
          >
            Hacé tu reserva
          </a>
          <a
            href="/villa-crespo"
            className="border-2 border-white text-white font-nunito font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-full hover:bg-white hover:text-negro transition-colors"
          >
            Pedí ahora
          </a>
        </div>
      </div>
    </section>
  );
}
