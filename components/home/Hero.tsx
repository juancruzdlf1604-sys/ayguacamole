"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import LocalSelector from "./LocalSelector";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type SelectorMode = "reservar" | "menu" | null;

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="8"
      viewBox="0 0 12 8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
      className={`transition-transform duration-200 shrink-0 ${open ? "rotate-180" : ""}`}
    >
      <path d="M1 1l5 5 5-5" />
    </svg>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);

  const [selectorMode, setSelectorMode] = useState<SelectorMode>(null);

  function toggle(mode: SelectorMode) {
    setSelectorMode((prev) => (prev === mode ? null : mode));
  }

  useGSAP(
    () => {
      const video = videoRef.current;
      if (!video) return;

      const mm = gsap.matchMedia();

      /* Animación de entrada del contenido — siempre, independiente del scrub */
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(
          [titleRef.current, subtitleRef.current, ctasRef.current],
          {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power2.out",
            stagger: 0.2,
            delay: 0.3,
          }
        );
      });

      const initScrollScrub = () => {
        if (!video.duration || isNaN(video.duration)) return;

        video.pause();
        video.currentTime = 0;

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: containerRef.current,
          scrub: true,
          onUpdate: (self) => {
            video.currentTime = self.progress * video.duration;
          },
        });
      };

      mm.add("(max-width: 767px)", () => {
        /* Mobile: autoplay silencioso, sin scrub */
        if (video.readyState >= 2) {
          video.play();
        } else {
          video.addEventListener("loadedmetadata", () => { video.play(); }, { once: true });
          video.load();
        }
      });

      mm.add("(min-width: 768px)", () => {
        /* Desktop: scrub con ScrollTrigger */
        if (video.readyState >= 2) {
          initScrollScrub();
        } else {
          video.addEventListener("loadedmetadata", initScrollScrub, { once: true });
          video.load();
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative" style={{ height: "300vh" }}>
      <div
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden"
      >
        {/* Video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/assets/hero/hero.mp4"
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden="true"
          style={{ display: "block" }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

        {/* Contenido */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 gap-6">
          <h1
            ref={titleRef}
            className="font-lilita text-white uppercase leading-none text-6xl sm:text-8xl md:text-[120px] lg:text-[140px]"
          >
            Gastronomía
            <br />
            Mexicana
          </h1>

          <p
            ref={subtitleRef}
            className="font-nunito font-bold text-amarillo uppercase tracking-[0.3em] text-base sm:text-xl md:text-2xl"
          >
            Al mejor estilo Tex-Mex
          </p>

          {/* CTAs */}
          <div ref={ctasRef} className="flex flex-col sm:flex-row gap-4 mt-2">
            {/* Reservar */}
            <div className="relative">
              <button
                onClick={() => toggle("reservar")}
                aria-expanded={selectorMode === "reservar"}
                className="flex items-center gap-2 font-lilita uppercase px-8 py-4 rounded-full transition-colors"
                style={{
                  background: "#F5C800",
                  color: "#0D0D0D",
                }}
              >
                Reservar
                <Chevron open={selectorMode === "reservar"} />
              </button>
              {selectorMode === "reservar" && (
                <LocalSelector
                  mode="reservar"
                  onClose={() => setSelectorMode(null)}
                />
              )}
            </div>

            {/* Ver menú y pedir */}
            <div className="relative">
              <button
                onClick={() => toggle("menu")}
                aria-expanded={selectorMode === "menu"}
                className="flex items-center gap-2 font-lilita uppercase px-8 py-4 rounded-full transition-colors border-2 border-white text-white hover:bg-white hover:text-negro"
              >
                Ver menú y pedir
                <Chevron open={selectorMode === "menu"} />
              </button>
              {selectorMode === "menu" && (
                <LocalSelector
                  mode="menu"
                  onClose={() => setSelectorMode(null)}
                />
              )}
            </div>
          </div>

          {/* Indicador de scroll */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60">
            <span className="font-nunito text-xs uppercase tracking-widest">
              Scrolleá
            </span>
            <div className="w-px h-8 bg-white/40 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
