"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { LOCALES } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface LocalCardProps {
  nombre: string;
  slug: string;
  direccion: string;
  horario: string;
  menuUrl: string;
  imagen: string;
  delay?: number;
}

function LocalCard({
  nombre,
  slug,
  direccion,
  horario,
  menuUrl,
  imagen,
  delay = 0,
}: LocalCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(cardRef.current, {
          opacity: 0,
          y: 60,
          duration: 0.8,
          ease: "power2.out",
          delay,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: cardRef }
  );

  return (
    <div
      ref={cardRef}
      className="relative rounded-2xl overflow-hidden border border-verde/30 group"
    >
      {/* Imagen de fondo */}
      <div className="relative h-64 sm:h-80">
        <Image
          src={imagen}
          alt={`Local Ayguacamole ${nombre}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-verde-oscuro/70" />
      </div>

      {/* Contenido */}
      <div className="bg-negro p-8 flex flex-col gap-4">
        <h3 className="font-lilita text-white text-3xl uppercase">{nombre}</h3>
        <div className="space-y-1">
          <p className="font-nunito text-white/70 text-sm">{direccion}</p>
          <p className="font-nunito text-amarillo text-sm font-semibold">
            {horario}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <Link
            href={`/${slug}`}
            className="flex-1 bg-amarillo text-negro font-nunito font-bold text-sm uppercase tracking-wider px-5 py-3 rounded-full text-center hover:bg-yellow-400 transition-colors"
          >
            Ver local
          </Link>
          <a
            href={menuUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 border-2 border-white text-white font-nunito font-bold text-sm uppercase tracking-wider px-5 py-3 rounded-full text-center hover:bg-white hover:text-negro transition-colors"
          >
            Pedí ahora
          </a>
        </div>
      </div>
    </div>
  );
}

export default function LocalesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(headerRef.current, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="locales" ref={sectionRef} className="bg-negro py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <p className="font-nunito font-bold text-amarillo uppercase tracking-[0.2em] text-xs mb-4">
            Nuestros Locales
          </p>
          <h2 className="font-lilita text-white text-4xl sm:text-5xl uppercase leading-tight">
            Dos Locales,
            <br />
            Una Sola Pasión
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <LocalCard
            nombre={LOCALES.villaCrespo.nombre}
            slug={LOCALES.villaCrespo.slug}
            direccion={LOCALES.villaCrespo.direccion}
            horario={LOCALES.villaCrespo.horario}
            menuUrl={LOCALES.villaCrespo.menuUrl}
            imagen="/assets/ambiente/a.jpg"
            delay={0}
          />
          <LocalCard
            nombre={LOCALES.belgrano.nombre}
            slug={LOCALES.belgrano.slug}
            direccion={LOCALES.belgrano.direccion}
            horario={LOCALES.belgrano.horario}
            menuUrl={LOCALES.belgrano.menuUrl}
            imagen="/assets/ambiente/b.jpg"
            delay={0.15}
          />
        </div>
      </div>
    </section>
  );
}
