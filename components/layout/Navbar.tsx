"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Villa Crespo", href: "/villa-crespo" },
  { label: "Belgrano", href: "/belgrano" },
  { label: "Sumate al Equipo", href: "/sumate-al-equipo" },
  { label: "Contacto", href: "/contacto" },
];

const navLinks_dropdown = {
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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navSelector, setNavSelector] = useState<"reservar" | "menu" | null>(null);

  const drawerRef = useRef<HTMLDivElement>(null);
  const navDropdownRef = useRef<HTMLDivElement>(null);

  /* Detectar scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Cerrar drawer al hacer clic afuera */
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  /* Cerrar dropdown al hacer clic afuera */
  useEffect(() => {
    if (!navSelector) return;
    const handler = (e: MouseEvent) => {
      if (
        navDropdownRef.current &&
        !navDropdownRef.current.contains(e.target as Node)
      ) {
        setNavSelector(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [navSelector]);

  function toggleNavSelector(mode: "reservar" | "menu") {
    setNavSelector((prev) => (prev === mode ? null : mode));
  }

  function closeAll() {
    setNavSelector(null);
    setMenuOpen(false);
  }

  return (
    <>
      {/* ── Header ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-verde/95 backdrop-blur-md shadow-lg py-3"
            : "bg-verde/80 backdrop-blur-sm py-4"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Desktop — logo + links + CTA */}
          <div className="hidden lg:flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Image
                src="/assets/logo/logo.jpg"
                alt="Ayguacamole - Gastronomía Mexicana"
                width={44}
                height={44}
                className="rounded-full object-cover"
                priority
              />
              <span className="font-lilita text-white text-lg uppercase tracking-wide">
                Ayguacamole
              </span>
            </Link>

            <ul className="flex items-center gap-6">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-nunito font-semibold text-white/90 hover:text-amarillo transition-colors duration-200 text-xs uppercase tracking-wider whitespace-nowrap"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <button
              onClick={() => toggleNavSelector("reservar")}
              aria-expanded={navSelector === "reservar"}
              className="inline-flex items-center gap-1.5 bg-amarillo text-negro font-nunito font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full hover:bg-yellow-400 transition-colors duration-200 shrink-0"
            >
              Reservar
              <span aria-hidden="true">{navSelector === "reservar" ? "▴" : "▾"}</span>
            </button>
          </div>

          {/* Mobile — 3 columnas: logo | título | hamburger */}
          <div className="flex lg:hidden items-center justify-between w-full">
            <Link href="/" className="shrink-0">
              <Image
                src="/assets/logo/logo.jpg"
                alt="Ayguacamole"
                width={40}
                height={40}
                className="rounded-full object-cover"
                priority
              />
            </Link>

            <span className="font-lilita text-white text-lg uppercase tracking-wider">
              Ayguacamole
            </span>

            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
              className="w-11 h-11 flex flex-col justify-center items-center gap-1.5"
            >
              <span className="block w-6 h-0.5 bg-white" />
              <span className="block w-6 h-0.5 bg-white" />
              <span className="block w-6 h-0.5 bg-white" />
            </button>
          </div>

        </nav>
      </header>

      {/* ── Dropdown — fixed, fuera del header para escapar su stacking context ── */}
      {navSelector && (
        <div
          ref={navDropdownRef}
          className="fixed z-[9999] bg-negro border-2 border-verde rounded-xl min-w-[240px] shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-hidden"
          style={{ top: "70px", right: "16px" }}
        >
          <p className="px-5 pt-4 pb-2 font-nunito font-bold text-xs tracking-widest uppercase text-amarillo">
            ¿EN QUÉ LOCAL?
          </p>
          <div className="border-t border-white/10" />
          <a
            href={navLinks_dropdown[navSelector].villaCrespo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeAll}
            className="flex items-center gap-3 px-5 py-4 font-lilita text-white text-xl hover:bg-verde transition-colors duration-150"
          >
            <span className="text-verde text-sm" aria-hidden="true">●</span> Villa Crespo
          </a>
          <div className="border-t border-white/10" />
          <a
            href={navLinks_dropdown[navSelector].belgrano}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeAll}
            className="flex items-center gap-3 px-5 py-4 font-lilita text-white text-xl hover:bg-verde transition-colors duration-150 rounded-b-xl"
          >
            <span className="text-verde text-sm" aria-hidden="true">●</span> Belgrano
          </a>
        </div>
      )}

      {/* ── Overlay oscuro del drawer ── */}
      <div
        className={`fixed inset-0 z-40 bg-negro/60 transition-opacity duration-300 lg:hidden ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* ── Drawer lateral mobile ── */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-72 bg-verde-oscuro z-50 transition-transform duration-300 ease-in-out lg:hidden flex flex-col p-8 gap-6 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={() => setMenuOpen(false)}
          aria-label="Cerrar menú"
          className="self-end text-white/70 hover:text-white text-2xl leading-none"
        >
          ✕
        </button>

        <ul className="flex flex-col gap-5">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="font-nunito font-bold text-white text-base uppercase tracking-wider hover:text-amarillo transition-colors"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          onClick={() => toggleNavSelector("reservar")}
          aria-expanded={navSelector === "reservar"}
          className="mt-auto w-full flex items-center justify-center gap-2 bg-amarillo text-negro font-nunito font-bold text-sm uppercase tracking-wider px-6 py-3.5 rounded-full hover:bg-yellow-400 transition-colors"
        >
          Reservar mesa
          <span aria-hidden="true">{navSelector === "reservar" ? "▴" : "▾"}</span>
        </button>
      </div>
    </>
  );
}
