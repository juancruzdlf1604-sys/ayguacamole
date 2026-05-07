"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const LINKS = {
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

/*
  Por defecto se posiciona absolute debajo del botón disparador —
  el padre debe tener `position: relative`.
  Pasá `wrapperClassName` para sobreescribir el posicionamiento
  (ej: cuando se usa dentro de un fixed wrapper en el Navbar).
*/
const DEFAULT_WRAPPER =
  "absolute top-full mt-2 left-1/2 -translate-x-1/2 z-[9999] min-w-[240px]";

interface Props {
  mode: "reservar" | "menu";
  onClose: () => void;
  wrapperClassName?: string;
}

export default function LocalSelector({
  mode,
  onClose,
  wrapperClassName,
}: Props) {
  const boxRef = useRef<HTMLDivElement>(null);

  /* Animación de apertura */
  useEffect(() => {
    gsap.fromTo(
      boxRef.current,
      { opacity: 0, y: -6 },
      { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" }
    );
  }, []);

  /* Click-outside — delay de 10ms para no cerrarse con el mismo click que abrió */
  useEffect(() => {
    let active = false;
    const t = setTimeout(() => { active = true; }, 10);

    const handler = (e: MouseEvent) => {
      if (!active) return;
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      clearTimeout(t);
      document.removeEventListener("mousedown", handler);
    };
  }, [onClose]);

  /* Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      ref={boxRef}
      role="menu"
      aria-label="Seleccioná un local"
      className={wrapperClassName ?? DEFAULT_WRAPPER}
      style={{
        background: "#0D0D0D",
        border: "2px solid #1E7A3C",
        borderRadius: "12px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div className="px-5 pt-4 pb-2 border-b border-white/10">
        <p
          className="font-nunito font-bold uppercase tracking-widest text-xs text-center"
          style={{ color: "#F5C800" }}
        >
          ¿En qué local?
        </p>
      </div>

      {/* Opción Villa Crespo */}
      <a
        href={LINKS[mode].villaCrespo}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClose}
        role="menuitem"
        className="flex items-center gap-3 py-4 px-5 transition-colors duration-150 hover:bg-verde group"
      >
        <span
          className="shrink-0 w-2 h-2 rounded-full"
          style={{ background: "#1E7A3C" }}
          aria-hidden="true"
        />
        <span className="font-lilita text-white text-xl uppercase leading-none">
          Villa Crespo
        </span>
      </a>

      {/* Separador */}
      <div className="mx-4 border-t border-white/10" aria-hidden="true" />

      {/* Opción Belgrano */}
      <a
        href={LINKS[mode].belgrano}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClose}
        role="menuitem"
        className="flex items-center gap-3 py-4 px-5 transition-colors duration-150 hover:bg-verde group rounded-b-xl"
      >
        <span
          className="shrink-0 w-2 h-2 rounded-full"
          style={{ background: "#1E7A3C" }}
          aria-hidden="true"
        />
        <span className="font-lilita text-white text-xl uppercase leading-none">
          Belgrano
        </span>
      </a>
    </div>
  );
}
