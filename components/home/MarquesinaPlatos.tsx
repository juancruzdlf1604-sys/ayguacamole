"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { PLATOS_IMAGES } from "@/lib/constants";

export default function MarquesinaPlatos() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  /* Duplicar imágenes para loop sin corte */
  const images = [...PLATOS_IMAGES, ...PLATOS_IMAGES];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* Animación del header */
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

        /* Loop de la marquesina */
        tweenRef.current = gsap.to(trackRef.current, {
          xPercent: -50,
          duration: 22,
          ease: "none",
          repeat: -1,
        });

        /* Pausar en hover */
        const track = trackRef.current;
        if (track) {
          track.addEventListener("mouseenter", () =>
            tweenRef.current?.pause()
          );
          track.addEventListener("mouseleave", () =>
            tweenRef.current?.resume()
          );
        }
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        /* Sin animación — grid estático */
        if (trackRef.current) {
          trackRef.current.style.animation = "none";
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-verde py-24 overflow-hidden">
      {/* Header */}
      <div ref={headerRef} className="text-center mb-12 px-4">
        <p className="font-nunito font-bold text-amarillo uppercase tracking-[0.2em] text-xs mb-4">
          Nuestros Platos
        </p>
        <h2 className="font-lilita text-white text-4xl sm:text-5xl uppercase leading-tight">
          Todo lo que tu boca merece
        </h2>
      </div>

      {/* Marquesina */}
      <div className="relative overflow-hidden w-full">
        {/* Degradados en los extremos */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to right, #1E7A3C, transparent)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to left, #1E7A3C, transparent)",
          }}
          aria-hidden="true"
        />

        {/* Track */}
        <div ref={trackRef} className="flex gap-4 w-max">
          {images.map((src, i) => (
            <div
              key={i}
              className="relative h-48 md:h-64 w-48 md:w-64 shrink-0 rounded-xl overflow-hidden"
            >
              <Image
                src={src}
                alt={`Plato de Ayguacamole ${(i % PLATOS_IMAGES.length) + 1}`}
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
