import { createFileRoute } from "@tanstack/react-router";
import { Seo } from "@/components/Seo";
import { useServerFn } from "@tanstack/react-start";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { whoisLookup } from "@/lib/network.functions";
import { Globe2, Loader2, Search, ArrowRight, Database, Terminal, ShieldCheck, ChevronDown, ChevronUp } from "lucide-react";

export const Route = createFileRoute("/whois")({
  head: () => ({
    meta: [
      { title: "WHOIS Lookup — Domain & IP Registration | IP Guardian" },
      { name: "description", content: "RDAP-powered WHOIS lookup for any domain or IP. Registrar, dates, nameservers, contacts." },
      { property: "og:title", content: "WHOIS Lookup — IP Guardian" },
      { property: "og:description", content: "Domain & IP registration intelligence." },
      { property: "og:url", content: "/whois" },
    ],
    links: [{ rel: "canonical", href: "/whois" }],
  }),
  component: WhoisPage,
});

function WhoisPage() {
  const lookup = useServerFn(whoisLookup);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<unknown>(null);
  const [showRaw, setShowRaw] = useState(false);
  
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (result && resultRef.current) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [result]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    let q = query.trim();
    if (!q) {
      setError("Enter a valid domain or IP");
      return;
    }
    
    // Clean URL input
    try {
      if (q.startsWith("http://") || q.startsWith("https://")) {
        q = new URL(q).hostname;
      } else if (q.includes("/")) {
        q = q.split("/")[0];
      }
    } catch {
      q = q.replace(/^https?:\/\//, "").split("/")[0];
    }

    setLoading(true); setError(null); setResult(null);
    try {
      const data = await lookup({ data: { query: q } });
      setResult(data.raw);
    } catch (err) {
      setError("Enter a valid domain or IP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Seo 
        title="WHOIS Lookup Tool — Domain & IP Registration Info" 
        description="Free RDAP-powered WHOIS lookup tool. Find domain registration dates, registrar details, ownership contacts, and nameservers for any domain or IP address." 
        keywords="whois lookup, domain lookup, whois IP, check domain ownership, domain registration details, find domain owner, whois search, rdap protocol, domain name search, ip address owner"
        url="https://dnschecker.space/whois"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "WHOIS Lookup Tool",
          "url": "https://dnschecker.space/whois",
          "description": "Find domain and IP registration details instantly.",
          "applicationCategory": "DeveloperApplication",
          "operatingSystem": "All"
        }}
      />
      <SiteHeader />
      
      <section className="relative pt-16 pb-12 overflow-hidden flex flex-col items-center">
        <div className="absolute inset-0 z-[-1] grid-bg opacity-20 [mask-image:radial-gradient(ellipse_at_top,black_50%,transparent_90%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 mb-6 shadow-sm">
              <Database className="h-3 w-3 text-emerald-600" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-emerald-600 uppercase">Registry Protocol v4.2</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-foreground mb-6 tracking-tight">
              Registry <span className="text-gradient">Intelligence</span>
            </h1>
            <p className="text-lg text-secondary-foreground max-w-2xl mx-auto leading-relaxed mb-12">
              RDAP-powered WHOIS lookup for any domain or IP address. Retrieve registrar data, important dates, nameservers, and ownership contacts.
            </p>

            <form
              onSubmit={submit}
              className="relative w-full max-w-2xl group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-[24px] blur opacity-20 group-hover:opacity-30 transition duration-1000" />
              <div className="relative flex items-center bg-white border border-slate-200 rounded-[20px] p-2 pl-6 shadow-md">
                <Globe2 className="h-5 w-5 text-secondary-foreground/40 mr-4" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="https://1aesthetic.com/"
                  className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-secondary-foreground/30 font-mono text-lg py-4"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-10 py-4 rounded-[16px] font-black text-base transition-all shadow-sm hover:shadow-md flex items-center gap-2 disabled:opacity-50 hover:opacity-90"
                >
                  {loading ? <Loader2 className="h-5 w-5 animate-spin text-white" /> : "Lookup"}
                  {!loading && <ArrowRight className="h-5 w-5" />}
                </button>
              </div>
            </form>

            <div className="mt-8 flex flex-wrap gap-3 items-center justify-center">
              <span className="text-[11px] font-bold text-secondary-foreground/40 uppercase tracking-widest">Try Domain:</span>
              {["google.com", "cloudflare.com", "openai.com"].map((s) => (
                <button
                  key={s}
                  onClick={() => { setQuery(s); }}
                  className="text-sm font-mono px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-secondary-foreground/60 hover:text-emerald-600 hover:bg-slate-100 transition-all shadow-sm"
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 py-16 flex-1">
        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white shadow-sm rounded-2xl p-6 border border-danger/20 text-danger font-mono text-sm flex items-center gap-3 max-w-3xl mx-auto"
            >
              <Terminal className="h-5 w-5" />
              {error}
            </motion.div>
          )}
          
          {result !== null && (() => {
            const domainName = (result as any)?.ldhName || "Unknown";
            const statuses = (result as any)?.status || [];
            const nameservers = (result as any)?.nameservers?.map((n: any) => n.ldhName) || [];
            
            let registrar = "Unknown";
            const registrarEntity = (result as any)?.entities?.find((e: any) => e.roles?.includes("registrar"));
            if (registrarEntity) {
              const vcard = registrarEntity.vcardArray?.[1]?.find((v: any) => v[0] === "fn");
              if (vcard) registrar = vcard[3];
            }

            let regDate = "—";
            let expDate = "—";
            let updDate = "—";

            (result as any)?.events?.forEach((e: any) => {
              if (e.eventAction === "registration") regDate = new Date(e.eventDate).toLocaleDateString();
              if (e.eventAction === "expiration") expDate = new Date(e.eventDate).toLocaleDateString();
              if (e.eventAction === "last changed") updDate = new Date(e.eventDate).toLocaleDateString();
            });

            return (
              <motion.div 
                ref={resultRef}
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="space-y-8 scroll-mt-24"
              >
                {/* HEADER CARD */}
                <div className="bg-white border border-slate-200 shadow-sm rounded-[32px] p-8 md:p-12 relative overflow-hidden group">
                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex flex-col items-center md:items-start">
                      <div className="flex items-center gap-3 mb-4">
                        <Globe2 className="h-6 w-6 text-emerald-600" />
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-600">Domain Registry Profile</span>
                      </div>
                      <h2 className="text-4xl sm:text-6xl font-black font-mono tracking-tighter text-foreground mb-4 text-center md:text-left">
                        {domainName}
                      </h2>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="flex h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
                        <span className="text-sm font-bold text-foreground uppercase tracking-widest">Active Registration</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center md:items-end justify-center px-4">
                      <div className="text-[11px] font-bold text-secondary-foreground/40 uppercase tracking-[0.3em] mb-3">Registrar</div>
                      <div className="text-2xl sm:text-3xl font-black text-foreground text-center md:text-right max-w-sm truncate">
                        {registrar}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* DATES */}
                  <div className="bg-white border border-slate-200 shadow-sm rounded-[32px] p-8 space-y-8">
                    <div className="flex items-center gap-3 mb-4">
                      <Database className="h-6 w-6 text-emerald-600" />
                      <h3 className="text-base font-bold uppercase tracking-[0.2em] text-foreground">Registry Dates</h3>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.15em] text-secondary-foreground/50 mb-2">Registered On</div>
                        <div className="text-lg font-bold text-foreground">{regDate}</div>
                      </div>
                      <div className="h-px bg-slate-100" />
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.15em] text-secondary-foreground/50 mb-2">Expires On</div>
                        <div className="text-lg font-bold text-foreground">{expDate}</div>
                      </div>
                      <div className="h-px bg-slate-100" />
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.15em] text-secondary-foreground/50 mb-2">Last Updated</div>
                        <div className="text-lg font-bold text-foreground">{updDate}</div>
                      </div>
                    </div>
                  </div>

                  {/* NAMESERVERS */}
                  <div className="bg-white border border-slate-200 shadow-sm rounded-[32px] p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <Terminal className="h-6 w-6 text-emerald-600" />
                      <h3 className="text-base font-bold uppercase tracking-[0.2em] text-foreground">Nameservers</h3>
                    </div>
                    {nameservers.length > 0 ? (
                      <div className="flex flex-col gap-4">
                        {nameservers.map((ns: string) => (
                          <div key={ns} className="px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-base text-foreground break-all shadow-sm">
                            {ns}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-secondary-foreground/50 text-base font-mono">No nameservers found</div>
                    )}
                  </div>

                  {/* STATUS */}
                  <div className="bg-white border border-slate-200 shadow-sm rounded-[32px] p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <ShieldCheck className="h-6 w-6 text-emerald-600" />
                      <h3 className="text-base font-bold uppercase tracking-[0.2em] text-foreground">Domain Status</h3>
                    </div>
                    {statuses.length > 0 ? (
                      <div className="flex flex-wrap gap-3">
                        {statuses.map((st: string) => (
                          <span key={st} className="px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-black uppercase tracking-widest shadow-sm">
                            {st.replace("client ", "").replace("server ", "")}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <div className="text-secondary-foreground/50 text-base font-mono">OK / No specific status</div>
                    )}
                  </div>
                </div>

                <div className="bg-white shadow-sm rounded-[32px] p-10 border border-slate-200 mt-8">
                  <div 
                    className="flex items-center justify-between cursor-pointer group"
                    onClick={() => setShowRaw(!showRaw)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-200 group-hover:bg-slate-100 transition-colors">
                        <Terminal className="h-5 w-5 text-emerald-600 group-hover:text-emerald-700 transition-colors" />
                      </div>
                      <h3 className="text-base font-bold uppercase tracking-[0.2em] text-secondary-foreground group-hover:text-foreground transition-colors">Raw JSON Output</h3>
                    </div>
                    {showRaw ? (
                      <ChevronUp className="h-6 w-6 text-secondary-foreground/40 group-hover:text-foreground transition-colors" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-secondary-foreground/40 group-hover:text-foreground transition-colors" />
                    )}
                  </div>
                  
                  <AnimatePresence>
                    {showRaw && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: 32 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        className="relative overflow-hidden"
                      >
                        <pre className="text-sm font-mono overflow-auto max-h-[500px] p-8 rounded-3xl bg-slate-50 border border-slate-200 text-slate-500 leading-relaxed custom-scrollbar hover:text-slate-800 transition-colors shadow-inner">
                          {JSON.stringify(result, null, 2)}
                        </pre>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </section>
      
      <SiteFooter />
    </div>
  );
}
