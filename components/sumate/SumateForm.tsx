"use client";

import { useState } from "react";

type FormState = "idle" | "success" | "error";

export default function SumateForm() {
  const [estado, setEstado] = useState<FormState>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    /* Armar body del mailto */
    const nombre = data.get("nombre");
    const email = data.get("email");
    const telefono = data.get("telefono");
    const puesto = data.get("puesto");
    const mensaje = data.get("mensaje");

    const subject = encodeURIComponent(`Postulación: ${puesto} — ${nombre}`);
    const body = encodeURIComponent(
      `Nombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono}\nPuesto: ${puesto}\n\n${mensaje}`
    );

    window.location.href = `mailto:ayguacamole.ba@gmail.com?subject=${subject}&body=${body}`;
    setEstado("success");
    form.reset();
  }

  return (
    <section className="bg-negro py-24 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-lilita text-white text-3xl uppercase mb-2">
          Tu postulación
        </h2>
        <p className="font-nunito text-white/60 text-sm mb-10">
          Completá el formulario y te contactamos a la brevedad.
        </p>

        {estado === "success" ? (
          <div className="bg-verde/20 border border-verde rounded-2xl p-8 text-center">
            <p className="font-lilita text-white text-2xl uppercase mb-2">
              ¡Gracias por postularte!
            </p>
            <p className="font-nunito text-white/70 text-sm">
              Revisá tu app de correo para confirmar el envío. Te respondemos
              pronto.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Nombre */}
            <div>
              <label
                htmlFor="nombre"
                className="block font-nunito font-bold text-verde text-xs uppercase tracking-wider mb-2"
              >
                Nombre completo *
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                required
                placeholder="Tu nombre y apellido"
                className="w-full bg-transparent border-2 border-verde/40 focus:border-amarillo rounded-xl px-4 py-3 font-nunito text-white text-sm placeholder-white/30 outline-none transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block font-nunito font-bold text-verde text-xs uppercase tracking-wider mb-2"
              >
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="tunombre@email.com"
                className="w-full bg-transparent border-2 border-verde/40 focus:border-amarillo rounded-xl px-4 py-3 font-nunito text-white text-sm placeholder-white/30 outline-none transition-colors"
              />
            </div>

            {/* Teléfono */}
            <div>
              <label
                htmlFor="telefono"
                className="block font-nunito font-bold text-verde text-xs uppercase tracking-wider mb-2"
              >
                Teléfono
              </label>
              <input
                id="telefono"
                name="telefono"
                type="tel"
                placeholder="+54 9 11 XXXX-XXXX"
                className="w-full bg-transparent border-2 border-verde/40 focus:border-amarillo rounded-xl px-4 py-3 font-nunito text-white text-sm placeholder-white/30 outline-none transition-colors"
              />
            </div>

            {/* Puesto */}
            <div>
              <label
                htmlFor="puesto"
                className="block font-nunito font-bold text-verde text-xs uppercase tracking-wider mb-2"
              >
                Puesto de interés *
              </label>
              <select
                id="puesto"
                name="puesto"
                required
                defaultValue=""
                className="w-full bg-negro border-2 border-verde/40 focus:border-amarillo rounded-xl px-4 py-3 font-nunito text-white text-sm outline-none transition-colors appearance-none"
              >
                <option value="" disabled>
                  Elegí un área
                </option>
                <option value="Cocina">Cocina</option>
                <option value="Salón">Salón</option>
                <option value="Delivery">Delivery</option>
                <option value="Administración">Administración</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            {/* Mensaje */}
            <div>
              <label
                htmlFor="mensaje"
                className="block font-nunito font-bold text-verde text-xs uppercase tracking-wider mb-2"
              >
                Contanos algo sobre vos
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={5}
                placeholder="¿Por qué querés trabajar en Ayguacamole? ¿Tenés experiencia en gastronomía?"
                className="w-full bg-transparent border-2 border-verde/40 focus:border-amarillo rounded-xl px-4 py-3 font-nunito text-white text-sm placeholder-white/30 outline-none transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="bg-amarillo text-negro font-nunito font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-full hover:bg-yellow-400 transition-colors w-full sm:w-auto sm:self-start"
            >
              Enviar mi postulación
            </button>

            {estado === "error" && (
              <p className="font-nunito text-rojo text-sm">
                Hubo un error. Intentá de nuevo o escribinos a ayguacamole.ba@gmail.com.
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
