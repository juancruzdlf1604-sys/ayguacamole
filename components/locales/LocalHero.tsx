"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface Props {
  nombre: string;
  direccion: string;
  imagenSrc: string;
}

export default function LocalHero({ nombre, direccion, imagenSrc }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const addressRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from([titleRef.current, addressRef.current], {
          opacity: 0,
          y: 30,
          duration: 0.9,
          ease: "power2.out",
          stagger: 0.2,
          delay: 0.2,
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-[75vh] flex items-end pb-20 overflow-hidden"
    >
      {/* Imagen de fondo */}
      <Image
        src={imagenSrc}
        alt={`Local Ayguacamole ${nombre}`}
        fill
        className="object-cover"
        priority
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-negro via-negro/50 to-transparent" aria-hidden="true" />
      <div className="absolute inset-0 bg-verde/30" aria-hidden="true" />

      {/* Contenido */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <h1
          ref={titleRef}
          className="font-lilita text-white text-7xl sm:text-8xl md:text-[120px] uppercase leading-none"
        >
          {nombre}
        </h1>
        <p
          ref={addressRef}
          className="font-nunito text-white/80 text-lg mt-2"
        >
          {direccion}
        </p>
      </div>
    </section>
  );
}
