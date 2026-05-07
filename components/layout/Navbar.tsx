"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LocalSelector from "@/components/home/LocalSelector";

const navLinks = [
  { label: "Villa Crespo", href: "/villa-crespo" },
  { label: "Belgrano", href: "/belgrano" },
  { label: "Sumate al Equipo", href: "/sumate-al-equipo" },
  { label: "Contacto", href: "/contacto" },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="7"
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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [reservarOpen, setReservarOpen] = useState(false);

  /* Coords del dropdown desktop — calculadas desde getBoundingClientRect */
  const [dropCoords, setDropCoords] = useState({ top: 0, left: 0 });

  const drawerRef = useRef<HTMLDivElement>(null);
  const reservarBtnRef = useRef<HTMLButtonElement>(null);
  const mobileReservarBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Cerrar drawer al clickear afuera */
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

  function handleReservarDesktop() {
    if (reservarBtnRef.current) {
      const rect = reservarBtnRef.current.getBoundingClientRect();
      setDropCoords({
        top: rect.bottom + 8,
        left: rect.left + rect.width / 2,
      });
    }
    setReservarOpen((p) => !p);
  }

  function handleReservarMobile() {
    if (mobileReservarBtnRef.current) {
      const rect = mobileReservarBtnRef.current.getBoundingClientRect();
      setDropCoords({
        /* En mobile aparece encima del botón */
        top: rect.top - 8,
        left: rect.left + rect.width / 2,
      });
    }
    setReservarOpen((p) => !p);
  }

  function closeReservar() {
    setReservarOpen(false);
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
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/assets/logo/logo.jpg"
              alt="Ayguacamole - Gastronomía Mexicana"
              width={44}
              height={44}
              className="rounded-full object-cover"
              priority
            />
            <span className="font-lilita text-white text-lg uppercase tracking-wide hidden sm:block">
              Ayguacamole
            </span>
          </Link>

          {/* Links desktop */}
          <ul className="hidden lg:flex items-center gap-6">
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

          {/* CTA Reservar desktop */}
          <div className="flex items-center gap-3">
            <button
              ref={reservarBtnRef}
              onClick={handleReservarDesktop}
              aria-expanded={reservarOpen}
              className="hidden lg:inline-flex items-center gap-1.5 bg-amarillo text-negro font-nunito font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full hover:bg-yellow-400 transition-colors duration-200"
            >
              Reservar
              <Chevron open={reservarOpen} />
            </button>

            {/* Hamburger mobile */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
              className="lg:hidden flex flex-col gap-1.5 p-2"
            >
              <span className="block w-6 h-0.5 bg-white" />
              <span className="block w-6 h-0.5 bg-white" />
              <span className="block w-4 h-0.5 bg-white" />
            </button>
          </div>
        </nav>
      </header>

      {/* ── Dropdown desktop — fixed, FUERA del header para escapar su stacking context ── */}
      {reservarOpen && (
        <div
          className="fixed z-[9999]"
          style={{
            top: dropCoords.top,
            left: dropCoords.left,
            transform: "translateX(-50%)",
          }}
        >
          <LocalSelector
            mode="reservar"
            onClose={closeReservar}
            wrapperClassName="min-w-[240px]"
          />
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

        {/* Reservar mobile */}
        <button
          ref={mobileReservarBtnRef}
          onClick={handleReservarMobile}
          aria-expanded={reservarOpen}
          className="mt-auto w-full flex items-center justify-center gap-2 bg-amarillo text-negro font-nunito font-bold text-sm uppercase tracking-wider px-6 py-3.5 rounded-full hover:bg-yellow-400 transition-colors"
        >
          Reservar mesa
          <Chevron open={reservarOpen} />
        </button>
      </div>

      {/* ── Dropdown mobile — fixed, FUERA del drawer ── */}
      {reservarOpen && menuOpen && (
        <div
          className="fixed z-[9999]"
          style={{
            /* Aparece encima del botón mobile */
            bottom: `calc(100vh - ${dropCoords.top}px)`,
            left: dropCoords.left,
            transform: "translateX(-50%)",
          }}
        >
          <LocalSelector
            mode="reservar"
            onClose={closeReservar}
            wrapperClassName="min-w-[240px]"
          />
        </div>
      )}
    </>
  );
}
