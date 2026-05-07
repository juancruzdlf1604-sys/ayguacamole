"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LOCALES, GOOGLE_FORM_URL, INSTAGRAM_URL } from "@/lib/constants";

function PrivacyModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-negro/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-negro border border-verde/30 rounded-2xl max-w-lg w-full p-8 max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-lilita text-white text-2xl uppercase mb-4">
          Política de Privacidad
        </h2>
        <div className="font-nunito text-white/70 text-sm leading-relaxed space-y-4">
          <p>
            Ayguacamole respeta tu privacidad. Los datos que recopilamos
            a través del formulario de contacto son: nombre, correo
            electrónico y teléfono. Estos datos son utilizados únicamente
            para responder a tus consultas y gestionar reservas.
          </p>
          <p>
            Cumplimos con la Ley 25.326 de Protección de Datos Personales de
            la República Argentina. En ningún caso cedemos ni vendemos tus
            datos a terceros.
          </p>
          <p>
            Este sitio utiliza Google Analytics 4 (GA4) para medir el tráfico
            y mejorar la experiencia del usuario. GA4 puede utilizar cookies
            para recopilar información anónima sobre el uso del sitio.
          </p>
          <p>
            Podés ejercer tu derecho de acceso, rectificación o eliminación
            escribiéndonos a{" "}
            <a
              href="mailto:ayguacamole.ba@gmail.com"
              className="text-amarillo hover:underline"
            >
              ayguacamole.ba@gmail.com
            </a>
            .
          </p>
        </div>
        <button
          onClick={onClose}
          className="mt-6 bg-verde text-white font-nunito font-bold text-sm uppercase px-6 py-2.5 rounded-full hover:bg-verde-oscuro transition-colors"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

function CookiesModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-negro/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-negro border border-verde/30 rounded-2xl max-w-lg w-full p-8 max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-lilita text-white text-2xl uppercase mb-4">
          Política de Cookies
        </h2>
        <div className="font-nunito text-white/70 text-sm leading-relaxed space-y-4">
          <p>
            Este sitio utiliza cookies de Google Analytics 4 (GA4) para
            analizar el tráfico y mejorar la experiencia de navegación. Las
            cookies son pequeños archivos de texto que se almacenan en tu
            dispositivo.
          </p>
          <p>
            Las cookies de GA4 recopilan información anónima como páginas
            visitadas, tiempo en el sitio y dispositivo utilizado. Esta
            información no se vincula a datos personales identificables.
          </p>
          <p>
            Podés deshabilitar las cookies desde la configuración de tu
            navegador sin que esto afecte la funcionalidad del sitio.
          </p>
        </div>
        <button
          onClick={onClose}
          className="mt-6 bg-verde text-white font-nunito font-bold text-sm uppercase px-6 py-2.5 rounded-full hover:bg-verde-oscuro transition-colors"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default function Footer() {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showCookies, setShowCookies] = useState(false);

  return (
    <>
      <footer className="bg-verde-oscuro text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Columna: Logo y legal */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Image
                  src="/assets/logo/logo.jpg"
                  alt="Ayguacamole"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-lilita text-white text-xl uppercase">
                    Ayguacamole
                  </p>
                  <p className="font-nunito text-white/60 text-xs uppercase tracking-wider">
                    Gastronomía Mexicana · Tex-Mex
                  </p>
                </div>
              </div>
              <div className="flex gap-4 mt-2">
                <button
                  onClick={() => setShowPrivacy(true)}
                  className="font-nunito text-white/40 text-xs hover:text-white/70 transition-colors underline"
                >
                  Política de privacidad
                </button>
                <button
                  onClick={() => setShowCookies(true)}
                  className="font-nunito text-white/40 text-xs hover:text-white/70 transition-colors underline"
                >
                  Cookies
                </button>
              </div>
            </div>

            {/* Columna: Navegación */}
            <div>
              <p className="font-nunito font-bold text-white/60 text-xs uppercase tracking-wider mb-4">
                Navegación
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  { label: "Inicio", href: "/" },
                  { label: "Villa Crespo", href: "/villa-crespo" },
                  { label: "Belgrano", href: "/belgrano" },
                  { label: "Sumate al equipo", href: "/sumate-al-equipo" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="font-nunito text-white/80 hover:text-amarillo transition-colors text-sm"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Columna: Locales y redes */}
            <div className="flex flex-col gap-6">
              {/* Villa Crespo */}
              <div>
                <p className="font-nunito font-bold text-amarillo text-xs uppercase tracking-wider mb-1">
                  Villa Crespo
                </p>
                <p className="font-nunito text-white/70 text-sm">
                  {LOCALES.villaCrespo.direccion}
                </p>
                <a
                  href={`tel:${LOCALES.villaCrespo.telefono}`}
                  className="font-nunito text-white/70 text-sm hover:text-amarillo transition-colors"
                >
                  {LOCALES.villaCrespo.telefono}
                </a>
              </div>

              {/* Belgrano */}
              <div>
                <p className="font-nunito font-bold text-amarillo text-xs uppercase tracking-wider mb-1">
                  Belgrano
                </p>
                <p className="font-nunito text-white/70 text-sm">
                  {LOCALES.belgrano.direccion}
                </p>
                <a
                  href={`tel:${LOCALES.belgrano.telefono}`}
                  className="font-nunito text-white/70 text-sm hover:text-amarillo transition-colors"
                >
                  {LOCALES.belgrano.telefono}
                </a>
              </div>

              {/* Redes */}
              <div className="flex gap-4">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram de Ayguacamole"
                  className="text-white/70 hover:text-amarillo transition-colors"
                >
                  {/* Ícono Instagram SVG */}
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a
                  href={`https://wa.me/${LOCALES.villaCrespo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp Ayguacamole"
                  className="text-white/70 hover:text-amarillo transition-colors"
                >
                  {/* Ícono WhatsApp SVG */}
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Línea divisoria y copyright */}
          <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="font-nunito text-white/40 text-xs">
              © {new Date().getFullYear()} Ayguacamole. Todos los derechos reservados.
            </p>
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-nunito font-bold text-amarillo text-xs uppercase tracking-wider hover:underline"
            >
              Reservar mesa
            </a>
          </div>
        </div>
      </footer>

      {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
      {showCookies && <CookiesModal onClose={() => setShowCookies(false)} />}
    </>
  );
}
