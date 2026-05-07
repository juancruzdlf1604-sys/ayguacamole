"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function SumateSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(contentRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: 0.8,
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
      ref={sectionRef}
      className="bg-negro py-24 px-4 sm:px-6 relative overflow-hidden"
    >
      {/* Patrón azteca como textura de fondo */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div
        ref={contentRef}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        <p className="font-nunito font-bold text-amarillo uppercase tracking-[0.2em] text-xs mb-4">
          Trabajá con Nosotros
        </p>
        <h2 className="font-lilita text-white text-4xl sm:text-5xl md:text-6xl uppercase leading-tight mb-6">
          ¿Querés ser parte del
          <br />
          equipo Ayguacamole?
        </h2>
        <p className="font-nunito text-white/70 text-base leading-relaxed mb-10 max-w-xl mx-auto">
          Buscamos personas con energía, actitud y amor por la comida. Si eso te
          suena, queremos conocerte.
        </p>
        <Link
          href="/sumate-al-equipo"
          className="inline-flex items-center bg-amarillo text-negro font-nunito font-bold text-base uppercase tracking-wider px-10 py-4 rounded-full hover:bg-yellow-400 transition-colors"
        >
          Sumate al equipo
        </Link>
      </div>
    </section>
  );
}
