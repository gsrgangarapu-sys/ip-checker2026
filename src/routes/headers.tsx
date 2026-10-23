import { createFileRoute } from "@tanstack/react-router";
import { Seo } from "@/components/Seo";
import { useEffect, useState, useRef } from "react";
import { useServerFn } from "@tanstack/react-start";
import { motion, AnimatePresence } from "framer-motion";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { requestHeaders } from "@/lib/network.functions";
import { Mail, RefreshCw, Terminal, Shield, ArrowRight, Activity, Eye } from "lucide-react";

export const Route = createFileRoute("/headers")({
  head: () => ({
    meta: [
      { title: "HTTP Security Headers Inspector & Cyber Audit | DNSChecker" },
      { name: "description", content: "Inspect incoming and outgoing HTTP request headers. Audit HSTS, Content-Security-Policy (CSP), X-Frame-Options, and client fingerprint data." },
      { name: "keywords", content: "http headers inspector, check security headers, hsts checker, csp checker, x-frame-options, user agent analyzer, cyber security header audit" },
      { property: "og:title", content: "HTTP Security Headers Inspector & Cyber Audit" },
      { property: "og:description", content: "Live inspection of HTTP security headers, User-Agent, and client fingerprint data." },
      { property: "og:url", content: "https://dnschecker.space/headers" },
    ],
    links: [{ rel: "canonical", href: "/headers" }],
  }),
  component: HeadersPage,
});

function HeadersPage() {
  const fetchHeaders = useServerFn(requestHeaders);
  const [data, setData] = useState<{ headers: Record<string, string>; ip?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const resultRef = useRef<HTMLDivElement>(null);

  const load = async () => {
    setLoading(true);
    try {
      const r = await fetchHeaders();
      setData(r);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  useEffect(() => {
    if (data && resultRef.current && !loading) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [data, loading]);

  const entries = data ? Object.entries(data.headers).sort(([a], [b]) => a.localeCompare(b)) : [];

  return (
    <div className="min-h-screen flex flex-col">
      <Seo 
        title="HTTP Headers Inspector — See Your Request Headers | IP Guardian" 
        description="Inspect every HTTP header your browser sends to a server. Check User-Agent, Accept, language preferences, forwarded IP, and security indicators." 
        keywords="http headers inspector, view request headers, check http headers, my user agent, inspect headers, http request viewer, browser headers"
        url="https://dnschecker.space/headers"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "HTTP Headers Inspector",
          "url": "https://dnschecker.space/headers",
          "description": "Inspect HTTP headers sent by your browser.",
          "applicationCategory": "DeveloperApplication",
          "operatingSystem": "All"
        }}
      />
      <SiteHeader />
      
      <section className="relative pt-16 pb-12 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20 [mask-image:radial-gradient(ellipse_at_top,black_50%,transparent_90%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 mb-6 shadow-sm">
              <Eye className="h-3 w-3 text-emerald-600" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-600">Request Inspector</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-foreground mb-6 tracking-tight">
              Header <span className="text-gradient">Fingerprint</span>
            </h1>
            <p className="text-lg text-secondary-foreground max-w-2xl leading-relaxed mb-8">
              Capture and analyze every HTTP header your browser transmits during a standard request. Discover metadata, language preferences, and tracking indicators.
            </p>
            
            <button
              onClick={load}
              disabled={loading}
              className="bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 shadow-sm px-8 py-4 rounded-[16px] font-black text-sm transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh Snapshot
            </button>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-12 flex-1">
        <AnimatePresence mode="wait">
          {data && (
            <motion.div
              ref={resultRef}
              key="headers-table"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[32px] p-8 md:p-12 border border-slate-200 shadow-sm overflow-hidden scroll-mt-8 pt-8"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <Terminal className="h-6 w-6 text-emerald-600" />
                  <h3 className="text-base font-bold uppercase tracking-[0.2em] text-foreground">
                    Outgoing Packet Headers ({entries.length})
                  </h3>
                </div>
                <div className="px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] font-mono text-emerald-700 font-bold tracking-wider">
                  CLIENT_IP: {data.ip || "UNKNOWN"}
                </div>
              </div>

              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[11px] font-bold uppercase tracking-[0.2em] text-secondary-foreground/40 border-b border-slate-200">
                      <th className="pb-5 pr-8">Header Key</th>
                      <th className="pb-5">Transmission Value</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono text-base">
                    {entries.map(([k, v], i) => (
                      <motion.tr 
                        key={k} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.02 }}
                        className="border-b border-slate-100 hover:bg-slate-50 transition-colors group"
                      >
                        <td className="py-5 pr-8 text-emerald-600 font-bold whitespace-nowrap align-top">{k}</td>
                        <td className="py-5 text-slate-600 break-all leading-relaxed group-hover:text-foreground transition-colors">{v}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      
      <SiteFooter />
    </div>
  );
}
