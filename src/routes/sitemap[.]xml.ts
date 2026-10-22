import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = [
          { path: "/", priority: "1.0", changefreq: "daily" },
          { path: "/my-ip", priority: "0.9", changefreq: "daily" },
          { path: "/lookup", priority: "0.9", changefreq: "weekly" },
          { path: "/tools", priority: "0.8", changefreq: "weekly" },
          { path: "/blog", priority: "0.9", changefreq: "daily" },
          { path: "/dns", priority: "0.8", changefreq: "weekly" },
          { path: "/whois", priority: "0.8", changefreq: "weekly" },
          { path: "/ssl", priority: "0.8", changefreq: "weekly" },
          { path: "/blacklist", priority: "0.8", changefreq: "weekly" },
          { path: "/ports", priority: "0.8", changefreq: "weekly" },
          { path: "/sitemap", priority: "0.7", changefreq: "weekly" },
        ];
        const urls = entries.map(e =>
          `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`
        );
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
