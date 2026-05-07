/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    /* Todas las imágenes son locales (public/) — no se necesitan dominios externos */
    formats: ["image/webp", "image/avif"],
  },
};

export default nextConfig;
