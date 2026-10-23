import { createFileRoute } from "@tanstack/react-router";
import { getRequestHeaders } from "@tanstack/react-start/server";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        let domain = "dnschecker.space";
        try {
          const headers = getRequestHeaders() as Record<string, string>;
          const host = headers?.["x-forwarded-host"] || headers?.["host"];
          if (host && !host.includes("localhost") && !host.includes("127.0.0.1")) {
            domain = host;
          }
        } catch (e) {}

        const baseUrl = `https://${domain}`;

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
          { path: "/email", priority: "0.8", changefreq: "weekly" },
          { path: "/geo", priority: "0.8", changefreq: "weekly" },
          { path: "/headers", priority: "0.8", changefreq: "weekly" },
          { path: "/hosting", priority: "0.8", changefreq: "weekly" },
          { path: "/ports", priority: "0.8", changefreq: "weekly" },
          { path: "/sitemap", priority: "0.7", changefreq: "weekly" },
        ];

        const today = new Date().toISOString().split("T")[0];

        const urls = entries.map(e =>
          `  <url>\n    <loc>${baseUrl}${e.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`
        );

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;

        return new Response(xml, {
          headers: { 
            "Content-Type": "application/xml; charset=utf-8", 
            "Cache-Control": "public, max-age=3600" 
          },
        });
      },
    },
  },
});
