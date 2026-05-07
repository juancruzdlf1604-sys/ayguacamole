import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ayguacamole.com";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/villa-crespo`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/belgrano`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/sumate-al-equipo`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/contacto`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
