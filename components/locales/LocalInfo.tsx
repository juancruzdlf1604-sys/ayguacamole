"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { GOOGLE_FORM_URL } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Props {
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  horario: string;
  menuUrl: string;
  mapsEmbed: string;
}

export default function LocalInfo({
  nombre,
  direccion,
  telefono,
  email,
  horario,
  menuUrl,
  mapsEmbed,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".local-info-item", {
          opacity: 0,
          y: 30,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-negro py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Datos del local */}
        <div className="flex flex-col gap-8">
          <h2 className="font-lilita text-white text-4xl uppercase local-info-item">
            {nombre}
          </h2>

          <div className="flex flex-col gap-6">
            {/* Dirección */}
            <div className="local-info-item">
              <p className="font-nunito font-bold text-amarillo text-xs uppercase tracking-wider mb-1">
                Dirección
              </p>
              <p className="font-nunito text-white/80">{direccion}</p>
            </div>

            {/* Horario */}
            <div className="local-info-item">
              <p className="font-nunito font-bold text-amarillo text-xs uppercase tracking-wider mb-1">
                Horario
              </p>
              <p className="font-nunito text-white/80">{horario}</p>
            </div>

            {/* Teléfono */}
            <div className="local-info-item">
              <p className="font-nunito font-bold text-amarillo text-xs uppercase tracking-wider mb-1">
                Teléfono
              </p>
              <a
                href={`tel:${telefono}`}
                className="font-nunito text-white/80 hover:text-amarillo transition-colors"
              >
                {telefono}
              </a>
            </div>

            {/* Email */}
            <div className="local-info-item">
              <p className="font-nunito font-bold text-amarillo text-xs uppercase tracking-wider mb-1">
                Email
              </p>
              <a
                href={`mailto:${email}`}
                className="font-nunito text-white/80 hover:text-amarillo transition-colors"
              >
                {email}
              </a>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 local-info-item">
            <a
              href={menuUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-amarillo text-negro font-nunito font-bold text-sm uppercase tracking-wider px-6 py-3.5 rounded-full text-center hover:bg-yellow-400 transition-colors"
            >
              Ver menú y pedir
            </a>
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 border-2 border-verde text-white font-nunito font-bold text-sm uppercase tracking-wider px-6 py-3.5 rounded-full text-center hover:bg-verde hover:border-verde transition-colors"
            >
              Reservar mesa
            </a>
          </div>
        </div>

        {/* Mapa */}
        <div className="local-info-item">
          <p className="font-nunito font-bold text-amarillo text-xs uppercase tracking-wider mb-4">
            Cómo llegar
          </p>
          <div className="rounded-2xl overflow-hidden h-80 lg:h-full min-h-[320px]">
            <iframe
              src={mapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Mapa de Ayguacamole ${nombre}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
