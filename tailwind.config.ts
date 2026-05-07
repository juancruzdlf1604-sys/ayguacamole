import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        verde: "#1E7A3C",
        "verde-oscuro": "#145C2B",
        amarillo: "#F5C800",
        rojo: "#CC2200",
        negro: "#0D0D0D",
      },
      fontFamily: {
        lilita: ["var(--font-lilita)"],
        nunito: ["var(--font-nunito)"],
      },
    },
  },
  plugins: [],
};
export default config;
