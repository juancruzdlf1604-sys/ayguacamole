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
      const section = sectionRef.current;
      const container = containerRef.current;
      if (!video || !section || !container) return;

      const mm = gsap.matchMedia();

      /* Mobile: autoplay en loop, sin scrub, sin 300vh */
      mm.add("(max-width: 767px)", () => {
        section.style.height = "100vh";
        video.muted = true;
        video.playsInline = true;
        video.loop = true;
        video.autoplay = true;
        video.load();
        video.play().catch(() => {
          video.addEventListener("loadedmetadata", () => {
            video.play().catch(() => {});
          }, { once: true });
        });
        return () => { video.pause(); };
      });

      /* Desktop: scrub limpio con ScrollTrigger */
      mm.add("(min-width: 768px)", () => {
        section.style.height = "300vh";
        video.pause();
        video.currentTime = 0;
        video.loop = false;
        video.autoplay = false;

        const initScrub = () => {
          if (!video.duration || isNaN(video.duration)) return;

          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            pin: container,
            pinSpacing: true,
            scrub: 0.5,
            onUpdate: (self) => {
              const time = self.progress * video.duration;
              if (Math.abs(video.currentTime - time) > 0.01) {
                video.currentTime = time;
              }
            },
          });
        };

        if (video.readyState >= 2) {
          initScrub();
        } else {
          video.addEventListener("loadedmetadata", initScrub, { once: true });
          video.load();
        }

        return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative h-screen">
      <div
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden"
      >
        {/* Video */}
        <video
          ref={videoRef}
          src="/assets/hero/hero.mp4"
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          className="w-full h-full object-cover"
          aria-hidden="true"
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
          <div ref={ctasRef} className="flex flex-row gap-3 justify-center items-center w-full px-4 mt-2">
            {/* Reservar */}
            <div className="relative">
              <button
                onClick={() => toggle("reservar")}
                aria-expanded={selectorMode === "reservar"}
                className="flex items-center gap-2 font-lilita uppercase text-sm md:text-base px-5 md:px-8 py-3 md:py-4 rounded-full whitespace-nowrap transition-colors"
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
                className="flex items-center gap-2 font-lilita uppercase text-sm md:text-base px-5 md:px-8 py-3 md:py-4 rounded-full whitespace-nowrap transition-colors border-2 border-white text-white hover:bg-white hover:text-negro"
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

          {/* Indicador de scroll — solo desktop */}
          <div className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-white/60">
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
