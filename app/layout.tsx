import type { Metadata } from "next";
import { Lilita_One, Nunito } from "next/font/google";
import "./globals.css";

const lilitaOne = Lilita_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-lilita",
  display: "swap",
});

const nunito = Nunito({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ayguacamole.com"),
  title: "Ayguacamole · Gastronomía Mexicana Tex-Mex en Buenos Aires",
  description:
    "Tacos, burritos, nachos y cocina mexicana Tex-Mex en Villa Crespo y Belgrano. Abiertos todos los días. Reservá tu mesa o pedí delivery.",
  openGraph: {
    title: "Ayguacamole · Gastronomía Mexicana Tex-Mex en Buenos Aires",
    description:
      "Tacos, burritos, nachos y cocina mexicana Tex-Mex en Villa Crespo y Belgrano. Abiertos todos los días.",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-AR" className={`${lilitaOne.variable} ${nunito.variable}`} style={{ overflowX: "hidden" }}>
      <body className="font-nunito overflow-x-hidden relative">{children}</body>
    </html>
  );
}
