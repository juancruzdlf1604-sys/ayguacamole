"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const links = {
  reservar: {
    villaCrespo:
      "https://docs.google.com/forms/d/e/1FAIpQLSfiVb5_c3YN4K3WvEXG_l-15T2F1gYuKsscamyeUZaU2zrYEg/viewform",
    belgrano:
      "https://docs.google.com/forms/d/e/1FAIpQLSelZ91LU--Y-QugI5OJSvi6Fr0xkmyjIIni-_eix4gAiLsYuA/viewform",
  },
  menu: {
    villaCrespo: "https://menu.fu.do/ayguacamole",
    belgrano: "https://menu.fu.do/ayguacamoletexmex",
  },
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [openSelector, setOpenSelector] = useState<"reservar" | "menu" | null>(null);

  /* Cerrar dropdown al hacer clic afuera */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpenSelector(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useGSAP(
    () => {
      const video = videoRef.current;
      const section = sectionRef.current;
      const container = videoContainerRef.current;
      if (!video || !section || !container) return;

      const mm = gsap.matchMedia();

      /* Mobile: autoplay loop, sin scrub, sin 300vh */
      mm.add("(max-width: 767px)", () => {
        section.style.height = "100vh";
        video.loop = true;
        video.play().catch(() => {
          video.addEventListener("canplay", () => video.play(), { once: true });
        });
        return () => video.pause();
      });

      /* Desktop: esperar duration finito antes de inicializar el scrub */
      mm.add("(min-width: 768px)", () => {
        section.style.height = "300vh";
        video.loop = false;
        video.autoplay = false;
        video.pause();
        video.currentTime = 0;

        const initScrub = () => {
          if (!video.duration || !isFinite(video.duration) || isNaN(video.duration)) {
            setTimeout(initScrub, 100);
            return;
          }

          const duration = video.duration;

          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            pin: container,
            pinSpacing: true,
            scrub: 2,
            onUpdate: (self) => {
              const time = self.progress * duration;
              if (isFinite(time) && time >= 0 && time <= duration) {
                video.currentTime = time;
              }
            },
          });
        };

        video.addEventListener("loadedmetadata", () => {
          setTimeout(initScrub, 50);
        }, { once: true });

        video.load();

        return () => {
          ScrollTrigger.getAll().forEach((t) => t.kill());
        };
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative overflow-x-hidden w-full max-w-[100vw]">
      {/* Contenedor pinneado en desktop */}
      <div
        ref={videoContainerRef}
        className="relative w-full h-screen overflow-hidden"
        style={{ willChange: "transform", transform: "translateZ(0)" }}
      >
        {/* Video */}
        <video
          ref={videoRef}
          src="/assets/hero/hero.mp4"
          muted
          playsInline
          preload="auto"
          loop
          className="absolute inset-0 w-full h-full object-cover"
          style={{ willChange: "transform" }}
          aria-hidden="true"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 z-10" aria-hidden="true" />

        {/* Contenido */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center gap-6">
          <h1 className="font-lilita text-white text-5xl md:text-8xl uppercase leading-tight">
            GASTRONOMÍA
            <br />
            MEXICANA
          </h1>

          <p className="font-nunito font-bold text-amarillo text-sm md:text-xl uppercase tracking-[0.2em]">
            AL MEJOR ESTILO TEX-MEX
          </p>

          {/* Botones — siempre en fila */}
          <div className="flex flex-row gap-3 items-center justify-center">
            <button
              onClick={() =>
                setOpenSelector(openSelector === "reservar" ? null : "reservar")
              }
              aria-expanded={openSelector === "reservar"}
              className="font-nunito font-bold text-negro bg-amarillo px-5 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-base whitespace-nowrap flex items-center gap-2 hover:bg-yellow-400 transition-colors"
            >
              RESERVAR{" "}
              <span aria-hidden="true">
                {openSelector === "reservar" ? "▴" : "▾"}
              </span>
            </button>

            <button
              onClick={() =>
                setOpenSelector(openSelector === "menu" ? null : "menu")
              }
              aria-expanded={openSelector === "menu"}
              className="font-nunito font-bold text-white border-2 border-white px-5 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-base whitespace-nowrap flex items-center gap-2 hover:bg-white hover:text-negro transition-colors"
            >
              VER MENÚ Y PEDIR{" "}
              <span aria-hidden="true">
                {openSelector === "menu" ? "▴" : "▾"}
              </span>
            </button>
          </div>

          {/* Dropdown selector de local */}
          {openSelector && (
            <div
              ref={dropdownRef}
              className="absolute z-30 bg-negro border-2 border-verde rounded-xl min-w-[240px] shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-hidden"
              style={{ top: "calc(50% + 80px)" }}
            >
              <p className="px-5 pt-4 pb-2 font-nunito font-bold text-xs tracking-widest uppercase text-amarillo">
                ¿EN QUÉ LOCAL?
              </p>
              <div className="border-t border-white/10" />
              <a
                href={links[openSelector].villaCrespo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-4 font-lilita text-white text-xl hover:bg-verde transition-colors duration-150"
              >
                <span className="text-verde text-sm" aria-hidden="true">●</span> Villa Crespo
              </a>
              <div className="border-t border-white/10" />
              <a
                href={links[openSelector].belgrano}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-4 font-lilita text-white text-xl hover:bg-verde transition-colors duration-150 rounded-b-xl"
              >
                <span className="text-verde text-sm" aria-hidden="true">●</span> Belgrano
              </a>
            </div>
          )}

          {/* Indicador scroll — solo desktop */}
          <div className="hidden md:flex flex-col items-center gap-2 absolute bottom-8">
            <span className="font-nunito text-white/50 text-xs tracking-widest uppercase">
              Scrolleá
            </span>
            <div className="w-px h-12 bg-white/30" />
          </div>
        </div>
      </div>
    </section>
  );
}
