"use client";

import { useState } from "react";
import LocalSelector from "@/components/home/LocalSelector";
import { LOCALES } from "@/lib/constants";

type OpenKey = "vc-reservar" | "vc-menu" | "bel-reservar" | "bel-menu" | null;

/* Ícono de flecha externa */
function ExternalArrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 12L12 2M12 2H6M12 2v6" />
    </svg>
  );
}

/* Ícono chevron abajo */
function Chevron({ rotated }: { rotated: boolean }) {
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
      className={`transition-transform duration-200 ${rotated ? "rotate-180" : ""}`}
    >
      <path d="M1 1l5 5 5-5" />
    </svg>
  );
}

interface DataRowProps {
  label: string;
  children: React.ReactNode;
}

function DataRow({ label, children }: DataRowProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-nunito font-bold text-amarillo text-xs uppercase tracking-widest">
        {label}
      </span>
      <span className="font-nunito text-white text-sm leading-relaxed">
        {children}
      </span>
    </div>
  );
}

export default function ContactoCards() {
  const [openKey, setOpenKey] = useState<OpenKey>(null);

  function toggle(key: OpenKey) {
    setOpenKey((prev) => (prev === key ? null : key));
  }

  return (
    <section className="bg-negro py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* ─── Card Villa Crespo ─── */}
        <div className="bg-verde-oscuro rounded-2xl p-8 flex flex-col gap-7">
          {/* Cabecera */}
          <div>
            <h2 className="font-lilita text-white text-4xl uppercase leading-none">
              Villa Crespo
            </h2>
            <p className="font-nunito text-white/60 text-sm mt-1">
              {LOCALES.villaCrespo.direccion}
            </p>
          </div>

          {/* Datos */}
          <div className="flex flex-col gap-5">
            <DataRow label="Dirección">
              {LOCALES.villaCrespo.direccion}, CABA
            </DataRow>
            <DataRow label="Horarios">
              {LOCALES.villaCrespo.horario}
            </DataRow>
            <DataRow label="Teléfono">
              <a
                href={`tel:${LOCALES.villaCrespo.telefono}`}
                className="hover:text-amarillo transition-colors"
              >
                {LOCALES.villaCrespo.telefono}
              </a>
            </DataRow>
            <DataRow label="Email">
              <a
                href={`mailto:${LOCALES.villaCrespo.email}`}
                className="hover:text-amarillo transition-colors"
              >
                {LOCALES.villaCrespo.email}
              </a>
            </DataRow>
            <DataRow label="Instagram">
              <a
                href="https://www.instagram.com/ayguacamole/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amarillo transition-colors"
              >
                @ayguacamole
              </a>
            </DataRow>
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-3 mt-auto pt-2">
            {/* Abrir en Google Maps */}
            <a
              href="https://maps.google.com/?q=Juan+Ramírez+de+Velasco+966+Villa+Crespo+Buenos+Aires"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border-2 border-white/40 text-white font-nunito font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-full hover:border-white transition-colors"
            >
              Abrir en Google Maps
              <ExternalArrow />
            </a>

            {/* Botones con dropdown */}
            <div className="flex gap-3">
              {/* Reservar */}
              <div className="relative flex-1">
                <button
                  onClick={() => toggle("vc-reservar")}
                  aria-expanded={openKey === "vc-reservar"}
                  className="w-full flex items-center justify-center gap-2 bg-amarillo text-negro font-nunito font-bold text-xs uppercase tracking-wider px-4 py-3 rounded-full hover:bg-yellow-400 transition-colors"
                >
                  Reservar
                  <Chevron rotated={openKey === "vc-reservar"} />
                </button>
                {openKey === "vc-reservar" && (
                  <LocalSelector
                    mode="reservar"
                    onClose={() => setOpenKey(null)}
                  />
                )}
              </div>

              {/* Pedí ahora */}
              <div className="relative flex-1">
                <button
                  onClick={() => toggle("vc-menu")}
                  aria-expanded={openKey === "vc-menu"}
                  className="w-full flex items-center justify-center gap-2 border-2 border-white text-white font-nunito font-bold text-xs uppercase tracking-wider px-4 py-3 rounded-full hover:bg-white hover:text-negro transition-colors"
                >
                  Pedí ahora
                  <Chevron rotated={openKey === "vc-menu"} />
                </button>
                {openKey === "vc-menu" && (
                  <LocalSelector
                    mode="menu"
                    onClose={() => setOpenKey(null)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ─── Card Belgrano ─── */}
        <div className="bg-verde-oscuro rounded-2xl p-8 flex flex-col gap-7">
          {/* Cabecera */}
          <div>
            <h2 className="font-lilita text-white text-4xl uppercase leading-none">
              Belgrano
            </h2>
            <p className="font-nunito text-white/60 text-sm mt-1">
              {LOCALES.belgrano.direccion}
            </p>
          </div>

          {/* Datos */}
          <div className="flex flex-col gap-5">
            <DataRow label="Dirección">
              {LOCALES.belgrano.direccion}, CABA
            </DataRow>
            <DataRow label="Horarios">
              {LOCALES.belgrano.horario}
            </DataRow>
            <DataRow label="Teléfono">
              <a
                href={`tel:${LOCALES.belgrano.telefono}`}
                className="hover:text-amarillo transition-colors"
              >
                {LOCALES.belgrano.telefono}
              </a>
            </DataRow>
            <DataRow label="Email">
              <a
                href={`mailto:${LOCALES.belgrano.email}`}
                className="hover:text-amarillo transition-colors"
              >
                {LOCALES.belgrano.email}
              </a>
            </DataRow>
            <DataRow label="Instagram">
              <a
                href="https://www.instagram.com/ayguacamole/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amarillo transition-colors"
              >
                @ayguacamole
              </a>
            </DataRow>
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-3 mt-auto pt-2">
            {/* Abrir en Google Maps */}
            <a
              href="https://maps.google.com/?q=Av+Juramento+2628+Belgrano+Buenos+Aires"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border-2 border-white/40 text-white font-nunito font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-full hover:border-white transition-colors"
            >
              Abrir en Google Maps
              <ExternalArrow />
            </a>

            {/* Botones con dropdown */}
            <div className="flex gap-3">
              {/* Reservar */}
              <div className="relative flex-1">
                <button
                  onClick={() => toggle("bel-reservar")}
                  aria-expanded={openKey === "bel-reservar"}
                  className="w-full flex items-center justify-center gap-2 bg-amarillo text-negro font-nunito font-bold text-xs uppercase tracking-wider px-4 py-3 rounded-full hover:bg-yellow-400 transition-colors"
                >
                  Reservar
                  <Chevron rotated={openKey === "bel-reservar"} />
                </button>
                {openKey === "bel-reservar" && (
                  <LocalSelector
                    mode="reservar"
                    onClose={() => setOpenKey(null)}
                  />
                )}
              </div>

              {/* Pedí ahora */}
              <div className="relative flex-1">
                <button
                  onClick={() => toggle("bel-menu")}
                  aria-expanded={openKey === "bel-menu"}
                  className="w-full flex items-center justify-center gap-2 border-2 border-white text-white font-nunito font-bold text-xs uppercase tracking-wider px-4 py-3 rounded-full hover:bg-white hover:text-negro transition-colors"
                >
                  Pedí ahora
                  <Chevron rotated={openKey === "bel-menu"} />
                </button>
                {openKey === "bel-menu" && (
                  <LocalSelector
                    mode="menu"
                    onClose={() => setOpenKey(null)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
