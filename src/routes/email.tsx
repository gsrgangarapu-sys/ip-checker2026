import { createFileRoute } from "@tanstack/react-router";
import { Seo } from "@/components/Seo";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useServerFn } from "@tanstack/react-start";
import { emailCheck } from "@/lib/network.functions";
import { Mail, Loader2, ArrowRight, ShieldCheck, AlertTriangle, Terminal } from "lucide-react";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Email Security Checker — Verify MX, SPF & DMARC | DNSChecker" },
      { name: "description", content: "Verify your domain's email infrastructure. Check mail exchange (MX) availability, sender policy framework (SPF), and DMARC configuration in real time." },
      { name: "keywords", content: "email security check, mx record check, check spf record, check dmarc record, email deliverability test, domain email setup, mail server test, avoid spam folder" },
      { property: "og:title", content: "Email Security Checker — Verify MX, SPF & DMARC" },
      { property: "og:description", content: "Verify MX, SPF, and DMARC records for domain email security." },
      { property: "og:url", content: "https://dnschecker.space/email" },
    ],
    links: [{ rel: "canonical", href: "/email" }],
  }),
  component: EmailPage,
});

function EmailPage() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<any>(null);
  const lookup = useServerFn(emailCheck);

  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (results && resultRef.current) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [results]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    let q = domain.trim();
    if (!q) return;
    try {
      if (q.startsWith("http://") || q.startsWith("https://")) {
        q = new URL(q).hostname;
      } else if (q.includes("/")) {
        q = q.split("/")[0];
      }
    } catch {
      q = q.replace(/^https?:\/\//, "").split("/")[0];
    }

    setLoading(true); setError(null); setResults(null);
    try {
      const data = await lookup({ data: { domain: q } });
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Email infrastructure check failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Seo 
        title="Email Security Checker — Verify MX, SPF & DMARC" 
        description="Verify your domain's email infrastructure. Check mail exchange (MX) availability, sender policy framework (SPF), and DMARC configuration." 
        keywords="email security check, mx record check, check spf record, check dmarc record, email deliverability test, domain email setup, mail server test"
        url="https://dnschecker.space/email"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Email Security Checker",
          "url": "https://dnschecker.space/email",
          "description": "Verify MX, TXT, and DMARC records for domain email security.",
          "applicationCategory": "DeveloperApplication",
          "operatingSystem": "All"
        }}
      />
      <SiteHeader />
      
      <section className="relative pt-16 pb-12 overflow-hidden flex flex-col items-center">
        <div className="absolute inset-0 z-[-1] grid-bg opacity-20 [mask-image:radial-gradient(ellipse_at_top,black_50%,transparent_90%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 mb-6 shadow-sm">
              <Mail className="h-3 w-3 text-emerald-600" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-emerald-600 uppercase">Mail Infrastructure</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-foreground mb-6 tracking-tight">
              Email <span className="text-gradient">Diagnostics</span>
            </h1>
            <p className="text-lg text-secondary-foreground max-w-2xl mx-auto leading-relaxed mb-12">
              Verify mail exchange (MX) availability, sender policy framework (SPF), and DMARC configuration.
            </p>

            <form onSubmit={submit} className="relative w-full max-w-2xl group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-[24px] blur opacity-20 group-hover:opacity-30 transition duration-1000" />
              <div className="relative flex items-center bg-white border border-slate-200 rounded-[20px] p-2 pl-6 shadow-md">
                <Mail className="h-5 w-5 text-secondary-foreground/40 mr-4" />
                <input
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="Enter Domain (e.g. gmail.com)"
                  className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-secondary-foreground/40 font-mono text-lg py-4"
                />
                <button
                  type="submit" disabled={loading}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-10 py-4 rounded-[16px] font-black text-base transition-all shadow-sm hover:shadow-md flex items-center gap-2 disabled:opacity-50 hover:opacity-90"
                >
                  {loading ? <Loader2 className="h-5 w-5 animate-spin text-white" /> : "Verify"}
                  {!loading && <ArrowRight className="h-5 w-5" />}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 py-12 flex-1">
        <AnimatePresence mode="wait">
          {error && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white shadow-sm rounded-2xl p-6 border border-danger/20 text-danger font-mono text-sm flex items-center gap-3 max-w-3xl mx-auto">
              <AlertTriangle className="h-5 w-5" />
              {error}
            </motion.div>
          )}
          
          {results && (
            <motion.div 
              ref={resultRef}
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="space-y-6 max-w-5xl mx-auto scroll-mt-8 pt-8"
            >
              <div className="grid md:grid-cols-2 gap-8">
                
                {/* MX RECORDS */}
                <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Terminal className="h-6 w-6 text-emerald-600" />
                    <h3 className="text-base font-bold uppercase tracking-[0.2em] text-foreground">MX Servers</h3>
                  </div>
                  {results.mx?.length > 0 ? (
                    <div className="space-y-4">
                      {results.mx.sort((a: any, b: any) => a.priority - b.priority).map((r: any, i: number) => (
                        <div key={i} className="px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between group hover:bg-slate-100 transition-colors shadow-sm">
                          <span className="font-mono text-base text-foreground truncate pr-4">{r.exchange}</span>
                          <span className="text-xs font-bold text-slate-700 uppercase tracking-widest bg-slate-200 px-3 py-1.5 rounded-lg">
                            PRI: {r.priority}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-red-600 text-sm font-mono p-5 bg-red-50 border border-red-200 rounded-2xl">No MX records found. Domain cannot receive email.</div>
                  )}
                </div>

                {/* TXT / SPF / DMARC */}
                <div className="space-y-8">
                  <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <ShieldCheck className="h-6 w-6 text-emerald-600" />
                      <h3 className="text-base font-bold uppercase tracking-[0.2em] text-foreground">SPF Policy</h3>
                    </div>
                    {results.txt?.find((t: string) => t.includes('v=spf1')) ? (
                      <div className="px-5 py-4 rounded-2xl bg-emerald-50 border border-emerald-200 font-mono text-base text-emerald-700 break-all shadow-sm">
                        {results.txt.find((t: string) => t.includes('v=spf1'))}
                      </div>
                    ) : (
                      <div className="text-amber-700 text-sm font-mono p-5 bg-amber-50 border border-amber-200 rounded-2xl">No SPF policy configured. Risk of spoofing.</div>
                    )}
                  </div>

                  <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <ShieldCheck className="h-6 w-6 text-emerald-600" />
                      <h3 className="text-base font-bold uppercase tracking-[0.2em] text-foreground">DMARC Policy</h3>
                    </div>
                    {results.dmarc?.find((t: string) => t.includes('v=DMARC1')) ? (
                      <div className="px-5 py-4 rounded-2xl bg-emerald-50 border border-emerald-200 font-mono text-base text-emerald-700 break-all shadow-sm">
                        {results.dmarc.find((t: string) => t.includes('v=DMARC1'))}
                      </div>
                    ) : (
                      <div className="text-amber-700 text-sm font-mono p-5 bg-amber-50 border border-amber-200 rounded-2xl">No DMARC policy configured.</div>
                    )}
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      
      <SiteFooter />
    </div>
  );
}
